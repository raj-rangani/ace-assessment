import { RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { cartAddValidator } from "../../../validators/cart/v1/cart.add.validator";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";

const addCart: RequestHandler = asyncHandler(async (req, res) => {
  const cartItem = await cartAddValidator().validate(req.body);
  return prisma.$transaction(async (tx) => {
    let cart = await tx.cart.findUnique({ where: { userId: req.user.id } });
    if (!cart) {
      cart = await tx.cart.create({
        data: { user: { connect: { id: req.user.id } } },
      });
    }

    const item = await tx.cartItem.upsert({
      where: { cartId_bookId: { bookId: cartItem.bookId, cartId: cart.id } },
      update: { quantity: { increment: cartItem.quantity } },
      create: {
        cart: { connect: { id: cart.id } },
        book: { connect: { id: cartItem.bookId } },
        quantity: cartItem.quantity,
      },
    });

    return res.status(201).json(new ApiResponse(201, item));
  });
});

export { addCart };

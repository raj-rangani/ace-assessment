import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { ApiError } from "../../../utils/ApiError";
import { OrderStatus } from "@prisma/client";

const createOrder: RequestHandler = asyncHandler(async (req, res) => {
  return prisma.$transaction(async (tx) => {
    const cart = await tx.cart.findUnique({
      where: { userId: req.user.id },
      include: { items: true },
    });

    if (!cart)
      throw new ApiError(400, "Couldn't retrieve your cart. Please try again.");
    if (cart.items.length < 1)
      throw new ApiError(400, "Please add some items before placing an order.");

    const bookIds = cart.items.map((e) => e.bookId);
    const books = await tx.book.findMany({ where: { id: { in: bookIds } } });

    cart.items.forEach((item) => {
      const book = books.find((e) => e.id === item.bookId);
      if (book.stock < item.quantity) {
        throw new ApiError(400, "Some items are no longer available");
      }
    });

    const total = cart.items.reduce((acc, curr) => {
      const book = books.find((e) => e.id === curr.bookId);
      return (acc += curr.quantity * book.price);
    }, 0);

    const orderItems = cart.items.map((item) => {
      return {
        bookId: item.bookId,
        quantity: item.quantity,
      };
    });

    const order = await tx.order.create({
      data: {
        total,
        user: { connect: { id: req.user.id } },
        items: { createMany: { data: orderItems } },
      },
    });

    await Promise.all(
      cart.items.map((item) => {
        const book = books.find((e) => e.id === item.bookId);
        return tx.book.update({
          where: { id: book.id },
          data: { stock: { decrement: item.quantity } },
        });
      })
    );

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
    return res.status(201).json(new ApiResponse(201, order));
  });
});

export { createOrder };

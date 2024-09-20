import { RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { cartAddValidator } from "../../../validators/cart/v1/cart.add.validator";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { uuidValidator } from "../../../validators/shared";

const deleteCartItem: RequestHandler = asyncHandler(async (req, res) => {
  const itemId = await uuidValidator().validate(req.params.itemId);
  await prisma.cartItem.delete({ where: { id: itemId } });
  return res.status(204).send(new ApiResponse(204));
});

export { deleteCartItem };

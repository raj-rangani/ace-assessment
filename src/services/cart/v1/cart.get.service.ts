import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";

const getCart: RequestHandler = asyncHandler(async (req, res) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: req.user.id },
    include: { items: { include: { book: true } } },
  });

  return res.status(200).json(new ApiResponse(200, cart));
});

export { getCart };

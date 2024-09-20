import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { uuidValidator } from "../../../validators/shared";

const getOrderById: RequestHandler = asyncHandler(async (req, res) => {
  const orderId = await uuidValidator().validate(req.params.id);
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { book: true } } },
  });

  return res.status(200).json(new ApiResponse(200, order));
});

export { getOrderById };

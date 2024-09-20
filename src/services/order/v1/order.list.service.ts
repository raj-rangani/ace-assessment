import { RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { ApiError } from "../../../utils/ApiError";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { listOrderValidator } from "../../../validators/order/v1/order.list.validator";

const listOrders: RequestHandler = asyncHandler(async (req, res) => {
  const query = await listOrderValidator().validate(req.query);

  if (!query.limit || !query.page) {
    throw new ApiError(400, "page or limit parameters are missing");
  }

  return prisma.$transaction(async (tx) => {
    const [orders, count] = await Promise.all([
      tx.order.findMany({
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: "desc" },
      }),
      tx.order.count(),
    ]);

    return res.status(200).json(new ApiResponse(200, orders, count));
  });
});

export { listOrders };

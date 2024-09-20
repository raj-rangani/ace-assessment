import { RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { ApiError } from "../../../utils/ApiError";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { listBookValidator } from "../../../validators/book/v1/book.list.validator";

const listBooks: RequestHandler = asyncHandler(async (req, res) => {
  const query = await listBookValidator().validate(req.query);

  if (!query.limit || !query.page) {
    throw new ApiError(400, "page or limit parameters are missing");
  }

  return prisma.$transaction(async (tx) => {
    const [books, count] = await Promise.all([
      tx.book.findMany({
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { title: "desc" },
      }),
      tx.book.count(),
    ]);

    return res.status(200).json(new ApiResponse(200, books, count));
  });
});

export { listBooks };

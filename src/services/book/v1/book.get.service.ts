import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { uuidValidator } from "../../../validators/shared";

const getBookById: RequestHandler = asyncHandler(async (req, res) => {
  const bookId = await uuidValidator().validate(req.params.id);
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  return res.status(200).json(new ApiResponse(200, book));
});

export { getBookById };

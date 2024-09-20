import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

const verifyJwt: RequestHandler = asyncHandler(async (req, _res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await prisma.user.findFirst({
      where: { id: (decodedToken as any).id },
    });

    if (!user) throw new ApiError(401, "Invalid access token");
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid access token");
  }
});

export { verifyJwt };

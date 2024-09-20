import cors from "cors";
import express, { Express } from "express";
import { errorHandler } from "./middlewares/error.middlewares";
import { User } from "@prisma/client";

import authRouter from "./routes/auth/v1/auth.routes";
import bookRouter from "./routes/book/v1/book.routes";
import cartRouter from "./routes/cart/v1/cart.routes";
import orderRouter from "./routes/order/v1/order.routes";

const app: Express = express();

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);

app.use(errorHandler);

export { app };

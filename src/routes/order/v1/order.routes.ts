import { Router } from "express";
import { verifyJwt } from "../../../middlewares/auth.middlewares";
import { createOrder } from "../../../services/order/v1/order.create.service";
import { listOrders } from "../../../services/order/v1/order.list.service";
import { getOrderById } from "../../../services/order/v1/order.get.service";

const orderRouter: Router = Router();

orderRouter.route("/").post(verifyJwt, createOrder);
orderRouter.route("/").get(verifyJwt, listOrders);
orderRouter.route("/:id").get(verifyJwt, getOrderById);

export default orderRouter;

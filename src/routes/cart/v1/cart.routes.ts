import { Router } from "express";
import { verifyJwt } from "../../../middlewares/auth.middlewares";
import { addCart } from "../../../services/cart/v1/cart.add.service";
import { getCart } from "../../../services/cart/v1/cart.get.service";
import { deleteCartItem } from "../../../services/cart/v1/cart.item.delete.service";

const cartRouter: Router = Router();

cartRouter.route("/").post(verifyJwt, addCart);
cartRouter.route("/").get(verifyJwt, getCart);
cartRouter.route("/:itemId").delete(verifyJwt, deleteCartItem);

export default cartRouter;

import { Router } from "express";
import { listBooks } from "../../../services/book/v1/book.list.service";
import { getBookById } from "../../../services/book/v1/book.get.service";

const bookRouter: Router = Router();

bookRouter.route("/").get(listBooks);
bookRouter.route("/:id").get(getBookById);

export default bookRouter;

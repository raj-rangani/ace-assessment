import { number, object } from "yup";
import { uuidValidator } from "../../shared";

const cartAddValidator = () => {
  return object({
    bookId: uuidValidator(),
    quantity: number().min(1).required(),
  });
};

export { cartAddValidator };

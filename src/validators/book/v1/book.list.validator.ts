import { number, object } from "yup";

const listBookValidator = () => {
  return object({
    page: number().default(1).required(),
    limit: number().default(5).required(),
  });
};

export { listBookValidator };

import { ERROR } from "../../../utils/constants";
import { emailValidation } from "../../../utils/validations";

export const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = ERROR.EMAIL.REQUIRED;
  } else if (emailValidation(values.email)) {
    errors.email = ERROR.EMAIL.FORMAT;
  }

  return errors;
};

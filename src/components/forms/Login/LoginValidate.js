import { ERROR } from "../../../utils/constants";
import {
  emailValidation,
  passwordValidation,
} from "../../../utils/validations";

export const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = ERROR.PASSWORD.REQUIRED;
  } else if (passwordValidation(values.password)) {
    errors.password = ERROR.PASSWORD.FORMAT;
  }

  if (!values.email) {
    errors.email = ERROR.EMAIL.REQUIRED;
  } else if (emailValidation(values.email)) {
    errors.email = ERROR.EMAIL.FORMAT;
  }

  return errors;
};

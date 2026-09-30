import { ERROR } from "../../utils/constants";
import { passwordValidation } from "../../utils/validations";

export const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = ERROR.PASSWORD.REQUIRED;
  } else if (passwordValidation(values.password)) {
    errors.password = ERROR.PASSWORD.FORMAT;
  }

  if (!values.repeat) {
    errors.repeat = ERROR.REPEAT_PASSWORD.REQUIRED;
  } else if (values.repeat !== values.password) {
    errors.repeat = ERROR.REPEAT_PASSWORD.MISMATCH;
  }

  return errors;
};

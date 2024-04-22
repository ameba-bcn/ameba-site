import { ERROR } from "../../../utils/constants";
import { codeValidation } from "../../../utils/validations";

export const validate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.code = ERROR.CODE.REQUIRED;
  } else if (!codeValidation(values.code)) {
    errors.code = ERROR.CODE.FORMAT;
  }
  return errors;
};

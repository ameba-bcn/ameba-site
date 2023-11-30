import { ERROR } from "../../../utils/constants";

export const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.password = ERROR.TITLE.REQUIRED;
  }

  // if (!values.bio) {
  //   errors.email = ERROR.EMAIL.REQUIRED;
  // } else if (emailValidation(values.email)) {
  //   errors.email = ERROR.EMAIL.FORMAT;
  // }

  return errors;
};

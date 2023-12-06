import { ERROR } from "../../../utils/constants";

export const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = ERROR.TITLE.REQUIRED;
  }

  return errors;
};

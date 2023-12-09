import { ERROR } from "../../../utils/constants";

export const validate = (values) => {
  const errors = {};

  if (!values.project_name) {
    errors.project_name = ERROR.TITLE.REQUIRED;
  }

  return errors;
};

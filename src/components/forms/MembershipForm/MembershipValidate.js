import { ERROR } from "../../../utils/constants";
import { phoneValidation } from "../../../utils/validations";

export const validate = (values) => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = ERROR.USERNAME.REQUIRED;
  }

  if (!values.last_name) {
    errors.last_name = ERROR.LASTNAME.REQUIRED;
  }

  if (!values.address) {
    errors.address = ERROR.ADDRESS.REQUIRED;
  }

  if (!values.phone_number) {
    errors.phone_number = ERROR.PHONE.REQUIRED;
  } else if (phoneValidation(values.phone_number)) {
    errors.phone_number = ERROR.PHONE.REQUIRED;
  }

  return errors;
};

import { ERROR } from "../../../utils/constants";
import { postalCodeValidation } from "../../../utils/validations";

export const validate = (values) => {
  const errors = {};
  if (!values.shipping_name) {
    errors.shipping_name = ERROR.GENERIC.REQUIRED;
  }
  if (!values.shipping_address) {
    errors.shipping_address = ERROR.GENERIC.REQUIRED;
  }
  if (!values.shipping_city) {
    errors.shipping_city = ERROR.GENERIC.REQUIRED;
  }
  if (!values.shipping_postal_code) {
    errors.shipping_postal_code = ERROR.POSTAL_CODE.REQUIRED;
  } else if (postalCodeValidation(values.shipping_postal_code)) {
    errors.shipping_postal_code = ERROR.POSTAL_CODE.FORMAT;
  }
  return errors;
};

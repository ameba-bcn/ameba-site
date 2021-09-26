export const validate = (values) => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = "Iep fera! Aquest camp es obligatori!";
  }
  if (!values.last_name) {
    errors.last_name = "Iep fera! Aquest camp es obligatori!";
  }

  if (!values.address) {
    errors.address = "Iep fera! Aquest camp es obligatori!";
  } 
  // else if (
  //   !/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i.test(values.address) ||
  //   !/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i.test(values.address)
  // ) {
  //   errors.address = "Adreça incorrecte";
  // }

  if (!values.phone_number) {
    errors.phone_number = "Iep fera! Aquest camp es obligatori!";
  } else if (
    !/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/i.test(values.phone_number)
  ) {
    errors.phone_number = "Format de telèfon erroni";
  }

  return errors;
};

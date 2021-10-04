export const validate = values => {
    const errors = {};
 
    if (!values.password) {
      errors.password = 'Iep fera! Aquest camp es obligatori!';
    } else if (values.password.length < 6 || values.password.length > 20) {
      errors.password = 'La contrasenya ha de tenir entre 6 i 20 lletres';
    }
   
    return errors;
  };
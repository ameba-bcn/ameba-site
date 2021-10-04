export const validate = values => {
    const errors = {};
 
    if (!values.password) {
      errors.password = 'Iep fera! Aquest camp es obligatori!';
    } else if (values.password.length < 6 || values.password.length > 20) {
      errors.password = 'La contrasenya ha de tenir entre 6 i 20 lletres';
    }
  
    if (!values.email) {
      errors.email = 'Iep fera! Aquest camp es obligatori!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Format d\'email erroni';
    }
  
    return errors;
  };
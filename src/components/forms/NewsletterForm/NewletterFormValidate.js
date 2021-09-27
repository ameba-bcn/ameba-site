export const validate = values => {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Iep fera! Aquest camp es obligatori!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Format d\'email erroni';
    }
  
    return errors;
  };
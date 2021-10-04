export const validate = values => {
    const errors = {};
 
    if (values.code.length < 3 || values.code.length > 8) {
      errors.code = 'El codi ha de tenir entre 3 i 8 lletres';
    }
    
    return errors;
  };
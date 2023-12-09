export const emailValidation = (value) => {
  if (!value) return false;
  return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
};

export const passwordValidation = (value) => {
  if (!value) return false;
  return !(value.length > 6 && value.length < 20);
};

export const usernameValidation = (value) => {
  if (!value) return false;
  return !(value.length > 1 && value.length < 20);
};

export const phoneValidation = (value) => {
  if (!value) return false;
  return !/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/i.test(value);
};

export const codeValidation = (value) => {
  if (!value) return false;
  return value.length === 6;
};

export const iframesValidation = (value) => {
  if (!value) return false;
  return ("" + value).match(
    /<iframe[^\>]+src=["'](https?:\/\/[^"']+)["'][^\>]*>.*<\/iframe>/
  );
};

export const urlValidation = (value) => {
  if (!value) return false;
  return ("" + value).match(/^(http|https):\/\/[^ "]+$/);
};

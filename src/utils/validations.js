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

export const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

export const iframesValidation = (value) => {
  if (!value) return false;
  var res = ("" + value).match(
    /<iframe[^\\>]+src=["'](https?:\/\/[^"']+)["'][^\\>]*>.*<\/iframe>/
  );
  if (res == null) return false;
  else return true;
};

export const urlValidation = (value) => {
  if (!value) return false;
  var res = ("" + value).match(
    // eslint-disable-next-line no-useless-escape
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res == null) return false;
  else return true;
};

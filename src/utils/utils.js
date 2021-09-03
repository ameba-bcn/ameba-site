export function getIDValuesFromArrayObj(ObjectArray = []) {
  let resultArray = [];
  ObjectArray.map((i) => resultArray.push(i.id));
  return resultArray;
}

export function formatPrice(price = "") {
  var fields = price.split(".");
  if (fields && fields.length > 0 && fields[1] === "00€")
    return fields[0] + "€";
  return price;
}

export function getNFirstElementsOfArray(inArray = [], numberElements) {
  let newArray = [];
  if (inArray.length > 2) {
    newArray = inArray.slice(-numberElements);
    return newArray;
  } else {
    newArray = inArray;
  }
  return newArray;
}

export function formatISODateToDate(sDate) {
  let date = new Date(sDate);
  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
}

export function formatISODateToHour(sDate) {
  let date = new Date(sDate);
  return (
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" : "") +
    date.getMinutes()
  );
}

export function deepComparision(obj1, obj2) {
  if (obj1 && obj2) return JSON.stringify(obj1) === JSON.stringify(obj2);
  return false;
}

export function isEmptyObject(obj) {
  return JSON.stringify(obj) === "{}";
}

export function isMemberCheckout(input) {
  const commonMember = input.find((x) => x.id === 26);
  const proMember = input.find((x) => x.id === 27);
  return !!commonMember || !!proMember;
}

export function isCORSInactive() {
  if (false) return "http://localhost:8000";
  return "";
}

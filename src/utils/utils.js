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
  const membershipInCart = input.find((x) => x.is_subscription === true);
  return !!membershipInCart;
}

export function mergeCartIds(arr1, arr2) {
  if (arr1.length < 1 || arr2.length < 1) return arr1.length ? arr1 : arr2;
  if (arr1.sort().join(",") === arr2.sort().join(",")) return arr1;
  else return arr1.concat(arr2);
}

// Funcion que calcula cuantas celdas vacias hay en ultima fila y permite alinear el ultimo elemento
// Requiere Styling del ancho del elemento i
export function createLastRowIterator(arr, boxWidth) {
  const rowLen = ~~(window.innerWidth / boxWidth);
  const lengthEmptyCells = rowLen - (arr.length % rowLen);
  return arr.length && rowLen !== 0
    ? Array.apply(null, Array(lengthEmptyCells))
    : [];
}

export function isCORSInactive() {
  if (true) return "http://localhost:8000";
  return "";
}

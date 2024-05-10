import React from "react";
import { toast } from "react-toastify";

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

export function formatDateToHour(datetime) {
  if (datetime !== undefined)
    return datetime
      .substring(datetime.lastIndexOf("T") + 1, datetime.lastIndexOf("Z"))
      .slice(0, -3);
  return "";
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
export function createLastRowIterator(arr, boxWidth, padding) {
  const ifPadding = padding ? parseInt(padding) : 0;
  const rowLen = ~~((window.innerWidth - ifPadding) / boxWidth);
  const lengthEmptyCells = rowLen - (arr.length % rowLen);
  return arr.length && rowLen !== 0
    ? Array.apply(null, Array(lengthEmptyCells))
    : [];
}

export const sortByDate = (array) => {
  array.sort((a, b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.datetime) - new Date(a.datetime);
  });
  return array;
};

export const sortByProperty = (array, property, asc = true) => {
  if (asc) {
    return array.sort((a, b) =>
      a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
    );
  } else {
    return array.sort((a, b) =>
      a[property] > b[property] ? -1 : b[property] > a[property] ? 1 : 0
    );
  }
};

export function deleteStringDecimals(price) {
  if (price) return `${price.split(".")[0]}€`;
  return "";
}

export const truncate = (string, length) => {
  if (string.length < length) return string;
  return string.substring(0, length).concat("...");
};

export const urlify = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text?.split(urlRegex).map((part) => {
    if (part.match(urlRegex)) {
      return (
        // eslint-disable-next-line
        <a href={part}>{part}</a>
      );
    }
    return part;
  });
};

export const priceMayDiscount = (
  price,
  discount,
  discountName,
  descompteText
) => {
  if (discount) {
    const numPrice = parseFloat(price);
    const currency = price.slice(-1);
    return (
      <>
        <span style={{ textDecoration: "line-through" }}>{price}</span>{" "}
        <span>
          {` `}
          {numPrice - numPrice * (discount / 100)}
          {` `}
          {currency}
          {discountName
            ? ` ${discountName}`
            : ` -> ${discount}% ${descompteText}`}
        </span>
      </>
    );
  }
  return price;
};

export default function notificationToast(text = "", type = "success") {
  const finalMessage = () => {
    if (text === "") {
      if (type === "error") {
        return "Oops! Something went wrong. Please try again later.";
      }
      return "Tutto bene!";
    }
    return text;
  };

  if (type === "success") {
    return toast.success(finalMessage, {
      position: "top-right",
      autoClose: 3000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      className: "notificationToast-success",
      theme: "success",
    });
  }
  if (type === "error") {
    return toast.error(finalMessage, {
      position: "top-right",
      autoClose: 3000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      className: "notificationToast-error",
      theme: "error",
    });
  }
  if (type === "warning") {
    return toast.warning(finalMessage, {
      position: "top-right",
      autoClose: 3000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      className: "notificationToast-warning",
      theme: "warning",
    });
  }
  return toast.info(finalMessage, {
    position: "top-right",
    autoClose: 3000, //3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "notificationToast-info",
    theme: "info",
  });
}

export const isDevMode = () => localStorage.getItem("dev") === "true";

export const imageListFormatter = (images = []) => {
  return images.map((image) => ({
    original: image,
  }));
};

export const tinymceTextAreaFormatter = (val) =>
  val?.replaceAll(/&nbsp;/g, "")?.replaceAll("<p></p>", "");

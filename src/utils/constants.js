/* eslint-disable no-undef */
import { safeLocalStorage } from "./safeStorage";

// Lee el idioma en el momento del acceso (no en tiempo de import) para que
// los mensajes no queden congelados al idioma con el que cargó la app.
const msg = (ca, es) =>
  safeLocalStorage.getItem("i18nextLng") === "es" ? es : ca;

export const getErrors = () => ({
  EMAIL: {
    REQUIRED: msg(
      "Email: aquest camp es obligatori",
      "Email: este campo es obligatorio",
    ),
    FORMAT: msg("Email: format erroni", "Email: formato erróneo"),
  },
  USERNAME: {
    REQUIRED: msg(
      "Nom d'usuari: camp es obligatori",
      "Nombre de usuario: campo obligatorio",
    ),
    FORMAT: msg(
      "Nom d'usuari: ha de tenir entre 1 i 20 lletres",
      "Nombre de usuario: debe tener entre 1 y 20 caracteres",
    ),
  },
  PASSWORD: {
    REQUIRED: msg(
      "Contrasenya: aquest camp es obligatori",
      "Contraseña: este campo es obligatorio",
    ),
    FORMAT: msg(
      "Contrasenya: ha de tenir entre 6 i 20 lletres",
      "Contraseña: debe tener entre 6 y 20 caracteres",
    ),
  },
  PHONE: {
    REQUIRED: msg(
      "Telèfon: aquest camp es obligatori",
      "Teléfono: este campo es obligatorio",
    ),
    FORMAT: msg("Telèfon: format erroni", "Teléfono: formato erróneo"),
  },
  FIRSTNAME: {
    REQUIRED: msg(
      "Nom: aquest camp es obligatori",
      "Nombre: este campo es obligatorio",
    ),
  },
  LASTNAME: {
    REQUIRED: msg(
      "Cognoms: aquest camp es obligatori",
      "Apellidos: este campo es obligatorio",
    ),
  },
  ADDRESS: {
    REQUIRED: msg(
      "DNI/NIE: aquest camp es obligatori",
      "DNI/NIE: este campo es obligatorio",
    ),
  },
  CODE: {
    REQUIRED: msg(
      "Descompte: aquest camp es obligatori",
      "Descuento: este campo es obligatorio",
    ),
    FORMAT: msg(
      "Descompte: format o longitud(6 lletres) erroni",
      "Descuento: formato o longitud(6 letras) erróneo",
    ),
  },
  TITLE: {
    REQUIRED: msg(
      "Títol: aquest camp es obligatori",
      "Título: este campo es obligatorio",
    ),
  },
  REPEAT_PASSWORD: {
    REQUIRED: msg(
      "Repeteix la contrasenya: aquest camp es obligatori",
      "Repite la contraseña: este campo es obligatorio",
    ),
    MISMATCH: msg(
      "Les dues contrasenyes no coincideixen",
      "Las dos contraseñas no coinciden",
    ),
  },
  GENERIC: {
    REQUIRED: msg("Aquest camp es obligatori", "Este campo es obligatorio"),
  },
});

// Compatibilidad con los consumidores existentes (ERROR.X.Y): getters
// perezosos que resuelven el idioma en cada acceso.
export const ERROR = {};
Object.keys(getErrors()).forEach((key) => {
  Object.defineProperty(ERROR, key, {
    get: () => getErrors()[key],
    enumerable: true,
  });
});

export const MOBILE_BIG = "(max-width:1519px)";

export const MOBILE_SEMI_BIG = "(max-width:1200px)";

export const MOBILE_NORMAL = "(max-width:760px)";

export const MOBILE_SMALL = "(max-width:400px)";

export const AMEBA_EMAIL = "info@ameba.cat";

export const MEMBER = "Suporter";

export const ACTIVE_STATUS = "active";

export const productKinds = ["producte", "soci", "activitat"];
export const productQueryKind = {
  producte: "articles",
  soci: "subscriptions",
  activitat: "events",
};

export const API_URL =
  import.meta.env.VITE_API_HOST ||
  `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? ":" + window.location.port : ""
  }/api/`;

export const BASE_URL = API_URL.replace("/ameba-site/", "/");

// Cloudinary
export const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "drue2stwb";

export const cloudinaryUrl = (publicId, transformations = "q_auto,f_auto") =>
  `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;

export const cloudinaryThumb = (publicId) =>
  cloudinaryUrl(publicId, "c_fill,w_400,h_400,q_auto,f_auto");

export const cloudinaryCover = (publicId) =>
  cloudinaryUrl(publicId, "c_fill,w_600,h_400,q_auto,f_auto");

export const radioDublabLink = "https://www.dublab.cat/shows/ameba";

// ⚠ La clave anterior estaba commiteada en el repo: debe rotarse en el panel
// de TinyMCE y definirse via VITE_TINYMCE_KEY.
export const TEXT_EDITOR_KEY = import.meta.env.VITE_TINYMCE_KEY || "";

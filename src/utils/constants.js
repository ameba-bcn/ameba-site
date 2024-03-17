/* eslint-disable no-undef */

export const ERROR = {
  EMAIL: {
    REQUIRED:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Email: aquest camp es obligatori"
        : "Email: este campo es obligatorio",
    FORMAT:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Email: format erroni"
        : "Email: formato erróneo",
  },
  USERNAME: {
    REQUIRED:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Nom d'usuari: camp es obligatori"
        : "Nombre de usuario: campo obligatorio",
    FORMAT:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Nom d'usuari: ha de tenir entre 1 i 20 lletres"
        : "Nombre de usuario: debe tener entre 1 y 20 caracteres",
  },
  PASSWORD: {
    REQUIRED:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Contrasenya: aquest camp es obligatori"
        : "Contraseña: este campo es obligatorio",
    FORMAT:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Contrasenya: ha de tenir entre 6 i 20 lletres"
        : "Contraseña: debe tener entre 6 y 20 caracteres",
  },
  PHONE: {
    REQUIRED:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Telèfon: aquest camp es obligatori"
        : "Teléfono: este campo es obligatorio",
    FORMAT:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Telèfon: format erroni"
        : "Teléfono: formato erróneo",
  },
  FIRSTNAME: {
    REQUIRED:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Nom: aquest camp es obligatori"
        : "Nombre: este campo es obligatorio",
  },
  LASTNAME: {
    REQUIRED:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Cognoms: aquest camp es obligatori"
        : "Apellidos: este campo es obligatorio",
  },
  ADDRESS: {
    REQUIRED:
      localStorage.getItem("i18nextLng") === "ca"
        ? "DNI/NIE: aquest camp es obligatori"
        : "DNI/NIE: este campo es obligatorio",
  },
  CODE: {
    REQUIRED:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Descompte: aquest camp es obligatori"
        : "Descuento: este campo es obligatorio",
    FORMAT:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Descompte: format o longitud(6 lletres) erroni"
        : "Descuento: formato o longitud(6 letras) erróneo",
  },
  TITLE: {
    REQUIRED:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Títol: aquest camp es obligatori"
        : "Título: este campo es obligatorio",
  },
  GENERIC: {
    REQUIRED:
      localStorage.getItem("i18nextLng") === "ca"
        ? "Aquest camp es obligatori"
        : "Este campo es obligatorio",
  },
};

export const MOBILE_BIG = "(max-width:1500px)";

export const MOBILE_SEMI_BIG = "(max-width:1200px)";

export const MOBILE_NORMAL = "(max-width:760px)";

export const MOBILE_SMALL = "(max-width:400px)";

export const AMEBA_EMAIL = "info@ameba.cat";

export const MEMBER = "Suporter";

export const productKinds = ["producte", "soci", "activitat"];
export const productQueryKind = {
  producte: "articles",
  soci: "subscriptions",
  activitat: "events",
};

export const API_URL =
  process.env.REACT_APP_API_HOST || "http://localhost:8000/api/";

export const BASE_URL = API_URL.replace("/ameba-site/", "/");

export const FLICKR_URL =
  "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos";
export const FLICKR_KEY = "d42519b6c54602915c2d98ee7e717f73";
export const FLICKR_ALBUM_ID = "72177720300073940";
export const FLICKR_SECRET = "45216314df67fd07";

export const radioDublabLink = "https://www.dublab.es/shows/ameba";
export const TEXT_EDITOR_KEY =
  "3tpoe00fct6ffh0uhj84y2twrfb2e64jy0b7o0yhvmme31o1";

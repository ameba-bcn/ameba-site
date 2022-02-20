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
        ? "Descompte: format erroni"
        : "Descuento: formato erróneo",
  },
};

export const MOBILE_BIG = "(max-width:1150px)";

export const MOBILE_NORMAL = "(max-width:760px)";

export const MOBILE_SMALL = "(max-width:400px)";

export const AMEBA_EMAIL = "info@ameba.cat";

export const MEMBER = "Suporter";

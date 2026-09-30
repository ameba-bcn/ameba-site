// Contenido estático de /legal — no hay endpoint de API para el texto de
// las políticas ni para los datos de contacto de la asociación (NIF,
// domicilio, nº de registre), misma convención que src/content/associacio.js
// y src/content/nouSoci.js: se usa tal cual el copy del diseñador (incluidos
// sus placeholders, p.ej. el NIF/domicilio de ejemplo) marcado con i18n keys
// bajo "legal", listo para sustituir por el texto real / revisado legalmente.
// El listado de documentos SÍ viene de la API real (GET /legal/).

export const POLICIES = ["compra", "privacitat", "galetes", "avis-legal"];

export const DADES = ["guardem", "accedeix", "temps", "drets"];

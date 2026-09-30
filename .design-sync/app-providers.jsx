// cfg.provider wrapper for design-sync previews. Router/i18n context must
// come from the SAME bundle as the components that consume it (Breadcrums,
// CardLayout, CardView, PromoBanner use react-router-dom directly) — the
// .storybook/preview.jsx decorators are bundled into a SEPARATE esbuild
// output (_vendor/preview-decorators.js), so their MemoryRouter creates a
// different module instance of react-router-dom's context than the one
// NavLink/useNavigate/useLocation read from inside _ds_bundle.js, and
// useContext comes back null. Exporting this from the main entry (see
// .design-sync/entry.js) puts react-router-dom in the same bundle as the
// components, so context is shared. See .design-sync/NOTES.md.
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import translations_cat from "../src/translations/cat/translation.json";
import translations_es from "../src/translations/es/translation.json";

const i18nInstance = i18next.createInstance();
i18nInstance.init({
  resources: {
    ca: { translation: translations_cat },
    es: { translation: translations_es },
  },
  lng: "ca",
  fallbackLng: "ca",
  interpolation: { escapeValue: false },
});

export default function AppProviders({ children }) {
  return (
    <I18nextProvider i18n={i18nInstance}>
      <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
    </I18nextProvider>
  );
}

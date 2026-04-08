import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

// Initialize a test i18next instance with real translations
import translations_cat from "../../translations/cat/translation.json";
import translations_es from "../../translations/es/translation.json";

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

export default function renderWithProviders(
  ui,
  { route = "/", ...renderOptions } = {},
) {
  function Wrapper({ children }) {
    return (
      <I18nextProvider i18n={i18nInstance}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </I18nextProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    i18n: i18nInstance,
  };
}

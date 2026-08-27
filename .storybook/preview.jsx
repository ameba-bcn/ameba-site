import React from "react";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import "../src/index.css";
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

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18nInstance}>
        <MemoryRouter initialEntries={["/"]}>
          <Story />
        </MemoryRouter>
      </I18nextProvider>
    ),
  ],
};

export default preview;

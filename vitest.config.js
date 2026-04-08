import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.js"],
    include: ["src/**/*.test.{js,jsx}"],
    css: true,
    coverage: {
      provider: "v8",
      include: [
        "src/components/checkout/**",
        "src/components/forms/**",
        "src/fullscreenCheckout/**",
        "src/stores/**",
        "src/store/services/**",
        "src/utils/**",
      ],
    },
  },
});

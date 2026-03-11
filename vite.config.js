import { defineConfig } from 'vite';
import { readFileSync } from 'fs';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/vite-plugin';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const appVersion = process.env.VITE_VERSION || pkg.version;

// Ensure VITE_VERSION is always available to client code via import.meta.env
process.env.VITE_VERSION = appVersion;

export default defineConfig({
  plugins: [
    react(),
    process.env.SENTRY_AUTH_TOKEN &&
      sentryVitePlugin({
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        release: {
          name: appVersion,
        },
        sourcemaps: {
          filesToDeleteAfterUpload: '**/*.map',
        },
      }),
  ].filter(Boolean),

  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: 'build',
    sourcemap: 'hidden',
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

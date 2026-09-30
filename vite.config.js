import { defineConfig } from 'vite';
import { readFileSync } from 'fs';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/vite-plugin';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const appVersion = process.env.VITE_VERSION || pkg.version;

// Ensure VITE_VERSION is always available to client code via import.meta.env
process.env.VITE_VERSION = appVersion;

// La clave de TinyMCE acaba dentro del bundle y es pública por diseño: lo que
// la protege es la lista de dominios autorizados en el panel de TinyMCE, no el
// secreto. Pero si falta, el editor de proyectos de socio sale con el aviso de
// "dominio no registrado", y eso se cuela en un despliegue sin que nadie lo
// note. Dejamos rastro en el log del build para que se vea en Actions.
function warnOnMissingBuildSecrets() {
  if (!process.env.VITE_TINYMCE_KEY) {
    console.warn(
      '\n[build] VITE_TINYMCE_KEY sin definir: el editor de texto de /compte ' +
        'saldrá sin licencia. Configura el secret TINYMCE_KEY en GitHub ' +
        '(Settings > Secrets and variables > Actions).\n'
    );
  }
}

export default defineConfig(({ command }) => {
  if (command === 'build') warnOnMissingBuildSecrets();

  return {
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
  };
});

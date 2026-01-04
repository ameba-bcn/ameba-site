# GitHub Actions Workflows

Este directorio contiene los workflows de CI/CD para Ameba Frontend.

## Workflows Disponibles

### 🐳 docker-build-push.yml

Construye y publica la imagen Docker del frontend en GitHub Container Registry.

**Cuándo se ejecuta:**
- Push a `master`, `dev`, `staging`
- Pull requests a `master`, `dev`
- Manualmente desde la pestaña Actions

**Salida:**
- Imagen: `ghcr.io/ameba-bcn/ameba-frontend`
- Tags: `latest`, `<branch>`, `<branch>-<sha>`

**Duración aproximada:** 3-5 minutos

---

### ✅ ci.yml

Ejecuta build, linting y validación del código.

**Cuándo se ejecuta:**
- Push a `master`, `dev`, `feature/**`, `fix/**`
- Pull requests a `master`, `dev`
- Manualmente desde la pestaña Actions

**Jobs:**
- **build**: Build de la aplicación en Node 16.x y 18.x
- **lint**: ESLint + npm audit

**Duración aproximada:** 2-4 minutos

---

### 🚀 deploy.yml

Despliega la aplicación a producción o staging.

**Cuándo se ejecuta:**
- Push a `master` (automático a production)
- Manualmente con selección de entorno

**Acciones:**
- Build de imagen Docker
- Push a GHCR con tags `latest` y `<sha>`
- (Opcional) Deployment SSH al servidor

**Duración aproximada:** 3-5 minutos

---

## Ejecutar Workflows Manualmente

1. Ve a la pestaña **Actions** en GitHub
2. Selecciona el workflow que quieres ejecutar
3. Haz clic en **Run workflow**
4. Selecciona la rama
5. (Para deploy.yml) Selecciona el entorno
6. Haz clic en **Run workflow**

## Badges

Puedes añadir badges a tu README.md:

### Todos los workflows

```markdown
![Docker Build](https://github.com/ameba-bcn/devops/actions/workflows/docker-build-push.yml/badge.svg)
![CI](https://github.com/ameba-bcn/devops/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/ameba-bcn/devops/actions/workflows/deploy.yml/badge.svg)
```

### Solo rama master

```markdown
![Docker Build](https://github.com/ameba-bcn/devops/actions/workflows/docker-build-push.yml/badge.svg?branch=master)
```

## Monitoreo

### Ver logs de ejecución

1. Pestaña **Actions**
2. Selecciona el workflow
3. Haz clic en la ejecución
4. Expande el job y los steps

### Notificaciones

Configura notificaciones en:
- **Settings** → **Notifications** → **Actions**

Opciones:
- Email cuando falla un workflow
- Notificaciones en tu app GitHub móvil

## Troubleshooting

### ❌ Workflow fallido: "Permission denied"

**Problema**: No hay permisos para escribir en GHCR

**Solución**:
1. Ve a **Settings** → **Actions** → **General**
2. En "Workflow permissions", selecciona **Read and write permissions**
3. Guarda los cambios
4. Re-ejecuta el workflow

### ❌ Build falla localmente pero pasa en CI

**Problema**: Diferencias en el entorno

**Solución**:
```bash
# Usa las mismas versiones que CI
nvm use 18
npm ci  # en lugar de npm install
CI=true npm run build
```

### ❌ Build lento

**Problema**: No se usa la caché

**Solución**: La caché se construye automáticamente. Espera a la segunda ejecución para ver mejoras.

### ❌ Deployment falla

**Problema**: Secrets no configurados

**Solución**: Verifica que los secrets estén configurados en Settings → Secrets and variables → Actions

## Variables de Entorno

Los workflows usan estas variables:

| Variable | Descripción | Valor |
|----------|-------------|-------|
| `REGISTRY` | Container registry | `ghcr.io` |
| `IMAGE_NAME` | Nombre de la imagen | `ameba-bcn/ameba-frontend` |
| `GITHUB_TOKEN` | Token automático | Provisto por GitHub |

## Secrets Requeridos (Opcional)

Solo si usas deployment SSH:

| Secret | Descripción | Ejemplo |
|--------|-------------|---------|
| `DEPLOY_HOST` | Servidor de deployment | `192.168.1.100` |
| `DEPLOY_USER` | Usuario SSH | `ubuntu` |
| `DEPLOY_SSH_KEY` | Clave privada SSH | `-----BEGIN RSA...` |

## Caching

Los workflows usan caché para:

- **npm dependencies**: Caché automático de `node_modules`
- **Docker layers**: GitHub Actions cache (gha)

**Beneficios:**
- Builds 2-3x más rápidos
- Menor uso de ancho de banda
- Costos reducidos

## Límites y Cuotas

**Repositorios públicos**: Ilimitado ✅

**Repositorios privados**:
- 2,000 minutos/mes (gratis)
- 500 MB de almacenamiento

**Ver uso**: Settings → Billing → Actions

## Mejores Prácticas

✅ **Usa paths** para evitar ejecuciones innecesarias
✅ **Caché de dependencias** para builds más rápidos
✅ **Matriz de versiones** para probar múltiples entornos
✅ **Fail-fast: false** para ver todos los errores
✅ **Secrets** para información sensible
✅ **Environments** para protecciones de deployment

❌ **No hardcodees** credenciales
❌ **No ejecutes workflows** en cada push si no es necesario
❌ **No uses** actions de terceros sin verificar

## Recursos Adicionales

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [GHCR Docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Awesome Actions](https://github.com/sdras/awesome-actions)

## Mantenimiento

### Actualizar actions

Las actions se actualizan automáticamente cuando usas versiones major (ej: `@v4`).

Para usar versiones específicas:
```yaml
uses: actions/checkout@v4.1.1  # versión exacta
uses: actions/checkout@v4      # última v4.x (recomendado)
```

### Renovar caché

La caché se limpia automáticamente después de 7 días sin uso.

Para forzar rebuild:
```yaml
cache-to: type=gha,mode=max,ignore-error=false
```

---

**Última actualización**: Enero 2026
**Mantenedor**: DevOps Team

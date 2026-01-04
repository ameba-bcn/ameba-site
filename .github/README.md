# GitHub Actions - Ameba Frontend

Configuración completa de CI/CD con GitHub Actions para el proyecto Ameba Barcelona Frontend.

## 📋 Resumen de la Migración

Este directorio contiene todo lo necesario para migrar de **Drone CI** a **GitHub Actions**:

- ✅ 3 workflows de CI/CD completamente funcionales
- ✅ Documentación detallada de migración
- ✅ Scripts de ayuda para deployment
- ✅ Checklist paso a paso
- ✅ Ejemplos de configuración

## 📁 Estructura de Archivos

```
.github/
├── README.md                          # Este archivo
├── MIGRATION_CHECKLIST.md             # Checklist paso a paso
├── docker-compose.example.yml         # Ejemplo de docker-compose actualizado
│
├── workflows/
│   ├── README.md                      # Documentación de workflows
│   ├── ci.yml                         # Tests y linting
│   ├── docker-build-push.yml          # Build y push de Docker
│   └── deploy.yml                     # Deployment a producción
│
└── scripts/
    └── deploy-helper.sh               # Script de ayuda para deployment
```

## 🚀 Inicio Rápido

### 1. Verificar Configuración

```bash
# Asegúrate de que tienes permisos en GitHub
# Settings → Actions → General → Workflow permissions → Read and write ✓
```

### 2. Probar Workflows

```bash
# Hacer un cambio pequeño y push
git checkout dev
echo "test" >> README.md
git add README.md
git commit -m "test: verificar GitHub Actions"
git push origin dev

# Ve a https://github.com/ameba-bcn/devops/actions
# Verifica que los workflows se ejecutan
```

### 3. Verificar Imagen en GHCR

```bash
# Después de que el workflow termine
# Ve a https://github.com/orgs/ameba-bcn/packages

# O pull la imagen localmente
docker pull ghcr.io/ameba-bcn/ameba-frontend:dev
```

### 4. Actualizar docker-compose.yml

```bash
# Reemplaza la sección build por:
# ameba-frontend:
#   image: ghcr.io/ameba-bcn/ameba-frontend:latest
#   ...
```

## 📚 Documentación

### Para Empezar

1. **[MIGRATION_CHECKLIST.md](MIGRATION_CHECKLIST.md)** - Sigue este checklist paso a paso
2. **[workflows/README.md](workflows/README.md)** - Documentación de cada workflow

### Guías Detalladas

- **[../GITHUB_ACTIONS_MIGRATION.md](../GITHUB_ACTIONS_MIGRATION.md)** - Guía completa de migración con troubleshooting

### Scripts de Ayuda

- **[scripts/deploy-helper.sh](scripts/deploy-helper.sh)** - Script para build, test y deployment local

## 🔧 Workflows Disponibles

### CI Workflow ([ci.yml](workflows/ci.yml))

**Propósito**: Build, linting y validación del código

**Se ejecuta en**:
- Push a `master`, `dev`, `feature/**`, `fix/**`
- Pull requests a `master`, `dev`

**Jobs**:
- Build de la aplicación en Node 16 y 18
- ESLint
- npm audit
- Validación del build output

### Docker Build & Push ([docker-build-push.yml](workflows/docker-build-push.yml))

**Propósito**: Construir y publicar imagen Docker en GHCR

**Se ejecuta en**:
- Push a `master`, `dev`, `staging`
- Pull requests (solo build, no push)

**Salida**:
- Imagen: `ghcr.io/ameba-bcn/ameba-frontend`
- Tags: `latest`, `<branch>`, `<branch>-<sha>`

### Deploy ([deploy.yml](workflows/deploy.yml))

**Propósito**: Deployment automático o manual

**Se ejecuta en**:
- Push a `master` (automático)
- Manual desde Actions UI

**Features**:
- Selección de entorno (production/staging)
- Build y push de imagen
- SSH deployment (opcional, comentado)

## 🛠️ Uso del Script de Ayuda

```bash
# Hacer el script ejecutable (ya está hecho)
chmod +x .github/scripts/deploy-helper.sh

# Comandos disponibles:
.github/scripts/deploy-helper.sh build          # Build local
.github/scripts/deploy-helper.sh pull latest    # Pull desde GHCR
.github/scripts/deploy-helper.sh test latest    # Test de imagen
.github/scripts/deploy-helper.sh deploy latest  # Deploy con docker-compose
.github/scripts/deploy-helper.sh login          # Login a GHCR
.github/scripts/deploy-helper.sh tags           # Listar tags
.github/scripts/deploy-helper.sh help           # Ayuda
```

## 🔐 Configuración de Secrets

### Requeridos para GHCR (Automático)

- `GITHUB_TOKEN` - Provisto automáticamente por GitHub ✅

### Opcionales para SSH Deployment

Si descomentas la sección SSH en `deploy.yml`:

| Secret | Descripción | Ejemplo |
|--------|-------------|---------|
| `DEPLOY_HOST` | IP o hostname del servidor | `192.168.1.100` |
| `DEPLOY_USER` | Usuario SSH | `ubuntu` |
| `DEPLOY_SSH_KEY` | Clave privada SSH | `-----BEGIN RSA PRIVATE KEY-----...` |

**Cómo añadirlos**:
1. Settings → Secrets and variables → Actions
2. New repository secret
3. Pega el valor completo

## 📊 Monitoreo

### Ver Ejecuciones

- **GitHub**: https://github.com/ameba-bcn/devops/actions
- **Packages**: https://github.com/orgs/ameba-bcn/packages

### Badges

Añade estos badges a tu README principal:

```markdown
![CI](https://github.com/ameba-bcn/devops/actions/workflows/ci.yml/badge.svg)
![Docker Build](https://github.com/ameba-bcn/devops/actions/workflows/docker-build-push.yml/badge.svg)
![Deploy](https://github.com/ameba-bcn/devops/actions/workflows/deploy.yml/badge.svg)
```

### Notificaciones

Configura notificaciones:
- Settings → Notifications → Actions
- Recibe emails cuando fallen workflows

## 🔄 Flujo de Trabajo Recomendado

### Desarrollo en Feature Branch

```bash
# 1. Crear feature branch
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commits
git add .
git commit -m "feat: nueva funcionalidad"

# 3. Push (dispara CI workflow)
git push origin feature/nueva-funcionalidad

# 4. Crear PR a dev
# → CI se ejecuta automáticamente
# → Docker build se ejecuta (sin push)
# → Checks aparecen en el PR

# 5. Después de review, merge a dev
# → CI se ejecuta
# → Docker build y push a ghcr.io/ameba-bcn/ameba-frontend:dev

# 6. Test en staging
# → Deployment manual o automático a staging

# 7. Merge de dev a master
# → CI se ejecuta
# → Docker build y push a ghcr.io/ameba-bcn/ameba-frontend:latest
# → Deploy automático a producción (si está configurado)
```

## 🐛 Troubleshooting

### Workflow falla: "Permission denied"

**Solución**: Settings → Actions → General → Workflow permissions → **Read and write** ✓

### Imagen no se publica en GHCR

**Solución**: Verifica que no es un PR (PRs no hacen push por diseño)

### Tests fallan en CI pero pasan localmente

**Solución**:
```bash
# Usa las mismas versiones que CI
nvm use 18
npm ci  # en lugar de npm install
CI=true npm test
```

### Build falla localmente pero pasa en CI

**Solución**:
```bash
# Usa las mismas versiones que CI
nvm use 18
npm ci  # en lugar de npm install
CI=true npm run build
```

### No puedo hacer pull de la imagen

**Solución**: Login en GHCR
```bash
docker login ghcr.io -u <usuario>
# Password: usa un Personal Access Token con read:packages
```

Más troubleshooting en [GITHUB_ACTIONS_MIGRATION.md](../GITHUB_ACTIONS_MIGRATION.md#troubleshooting)

## 📋 Checklist de Migración

Usa el checklist completo para una migración sin problemas:

```bash
# Abre y sigue:
cat .github/MIGRATION_CHECKLIST.md

# O ábrelo en tu editor favorito
code .github/MIGRATION_CHECKLIST.md
```

## 🎯 Próximos Pasos

1. [ ] Lee el [MIGRATION_CHECKLIST.md](MIGRATION_CHECKLIST.md)
2. [ ] Configura permisos en GitHub
3. [ ] Prueba los workflows con un push a `dev`
4. [ ] Verifica que la imagen se publica en GHCR
5. [ ] Actualiza `docker-compose.yml`
6. [ ] Configura deployment SSH (opcional)
7. [ ] Desactiva Drone CI (después de verificar)

## 💡 Mejores Prácticas

✅ **DO**:
- Usar `npm ci` en workflows (más rápido y determinístico)
- Configurar caché de dependencias
- Usar matrices para probar múltiples versiones
- Proteger la rama `master` con required checks
- Usar environments para deployment crítico
- Monitorear uso de minutos de Actions

❌ **DON'T**:
- Hardcodear secrets en workflows
- Ejecutar workflows innecesariamente (usa `paths:`)
- Hacer push de imágenes en PRs
- Ignorar fallos de tests
- Usar `npm install` en CI (usa `npm ci`)

## 🔗 Links Útiles

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GHCR Docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Actions Marketplace](https://github.com/marketplace?type=actions)

## 🤝 Soporte

**¿Problemas con la migración?**

1. Revisa el [Troubleshooting](../GITHUB_ACTIONS_MIGRATION.md#troubleshooting)
2. Consulta los logs en Actions
3. Verifica la [documentación de workflows](workflows/README.md)
4. Abre un issue en el repositorio
5. Contacta al equipo de DevOps

## 📝 Changelog

- **2026-01-04**: Migración inicial de Drone CI a GitHub Actions
  - Creados 3 workflows (CI, Build, Deploy)
  - Documentación completa
  - Scripts de ayuda

---

**Mantenido por**: DevOps Team
**Última actualización**: 2026-01-04
**Versión**: 1.0.0

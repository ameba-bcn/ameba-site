# Checklist de Migración: Drone CI → GitHub Actions

Usa este checklist para asegurar una migración completa y exitosa.

## Pre-Migración

- [ ] Backup de la configuración actual de Drone CI
- [ ] Documentar el flujo actual de deployment
- [ ] Identificar todos los secrets y variables de entorno necesarios
- [ ] Verificar permisos de la organización en GitHub

## Configuración de GitHub

### Permisos del Repositorio

- [ ] Activar "Read and write permissions" para workflows
  - **Settings** → **Actions** → **General** → **Workflow permissions**
  - Seleccionar: ✅ Read and write permissions
  - Seleccionar: ✅ Allow GitHub Actions to create and approve pull requests

### GitHub Container Registry (GHCR)

- [ ] Verificar que GHCR está disponible para la organización
- [ ] Decidir si el paquete será público o privado
- [ ] Si es privado: preparar PATs para los servidores de deployment

### Secrets (Solo si usas deployment SSH)

- [ ] Crear/obtener clave SSH para deployment
- [ ] Añadir secrets en GitHub:
  - [ ] `DEPLOY_HOST` - IP/hostname del servidor
  - [ ] `DEPLOY_USER` - Usuario SSH
  - [ ] `DEPLOY_SSH_KEY` - Clave privada SSH completa

### Environments (Opcional pero recomendado)

- [ ] Crear environment "production" en GitHub
  - **Settings** → **Environments** → **New environment**
  - Nombre: `production`
- [ ] Configurar protection rules:
  - [ ] ✅ Required reviewers (al menos 1)
  - [ ] ✅ Wait timer (opcional, ej: 5 minutos)
- [ ] Repetir para "staging" si es necesario

## Workflows

### Verificar Archivos Creados

- [ ] `.github/workflows/docker-build-push.yml` existe
- [ ] `.github/workflows/ci.yml` existe
- [ ] `.github/workflows/deploy.yml` existe
- [ ] `.github/workflows/README.md` existe (documentación)

### Revisar Configuración de Workflows

- [ ] Verificar nombres de ramas en triggers (master, dev, staging)
- [ ] Verificar paths para evitar ejecuciones innecesarias
- [ ] Verificar nombre de la imagen: `ghcr.io/ameba-bcn/ameba-frontend`
- [ ] Actualizar matriz de versiones de Node si es necesario
- [ ] Revisar comandos de build y test

### Personalizar (Si es necesario)

- [ ] Ajustar estrategia de tags en `docker-build-push.yml`
- [ ] Modificar jobs de CI según necesidades
- [ ] Descomentar y configurar SSH deployment en `deploy.yml`
- [ ] Añadir notificaciones (Slack, Discord, etc.)

## Testing de Workflows

### Test 1: CI Workflow

- [ ] Push a rama `dev` con un cambio pequeño
- [ ] Verificar que el workflow `ci.yml` se ejecuta
- [ ] Verificar que los tests pasan
- [ ] Verificar que el linting funciona
- [ ] Revisar los logs en la pestaña Actions

### Test 2: Docker Build Workflow

- [ ] Push a rama `dev`
- [ ] Verificar que `docker-build-push.yml` se ejecuta
- [ ] Verificar que la imagen se construye correctamente
- [ ] Verificar que la imagen se publica en GHCR
- [ ] Ir a **Packages** y verificar que `ameba-frontend` aparece
- [ ] Verificar los tags: `dev`, `dev-<sha>`

### Test 3: Pull Request

- [ ] Crear un PR de `dev` a `master`
- [ ] Verificar que CI se ejecuta automáticamente
- [ ] Verificar que aparecen checks en el PR
- [ ] Verificar que el build NO hace push (solo en PRs)

### Test 4: Deployment Manual

- [ ] Ir a **Actions** → **Deploy to Production**
- [ ] Click en **Run workflow**
- [ ] Seleccionar rama `master`
- [ ] Seleccionar environment `staging` (para testing)
- [ ] Verificar que se ejecuta correctamente
- [ ] Verificar que la imagen se publica con tags `latest` y `<sha>`

## Actualización de Infraestructura

### Docker Compose

- [ ] Hacer backup de `docker-compose.yml` actual
- [ ] Actualizar servicio `ameba-frontend` para usar imagen de GHCR:
  ```yaml
  ameba-frontend:
    image: ghcr.io/ameba-bcn/ameba-frontend:latest
    # ... resto de la configuración
  ```
- [ ] Comentar o eliminar la sección `build:` del servicio
- [ ] Si el paquete es privado: configurar autenticación en el servidor

### Servidor de Deployment

- [ ] Verificar que Docker está instalado
- [ ] Verificar que Docker Compose está instalado
- [ ] Si GHCR es privado: hacer login en el servidor:
  ```bash
  echo $GHCR_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
  ```
- [ ] Probar pull manual de la imagen:
  ```bash
  docker pull ghcr.io/ameba-bcn/ameba-frontend:latest
  ```
- [ ] Verificar que la clave SSH está configurada correctamente
- [ ] Añadir la clave pública a `~/.ssh/authorized_keys`

### Test de Deployment

- [ ] Pull manual de la imagen en el servidor
- [ ] Test del script helper:
  ```bash
  .github/scripts/deploy-helper.sh test latest
  ```
- [ ] Deployment manual con docker-compose:
  ```bash
  docker-compose pull ameba-frontend
  docker-compose up -d ameba-frontend
  ```
- [ ] Verificar que el sitio carga correctamente
- [ ] Verificar logs: `docker-compose logs -f ameba-frontend`
- [ ] Verificar que no hay errores 404 o 500

## Deployment SSH Automático (Opcional)

Si configuraste deployment SSH:

- [ ] Descomentar sección SSH en `deploy.yml`
- [ ] Actualizar path del proyecto en el script SSH
- [ ] Test de conexión SSH desde GitHub Actions
- [ ] Verificar que el deployment automático funciona
- [ ] Verificar rollback en caso de fallo

## Monitoreo y Badges

- [ ] Añadir badges de GitHub Actions al README:
  ```markdown
  ![CI](https://github.com/ameba-bcn/devops/actions/workflows/ci.yml/badge.svg)
  ![Docker Build](https://github.com/ameba-bcn/devops/actions/workflows/docker-build-push.yml/badge.svg)
  ```
- [ ] Configurar notificaciones de Actions en GitHub
- [ ] Configurar webhooks si es necesario (Slack, Discord, etc.)

## Documentación

- [ ] Leer `GITHUB_ACTIONS_MIGRATION.md` completo
- [ ] Leer `.github/workflows/README.md`
- [ ] Actualizar documentación interna del equipo
- [ ] Comunicar cambios al equipo
- [ ] Documentar nuevo proceso de deployment

## Desactivación de Drone CI

⚠️ **Solo después de verificar que GitHub Actions funciona perfectamente**

- [ ] Verificar que todos los workflows funcionan
- [ ] Verificar que el deployment automático funciona
- [ ] Al menos 1 semana de uso sin problemas
- [ ] Hacer backup final de configuración Drone
- [ ] Desactivar webhooks de Drone en GitHub
- [ ] Eliminar `.drone.yml`:
  ```bash
  git rm .drone.yml
  git commit -m "chore: remove Drone CI configuration"
  git push
  ```
- [ ] Opcional: Desactivar/eliminar servidor Drone

## Post-Migración

- [ ] Monitorear workflows durante 1 semana
- [ ] Verificar uso de minutos de Actions (Settings → Billing)
- [ ] Optimizar workflows si es necesario (caché, paths, etc.)
- [ ] Entrenar al equipo en el nuevo flujo
- [ ] Documentar lecciones aprendidas
- [ ] Celebrar 🎉

## Rollback Plan (En caso de emergencia)

Si algo sale mal:

- [ ] Reactivar Drone CI
- [ ] Restaurar `.drone.yml`:
  ```bash
  git revert <commit-hash-que-eliminó-drone>
  ```
- [ ] Renombrar `.github/workflows` a `.github/workflows.disabled`
- [ ] Investigar el problema
- [ ] Documentar qué falló

## Contactos de Soporte

- **GitHub Actions**: [GitHub Support](https://support.github.com/)
- **GitHub Container Registry**: [Docs GHCR](https://docs.github.com/en/packages)
- **Comunidad**: [GitHub Community](https://github.community/)

## Notas Adicionales

Usa este espacio para notas específicas de tu proyecto:

```
[Añade aquí notas específicas del proyecto, URLs internas, contactos del equipo, etc.]
```

---

**Fecha de inicio**: _____________
**Fecha de completitud**: _____________
**Responsable**: _____________
**Revisado por**: _____________

---

## Progreso General

- [ ] Pre-Migración (0%)
- [ ] Configuración de GitHub (0%)
- [ ] Workflows (0%)
- [ ] Testing de Workflows (0%)
- [ ] Actualización de Infraestructura (0%)
- [ ] Monitoreo y Badges (0%)
- [ ] Documentación (0%)
- [ ] Desactivación de Drone CI (0%)
- [ ] Post-Migración (0%)

**Progreso Total**: 0% ━━━━━━━━━━━━━━━━━━━━ 0/9

Actualiza este progreso conforme avances en la migración.

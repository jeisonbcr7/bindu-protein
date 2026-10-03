# Configuración de entrega

## 1. Entorno protegido

En **Settings → Environments**, crear `production`. En **Deployment branches and tags**, seleccionar ramas específicas y permitir únicamente `main`.

## 2. Credenciales de Cloudflare

Crear un token personalizado con **Account → Cloudflare Pages → Edit**, limitado a la cuenta que contiene el proyecto actual. No conceder permisos de DNS ni utilizar la clave global.

Guardar estos cuatro valores en **Environment secrets** dentro de `production`:

| Nombre | Valor privado |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Token de Pages |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID; no es el Zone ID |
| `CLOUDFLARE_PROJECT_NAME` | Nombre exacto del proyecto Pages existente |
| `CLOUDFLARE_EXPECTED_HOSTNAME` | Host del proyecto terminado en `pages.dev`, sin protocolo ni barra final |

Los valores no deben incluirse en archivos, documentación, issues ni mensajes. El flujo comprueba que el proyecto y su hostname coincidan antes de publicar; consulta la rama de producción actual de Pages para preservar el destino existente.

## 3. Activación

Después de guardar los secretos, abrir **Settings → Secrets and variables → Actions → Variables** y crear la variable de repositorio `DEPLOYMENT_ENABLED` con valor `true`.

En **Actions → Quality and delivery**, ejecutar **Run workflow** sobre `main`. Confirmar **Validate** y **Publish production** en verde y comprobar la versión desde el panel privado de Cloudflare. Hasta la activación, CI valida y omite el despliegue.

## 4. Protección de producción

En **Settings → Branches**, proteger `main`: requerir pull request, el check **Validate** y resolución de conversaciones. Mantener deshabilitados force pushes y eliminación de la rama; aplicar las reglas también a administradores.

Para un único mantenedor, la revisión manual del pull request puede realizarse sin exigir una aprobación de otra cuenta. El check de política exige que los pull requests a producción provengan de `develop` dentro de este repositorio.

## 5. Operación

Trabajar en `develop`, validar y revisar; abrir un pull request `develop → main`. Al integrarlo, la entrega se ejecuta automáticamente. `develop` no publica en producción.

Para recuperar una versión, revertir el cambio mediante el mismo flujo y confirmar el nuevo despliegue. Ante un fallo, consultar el estado en Cloudflare; los registros públicos de CI omiten intencionadamente los detalles privados del proveedor.

## Referencias

- https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/
- https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches

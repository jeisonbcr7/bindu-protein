# Seguridad

## Reportes

No publicar credenciales ni detalles explotables en un issue. Utilizar la opción de reporte privado de GitHub si está habilitada; en caso contrario, contactar al administrador por un canal privado antes de compartir información sensible.

## Configuración

- Los secretos de infraestructura pertenecen exclusivamente al entorno `production`.
- Solo `main` puede acceder a ese entorno. Pull requests y `develop` validan sin credenciales.
- El token de entrega debe limitarse a Cloudflare Pages y a la cuenta correspondiente.
- La herramienta de despliegue verifica el destino antes de publicar y omite los detalles de infraestructura de sus registros públicos.
- Las dependencias de entrega se fijan mediante un archivo de bloqueo; no se utilizan dependencias de interfaz en tiempo de ejecución.
- El archivo `.gitignore` excluye credenciales locales, registros y artefactos de desarrollo. Esta exclusión no sustituye la revisión del contenido antes de un commit.

La web incluye contactos y ubicación comercial aprobados para publicación. Ningún dato privado de clientes debe almacenarse en este repositorio.

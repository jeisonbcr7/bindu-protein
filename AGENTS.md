# Guía de mantenimiento

- Este repositorio es la fuente del sitio y de sus despliegues. Trabajar en `develop`; promover cambios mediante pull request a `main`.
- `main` representa producción. No hacer cambios directos ni usar otros canales de publicación para este proyecto.
- Editar el sitio en `dist/`. Conservar español de Costa Rica, adaptación móvil, navegación accesible y datos de menú confirmados.
- Mantener los contactos comerciales ya aprobados en el sitio. No repetir datos de contacto en documentación técnica.
- No introducir precios, nombres de proveedores ni atribuciones personales no solicitadas.
- Preservar fotografías reales y distinguir los recursos ilustrativos.
- Ejecutar `npm run validate` y `npm run check:release`. Verificar el resultado de GitHub Actions antes de informar que un cambio fue publicado.
- No leer, modificar, imprimir ni incluir secretos en commits. No incorporar dominios de infraestructura, identificadores de cuenta ni metadatos internos del entorno de desarrollo.
- Mantener las credenciales exclusivamente en el entorno de GitHub `production`, restringido a `main`.

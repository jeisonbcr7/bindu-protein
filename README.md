# Bindú Protein

**Healthy life collection · Bienestar como estilo de vida.**

Experiencia digital de Bindú Protein: una propuesta visual que reúne nutrición, estilo de vida y una atención cercana. El sitio combina una identidad editorial, transiciones cuidadas y un catálogo interactivo adaptable a móvil y escritorio.

## Experiencia

- Catálogo de batidos, refreshers, bowls y waffles con variantes e información nutricional.
- Fotografías reales e imágenes ilustrativas identificadas en la experiencia.
- Información sobre la base nutricional de los productos.
- Consultas sobre productos y distribución mediante contacto directo.
- Horarios, ubicación y canales comerciales.

## Tecnología

HTML, CSS y JavaScript sin framework de interfaz. Los recursos visuales se incluyen en el proyecto y utilizan WebP. GitHub Actions valida cada cambio y entrega únicamente la versión de producción.

## Trabajo y publicación

| Rama | Propósito | Publicación |
| --- | --- | --- |
| `develop` | Implementación y revisión de cambios | Sin despliegue a producción |
| `main` | Versión aprobada y estable | Despliegue automático al activar la integración |

El flujo de entrega es **cambio → develop → validación → pull request → main → producción**. La configuración de infraestructura se conserva fuera del código, en el entorno `production` de GitHub.

## Desarrollo local

Requiere Node.js 24 y Python 3 para la vista previa opcional.

```sh
npm run validate
python3 -m http.server 8080 --directory dist
```

Abrir `http://localhost:8080`. La validación no requiere instalar dependencias. Las herramientas de despliegue están fijadas en `package-lock.json` y se instalan en CI.

## Estructura

```text
dist/        Sitio y recursos visuales
scripts/     Validación, política de ramas y publicación
docs/        Guía operativa
.github/     Automatización y revisión
```

Ver [contribución](CONTRIBUTING.md), [seguridad](SECURITY.md) y [configuración de entrega](docs/DEPLOYMENT.md).

## Uso del contenido

La disponibilidad pública del repositorio permite consultar el proyecto. No concede permiso para reutilizar la identidad de marca, fotografías, catálogo o contenido comercial. Ver [derechos de uso](NOTICE.md).

# Changelog

## 0.2.0-dev - en desarrollo

### Incorporado

- Inventario de 43 fuentes jurídicas lógicas procedentes de 49 PDF, con enlaces oficiales, paginación y huellas SHA-256.
- Texto de los 49 artículos y las 5 disposiciones finales del Convenio de Hostelería de Santa Cruz de Tenerife 2025-2028.
- Enlaces directos a la publicación principal y a sus correcciones y acuerdos relacionados.

### Pendiente de revisión

- Contraste visual íntegro del texto segmentado antes de cambiar el corpus a `verified`.
- Estructuración de las tablas salariales publicadas el 9 de enero de 2026.
- Estructuración de los acuerdos de Comisión Paritaria publicados en 2026.
- Incorporación del convenio histórico y sus acuerdos para hechos anteriores al 1 de julio de 2025.

## 0.1.0 — 2026-09-03

Primera versión funcional del repertorio federado.

### Incluye

- Catálogo central `registry.json`.
- Esquema común para corpus jurídicos.
- Separación obligatoria entre texto legal, lenguaje claro y notas editoriales.
- Identificadores estables para artículos y unidades jurídicas.
- Relaciones internas y externas entre normas.
- Primer corpus: Convenio Colectivo del Sector de Hostelería de Santa Cruz de Tenerife 2025-2028, todavía en estado `draft` mientras se completa y contrasta el articulado.
- Estatuto de los Trabajadores registrado como corpus planificado.
- Visor web genérico con búsqueda en texto legal, lenguaje claro y temas.
- Enlaces profundos mediante identificadores de unidad.
- Validador estructural ejecutable con `npm run check`.
- GitHub Actions para validar cambios y Pull Requests.
- Plantillas para nuevas aportaciones y guía de contribución.

### No incluido todavía

- Corpus completo del convenio 2025-2028.
- Corpus interno del Estatuto de los Trabajadores.
- Generación automática de Pull Requests desde webs consumidoras.
- Marcado y compartición de fragmentos seleccionados.
- Comparación entre versiones de una norma.

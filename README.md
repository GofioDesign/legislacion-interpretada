# Legislación Interpretada

**Versión actual: 0.1.0**

Repositorio común y reutilizable para publicar normativa con **texto legal**, **explicación en lenguaje claro**, **relaciones entre normas** y **enlaces estables** a artículos, apartados y letras.

Está pensado para ser consumido por webs sindicales, ambientales, turísticas, vecinales o de cualquier otro ámbito que necesite explicar legislación sin mezclar la norma con su interpretación.

## Qué funciona en 0.1

- catálogo común de corpus en `registry.json`;
- estructura JSON compartida;
- texto legal, lenguaje claro y notas editoriales separados;
- relaciones entre artículos y fuentes externas;
- visor web genérico en `src/`;
- búsqueda por texto legal, explicación y temas;
- enlaces estables a unidades jurídicas mediante hash;
- validación automática con `npm run check` y GitHub Actions;
- contribución mediante issues y Pull Requests.

El corpus del Convenio de Hostelería de Santa Cruz de Tenerife está todavía en `draft`: la infraestructura es funcional, pero el articulado completo debe terminar de segmentarse y contrastarse antes de declararlo verificado.

## Principios

1. El texto legal y la interpretación se almacenan y muestran por separado.
2. Toda norma conserva fuente, versión, territorio y vigencia.
3. Las unidades jurídicas tienen identificadores estables.
4. Las relaciones pueden conectar artículos de la misma norma o de normas distintas.
5. Las aportaciones al repertorio común se revisan antes de distribuirse.
6. Las notas locales de una web consumidora no pasan automáticamente al repertorio común.
7. Nunca se corrige silenciosamente el texto publicado: las anomalías se documentan como notas editoriales.

## Dominios

El motor no está limitado al derecho laboral. El catálogo puede contener `laboral`, `turismo`, `alojamientos`, `espacios-naturales`, `medioambiente`, `urbanismo`, `administracion-publica` y otros dominios.

## Estructura

```text
├─ VERSION
├─ registry.json
├─ schema/
│  └─ corpus.schema.json
├─ corpora/
├─ src/
│  ├─ legislation.js
│  └─ legislation.css
├─ demo/
│  └─ index.html
├─ scripts/
│  └─ validate.mjs
├─ docs/
│  ├─ CONTRIBUTING.md
│  ├─ INTEGRATION.md
│  └─ REPOSITORY_SETTINGS.md
└─ .github/
   ├─ workflows/validate.yml
   ├─ PULL_REQUEST_TEMPLATE.md
   └─ ISSUE_TEMPLATE/
```

## Unidad jurídica

```json
{
  "id": "articulo-28-1-2",
  "legal": "Texto literal de la norma.",
  "plain": "Explicación en palabras sencillas.",
  "editorialNote": null,
  "topics": ["permisos", "cuidados"],
  "related": ["estatuto-trabajadores:37.3"]
}
```

## Probar el visor

Con Node 20 o superior:

```bash
npm run check
npm run serve
```

Después abre `/demo/` en el servidor local.

## Integración

Una web consumidora puede usar solo los JSON o montar el visor incluido. Consulta [INTEGRATION.md](docs/INTEGRATION.md).

Las contribuciones de nuevos convenios o normas deben seguir [CONTRIBUTING.md](docs/CONTRIBUTING.md). Los cambios de versión se documentan en [CHANGELOG.md](CHANGELOG.md).

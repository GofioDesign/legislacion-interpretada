# Legislación Interpretada

Repositorio común y reutilizable para publicar normativa con **texto legal**, **explicación en lenguaje claro**, **relaciones entre normas** y **enlaces estables** a artículos, apartados y letras.

Está pensado para ser consumido por webs sindicales, ambientales, turísticas, vecinales o de cualquier otro ámbito que necesite explicar legislación sin mezclar la norma con su interpretación.

## Principios

1. El texto legal y la interpretación se almacenan y muestran por separado.
2. Toda norma conserva fuente, versión, territorio y vigencia.
3. Las unidades jurídicas tienen identificadores estables.
4. Las relaciones pueden conectar artículos de la misma norma o de normas distintas.
5. Las aportaciones al repertorio común se revisan antes de distribuirse.
6. Las notas locales de una web consumidora no pasan automáticamente al repertorio común.
7. Nunca se corrige silenciosamente el texto publicado: las anomalías se documentan como notas editoriales.

## Dominios

El motor no está limitado al derecho laboral. El catálogo puede contener, entre otros:

- `laboral`
- `turismo`
- `alojamientos`
- `espacios-naturales`
- `medioambiente`
- `urbanismo`
- `administracion-publica`

## Estructura

```text
├─ registry.json
├─ schema/
│  └─ corpus.schema.json
├─ corpora/
│  ├─ laboral/
│  ├─ turismo/
│  ├─ alojamientos/
│  └─ espacios-naturales/
├─ docs/
│  └─ CONTRIBUTING.md
└─ .github/
   ├─ PULL_REQUEST_TEMPLATE.md
   └─ ISSUE_TEMPLATE/
```

## Estados de revisión

- `draft`: aportado, pendiente de contraste completo.
- `verified`: texto contrastado con la fuente indicada.
- `reviewed`: estructura, metadatos y referencias revisadas.
- `interpreted`: incorpora lenguaje claro revisado.

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

## Primera colección

El corpus inicial será laboral:

- Convenio Colectivo del Sector de Hostelería de Santa Cruz de Tenerife 2025-2028.
- Estatuto de los Trabajadores.
- Posteriormente: LOLS, LPRL y demás normativa relacionada.

## Integración

Una web consumidora podrá declarar los corpus que necesita y construir su propia interfaz sobre ellos. El objetivo es que una norma se mantenga una sola vez y pueda ser reutilizada por muchas instancias.

Las contribuciones de nuevos convenios o normas deben seguir [CONTRIBUTING.md](docs/CONTRIBUTING.md).

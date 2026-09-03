# Configuración recomendada del repositorio

Ajustes recomendados para `GofioDesign/legislacion-interpretada` en GitHub.

## General

- Visibilidad: pública.
- Rama por defecto: `main`.
- Issues: activadas.
- Pull Requests: activadas.
- Wikis: opcional; no necesarias mientras la documentación viva en `/docs`.

## Pull Requests

Recomendado:

- Permitir **Squash merging**.
- Desactivar merge commits si se quiere un historial más limpio.
- Permitir rebase solo si el equipo lo necesita.
- Activar **Automatically delete head branches**.
- Activar **Allow auto-merge** cuando exista validación automática.
- Activar **Always suggest updating pull request branches**.

## Protección de `main`

Cuando haya CI de validación de corpus:

- Requerir Pull Request antes de merge.
- Requerir al menos una revisión para cambios en corpus verificados.
- Requerir que pasen los checks de esquema y referencias.
- Impedir force-push y borrado de `main`.

Durante la fase inicial puede mantenerse escritura directa para acelerar la carga del corpus semilla.

## Descripción sugerida

> Repertorio federado de legislación con texto legal, lenguaje claro, relaciones entre normas y fuentes verificables.

## Topics sugeridos

`legislation`, `legal-data`, `open-data`, `plain-language`, `labor-law`, `canary-islands`, `collective-agreements`

## GitHub Pages

No es necesario activar Pages para que otras webs consuman el repositorio. Puede activarse más adelante si se publica una API JSON estática o una documentación navegable del catálogo.

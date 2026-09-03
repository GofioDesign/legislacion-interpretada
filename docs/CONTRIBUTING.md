# Contribuir a Legislación Interpretada

Este repositorio funciona como repertorio común. Una web o comité puede mantener contenido local y proponer al repertorio central únicamente aquello que deba ser reutilizable por otras instancias.

## Qué se puede aportar

- nuevas normas;
- nuevos convenios colectivos;
- correcciones de transcripción;
- nuevas versiones o modificaciones publicadas;
- relaciones entre artículos y normas;
- lenguaje claro;
- notas editoriales que documenten errores, contradicciones o remisiones dudosas del texto publicado.

## Qué no debe subirse como contenido común

- notas internas de una empresa o centro de trabajo;
- datos personales;
- interpretaciones no diferenciadas del texto legal;
- cambios del literal sin fuente que los respalde;
- contenido local que solo sea válido para una instancia concreta.

## Flujo recomendado

1. Crear o actualizar el corpus en una rama propia.
2. Indicar la fuente oficial o de referencia y la versión consultada.
3. Mantener `legal`, `plain` y `editorialNote` separados.
4. Usar identificadores estables para artículos y unidades jurídicas.
5. Actualizar `registry.json` si se añade un corpus nuevo.
6. Abrir un Pull Request explicando qué se incorpora y cómo se verificó.
7. No marcar un corpus como `verified` hasta haber contrastado íntegramente el texto incorporado.

## Convención de identificadores

Ejemplos:

- `articulo-28`
- `articulo-28-1`
- `articulo-28-1-2`
- `articulo-15-3-a`

Las relaciones entre corpus usan la forma:

```text
estatuto-trabajadores:37.3
convenio-hosteleria-santa-cruz-tenerife-2025-2028:28.1.2
```

## Estados

- `draft`: incompleto o pendiente de contraste.
- `verified`: texto y fuente contrastados.
- `reviewed`: estructura y relaciones revisadas.
- `interpreted`: además incorpora lenguaje claro revisado.

## Regla fundamental

Nunca se sustituye una frase del texto publicado porque parezca errónea. El literal se conserva y cualquier advertencia se añade en `editorialNote` con su fuente cuando sea posible.

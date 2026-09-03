# Integración

La versión 0.1 puede consumirse como datos JSON o usando el visor incluido.

## Opción A. Consumir solo los datos

1. Cargar `registry.json`.
2. Seleccionar un corpus con `path`.
3. Cargar `metadata.json` y `articulado.json` desde ese directorio.
4. Construir la interfaz propia de la web consumidora.

Esto permite que una web sindical, ambiental o turística use su propio diseño sin duplicar la norma.

## Opción B. Usar el visor genérico

Incluye la hoja de estilos y el módulo JavaScript:

```html
<link rel="stylesheet" href="RUTA/src/legislation.css">
<div id="legislacion"></div>
<script type="module">
  import { mountLegislation } from 'RUTA/src/legislation.js';
  mountLegislation(document.querySelector('#legislacion'), {
    baseUrl: 'RUTA/',
    corpusId: 'convenio-hosteleria-santa-cruz-tenerife-2025-2028'
  });
</script>
```

`baseUrl` debe apuntar a la raíz donde se encuentren `registry.json`, `corpora/` y `src/`.

## Enlaces estables

Cada unidad jurídica tiene un `id` estable. El visor acepta hashes como:

```text
#articulo-3-2
```

Esto permite enlazar y, en versiones posteriores, compartir o marcar unidades concretas sin depender de números de página.

## Capas locales

Una web consumidora puede añadir información propia sin modificar el corpus central. Por ejemplo:

```json
{
  "corpus": "convenio-hosteleria-santa-cruz-tenerife-2025-2028",
  "target": "articulo-28-1-2",
  "localNote": "Información específica del centro de trabajo."
}
```

Las capas locales no deben confundirse con el texto legal ni incorporarse automáticamente al repertorio común.

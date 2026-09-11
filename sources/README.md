# Fuentes documentales

`inventory.json` registra las fuentes del paquete documental de partida sin incorporar los PDF al repositorio.

Cada fuente conserva:

- título e identificador oficial;
- publicación y enlace oficial cuando están disponibles;
- sección temática del paquete recibido;
- nombre de cada PDF, número de páginas y huella SHA-256;
- estado previsto del corpus.

Los boletines completos y sus recortes se agrupan como una sola fuente lógica. Los archivos idénticos que aparecían en más de una sección también se registran una sola vez. Una entrada `planned` o `draft` no significa que el texto haya sido transcrito o verificado.

Los PDF son material de trabajo y no sustituyen la comprobación de vigencia en BOE, BOC o BOP. El texto consolidado del BOE tiene carácter informativo.

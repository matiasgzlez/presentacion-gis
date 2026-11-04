# Video UPS ORION · "lado a lado" (20,5 s, mudo)

Composición hecha con la skill **onetake**: un HTML cuyo estado es función del tiempo (`comp.html`), exportado cuadro por cuadro.

- `comp.html` — la composición (`?play` para verla en vivo en el navegador, `?t=12.9&hud` para fijar un instante).
- `look.json` → `look.js` — paleta de la presentación + Geist incrustada.
- `motion.js` — librería de movimientos de onetake.
- `draft.mp4` — export 1080p30 con motion blur. Copiado a `public/videos/ups-orion.mp4`.

Rutas: 16 paradas en una grilla. "A ojo" = el chofer va siempre a la parada más cercana; "ORION" = el mismo recorrido mejorado con 2-opt (−23%). Escala de km ilustrativa.
El dato final (1 milla menos por chofer por día = US$ 50 M al año) es el que informa UPS.

Re-exportar (desde esta carpeta, con las dependencias de onetake):

```bash
python3 ~/.claude/skills/onetake/scripts/look.py apply look.json comp.html
python3 ~/.claude/skills/onetake/scripts/render.py comp.html --out draft.mp4            # 1080p30
python3 ~/.claude/skills/onetake/scripts/render.py comp.html --out final.mp4 --final    # 4K60
```

# Levende Leergang

Een levenslange leerweg in filosofie, intelligentie en mentaliseren, lichaamstaal,
cognitief gedrag en geloof in God, van MBO+ tot master.

- **De kaart**: https://claude.ai/artifact/71Anb4AmDFRoH1g5E6Zqqu (bron: `leergang.html`).
  Een bewegende sterrenkaart: in het midden jij, vier ringen voor de niveaus, vijf sectoren
  voor de domeinen. Elke les is een ster; afgeronde lessen lichten op en vormen je spoor.
- **De motor**: de skill `.claude/skills/levende-leergang/SKILL.md`. Typ `/levende-leergang`
  in een Claude Code-sessie op deze repo. Claude leest dan je voortgang, schrijft nieuwe lessen
  en herschrijft zijn eigen werkregels op basis van wat je data laten zien.

## Zo loopt een ronde

1. Je leest lessen op de kaart, beantwoordt de vragen en beoordeelt de les.
2. Je start een groeironde met `/levende-leergang`.
3. Claude past je profiel aan, verbetert zwakke lessen, schrijft twee tot vier nieuwe,
   stelt zijn werkregels bij en legt alles vast in het groeilog op de kaart.

## Bestanden

- `lessen/*.json`: elke les (bron van waarheid, gespiegeld naar de database van het artifact)
- `meta/profiel.json`: wat Claude over jouw leren weet
- `meta/verbeterlog.json`: elke generatie: wat er gezien, veranderd en getoetst is
- `tools/check.mjs`: controleert alles voordat het naar de kaart gaat

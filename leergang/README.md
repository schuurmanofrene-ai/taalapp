# Levende Leergang

Een levenslange leerweg in filosofie, intelligentie en mentaliseren, lichaamstaal,
cognitief gedrag en geloof in God, van MBO+ tot master.

- **Waar je leert**: Levend Brein (https://claude.ai/artifact/WzqhKEpuvPAnxCVwpomTjd).
  `leergang.html` is de oorspronkelijke bron van dat tabblad; een aparte kaart is er niet meer.
  Een bewegende sterrenkaart: in het midden jij, vier ringen voor de niveaus, vijf sectoren
  voor de domeinen. Elke les is een ster; afgeronde lessen lichten op en vormen je spoor.
- **De motor**: de skill `.claude/skills/levende-leergang/SKILL.md`. Typ `/levende-leergang`
  in een Claude Code-sessie op deze repo. Claude leest dan je voortgang, schrijft nieuwe lessen
  en herschrijft zijn eigen werkregels op basis van wat je data laten zien.

## Losse programma's

Sinds 2026-10-26 heeft elk project een eigen programma, met dezelfde opbouw als Levend Brein
(Vandaag met drie meters, een dagroute in vaste volgorde, een overzicht en een back-up, plus
een tabblad met een eigen beeld) en een eigen vormgeving:

| Programma | Link | Beeld |
|---|---|---|
| Levend Brein (de leergang) | https://claude.ai/artifact/WzqhKEpuvPAnxCVwpomTjd | brein en sterrenkaart van je vakken |
| Wijsheidsroute | https://claude.ai/artifact/V34LiCR57gkMzAZiMRgc2E | levensboom van je regels |
| Netwerk | https://claude.ai/artifact/SpwALiVtqZbWTcs6DGoAH5 | neuronennetwerk onder de microscoop |
| Lean Six Sigma Leerboek | https://claude.ai/artifact/7MRh6nA1uvNZcNmSJ3GNdx | regelkaart van het leerboek |
| Levend Woord (Bijbel en geloof) | https://claude.ai/artifact/3qrP6co7K2bJiKGYw1cdiy | rozet van de 73 boeken |

De programma's zijn niet meer met elkaar verbonden. De oude privégegevens van de wijsheidsroute
en het netwerk staan nog in de database van Levend Brein (`data/users/<id>/route` en `brein`),
maar worden daar niet meer gebruikt; ze zijn overgezet naar hun eigen programma.

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

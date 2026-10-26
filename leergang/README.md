# Levende Leergang

Een levenslange leerweg in filosofie, intelligentie en mentaliseren, lichaamstaal,
cognitief gedrag en geloof in God, van MBO+ tot master.

- **Waar je leert**: in Levend Brein, in de map van het vak (zie hieronder). `leergang.html` is de oorspronkelijke bron van de vroegere
  gezamenlijke leergang en wordt niet meer gepubliceerd.
- **De motor**: de skill `.claude/skills/levende-leergang/SKILL.md`. Typ `/levende-leergang`
  in een Claude Code-sessie op deze repo. Claude leest dan je voortgang, schrijft nieuwe lessen
  en herschrijft zijn eigen werkregels op basis van wat je data laten zien. Een ronde gaat over één vak.

## Eén programma: de kast

Sinds 2026-10-26 (avond) staat alles in één programma, **Levend Brein**:
https://claude.ai/artifact/WzqhKEpuvPAnxCVwpomTjd

Het startscherm is een open kast met acht mappen. Tik een map aan om erin te werken; met de knop
Kast kom je terug. Je werkt één map per week, in een vaste volgorde die je per week kunt wijzigen.

| Map | Wat erin zit |
|---|---|
| Filosofie, Mentaliseren, Lichaamstaal, CGT | de leergang per vak, elk met een eigen dagroute en leerpad |
| Levend Woord | de Bijbel chronologisch, overdenkingen, geloofslessen en twistgesprekken |
| Lean Six Sigma | het leerboek van Green Belt tot Master Black Belt |
| Netwerk | skills, leerprojecten en koppelingen met Claude |
| Wijsheid | de oogst van alle mappen, en je eigen wijsheidsregels |

Onder de kast staat wat je gedaan hebt (alle mappen, nieuwste bovenaan) en je weekplanning.
Elke map heeft een eigen deel van de database (`p/<map>/...`, privé `data/users/<id>/p/<map>/...`).
De losse artifacts van eerder vandaag zijn verwijderd. De repo spiegelt de vakken in `vakken/<vak>/`;
de gezamenlijke leergang tot generatie 8 staat in `archief/`.

## Zo loopt een ronde

1. Je leest lessen in de map van een vak, beantwoordt de vragen en beoordeelt de les.
2. Je start een groeironde met `/levende-leergang`.
3. Claude past je profiel aan, verbetert zwakke lessen, schrijft twee tot vier nieuwe,
   stelt zijn werkregels bij, en legt alles vast in het groeilog van dat vak.

## Bestanden

- `vakken/<vak>/lessen/*.json`: elke les (bron van waarheid, gespiegeld naar de database van dat vak)
- `vakken/<vak>/meta/profiel.json`: wat Claude over jouw leren in dat vak weet
- `vakken/<vak>/meta/verbeterlog.json`: elke generatie: wat er gezien, veranderd en getoetst is
- `archief/`: de gezamenlijke leergang tot generatie 8
- `tools/check.mjs`: controleert alles voordat het naar een programma gaat (`node leergang/tools/check.mjs [vak]`)

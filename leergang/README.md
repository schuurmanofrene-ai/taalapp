# Levende Leergang

Een levenslange leerweg in filosofie, intelligentie en mentaliseren, lichaamstaal,
cognitief gedrag en geloof in God, van MBO+ tot master.

- **Waar je leert**: in het programma van elk vak (zie de tabel hieronder). Je begint bij
  Levend Brein, het startpunt. `leergang.html` is de oorspronkelijke bron van de vroegere
  gezamenlijke leergang en wordt niet meer gepubliceerd.
- **De motor**: de skill `.claude/skills/levende-leergang/SKILL.md`. Typ `/levende-leergang`
  in een Claude Code-sessie op deze repo. Claude leest dan je voortgang, schrijft nieuwe lessen
  en herschrijft zijn eigen werkregels op basis van wat je data laten zien. Een ronde gaat over één vak.

## Losse programma's

Sinds 2026-10-26 heeft elk onderwerp een eigen programma, met dezelfde opbouw (Vandaag met drie
meters, een dagroute in vaste volgorde, een overzicht en een back-up, plus een tabblad met een
eigen beeld) en een eigen vormgeving. Levend Brein is het startpunt zonder lessen.

| Programma | Link | Beeld |
|---|---|---|
| Levend Brein (startpunt) | https://claude.ai/artifact/WzqhKEpuvPAnxCVwpomTjd | brein met elk programma als gebied |
| Filosofie | https://claude.ai/artifact/HyeZSeDRLWN8oaE7fw9sKz | zuilen en meander, lapis en goud |
| Mentaliseren | https://claude.ai/artifact/JzGM1zV4DSwMnVrbsUnBHa | overlappende cirkels, teal en koraal |
| Lichaamstaal | https://claude.ai/artifact/FDiomhDccMRjKc8NhYgsey | figuur en golven, terracotta |
| CGT | https://claude.ai/artifact/C3AYNV6yUk2GEYLhmZgM3y | ABC-driehoek, groen en violet |
| Levend Woord (Bijbel en geloof) | https://claude.ai/artifact/3qrP6co7K2bJiKGYw1cdiy | rozet van de 73 boeken |
| Wijsheidsroute | https://claude.ai/artifact/V34LiCR57gkMzAZiMRgc2E | levensboom van je regels |
| Netwerk | https://claude.ai/artifact/SpwALiVtqZbWTcs6DGoAH5 | neuronennetwerk onder de microscoop |
| Lean Six Sigma Leerboek | https://claude.ai/artifact/7MRh6nA1uvNZcNmSJ3GNdx | regelkaart van het leerboek |

Elk vak heeft een eigen database. Er zijn geen routes tussen vakken meer: verbanden en
herhaalvragen blijven binnen het vak. De repo spiegelt elk vak in `vakken/<vak>/` (lessen,
profiel, verbeterlog); de gezamenlijke leergang tot generatie 8 staat in `archief/`. De oude
gegevens staan ook nog in de database van Levend Brein, maar worden daar niet meer gebruikt.
Het overzicht op Levend Brein is een momentopname (`overzicht/stand`) die Claude na elke
groeironde bijwerkt; in elk programma zelf staat de actuele stand.

## Zo loopt een ronde

1. Je leest lessen in het programma van een vak, beantwoordt de vragen en beoordeelt de les.
2. Je start een groeironde met `/levende-leergang`.
3. Claude past je profiel aan, verbetert zwakke lessen, schrijft twee tot vier nieuwe,
   stelt zijn werkregels bij, legt alles vast in het groeilog van dat vak en werkt de stand op
   Levend Brein bij.

## Bestanden

- `vakken/<vak>/lessen/*.json`: elke les (bron van waarheid, gespiegeld naar de database van dat vak)
- `vakken/<vak>/meta/profiel.json`: wat Claude over jouw leren in dat vak weet
- `vakken/<vak>/meta/verbeterlog.json`: elke generatie: wat er gezien, veranderd en getoetst is
- `archief/`: de gezamenlijke leergang tot generatie 8
- `tools/check.mjs`: controleert alles voordat het naar een programma gaat (`node leergang/tools/check.mjs [vak]`)

# Navarro Leergang

Een levenslange leerweg door het werk van Joe Navarro, voormalig FBI-agent en gedragsanalist,
van MBO+ tot master. Gebouwd naar het model van de Levende Leergang (`../leergang`).

- **De kaart**: https://claude.ai/artifact/BQauUygbunn8DnpmKqkoc4 (bron: `navarro.html`).
  In het midden jij, vier ringen voor de niveaus, vijf sectoren voor Navarro's werkterreinen.
  Elke les is een ster; afgeronde lessen lichten op en vormen je spoor.
- **De motor**: de skill `.claude/skills/navarro-leergang/SKILL.md`. Typ `/navarro-leergang`
  in een Claude Code-sessie op deze repo. Claude leest je voortgang, schrijft nieuwe lessen
  en herschrijft zijn eigen werkregels op basis van wat je data laten zien.

## De vijf werkterreinen

| Code | Werkterrein | Vooral uit |
|---|---|---|
| `brein` | Het eerlijke brein: comfort en ongemak, bevriezen-vluchten-vechten, kalmerende gebaren | What Every BODY Is Saying (2008) |
| `lichaam` | Van voet tot gezicht: het lichaam deel voor deel gelezen | What Every BODY Is Saying, The Dictionary of Body Language (2018) |
| `invloed` | Luider dan woorden: wat jij uitzendt, eerste indruk, vertrouwen, leiderschap | Louder Than Words (2010) |
| `persoonlijkheid` | Gevaarlijke persoonlijkheden: vier patronen en zelfbescherming | Dangerous Personalities (2014) |
| `uitzonderlijk` | Uitzonderlijk zijn: zelfbeheersing, observatie, communicatie, handelen, psychologisch comfort | Be Exceptional (2021) |

Op hogere niveaus komen ook Navarro's werk over verhoren (Advanced Interviewing Techniques, met
John Schafer) en zijn pokerboek aan bod, en vooral het wetenschappelijke debat over zijn methode.

## Bestanden

- `lessen/*.json`: elke les (bron van waarheid, gespiegeld naar de database van het artifact)
- `meta/profiel.json`: wat Claude over jouw leren in deze leergang weet
- `meta/verbeterlog.json`: elke generatie: wat er gezien, veranderd en getoetst is
- `tools/check.mjs`: controleert alles voordat het naar de kaart gaat

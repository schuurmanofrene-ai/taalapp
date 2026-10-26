#!/usr/bin/env node
// Controleert de leergang voordat Claude iets naar de database stuurt.
// Een kapotte les breekt de kaart niet, maar wel het vertrouwen: dus eerst nakijken.
//
//   node leergang/tools/check.mjs            (alle vakken)
//   node leergang/tools/check.mjs cgt        (één vak)
//
// Sinds 2026-10-26 heeft elk vak een eigen programma en een eigen database
// (leergang/vakken/<vak>/). Verbanden blijven daarom binnen het vak.

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const basis = join(dirname(fileURLToPath(import.meta.url)), "..", "vakken");
const VAKKEN = ["filosofie", "mentaliseren", "lichaamstaal", "cgt"];
const gekozen = process.argv[2] ? [process.argv[2]] : VAKKEN;
const fouten = [];
const fout = (waar, wat) => fouten.push(`${waar}: ${wat}`);
const samenvatting = [];

for (const vak of gekozen) {
  if (!VAKKEN.includes(vak)) { fout(vak, `onbekend vak; kies uit ${VAKKEN.join(", ")}`); continue; }
  const root = join(basis, vak);
  const lessen = readdirSync(join(root, "lessen"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        return { f: `${vak}/${f}`, naam: f, les: JSON.parse(readFileSync(join(root, "lessen", f), "utf8")) };
      } catch (e) {
        fout(`${vak}/${f}`, `geen geldige JSON (${e.message})`);
        return null;
      }
    })
    .filter(Boolean);

  const ids = new Set(lessen.map(({ les }) => les.id));

  for (const { f, naam, les } of lessen) {
    if (`${les.id}.json` !== naam) fout(f, `id "${les.id}" past niet bij de bestandsnaam`);
    if (!/^[a-z]+-[1-4]-\d{2}$/.test(les.id || "")) fout(f, "id moet de vorm domein-niveau-nr hebben, bv. fil-2-03");
    if (les.domein !== vak) fout(f, `domein "${les.domein}" hoort niet in het vak ${vak}`);
    if (![1, 2, 3, 4].includes(les.niveau)) fout(f, "niveau moet 1, 2, 3 of 4 zijn");
    for (const veld of ["titel", "kern"]) if (!les[veld]) fout(f, `${veld} ontbreekt`);
    if (!Number.isInteger(les.generatie)) fout(f, "generatie ontbreekt");
    if (!Array.isArray(les.secties) || les.secties.length < 2) fout(f, "minstens twee secties nodig");
    (les.secties || []).forEach((s, i) => {
      if (!s.kop || !s.tekst) fout(f, `sectie ${i + 1} mist kop of tekst`);
    });
    const vragen = les.vragen || [];
    if (!vragen.some((v) => v.soort === "keuze")) fout(f, "minstens één keuzevraag nodig");
    if (!vragen.some((v) => v.soort === "open")) fout(f, "minstens één open vraag nodig");
    for (const [i, v] of [...vragen, ...(les.herhaling || [])].entries()) {
      if (!v.vraag) fout(f, `vraag ${i + 1} mist tekst`);
      if (v.soort === "keuze") {
        if (!Array.isArray(v.opties) || v.opties.length < 2) fout(f, `vraag ${i + 1} heeft te weinig opties`);
        else if (!(v.juist >= 0 && v.juist < v.opties.length)) fout(f, `vraag ${i + 1}: juist wijst naar geen optie`);
        if (!v.uitleg) fout(f, `vraag ${i + 1} mist uitleg`);
      }
    }
    // Lessen van vóór de splitsing (generatie < 9) mogen nog een herhaalvraag uit een ander vak hebben.
    for (const h of les.herhaling || []) {
      if (h.van && !ids.has(h.van) && les.generatie >= 9) fout(f, `herhaalvraag verwijst naar ${h.van}, die niet in dit vak staat`);
    }
    const vv = les.voorVandaag || {};
    for (const veld of ["zin", "kijkpunt", "werkbrug"]) if (!vv[veld]) fout(f, `voorVandaag.${veld} ontbreekt`);
    // Verbanden wijzen naar eerdere lessen in hetzelfde vak; andere vakken zijn een eigen programma.
    for (const v of les.verbanden || []) if (!ids.has(v)) fout(f, `verband naar ${v}, die niet in dit vak staat`);
    if ((les.verbanden || []).length > 3) fout(f, "hoogstens drie verbanden");
  }

  const profiel = JSON.parse(readFileSync(join(root, "meta", "profiel.json"), "utf8"));
  if (profiel.volgendeLes && !ids.has(profiel.volgendeLes)) fout(`${vak}/profiel`, `volgendeLes ${profiel.volgendeLes} bestaat niet`);
  const log = JSON.parse(readFileSync(join(root, "meta", "verbeterlog.json"), "utf8"));
  const laatste = log.generaties.at(-1);
  if (laatste.generatie !== profiel.generatie) fout(`${vak}/meta`, "generatie in profiel en verbeterlog lopen uiteen");
  for (const id of laatste.nieuweLessen || []) if (!ids.has(id)) fout(`${vak}/verbeterlog`, `nieuwe les ${id} bestaat niet`);
  if (JSON.stringify(log).length > 200_000) fout(`${vak}/verbeterlog`, "bijna 256 KiB: vat oude generaties samen");

  samenvatting.push(`${vak}: ${lessen.length} lessen, generatie ${profiel.generatie}`);
}

if (fouten.length) {
  console.error(`✗ ${fouten.length} probleem(en):\n  ` + fouten.join("\n  "));
  process.exit(1);
}
console.log(`✓ alles in orde\n  ` + samenvatting.join("\n  "));

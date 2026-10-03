#!/usr/bin/env node
// Controleert de leergang voordat Claude iets naar de database stuurt.
// Een kapotte les breekt de kaart niet, maar wel het vertrouwen: dus eerst nakijken.
//
//   node leergang/tools/check.mjs

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOMEINEN = ["filosofie", "mentaliseren", "lichaamstaal", "cgt", "geloof"];
const fouten = [];
const fout = (waar, wat) => fouten.push(`${waar}: ${wat}`);

const lessen = readdirSync(join(root, "lessen"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => {
    try {
      return { f, les: JSON.parse(readFileSync(join(root, "lessen", f), "utf8")) };
    } catch (e) {
      fout(f, `geen geldige JSON (${e.message})`);
      return null;
    }
  })
  .filter(Boolean);

const ids = new Set(lessen.map(({ les }) => les.id));

for (const { f, les } of lessen) {
  if (`${les.id}.json` !== f) fout(f, `id "${les.id}" past niet bij de bestandsnaam`);
  if (!/^[a-z]+-[1-4]-\d{2}$/.test(les.id || "")) fout(f, "id moet de vorm domein-niveau-nr hebben, bv. fil-2-03");
  if (!DOMEINEN.includes(les.domein)) fout(f, `onbekend domein "${les.domein}"`);
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
  for (const h of les.herhaling || []) {
    if (h.van && !ids.has(h.van)) fout(f, `herhaalvraag verwijst naar onbekende les ${h.van}`);
  }
  const vv = les.voorVandaag || {};
  for (const veld of ["zin", "kijkpunt", "werkbrug"]) if (!vv[veld]) fout(f, `voorVandaag.${veld} ontbreekt`);
  for (const v of les.verbanden || []) if (!ids.has(v)) fout(f, `verband naar onbekende les ${v}`);
}

const profiel = JSON.parse(readFileSync(join(root, "meta", "profiel.json"), "utf8"));
if (profiel.volgendeLes && !ids.has(profiel.volgendeLes)) fout("profiel", `volgendeLes ${profiel.volgendeLes} bestaat niet`);
const log = JSON.parse(readFileSync(join(root, "meta", "verbeterlog.json"), "utf8"));
const laatste = log.generaties.at(-1);
if (laatste.generatie !== profiel.generatie) fout("meta", "generatie in profiel en verbeterlog lopen uiteen");
for (const id of laatste.nieuweLessen || []) if (!ids.has(id)) fout("verbeterlog", `nieuwe les ${id} bestaat niet`);

const groot = JSON.stringify(log).length;
if (groot > 200_000) fout("verbeterlog", "bijna 256 KiB: vat oude generaties samen");

if (fouten.length) {
  console.error(`✗ ${fouten.length} probleem(en):\n  ` + fouten.join("\n  "));
  process.exit(1);
}
console.log(`✓ ${lessen.length} lessen, generatie ${profiel.generatie}, alles in orde`);

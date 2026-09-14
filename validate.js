/* Validation for the Linux command database + man-page data. */
global.window = {};
require("./data-part1.js");
require("./data-part2.js");
require("./man-part1.js");
require("./man-part2.js");
require("./man-part3.js");
require("./man-part4.js");
require("./man-part5.js");
require("./man-part6.js");
require("./ex-part1.js");
require("./ex-part2.js");
require("./ex-part3.js");
require("./examples-part1.js");
require("./examples-part2.js");
require("./examples-part3.js");

const CMDS = global.window.CMDS;
const MAN = global.window.MAN;
const EXS = global.window.EXITSTATUS;
const ENVV = global.window.ENVVARS;
const VALID_CATS = new Set([
  "files", "text", "system", "process", "network", "users", "packages",
  "archive", "disk", "shell", "services", "dev"
]);

let errors = 0;
const fail = (msg) => { errors++; console.error("FAIL: " + msg); };

if (!Array.isArray(CMDS)) fail("window.CMDS is not an array");
if (!MAN || typeof MAN !== "object") fail("window.MAN is missing");
if (!EXS || typeof EXS !== "object") fail("window.EXITSTATUS is missing");
if (!ENVV || typeof ENVV !== "object") fail("window.ENVVARS is missing");

const checkPairs = (label, list) => {
  if (!Array.isArray(list) || list.length === 0) { fail(`${label}: expected a non-empty array`); return; }
  list.forEach((o, j) => {
    if (!Array.isArray(o) || o.length !== 2 || typeof o[0] !== "string" || !o[0].trim() ||
        typeof o[1] !== "string" || !o[1].trim()) fail(`${label}: malformed entry #${j}`);
  });
};

const names = new Set();
const perCat = {};
for (const [i, c] of CMDS.entries()) {
  const at = `#${i} (${c && c.name})`;
  for (const f of ["name", "cat", "desc", "usage"]) {
    if (typeof c[f] !== "string" || !c[f].trim()) fail(`${at}: missing/empty "${f}"`);
  }
  if (!Array.isArray(c.examples) || c.examples.length === 0) fail(`${at}: no examples`);
  else c.examples.forEach((ex, j) => {
    if (typeof ex !== "string" || !ex.trim()) fail(`${at}: example ${j} empty`);
  });
  if (!VALID_CATS.has(c.cat)) fail(`${at}: invalid category "${c.cat}"`);
  if (names.has(c.name)) fail(`duplicate name "${c.name}"`);
  names.add(c.name);
  perCat[c.cat] = (perCat[c.cat] || 0) + 1;
}

/* MAN data checks */
for (const key of Object.keys(MAN)) {
  if (!names.has(key)) fail(`MAN orphan: no command named "${key}"`);
}
for (const name of names) {
  const m = MAN[name];
  if (!m) { fail(`no MAN entry for "${name}"`); continue; }
  const at = `MAN[${name}]`;
  if (typeof m.desc2 !== "string" || !m.desc2.trim()) fail(`${at}: missing desc2`);
  if (!Array.isArray(m.options) || m.options.length === 0) fail(`${at}: no options`);
  else m.options.forEach((o, j) => {
    if (!Array.isArray(o) || o.length !== 2 || !o[0].trim() || !o[1].trim()) {
      fail(`${at}: malformed option #${j}`);
    }
  });
  if (!Array.isArray(m.seeAlso) || m.seeAlso.length === 0) fail(`${at}: no seeAlso`);
  else m.seeAlso.forEach(ref => {
    if (!names.has(ref)) fail(`${at}: seeAlso "${ref}" does not exist in the database`);
    if (ref === name) fail(`${at}: seeAlso references itself`);
  });
  if (m.sec !== undefined && !Number.isInteger(m.sec)) fail(`${at}: sec must be an integer`);
}

/* EXIT STATUS data checks — required for every command */
for (const key of Object.keys(EXS)) {
  if (!names.has(key)) fail(`EXITSTATUS orphan: no command named "${key}"`);
}
for (const name of names) {
  if (!EXS[name]) { fail(`no EXITSTATUS entry for "${name}"`); continue; }
  checkPairs(`EXITSTATUS[${name}]`, EXS[name]);
}

/* ENVIRONMENT data checks — optional, but must be well-formed and reference real commands */
for (const key of Object.keys(ENVV)) {
  if (!names.has(key)) fail(`ENVVARS orphan: no command named "${key}"`);
  else checkPairs(`ENVVARS[${key}]`, ENVV[key]);
}

/* EXAMPLES data checks — expanded examples required for every command */
const EXA = global.window.EXAMPLES;
if (!EXA || typeof EXA !== "object") fail("window.EXAMPLES is missing");
else {
  let totalEx = 0, annotated = 0;
  for (const key of Object.keys(EXA)) {
    if (!names.has(key)) fail(`EXAMPLES orphan: no command named "${key}"`);
  }
  for (const name of names) {
    const list = EXA[name];
    if (!list) { fail(`no EXAMPLES entry for "${name}"`); continue; }
    if (!Array.isArray(list) || list.length < 2) fail(`EXAMPLES[${name}]: needs >= 2 examples`);
    (list || []).forEach((ex, j) => {
      const code = Array.isArray(ex) ? ex[0] : ex;
      if (typeof code !== "string" || !code.trim()) fail(`EXAMPLES[${name}] #${j}: bad code`);
      if (Array.isArray(ex)) {
        if (ex.length !== 2 || typeof ex[1] !== "string" || !ex[1].trim()) fail(`EXAMPLES[${name}] #${j}: bad note`);
        else annotated++;
      } else if (typeof ex !== "string") {
        fail(`EXAMPLES[${name}] #${j}: must be string or [code, note]`);
      }
    });
    totalEx += (list || []).length;
  }
  console.log(`EXAMPLES total : ${totalEx} (${annotated} annotated cases)`);
}

/* ---------- i18n checks: IDTXT coverage + array parity, STRINGS en/id ---------- */
require("./i18n.js");
require("./id-part1.js");
require("./id-part2.js");
require("./id-part3.js");
{
  const IDTXT = global.window.IDTXT;
  const STR = global.window.STRINGS;
  if (!IDTXT || typeof IDTXT !== "object") fail("window.IDTXT is missing");
  else {
    for (const key of Object.keys(IDTXT)) {
      if (!names.has(key)) fail(`IDTXT orphan: no command named "${key}"`);
    }
    let sKeys = 0, vKeys = 0;
    for (const name of names) {
      const t = IDTXT[name];
      if (!t) { fail(`no IDTXT entry for "${name}"`); continue; }
      const at = `IDTXT[${name}]`;
      if (typeof t.d !== "string" || !t.d.trim()) fail(`${at}: missing d`);
      if (typeof t.d2 !== "string" || !t.d2.trim()) fail(`${at}: missing d2`);
      const optLen = (MAN[name].options || []).length;
      if (!Array.isArray(t.o) || t.o.length !== optLen) fail(`${at}: o must have ${optLen} entries`);
      else t.o.forEach((v, j) => { if (typeof v !== "string" || !v.trim()) fail(`${at}: o[${j}] empty`); });
      const exLen = ((EXA && EXA[name]) || []).length;
      if (!Array.isArray(t.n) || t.n.length !== exLen) fail(`${at}: n must have ${exLen} entries`);
      else t.n.forEach((v, j) => { if (v != null && (typeof v !== "string" || !v.trim())) fail(`${at}: n[${j}] bad`); });
      const xLen = (EXS[name] || []).length;
      if (!Array.isArray(t.s) || t.s.length !== xLen) fail(`${at}: s must have ${xLen} entries`);
      else { sKeys++; t.s.forEach((v, j) => { if (typeof v !== "string" || !v.trim()) fail(`${at}: s[${j}] empty`); }); }
      const vLen = (ENVV[name] || []).length;
      if (vLen > 0) {
        if (!Array.isArray(t.v) || t.v.length !== vLen) fail(`${at}: v must have ${vLen} entries`);
        else { vKeys++; t.v.forEach((v, j) => { if (typeof v !== "string" || !v.trim()) fail(`${at}: v[${j}] empty`); }); }
      } else if (t.v && t.v.length !== 0) {
        fail(`${at}: v present but command has no ENVVARS`);
      }
    }
    console.log(`IDTXT entries  : ${Object.keys(IDTXT).length} (exit ${sKeys}, env ${vKeys})`);
  }
  if (!STR || !STR.en || !STR.id) fail("window.STRINGS en/id missing");
  else {
    const enK = Object.keys(STR.en).sort().join(",");
    const idK = Object.keys(STR.id).sort().join(",");
    if (enK !== idK) {
      const en = new Set(Object.keys(STR.en)), id = new Set(Object.keys(STR.id));
      for (const k of en) if (!id.has(k)) fail(`STRINGS.id missing key "${k}"`);
      for (const k of id) if (!en.has(k)) fail(`STRINGS.id extra key "${k}"`);
    } else {
      const nonEmpty = (v, at) => {
        if (typeof v === "string") { if (!v.trim()) fail(`${at} empty`); return; }
        if (v && typeof v === "object") {
          for (const k2 of Object.keys(v)) nonEmpty(v[k2], `${at}.${k2}`);
          return;
        }
        fail(`${at}: must be string or object`);
      };
      for (const k of Object.keys(STR.en)) {
        const e = STR.en[k], i = STR.id[k];
        if (e && typeof e === "object") {
          const ek = Object.keys(e).sort().join(","), ik = Object.keys(i || {}).sort().join(",");
          if (ek !== ik) fail(`STRINGS.id["${k}"] subkeys differ from en`);
          for (const k2 of Object.keys(i || {})) nonEmpty(i[k2], `STRINGS.id["${k}"]["${k2}"]`);
        } else {
          nonEmpty(i, `STRINGS.id["${k}"]`);
        }
      }
      console.log(`STRINGS keys   : ${Object.keys(STR.en).length} en/id`);
    }
  }
}

console.log(`Total commands : ${CMDS.length}`);
console.log(`MAN entries    : ${Object.keys(MAN).length}`);
console.log(`EXIT entries   : ${Object.keys(EXS).length}`);
console.log(`ENV entries    : ${Object.keys(ENVV).length}`);
console.log(`Per category   :`);
for (const cat of VALID_CATS) console.log(`  ${cat.padEnd(9)} ${perCat[cat] || 0}`);

/* Service worker precache list must exist on disk and cover every app asset */
{
  const fs = require("fs");
  const sw = fs.readFileSync(__dirname + "/sw.js", "utf8");
  const m = sw.match(/const ASSETS = \[([\s\S]*?)\];/);
  if (!m) {
    fail("sw.js: ASSETS list not found");
  } else {
    const listed = [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    for (const f of listed) {
      if (!fs.existsSync(__dirname + "/" + f)) fail(`sw.js precache missing on disk: ${f}`);
    }
    const onDisk = fs.readdirSync(__dirname)
      .filter((f) => /\.js$/.test(f) && !/^(validate|test-|make-|dump)/.test(f) && f !== "sw.js");
    onDisk.push("index.html", "styles.css", "manifest.webmanifest");
    for (const f of onDisk) {
      if (!listed.includes(f)) fail(`sw.js precache omits app asset: ${f}`);
    }
    for (const f of fs.readdirSync(__dirname + "/icons")) {
      if (!listed.includes("icons/" + f)) fail(`sw.js precache omits icon: icons/${f}`);
    }
    console.log(`SW precache    : ${listed.length} assets`);
  }
}

if (errors === 0) console.log("\nALL CHECKS PASSED");
else { console.error(`\n${errors} error(s) found`); process.exit(1); }

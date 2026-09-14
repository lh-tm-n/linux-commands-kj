/* Dump compact English fields per category for translation work. */
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

const W = global.window;
const CMDS = W.CMDS, MAN = W.MAN || {}, EXS = W.EXITSTATUS || {}, ENVV = W.ENVVARS || {}, EXA = W.EXAMPLES || {};
const cats = process.argv.slice(2);
for (const c of CMDS) {
  if (!cats.includes(c.cat)) continue;
  const m = MAN[c.name] || {};
  console.log(JSON.stringify({
    n: c.name,
    d: c.desc,
    d2: m.desc2 || "",
    o: m.options || [],
    e: (EXA[c.name] || []).map((x) => (Array.isArray(x) ? x[1] : "")),
    x: (EXS[c.name] || []).map((p) => p[1]),
    v: (ENVV[c.name] || []).map((p) => p[1])
  }));
}

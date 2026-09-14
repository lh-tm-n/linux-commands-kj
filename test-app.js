/* Smoke test: runs the real app in jsdom against the real index.html + assets. */
"use strict";
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

let failures = 0;
const check = (name, cond, extra) => {
  console.log((cond ? "PASS" : "FAIL") + "  " + name + (extra ? "  [" + extra + "]" : ""));
  if (!cond) failures++;
};

const dir = __dirname;
const { pathToFileURL } = require("url");
const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: pathToFileURL(path.join(dir, "index.html")).href
});

const { window } = dom;
const { document } = window;

function fire(el, type, opts) {
  const ev = new window.Event(type, { bubbles: true, cancelable: true });
  Object.assign(ev, opts || {});
  el.dispatchEvent(ev);
}
function click(el) { fire(el, "click"); }
function keydown(el, key, opts) {
  const ev = new window.KeyboardEvent("keydown", Object.assign({ key, bubbles: true, cancelable: true }, opts || {}));
  el.dispatchEvent(ev);
}

function done() {
  console.log(failures === 0 ? "\nALL SMOKE TESTS PASSED" : "\n" + failures + " FAILURE(S)");
  process.exit(failures === 0 ? 0 : 1);
}

/* jsdom loads <script src> asynchronously; wait for load */
window.addEventListener("load", () => setTimeout(run, 0));

function run() {
  const grid = document.getElementById("grid");
  const chips = document.getElementById("chips");
  const empty = document.getElementById("empty");
  const search = document.getElementById("search");
  const countLine = document.getElementById("count-line");
  const backdrop = document.getElementById("backdrop");
  const modalBody = document.getElementById("modal-body");
  const modalEl = document.querySelector(".modal");

  /* 1. initial render */
  const cardsAll = grid.querySelectorAll(".card").length;
  check("initial render shows all cards", cardsAll === window.CMDS.length, cardsAll + " cards");
  check("count line correct", countLine.textContent === "304 commands · 12 categories", countLine.textContent);
  check("chips built (All + 12)", chips.querySelectorAll(".chip").length === 13);
  check("empty state hidden initially", empty.classList.contains("hidden"));

  /* 2. search filtering + ranking */
  search.value = "tar";
  fire(search, "input");
  const cardsTar = grid.querySelectorAll(".card").length;
  check("search 'tar' filters results", cardsTar > 0 && cardsTar < 304, cardsTar + " cards");
  check("exact-name 'tar' ranked first", grid.querySelector(".card").dataset.cmd === "tar");
  check("search highlight applied", !!grid.querySelector("mark"));

  /* 3. empty state on nonsense query */
  search.value = "zzzznotacommand";
  fire(search, "input");
  check("no-match shows empty state", !empty.classList.contains("hidden"));
  search.value = "";
  fire(search, "input");

  /* 4. category chip */
  click(chips.querySelector('.chip[data-cat="network"]'));
  check("chip filter -> network shows 31", grid.querySelectorAll(".card").length === 31,
        grid.querySelectorAll(".card").length + " cards");
  click(chips.querySelector('.chip[data-cat="all"]'));

  /* 5. open man page for tar */
  click(grid.querySelector('.card[data-cmd="tar"]'));
  check("modal opened", !backdrop.classList.contains("hidden"));
  check("man header shows TAR(1)", /TAR\(1\)/.test(modalBody.textContent));
  const h3s = Array.from(modalBody.querySelectorAll("h3")).map(h => h.textContent);
  const classicOrder = ["Name", "Synopsis", "Description", "Options", "Environment", "Exit Status", "Examples", "See Also"];
  check("sections render in classic man order", JSON.stringify(h3s) === JSON.stringify(classicOrder), h3s.join(" > "));
  check("OPTIONS renders flags", /-c, --create/.test(modalBody.textContent));
  check("ENVIRONMENT renders TAPE var", !!modalBody.querySelector(".man-env") && /Default tape device/.test(modalBody.textContent));
  check("EXIT STATUS renders tar codes", !!modalBody.querySelector(".man-exit") && /Some files differ/.test(modalBody.textContent));
  check("EXAMPLES has one copy button per example",
        modalBody.querySelectorAll(".copy-btn").length === window.EXAMPLES.tar.length,
        modalBody.querySelectorAll(".copy-btn").length + " buttons");
  check("annotated case notes rendered",
        modalBody.querySelectorAll(".example-note").length > 0 &&
        /# Case: extract into a specific directory/.test(modalBody.textContent));
  const noteCount = modalBody.querySelectorAll(".example-note").length;
  check("notes match data", noteCount === window.EXAMPLES.tar.filter(e => Array.isArray(e) && e[1]).length,
        noteCount + " notes");
  check("SEE ALSO links rendered", modalBody.querySelectorAll(".seealso").length >= 2,
        modalBody.querySelectorAll(".seealso").length + " links");
  check("body scroll locked", document.body.style.overflow === "hidden");

  /* 6. in-page man search */
  const bar = document.getElementById("man-searchbar");
  const inp = document.getElementById("man-search-input");
  const cnt = document.getElementById("man-search-count");
  check("search bar hidden initially", bar.classList.contains("hidden"));

  /* open via find button */
  click(document.getElementById("man-find"));
  check("find button opens search bar", !bar.classList.contains("hidden"));
  check("search input focused", document.activeElement === inp);

  /* type a query that appears in tar's man page: 'archive' (Name/Desc/Options/Examples) */
  inp.value = "archive";
  fire(inp, "input");
  const nMatches = modalBody.querySelectorAll("mark.mh").length;
  check("matches highlighted", nMatches >= 4, nMatches + " matches");
  check("count shows 1 / N", cnt.textContent === "1 / " + nMatches, cnt.textContent);
  check("first match marked current", !!modalBody.querySelector("mark.mh.current"));
  check("current is the first match",
        modalBody.querySelector("mark.mh.current") === modalBody.querySelectorAll("mark.mh")[0]);
  check("no highlight inside search bar itself", !bar.querySelector("mark.mh"));

  /* next / prev wrap around */
  click(document.getElementById("man-next"));
  check("next -> 2 / N", cnt.textContent === "2 / " + nMatches, cnt.textContent);
  click(document.getElementById("man-prev"));
  click(document.getElementById("man-prev"));
  check("prev wraps to N / N", cnt.textContent === nMatches + " / " + nMatches, cnt.textContent);
  check("current marker moved",
        modalBody.querySelector("mark.mh.current") === modalBody.querySelectorAll("mark.mh")[nMatches - 1]);

  /* keyboard: Enter advances, Shift+Enter goes back */
  keydown(inp, "Enter");
  check("Enter wraps to 1 / N", cnt.textContent === "1 / " + nMatches, cnt.textContent);
  keydown(inp, "Enter", { shiftKey: true });
  check("Shift+Enter back to N / N", cnt.textContent === nMatches + " / " + nMatches, cnt.textContent);

  /* case-insensitive */
  inp.value = "ARCHIVE";
  fire(inp, "input");
  check("search is case-insensitive", modalBody.querySelectorAll("mark.mh").length === nMatches,
        modalBody.querySelectorAll("mark.mh").length + " matches");

  /* no results */
  inp.value = "qqzz";
  fire(inp, "input");
  check("no results -> 0 / 0", cnt.textContent === "0 / 0", cnt.textContent);
  check("no results -> count flagged", cnt.classList.contains("none"));

  /* Escape closes search (not modal) and clears marks */
  keydown(inp, "Escape");
  check("Escape hides search bar", bar.classList.contains("hidden"));
  check("Escape clears highlights", modalBody.querySelectorAll("mark.mh").length === 0);
  check("modal still open after search Escape", !backdrop.classList.contains("hidden"));
  check("focus returned to find button", document.activeElement === document.getElementById("man-find"));

  /* '/' global shortcut opens in-page search while modal open */
  keydown(document.body, "/");
  check("'/' opens in-page search in modal", !bar.classList.contains("hidden") && document.activeElement === inp);

  /* 7. SEE ALSO navigation resets search state */
  inp.value = "gzip";
  fire(inp, "input");
  const gzLink = modalBody.querySelector('.seealso[data-cmd="gzip"]');
  click(gzLink);
  check("SEE ALSO opens gzip man page", /GZIP\(1\)/.test(modalBody.textContent));
  check("Back button shown", !!document.getElementById("man-back"));
  check("search state reset after navigation", modalBody.querySelectorAll("mark.mh").length === 0 &&
        document.getElementById("man-searchbar").classList.contains("hidden"));
  click(document.getElementById("man-back"));
  check("Back returns to tar", /TAR\(1\)/.test(modalBody.textContent));

  /* 7b. print affordances */
  const printBtn = document.getElementById("man-print");
  check("print button in man header", !!printBtn);
  let printed = 0;
  dom.window.print = () => { printed++; };
  click(printBtn);
  check("print button calls window.print", printed === 1, printed + " call(s)");
  const printFoot = modalBody.querySelector(".print-foot");
  check("print-only footer rendered", !!printFoot && /Printed from Linux Commands/.test(printFoot.textContent));
  const css = fs.readFileSync(path.join(__dirname, "styles.css"), "utf8");
  check("stylesheet has @media print rules", /@media print/.test(css) && /break-inside:\s*avoid/.test(css));

  /* 8. close modal */
  click(document.getElementById("modal-close"));
  check("modal closed", backdrop.classList.contains("hidden"));
  check("body scroll restored", document.body.style.overflow === "");

  /* 9. '/' focuses main search when modal closed */
  keydown(document.body, "/");
  check("'/' focuses main search when modal closed", document.activeElement === search);

  /* 10. Escape on closed modal does nothing bad */
  keydown(document.body, "Escape");
  check("Escape with closed modal is a no-op", backdrop.classList.contains("hidden"));

  /* 11. sections adapt per command: pwd has no ENVIRONMENT but has EXIT STATUS */
  click(grid.querySelector('.card[data-cmd="pwd"]'));
  const h3pwd = Array.from(modalBody.querySelectorAll("h3")).map(h => h.textContent);
  check("pwd has Exit Status section", h3pwd.includes("Exit Status"));
  check("pwd omits Environment section", !h3pwd.includes("Environment"), h3pwd.join(" > "));
  click(document.getElementById("modal-close"));

  /* 12. light/dark theme toggle */
  const htmlEl = document.documentElement;
  const initial = htmlEl.getAttribute("data-theme");
  check("theme attribute applied at load", initial === "dark" || initial === "light", String(initial));
  const toggleBtn = document.getElementById("theme-toggle");
  const metaTC = document.querySelector('meta[name="theme-color"]');
  check("meta theme-color matches initial theme",
        metaTC.getAttribute("content") === (initial === "light" ? "#fbf1c7" : "#282828"),
        metaTC.getAttribute("content"));
  click(toggleBtn);
  const switched = htmlEl.getAttribute("data-theme");
  check("toggle switches the theme", switched !== initial, initial + " -> " + switched);
  check("meta theme-color follows the toggle",
        metaTC.getAttribute("content") === (switched === "light" ? "#fbf1c7" : "#282828"),
        metaTC.getAttribute("content"));
  let stored = null;
  try { stored = window.localStorage.getItem("theme"); } catch (e) { /* opaque origin in jsdom */ }
  check("choice persisted (when storage available)", stored === null || stored === switched, String(stored));
  check("toggle aria-label describes next theme",
        toggleBtn.getAttribute("aria-label") === (switched === "light" ? "Switch to dark theme" : "Switch to light theme"),
        toggleBtn.getAttribute("aria-label"));
  click(toggleBtn);
  check("toggle switches back", htmlEl.getAttribute("data-theme") === initial);

  /* ---------- PWA wiring ---------- */
  const manifest = document.querySelector('link[rel="manifest"]');
  check("manifest link present", !!manifest && /manifest\.webmanifest$/.test(manifest.getAttribute("href")),
        manifest ? manifest.getAttribute("href") : "missing");
  check("apple-touch-icon present", !!document.querySelector('link[rel="apple-touch-icon"]'));
  const instBtn = document.getElementById("install-btn");
  check("install button present but hidden until prompt", !!instBtn && instBtn.hidden === true,
        instBtn ? (instBtn.hidden ? "hidden" : "visible!") : "missing");

  /* ---------- i18n ---------- */
  const langBtn = document.getElementById("lang-toggle");
  check("lang toggle present (shows ID)", !!langBtn && langBtn.textContent === "ID");
  click(langBtn);
  check("html lang switches to id", htmlEl.getAttribute("lang") === "id");
  check("chips translated", /Semua/.test(chips.textContent) && /Berkas/.test(chips.textContent));
  check("count line translated", /304 perintah · 12 kategori/.test(document.getElementById("count-line").textContent));
  check("search placeholder translated", search.placeholder.indexOf("Cari") === 0);
  check("empty state translated", /tidak ditemukan/.test(document.getElementById("empty-big").textContent));
  click(document.querySelector('.card[data-cmd="tar"]'));
  check("modal opens in Indonesian", /NAMA/.test(modalBody.textContent) && /DESKRIPSI/.test(modalBody.textContent) &&
        /CONTOH/.test(modalBody.textContent) && /Manual Perintah Umum/.test(modalBody.textContent));
  check("copy buttons translated", modalBody.querySelector(".copy-btn").textContent === "Salin");
  click(langBtn);
  check("toggle back to English", htmlEl.getAttribute("lang") === "en" &&
        modalBody.querySelector("h3").textContent === "Name" &&
        modalBody.querySelector(".copy-btn").textContent === "Copy");

  done();
}

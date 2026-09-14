/* Linux Commands — app logic (search, filter, render, modal) */
(function () {
  "use strict";

  /* Category key -> { label, short } ; object order defines chip order */
  var CATS = {
    files:    { label: "Files & Directories",     short: "Files" },
    text:     { label: "Text Processing",         short: "Text" },
    system:   { label: "System Information",      short: "System" },
    process:  { label: "Process Management",      short: "Processes" },
    network:  { label: "Networking",              short: "Network" },
    users:    { label: "Users & Permissions",     short: "Users" },
    packages: { label: "Package Management",      short: "Packages" },
    archive:  { label: "Archives & Compression",  short: "Archives" },
    disk:     { label: "Disks & Storage",         short: "Disks" },
    shell:    { label: "Shell & Utilities",       short: "Shell" },
    services: { label: "Services & System",       short: "Services" },
    dev:      { label: "Developer Tools",         short: "Dev" }
  };

  var CMDS = (window.CMDS || []).slice().sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  /* Merge man-page data (description, options, see-also, man section) */
  var MAN = window.MAN || {};
  var EXS = window.EXITSTATUS || {};
  var ENVV = window.ENVVARS || {};
  var EXA = window.EXAMPLES || {};
  CMDS.forEach(function (c) {
    var m = MAN[c.name];
    if (m) {
      c.desc2 = m.desc2;
      c.options = m.options;
      c.seeAlso = m.seeAlso;
      c.sec = m.sec || 1;
    }
    c.exit = EXS[c.name];
    c.env = ENVV[c.name];
    if (EXA[c.name]) c.examples = EXA[c.name];
  });

  var els = {
    chips:    document.getElementById("chips"),
    grid:     document.getElementById("grid"),
    empty:    document.getElementById("empty"),
    search:   document.getElementById("search"),
    count:    document.getElementById("count-line"),
    backdrop: document.getElementById("backdrop"),
    modal:    document.querySelector(".modal"),
    modalBody:document.getElementById("modal-body"),
    close:    document.getElementById("modal-close"),
    topbar:   document.querySelector(".topbar")
  };

  var activeCat = "all";
  var query = "";
  var lastFocusedCard = null;
  var modalHistory = [];
  var currentCmd = null;
  var manQuery = "";
  var manMatches = [];
  var manMatchIdx = -1;

  /* ---------- i18n core ---------- */
  var STRINGS = window.STRINGS || { en: {}, id: {} };
  var lang = "en";
  (function () {
    var nav = (navigator.language || "").toLowerCase();
    var saved = null;
    try { saved = localStorage.getItem("lang"); } catch (e) { /* private mode */ }
    if (saved === "id" || saved === "en") lang = saved;
    else if (nav.indexOf("id") === 0) lang = "id";
  })();

  function S(key) {
    var t = STRINGS[lang] || STRINGS.en;
    return (t && key in t ? t : STRINGS.en)[key];
  }

  function fmt(str) {
    var args = Array.prototype.slice.call(arguments, 1);
    var pos = { "%n": 0, "%t": 1, "%c": 0 };
    return String(str).replace(/%[ntc]/g, function (m) {
      return args[pos[m]] != null ? args[pos[m]] : m;
    });
  }

  function catOf(key) {
    var t = (STRINGS[lang] || {}).cats;
    return (t && t[key]) || CATS[key] || { label: key, short: key };
  }

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function highlight(text, q) {
    var t = esc(text);
    if (!q) return t;
    var i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i === -1) return t;
    return esc(text.slice(0, i)) +
           "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" +
           esc(text.slice(i + q.length));
  }

  function score(cmd, q) {
    var name = cmd.name.toLowerCase();
    if (name === q) return 4;
    if (name.indexOf(q) === 0) return 3;
    if (name.indexOf(q) !== -1) return 2;
    return 1;
  }

  /* ---------- filtering ---------- */
  function currentList() {
    var list = CMDS;
    if (activeCat !== "all") {
      list = list.filter(function (c) { return c.cat === activeCat; });
    }
    var q = query.trim();
    if (q) {
      var tokens = q.toLowerCase().split(/\s+/);
      list = list.filter(function (c) {
        var hay = (c.name + " " + c.desc).toLowerCase();
        return tokens.every(function (t) { return hay.indexOf(t) !== -1; });
      });
      var qq = q.toLowerCase();
      list = list.slice().sort(function (a, b) {
        return (score(b, qq) - score(a, qq)) || a.name.localeCompare(b.name);
      });
    }
    return list;
  }

  /* ---------- chips ---------- */
  function buildChips() {
    var counts = { all: CMDS.length };
    CMDS.forEach(function (c) { counts[c.cat] = (counts[c.cat] || 0) + 1; });

    var html = chipHtml("all", S("all"), counts.all);
    Object.keys(CATS).forEach(function (key) {
      html += chipHtml(key, catOf(key).short, counts[key] || 0);
    });
    els.chips.innerHTML = html;

    if (!buildChips.bound) {
      buildChips.bound = true;
      els.chips.addEventListener("click", function (e) {
        var chip = e.target.closest(".chip");
        if (!chip) return;
        activeCat = chip.dataset.cat;
        updateChipStates();
        render();
        els.chips.scrollLeft = 0;
      });
    }
  }

  function chipHtml(cat, label, count) {
    return '<button class="chip' + (cat === activeCat ? " active" : "") +
           '" data-cat="' + cat + '" aria-pressed="' + (cat === activeCat) + '">' +
           esc(label) + '<span class="chip-count">' + count + "</span></button>";
  }

  function updateChipStates() {
    els.chips.querySelectorAll(".chip").forEach(function (chip) {
      var on = chip.dataset.cat === activeCat;
      chip.classList.toggle("active", on);
      chip.setAttribute("aria-pressed", String(on));
    });
  }

  /* ---------- grid ---------- */
  function render() {
    var list = currentList();
    var q = query.trim();

    if (!list.length) {
      els.grid.innerHTML = "";
      els.empty.classList.remove("hidden");
    } else {
      els.empty.classList.add("hidden");
      els.grid.innerHTML = list.map(function (c) {
        var cat = catOf(c.cat);
        return '<button class="card" data-cmd="' + esc(c.name) + '">' +
                 '<div class="card-top">' +
                   '<span class="cmd">' + highlight(c.name, q) + "</span>" +
                   '<span class="badge">' + esc(cat.short) + "</span>" +
                 "</div>" +
                 '<p class="desc">' + highlight(c.desc, q) + "</p>" +
               "</button>";
      }).join("");
    }

    var countStr = list.length === CMDS.length
      ? fmt(S("countAll"), CMDS.length)
      : fmt(S("countShow"), list.length, CMDS.length);
    els.count.textContent = countStr + " · " + fmt(S("catCount"), Object.keys(CATS).length);
  }

  /* ---------- modal ---------- */
  function findCmd(name) {
    for (var i = 0; i < CMDS.length; i++) if (CMDS[i].name === name) return CMDS[i];
    return null;
  }

  function manSection(title, innerHtml) {
    return '<section class="man-sec"><h3>' + esc(title) + "</h3>" + innerHtml + "</section>";
  }

  function openModal(cmd) {
    currentCmd = cmd;
    manQuery = "";
    manMatches = [];
    manMatchIdx = -1;
    var cat = catOf(cmd.cat);
    var sec = cmd.sec || 1;
    var manId = cmd.name.toUpperCase() + "(" + sec + ")";
    var SEC = S("secs");

    var back = modalHistory.length
      ? '<button class="man-back" id="man-back" type="button" aria-label="' + esc(S("back")) + '">&larr;</button>'
      : "";

    var findIcon = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" ' +
      'stroke-width="2.4" stroke-linecap="round" aria-hidden="true">' +
      '<circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg>';

    var printIcon = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" ' +
      'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M6 9V3h12v6"></path>' +
      '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>' +
      '<rect x="6" y="14" width="12" height="8" rx="1"></rect></svg>';

    var dlRows = function (list) {
      return (list || []).map(function (o) {
        return '<div class="man-opt"><dt>' + esc(o[0]) + "</dt><dd>" + esc(o[1]) + "</dd></div>";
      }).join("");
    };
    var options = dlRows(cmd.options);
    var envRows = dlRows(cmd.env);
    var exitRows = dlRows(cmd.exit);

    var examples = (cmd.examples || []).map(function (ex) {
      var code = Array.isArray(ex) ? ex[0] : ex;
      var note = Array.isArray(ex) ? ex[1] : "";
      return '<div class="example">' +
               '<div class="example-main">' +
                 (note ? '<p class="example-note"># ' + esc(note) + "</p>" : "") +
                 "<pre>" + esc(code) + "</pre>" +
               "</div>" +
               '<button class="copy-btn" type="button">' + esc(S("copy")) + "</button>" +
             "</div>";
    }).join("");

    var seeAlso = (cmd.seeAlso || []).map(function (ref) {
      var target = findCmd(ref);
      var rsec = target && target.sec ? target.sec : 1;
      return '<button class="seealso" type="button" data-cmd="' + esc(ref) + '">' +
             esc(ref) + "(" + rsec + ")</button>";
    }).join('<span class="seealso-sep">, </span>');

    var html =
      '<div class="man-searchbar hidden" id="man-searchbar" role="search">' +
        '<input id="man-search-input" type="search" placeholder="' + esc(S("searchInPagePh")) + '" ' +
          'aria-label="Search in this man page" autocomplete="off" autocapitalize="off" spellcheck="false">' +
        '<span class="man-search-count" id="man-search-count" aria-live="polite"></span>' +
        '<button class="man-nav" id="man-prev" type="button" aria-label="Previous match">&#9650;</button>' +
        '<button class="man-nav" id="man-next" type="button" aria-label="Next match">&#9660;</button>' +
        '<button class="man-nav" id="man-search-close" type="button" aria-label="Close search">&#10005;</button>' +
      "</div>" +
      '<header class="man-head">' +
        '<span class="man-head-side">' + back +
          '<button class="man-find" id="man-print" type="button" aria-label="' + esc(S("print")) + '" title="' + esc(S("printTitle")) + '">' +
          printIcon + "</button>" +
          '<button class="man-find" id="man-find" type="button" aria-label="' + esc(S("find")) + '" title="' + esc(S("findTitle")) + '">' +
          findIcon + "</button>" +
        "</span>" +
        '<span class="man-head-l">' + esc(manId) + "</span>" +
        '<span class="man-head-c">' + esc(S("manual")) + "</span>" +
        '<span class="man-head-r">' + esc(manId) + "</span>" +
      "</header>" +
      '<div class="man-meta"><span class="badge">' + esc(cat.label) + "</span></div>" +
      '<h2 class="modal-cmd" id="modal-title">' + esc(cmd.name) + "</h2>" +
      manSection(SEC.name, '<p class="man-p"><b class="man-name">' + esc(cmd.name) +
        "</b> &mdash; " + esc(cmd.desc) + "</p>") +
      manSection(SEC.synopsis, '<pre class="usage">' + esc(cmd.usage) + "</pre>") +
      manSection(SEC.description, '<p class="man-p">' + esc(cmd.desc2 || cmd.desc) + "</p>") +
      (options ? manSection(SEC.options, '<dl class="man-opts">' + options + "</dl>") : "") +
      (envRows ? manSection(SEC.environment, '<dl class="man-opts man-env">' + envRows + "</dl>") : "") +
      (exitRows ? manSection(SEC.exit, '<dl class="man-opts man-exit">' + exitRows + "</dl>") : "") +
      manSection(SEC.examples, examples) +
      (seeAlso ? manSection(SEC.seealso, '<p class="man-p man-seealso">' + seeAlso + "</p>") : "") +
      '<footer class="man-foot">' + esc(manId) +
        " &nbsp;&mdash;&nbsp; Linux User's Manual &nbsp;&mdash;&nbsp; " + esc(manId) +
      "</footer>" +
      '<p class="print-foot">' + esc(S("printFoot")) + " &middot; " +
        new Date().toLocaleDateString(lang === "id" ? "id-ID" : undefined, { year: "numeric", month: "long", day: "numeric" }) +
      "</p>";

    els.modalBody.innerHTML = html;
    els.modal.scrollTop = 0;
    els.backdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    els.close.focus();
  }

  function openCommand(name, fromModal) {
    var cmd = findCmd(name);
    if (!cmd) return;
    if (fromModal && currentCmd) modalHistory.push(currentCmd.name);
    openModal(cmd);
  }

  function closeModal() {
    els.backdrop.classList.add("hidden");
    document.body.style.overflow = "";
    modalHistory = [];
    currentCmd = null;
    if (lastFocusedCard) { lastFocusedCard.focus(); lastFocusedCard = null; }
  }

  /* ---------- in-page man search (less-style) ---------- */
  function manSearchIsOpen() {
    var bar = document.getElementById("man-searchbar");
    return !!bar && !bar.classList.contains("hidden");
  }

  function openManSearch() {
    var bar = document.getElementById("man-searchbar");
    var input = document.getElementById("man-search-input");
    if (!bar || !input) return;
    bar.classList.remove("hidden");
    input.focus();
    if (input.value) input.select();
  }

  function closeManSearch() {
    var bar = document.getElementById("man-searchbar");
    var input = document.getElementById("man-search-input");
    if (!bar || !input) return;
    bar.classList.add("hidden");
    input.value = "";
    manQuery = "";
    clearManMatches();
    updateManSearchUi();
    var find = document.getElementById("man-find");
    if (find) find.focus();
  }

  function clearManMatches() {
    var marks = els.modalBody.querySelectorAll("mark.mh");
    Array.prototype.forEach.call(marks, function (m) {
      var parent = m.parentNode;
      if (!parent) return;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
    manMatches = [];
    manMatchIdx = -1;
  }

  function runManSearch() {
    clearManMatches();
    var q = manQuery;
    if (q) {
      var ql = q.toLowerCase();
      var walker = document.createTreeWalker(els.modalBody, NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
          var p = node.parentNode;
          if (p && p.closest && p.closest(".man-searchbar")) return NodeFilter.FILTER_REJECT;
          return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function (node) {
        var text = node.nodeValue;
        var lower = text.toLowerCase();
        if (lower.indexOf(ql) === -1) return;
        var frag = document.createDocumentFragment();
        var last = 0;
        var idx = lower.indexOf(ql);
        while (idx !== -1) {
          if (idx > last) frag.appendChild(document.createTextNode(text.slice(last, idx)));
          var mark = document.createElement("mark");
          mark.className = "mh";
          mark.textContent = text.slice(idx, idx + q.length);
          frag.appendChild(mark);
          last = idx + q.length;
          idx = lower.indexOf(ql, last);
        }
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      });
      manMatches = Array.prototype.slice.call(els.modalBody.querySelectorAll("mark.mh"));
      if (manMatches.length) {
        manMatchIdx = 0;
        focusManMatch();
      }
    }
    updateManSearchUi();
  }

  function stepManSearch(dir) {
    if (!manMatches.length) return;
    manMatchIdx = (manMatchIdx + dir + manMatches.length) % manMatches.length;
    focusManMatch();
    updateManSearchUi();
  }

  function focusManMatch() {
    Array.prototype.forEach.call(manMatches, function (m, i) {
      m.classList.toggle("current", i === manMatchIdx);
    });
    var el = manMatches[manMatchIdx];
    if (el && el.scrollIntoView) {
      try { el.scrollIntoView({ block: "center", behavior: "smooth" }); }
      catch (err) { el.scrollIntoView(); }
    }
  }

  function updateManSearchUi() {
    var count = document.getElementById("man-search-count");
    if (!count) return;
    if (!manQuery) { count.textContent = ""; return; }
    count.textContent = manMatches.length
      ? (manMatchIdx + 1) + " / " + manMatches.length
      : "0 / 0";
    count.classList.toggle("none", manMatches.length === 0);
  }

  function copyText(btn, text) {
    function done() {
      btn.textContent = S("copied");
      btn.classList.add("copied");
      setTimeout(function () {
        btn.textContent = S("copy");
        btn.classList.remove("copied");
      }, 1400);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
    }
  }

  /* ---------- events ---------- */
  els.grid.addEventListener("click", function (e) {
    var card = e.target.closest(".card");
    if (!card) return;
    var cmd = findCmd(card.dataset.cmd);
    if (cmd) { lastFocusedCard = card; modalHistory = []; openModal(cmd); }
  });

  els.close.addEventListener("click", closeModal);

  els.backdrop.addEventListener("mousedown", function (e) {
    if (e.target === els.backdrop) closeModal();
  });

  els.modalBody.addEventListener("click", function (e) {
    var btn = e.target.closest(".copy-btn");
    if (btn) {
      var pre = btn.parentElement.querySelector("pre");
      if (pre) copyText(btn, pre.textContent);
      return;
    }
    var link = e.target.closest(".seealso");
    if (link) {
      openCommand(link.dataset.cmd, true);
      return;
    }
    if (e.target.closest("#man-back")) {
      var prev = modalHistory.pop();
      if (prev) openCommand(prev, false);
      else closeModal();
      return;
    }
    if (e.target.closest("#man-find")) { openManSearch(); return; }
    if (e.target.closest("#man-print")) { window.print(); return; }
    if (e.target.closest("#man-next")) { stepManSearch(1); return; }
    if (e.target.closest("#man-prev")) { stepManSearch(-1); return; }
    if (e.target.closest("#man-search-close")) { closeManSearch(); }
  });

  els.modalBody.addEventListener("input", function (e) {
    if (e.target && e.target.id === "man-search-input") {
      manQuery = e.target.value;
      runManSearch();
    }
  });

  els.modalBody.addEventListener("keydown", function (e) {
    if (!e.target || e.target.id !== "man-search-input") return;
    if (e.key === "Enter") {
      e.preventDefault();
      stepManSearch(e.shiftKey ? -1 : 1);
    } else if (e.key === "Escape") {
      e.stopPropagation();
      closeManSearch();
    }
  });

  els.search.addEventListener("input", function () {
    query = els.search.value;
    render();
  });

  document.addEventListener("keydown", function (e) {
    var modalOpen = !els.backdrop.classList.contains("hidden");
    if (e.key === "Escape") {
      if (!modalOpen) return;
      if (manSearchIsOpen()) closeManSearch();
      else closeModal();
      return;
    }
    var typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
    if (e.key === "/" && !typing) {
      e.preventDefault();
      if (modalOpen) openManSearch();
      else els.search.focus();
    }
  });

  /* keep the sticky chips glued under the header (header height varies by device) */
  function positionChips() {
    els.chips.style.top = els.topbar.offsetHeight + "px";
  }
  window.addEventListener("resize", positionChips);

  /* ---------- theme ---------- */
  var THEME_META = { dark: "#282828", light: "#fbf1c7" };

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(t, persist) {
    document.documentElement.setAttribute("data-theme", t);
    if (persist) { try { localStorage.setItem("theme", t); } catch (e) { /* private mode */ } }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_META[t]);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var label = t === "light" ? S("themeToDark") : S("themeToLight");
      btn.setAttribute("title", label);
      btn.setAttribute("aria-label", label);
    }
  }

  /* sync meta/labels with whatever the inline head script decided */
  applyTheme(currentTheme(), false);

  document.getElementById("theme-toggle").addEventListener("click", function () {
    applyTheme(currentTheme() === "light" ? "dark" : "light", true);
  });

  /* follow the system preference while the user has no explicit choice */
  var mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)");
  if (mq && mq.addEventListener) {
    mq.addEventListener("change", function (e) {
      var saved = null;
      try { saved = localStorage.getItem("theme"); } catch (err) { /* private mode */ }
      if (saved !== "dark" && saved !== "light") applyTheme(e.matches ? "light" : "dark", false);
    });
  }

  /* ---------- i18n: apply + switch ---------- */
  function translateCmds(toId) {
    var T = window.IDTXT || {};
    CMDS.forEach(function (c) {
      if (!c._en) {
        c._en = { desc: c.desc, desc2: c.desc2, options: c.options, examples: c.examples, exit: c.exit, env: c.env };
      }
      var t = T[c.name];
      if (toId && t) {
        c.desc = t.d || c._en.desc;
        c.desc2 = t.d2 || c._en.desc2;
        if (t.o && c._en.options) c.options = c._en.options.map(function (o, i) { return [o[0], t.o[i] || o[1]]; });
        if (t.n && c._en.examples) c.examples = c._en.examples.map(function (ex, i) { return [ex[0], t.n[i] != null ? t.n[i] : ex[1]]; });
        if (t.s && c._en.exit) c.exit = c._en.exit.map(function (x, i) { return [x[0], t.s[i] || x[1]]; });
        if (t.v && c._en.env) c.env = c._en.env.map(function (v, i) { return [v[0], t.v[i] || v[1]]; });
      } else {
        c.desc = c._en.desc;
        c.desc2 = c._en.desc2;
        c.options = c._en.options;
        c.examples = c._en.examples;
        c.exit = c._en.exit;
        c.env = c._en.env;
      }
    });
  }

  function applyStatic() {
    document.title = S("title");
    document.documentElement.setAttribute("lang", lang);
    els.search.placeholder = S("searchPh");
    els.search.setAttribute("aria-label", S("searchAria"));
    var eb = document.getElementById("empty-big");
    var eh = document.getElementById("empty-hint");
    if (eb) eb.textContent = S("emptyBig");
    if (eh) eh.textContent = S("emptyHint");
    var ft = document.getElementById("footer-note");
    if (ft) ft.textContent = S("footer");
    var lb = document.getElementById("lang-toggle");
    if (lb) {
      lb.textContent = S("langBtn");
      lb.setAttribute("title", S("langAria"));
      lb.setAttribute("aria-label", S("langAria"));
    }
    var ib = document.getElementById("install-btn");
    if (ib) { ib.setAttribute("title", S("install")); ib.setAttribute("aria-label", S("install")); }
    var cb = document.getElementById("modal-close");
    if (cb) cb.setAttribute("aria-label", S("close"));
  }

  function setLang(l, persist) {
    if (l !== "en" && l !== "id") return;
    lang = l;
    if (persist) { try { localStorage.setItem("lang", l); } catch (e) { /* private mode */ } }
    translateCmds(l === "id");
    applyStatic();
    buildChips();
    render();
    if (currentCmd && !els.backdrop.classList.contains("hidden")) openCommand(currentCmd.name, false);
    applyTheme(currentTheme(), false);
  }

  document.getElementById("lang-toggle").addEventListener("click", function () {
    setLang(lang === "id" ? "en" : "id", true);
  });

  /* ---------- PWA: offline + install ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () { /* unsupported context */ });
    });
  }

  var installBtn = document.getElementById("install-btn");
  var deferredInstall = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredInstall = e;
    if (installBtn) installBtn.hidden = false;
  });
  if (installBtn) {
    installBtn.addEventListener("click", function () {
      if (!deferredInstall) return;
      installBtn.hidden = true;
      deferredInstall.prompt();
      if (deferredInstall.userChoice) {
        deferredInstall.userChoice.then(function () { deferredInstall = null; }).catch(function () {});
      }
    });
  }
  window.addEventListener("appinstalled", function () {
    if (installBtn) installBtn.hidden = true;
  });

  /* ---------- init ---------- */
  translateCmds(lang === "id");
  applyStatic();
  buildChips();
  render();
  positionChips();
})();

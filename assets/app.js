(function () {
  "use strict";

  var LANG_KEY = "lot-gate-lang";
  var DEFAULT_LANG = "en";
  var CATEGORY_ORDER = ["all", "validation", "extraction", "analysis", "automation", "other"];

  var state = {
    lang: DEFAULT_LANG,
    tools: [],
    meta: {},
    i18n: {},
    activeCategory: "all",
    searchQuery: ""
  };

  function t(path) {
    var parts = path.split(".");
    var node = state.i18n;
    for (var i = 0; i < parts.length; i++) {
      if (!node || typeof node !== "object") return path;
      node = node[parts[i]];
    }
    if (node && typeof node === "object" && node[state.lang]) return node[state.lang];
    if (typeof node === "string") return node;
    return path;
  }

  function textFor(field) {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[state.lang] || field.en || field.zh || "";
  }

  function loadLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "zh") return saved;
    } catch (e) {
      /* ignore */
    }
    return DEFAULT_LANG;
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      /* ignore */
    }
  }

  function setLang(lang) {
    state.lang = lang;
    document.documentElement.lang = lang;
    saveLang(lang);
    renderAll();
  }

  function uniqueCategories(tools) {
    var set = {};
    tools.forEach(function (tool) {
      if (tool.category) set[tool.category] = true;
    });
    return Object.keys(set);
  }

  function filterTools() {
    var q = state.searchQuery.trim().toLowerCase();
    return state.tools.filter(function (tool) {
      if (state.activeCategory !== "all" && tool.category !== state.activeCategory) {
        return false;
      }
      if (!q) return true;
      var haystack = [
        textFor(tool.name),
        textFor(tool.summary),
        tool.category || "",
        tool.status || "",
        tool.owner || "",
        (tool.tags || []).join(" ")
      ]
        .join(" ")
        .toLowerCase();
      return haystack.indexOf(q) !== -1;
    });
  }

  function renderHero() {
    var title = document.getElementById("hero-title");
    var subtitle = document.getElementById("hero-subtitle");
    if (title) title.textContent = t("hero.title");
    if (subtitle) subtitle.textContent = t("hero.subtitle");
  }

  function renderLangToggle() {
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var lang = btn.getAttribute("data-lang");
      btn.textContent = t("langToggle." + lang);
      btn.classList.toggle("active", lang === state.lang);
      btn.setAttribute("aria-pressed", lang === state.lang ? "true" : "false");
    });
  }

  function renderStats() {
    var categories = uniqueCategories(state.tools);
    var lastUpdated = state.meta.lastUpdated || "—";

    var labels = document.querySelectorAll("[data-stat-label]");
    labels.forEach(function (el) {
      var key = el.getAttribute("data-stat-label");
      el.textContent = t("kpi." + key);
    });

    var toolCount = document.getElementById("stat-tool-count");
    var categoryCount = document.getElementById("stat-category-count");
    var updated = document.getElementById("stat-last-updated");

    if (toolCount) toolCount.textContent = String(state.tools.length);
    if (categoryCount) categoryCount.textContent = String(categories.length);
    if (updated) updated.textContent = lastUpdated;
  }

  function renderPanelHeader() {
    var title = document.getElementById("panel-title");
    var meta = document.getElementById("panel-meta");
    var search = document.getElementById("tool-search");
    if (title) title.textContent = t("panel.title");
    if (meta) meta.textContent = t("panel.meta");
    if (search) search.placeholder = t("searchPlaceholder");
  }

  function renderTabs() {
    var nav = document.getElementById("category-tabs");
    if (!nav) return;
    nav.innerHTML = "";

    var used = uniqueCategories(state.tools);
    var tabs = CATEGORY_ORDER.filter(function (cat) {
      return cat === "all" || used.indexOf(cat) !== -1;
    });

    tabs.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tab" + (state.activeCategory === cat ? " active" : "");
      btn.textContent = t("categories." + cat);
      btn.addEventListener("click", function () {
        state.activeCategory = cat;
        renderTabs();
        renderToolGrid();
      });
      nav.appendChild(btn);
    });
  }

  function renderToolGrid() {
    var grid = document.getElementById("tool-grid");
    if (!grid) return;

    var filtered = filterTools();
    grid.innerHTML = "";

    if (filtered.length === 0) {
      var empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = t("empty.noResults");
      grid.appendChild(empty);
      return;
    }

    filtered.forEach(function (tool) {
      var card = document.createElement("article");
      card.className = "tool-card" + (tool.status === "deprecated" ? " is-deprecated" : "");

      var header = document.createElement("div");
      header.className = "tool-card-header";

      var h3 = document.createElement("h3");
      h3.textContent = textFor(tool.name);
      header.appendChild(h3);

      var statusTag = document.createElement("span");
      statusTag.className = "tag status-" + (tool.status || "ga");
      statusTag.textContent = t("status." + (tool.status || "ga"));
      header.appendChild(statusTag);

      var summary = document.createElement("p");
      summary.className = "tool-summary";
      summary.textContent = textFor(tool.summary);

      var meta = document.createElement("div");
      meta.className = "tool-meta";
      meta.textContent =
        t("card.owner") +
        ": " +
        (tool.owner || "DT") +
        " · " +
        t("categories." + (tool.category || "other"));

      var tagsWrap = document.createElement("div");
      tagsWrap.className = "tool-tags";
      (tool.tags || []).forEach(function (tag) {
        var tagEl = document.createElement("span");
        tagEl.className = "tag";
        tagEl.textContent = tag;
        tagsWrap.appendChild(tagEl);
      });

      var link = document.createElement("a");
      link.className = "btn";
      link.textContent = t("card.openTool");
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      if (tool.status === "deprecated") {
        link.classList.add("is-disabled");
        link.href = "#";
        link.setAttribute("aria-disabled", "true");
      } else {
        link.href = tool.url;
      }

      card.appendChild(header);
      card.appendChild(summary);
      card.appendChild(meta);
      if ((tool.tags || []).length) card.appendChild(tagsWrap);
      card.appendChild(link);
      grid.appendChild(card);
    });
  }

  function renderFooter() {
    var disclaimer = document.getElementById("footer-disclaimer");
    var version = document.getElementById("footer-version");
    if (disclaimer) disclaimer.textContent = t("footer.disclaimer");
    if (version) {
      var v =
        typeof window.LOT_GATE_VERSION !== "undefined" ? window.LOT_GATE_VERSION : "—";
      version.textContent = t("footer.version") + " " + v;
    }
  }

  function renderAll() {
    renderHero();
    renderLangToggle();
    renderStats();
    renderPanelHeader();
    renderTabs();
    renderToolGrid();
    renderFooter();
  }

  function showError(message) {
    var grid = document.getElementById("tool-grid");
    if (!grid) return;
    grid.innerHTML = "";
    var err = document.createElement("div");
    err.className = "error-state";
    err.textContent = message;
    grid.appendChild(err);
  }

  function bindEvents() {
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });

    var search = document.getElementById("tool-search");
    if (search) {
      search.addEventListener("input", function (e) {
        state.searchQuery = e.target.value;
        renderToolGrid();
      });
    }
  }

  function init(data) {
    state.tools = data.tools.tools || [];
    state.meta = data.tools.meta || {};
    state.i18n = data.i18n || {};
    state.lang = loadLang();
    document.documentElement.lang = state.lang;
    bindEvents();
    renderAll();
  }

  Promise.all([
    fetch("data/tools.json").then(function (r) {
      if (!r.ok) throw new Error("tools.json");
      return r.json();
    }),
    fetch("data/i18n.json").then(function (r) {
      if (!r.ok) throw new Error("i18n.json");
      return r.json();
    })
  ])
    .then(function (results) {
      init({ tools: results[0], i18n: results[1] });
    })
    .catch(function () {
      state.lang = loadLang();
      document.documentElement.lang = state.lang;
      bindEvents();
      showError(
        state.lang === "zh"
          ? "无法加载工具目录，请刷新页面。"
          : "Unable to load the tool catalog. Please refresh the page."
      );
      renderLangToggle();
      renderFooter();
    });
})();

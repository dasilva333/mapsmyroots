// src/main.js
import "./polyfills.js"; // optional if you need any
import "./legacy/i18n.js";
import "./legacy/language-switcher.js";
import "./legacy/searchableSelect.js";
import "./legacy/modal.js";
import "./legacy/table.js";
import "./legacy/exporter.js";
import "./legacy/notifications.js";
import "./legacy/search.js";
import "./legacy/tree.js"; // this is the one that should create window.treeCore

import { waitForTreeCore } from "./hooks/waitForTreeCore.js";
import { initUI } from "./hooks/uiInit.js";

document.addEventListener("DOMContentLoaded", async () => {
  if (window.i18n?.init) {
    try { await window.i18n.init(); } catch {}
  }
  await waitForTreeCore();         // waits until legacy tree sets window.treeCore
  initUI();                        // cache indicator, view toggle, zoom, etc.
});

// Wire up controls without polluting global scope.
export function initUI() {
  setupCacheIndicator();
  setupZoom();
  setupViewToggle();
}

function setupCacheIndicator() {
  const indicator = document.getElementById("cacheIndicator");
  const saveIndicator = document.getElementById("saveIndicator");
  const treeNameInput = document.getElementById("treeNameInput");
  const personCountEl = document.getElementById("personCount");
  const connectionCountEl = document.getElementById("connectionCount");

  const updateStats = () => {
    const nodes = window.treeCore?.renderer?.nodes?.size ?? 0;
    const conns = window.treeCore?.renderer?.connections?.length ?? 0;
    personCountEl.textContent = nodes;
    connectionCountEl.textContent = conns;
  };

  indicator?.addEventListener("click", () => {
    indicator.classList.toggle("expanded");
    if (indicator.classList.contains("expanded")) updateStats();
  });

  treeNameInput?.addEventListener("change", () => {
    const name = treeNameInput.value.trim() || "My Family Tree";
    localStorage.setItem("familyTree_treeName", name);
  });

  const saved = localStorage.getItem("familyTree_treeName");
  if (saved) treeNameInput.value = saved;

  const updateSaved = () => {
    const t = new Date().toLocaleTimeString();
    saveIndicator.textContent = `Saved: ${t}`;
  };

  window.addEventListener("storage", (e) => {
    if (e.key?.includes("familyTreeCanvas")) updateSaved();
  });

  setTimeout(updateStats, 1000);
}

function setupZoom() {
  const zoomIn = document.getElementById("zoomInControl");
  const zoomOut = document.getElementById("zoomOutControl");
  const display = document.getElementById("zoomDisplay");

  const wheelAtCenter = (deltaY) => {
    const canvas = document.querySelector("#graphicView canvas");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const evt = new WheelEvent("wheel", {
      deltaY,
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
      bubbles: true,
      cancelable: true
    });
    canvas.dispatchEvent(evt);
    // If treeCore exposes zoom level, reflect it. Otherwise keep display as a placeholder.
    if (window.treeCore?.getZoomPercent) {
      display.textContent = `${Math.round(window.treeCore.getZoomPercent())}%`;
    }
  };

  zoomIn?.addEventListener("click", () => wheelAtCenter(-100));
  zoomOut?.addEventListener("click", () => wheelAtCenter(100));
}

function setupViewToggle() {
  const viewBtn = document.getElementById("viewToggle");
  const graphic = document.getElementById("graphicView");
  const table = document.getElementById("tableView");
  const tableBuild = window?.rebuildTableView || window?.table?.rebuildTableView;

  let mode = "graphic";
  viewBtn?.addEventListener("click", () => {
    if (mode === "graphic") {
      mode = "table";
      graphic.classList.add("hidden");
      table.classList.remove("hidden");
      setTimeout(() => tableBuild?.(), 50);
    } else {
      mode = "graphic";
      table.classList.add("hidden");
      graphic.classList.remove("hidden");
      // if legacy tree needs a refresh call, do it here (optional)
    }
  });
}

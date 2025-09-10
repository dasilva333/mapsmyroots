// Resolves when window.treeCore exists and looks sane.
export function waitForTreeCore(timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const start = performance.now();
    const t = setInterval(() => {
      const ready = window.treeCore && (window.treeCore.renderer || window.treeCore.centerSelectedNode);
      if (ready) {
        clearInterval(t);
        resolve();
      } else if (performance.now() - start > timeoutMs) {
        clearInterval(t);
        reject(new Error("treeCore not initialized in time"));
      }
    }, 50);
  });
}

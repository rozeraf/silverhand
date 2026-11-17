/**
 * Best-effort guess that the device is too weak for the full effect set
 * (e.g. Exynos 7904 with 3 GB of RAM). Used only as the default of the
 * "performance mode" setting; the user can always override it.
 */
export const detectLowEnd = (): boolean => {
  if (typeof navigator === "undefined" || typeof matchMedia === "undefined") {
    return false;
  }
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return true;

  const memory = nav.deviceMemory; // Chromium only, rounded down to 0.25–8
  const cores = nav.hardwareConcurrency ?? 8;
  const touch = matchMedia("(pointer: coarse)").matches;

  if (memory !== undefined && memory <= 2) return true;
  if (touch && memory !== undefined && memory <= 4) return true;
  return cores <= 4;
};

/**
 * Firefox and its forks (Zen, LibreWolf, Floorp…). Gecko's WebRender can't run
 * the SVG displacement filter behind CRT warp on the GPU: it re-renders the
 * whole page on the CPU every frame, so warp drops to a few FPS there. Feature
 * test rather than user agent, so forks with their own UA are caught too.
 */
export const isGecko = (): boolean =>
  typeof CSS !== "undefined" && CSS.supports("-moz-appearance", "none");

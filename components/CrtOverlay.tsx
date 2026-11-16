import { createPortal } from "react-dom";

/**
 * Lightweight CRT look: one static phosphor/vignette layer plus
 * transform- and opacity-only animations, so the compositor handles it without
 * repainting the page. No WebGL and no SVG filter over the DOM (see CrtShader
 * for the heavy "geometry warp" mode). Styles live in index.html (.crt-lite*).
 */
const CrtOverlay = () =>
  createPortal(
    <div className="crt-lite" aria-hidden="true">
      <div className="crt-lite__scanlines" />
      <div className="crt-lite__band" />
    </div>,
    document.body,
  );

export default CrtOverlay;

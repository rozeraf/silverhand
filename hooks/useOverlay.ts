import { useEffect } from "react";

let locks = 0;

/** Stops the page behind an overlay from scrolling. Safe to nest. */
export const useScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active) return;
    locks += 1;
    document.documentElement.classList.add("scroll-locked");
    return () => {
      locks -= 1;
      if (locks === 0) {
        document.documentElement.classList.remove("scroll-locked");
      }
    };
  }, [active]);
};

/** Calls `onEscape` while `active`; give it the handler of the topmost overlay. */
export const useEscape = (active: boolean, onEscape: () => void) => {
  useEffect(() => {
    if (!active) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });
};

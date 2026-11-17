import { useEffect } from "react";

/** Johnny's marker: notes, strike-throughs and rings. */
const MARKS = ".scrawl, .struck, .circled";

/** How long one mark takes to "write", in ms. */
const durationOf = (el: Element) => {
  if (el.classList.contains("struck")) return 300;
  if (el.classList.contains("circled")) return 480;
  // Notes: a quick scribble per character, within sane bounds.
  const chars = (el.textContent ?? "").trim().length;
  return Math.min(900, Math.max(280, chars * 24));
};

/** The hand moving on to the next mark. */
const GAP_MS = 70;
/** Past this much waiting, marks are written twice as fast to catch up. */
const BACKLOG_MS = 1200;

/**
 * Writes Johnny's marks as they scroll into view instead of showing them
 * ready-made. Each mark plays once, at a fixed pace, when it enters the
 * screen, so scroll speed doesn't matter; marks that enter together are
 * written one after another in document order (a strike-through, then the
 * note next to it). Marks added later (lazy sections, the classified file)
 * are picked up too. CSS for the look lives in main.css under
 * html[data-marker]; without that attribute the marks are simply static.
 */
export const useMarkerWriting = (active: boolean) => {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!active || reduced || typeof IntersectionObserver === "undefined") {
      return;
    }

    root.dataset.marker = "write";
    let queueEnd = 0;

    const io = new IntersectionObserver(
      (entries) => {
        const now = performance.now();
        // Strictly one at a time: notes on the same line used to overlap and
        // read as written all at once.
        let start = Math.max(now, queueEnd);
        entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
              ? -1
              : 1,
          )
          .forEach((el) => {
            io.unobserve(el);
            const rushed = start - now > BACKLOG_MS;
            const duration = durationOf(el) * (rushed ? 0.5 : 1);
            el.style.setProperty("--write-delay", `${Math.round(start - now)}ms`);
            el.style.setProperty("--write-dur", `${duration}ms`);
            el.classList.add("is-written");
            start += duration + (rushed ? 0 : GAP_MS);
          });
        queueEnd = start;
      },
      { threshold: 0.6, rootMargin: "0px 0px -8% 0px" },
    );

    const watch = (scope: ParentNode) =>
      scope.querySelectorAll<HTMLElement>(MARKS).forEach((el) => {
        if (!el.classList.contains("is-written")) io.observe(el);
      });
    watch(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(MARKS)) io.observe(node);
          watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      delete root.dataset.marker;
      // Back to blank, so the next switch to Johnny's view writes them again.
      document.querySelectorAll<HTMLElement>(MARKS).forEach((el) => {
        el.classList.remove("is-written");
        el.style.removeProperty("--write-delay");
        el.style.removeProperty("--write-dur");
      });
    };
  }, [active]);
};

import React, { useEffect, useRef, useState } from "react";
import { useSettings } from "../context/SettingsContext";

/** Plain text, text with a class, or "\n" for a line break. */
type Part = string | [text: string, className: string];

interface KineticProps {
  parts: Part[];
  as?: "span" | "h3" | "blockquote" | "p";
  className?: string;
  /** Delay between words, ms. */
  step?: number;
}

/**
 * Words land one at a time when the line scrolls into view, the way lyrics
 * are cut in fan edits. Screen readers get the whole sentence at once.
 */
const Kinetic = ({
  parts,
  as: Tag = "span",
  className = "",
  step = 95,
}: KineticProps) => {
  const { motion: enableAnimations } = useSettings();
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!enableAnimations || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enableAnimations]);

  let index = 0;
  const label = parts
    .map((part) => (typeof part === "string" ? part : part[0]))
    .join(" ")
    .replace(/\s+/g, " ");

  return (
    <Tag
      ref={ref as React.Ref<never>}
      aria-label={label}
      className={`kinetic ${on ? "kinetic--on" : ""} ${enableAnimations ? "" : "kinetic--static"} ${className}`}
      style={{ "--step": `${step}ms` } as React.CSSProperties}
    >
      {parts.map((part, p) => {
        if (part === "\n") return <br key={p} />;
        const [text, wordClass] = typeof part === "string" ? [part, ""] : part;
        return text
          .split(" ")
          .filter(Boolean)
          .map((word, w) => (
            <span
              key={`${p}-${w}`}
              aria-hidden="true"
              className={`kinetic__w ${wordClass}`}
              style={{ "--i": index++ } as React.CSSProperties}
            >
              {word}
            </span>
          ));
      })}
    </Tag>
  );
};

export default Kinetic;

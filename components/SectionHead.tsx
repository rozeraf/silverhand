import React from "react";
import RevealOnScroll from "./RevealOnScroll";

interface SectionHeadProps {
  index: string;
  kicker: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}

/** Shared section header: tape-side index, kicker and a poster-sized title. */
const SectionHead = ({
  index,
  kicker,
  title,
  aside,
  className = "",
}: SectionHeadProps) => (
  <RevealOnScroll className={`mb-12 md:mb-20 ${className}`}>
    <div className="flex items-center justify-between gap-6 mb-5">
      <span className="section-index">
        {index} — {kicker}
      </span>
      {aside && (
        <span className="label hidden text-right opacity-60 sm:inline">
          {aside}
        </span>
      )}
    </div>
    <h2 className="display section-title">{title}</h2>
  </RevealOnScroll>
);

export default SectionHead;

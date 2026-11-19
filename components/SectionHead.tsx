import React from "react";
import RevealOnScroll from "./RevealOnScroll";

interface SectionHeadProps {
  index: string;
  kicker: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  /** Intro paragraph set to the right of the title on wide screens. */
  lede?: React.ReactNode;
  className?: string;
}

/** Shared section header: tape-side index, kicker and a poster-sized title. */
const SectionHead = ({
  index,
  kicker,
  title,
  aside,
  lede,
  className = "",
}: SectionHeadProps) => (
  <RevealOnScroll className={`mb-12 md:mb-20 ${className}`}>
    <div className="mb-5 flex items-center justify-between gap-6">
      <span className="section-index">
        {index} — {kicker}
      </span>
      {aside && (
        <span className="label hidden text-right opacity-60 sm:inline">
          {aside}
        </span>
      )}
    </div>
    <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
      <h2 className="display section-title">{title}</h2>
      {lede && (
        <div className="max-w-xl text-base leading-relaxed opacity-80 md:text-lg lg:pb-3">
          {lede}
        </div>
      )}
    </div>
  </RevealOnScroll>
);

export default SectionHead;

import React from "react";

interface SectionTransitionProps {
  direction?: "in" | "out";
}

const SectionTransition = ({
  direction = "in",
}: SectionTransitionProps) => (
  <div
    className="relative h-12 w-full overflow-hidden bg-transparent sm:h-14"
    aria-hidden="true"
  >
    <svg
      className={`absolute inset-x-0 h-8 w-full text-[#ff003c] sm:h-9 ${
        direction === "out" ? "top-0 rotate-180" : "bottom-0"
      }`}
      viewBox="0 0 1600 32"
      preserveAspectRatio="none"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M0 32V25H145L154 16H190L195 21H205L214 10H226L239 21H452L458 17L464 21H611L620 8L633 21H770L776 16L783 21H858L867 11L878 21H1013L1023 16L1035 21H1258L1267 10H1282L1292 21H1600V32H0Z"
      />
      <path
        fill="#050505"
        d="M248 21h7l-3.5 5ZM501 21h8l-4 6ZM745 21h7l-3.5 5ZM1008 21h6v6h-2v-4h-4ZM1020 21h3v5h-3ZM1308 21h8l-4 6Z"
      />
      <path
        d="M0 25H145L154 16H190L195 21H205L214 10H226L239 21H452L458 17L464 21H611L620 8L633 21H770L776 16L783 21H858L867 11L878 21H1013L1023 16L1035 21H1258L1267 10H1282L1292 21H1600"
        fill="none"
        stroke="#050505"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  </div>
);

export default SectionTransition;

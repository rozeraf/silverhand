import React from "react";
import { ArrowDown } from "lucide-react";
import { ASSETS } from "../assets";
import SamuraiButton from "./SamuraiButton";

interface HeroProps {
  onOpenSamurai: () => void;
}

const TICKER = [
  "Wake the f**k up, Samurai",
  "We have a city to burn",
  "Never fade away",
  "Chippin' in",
];

const Ticker = () => (
  <span>
    {TICKER.map((line) => (
      <React.Fragment key={line}>
        <span>{line}</span>
        <span aria-hidden="true">✦</span>
      </React.Fragment>
    ))}
  </span>
);

const Hero = ({ onOpenSamurai }: HeroProps) => (
  <section id="hero" className="hero">
    <div
      className="hero__photo"
      style={{ backgroundImage: `url("${ASSETS.heroBackground}")` }}
    />
    <div className="hero__duotone" />
    <div className="hero__halftone" />
    <div className="hero__shade" />

    <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-end px-5 pb-10 pt-28 md:px-10 md:pb-14">
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 md:mb-8">
        <span className="section-index text-blood">Engram 01</span>
        <span className="label text-bone/70">
          Robert John Linder · 1988 — 2023 · Night City
        </span>
      </div>

      <h1 className="display hero__title">
        <span className="block">Johnny</span>
        <span className="hero__title-red glitch block" data-text="Silverhand">
          Silverhand
        </span>
      </h1>

      <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
        <div>
          <p className="max-w-xl border-l-2 border-blood pl-5 text-base leading-relaxed text-bone/85 md:text-lg">
            Рокербой. <span className="struck">Террорист.</span> Призрак в
            машине.
            <br />
            Цифровая тень, которая сожжёт этот город дотла.
          </p>
          <p className="scrawl scrawl--dark ml-5 mt-3">
            «террорист» — их слово. не моё.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#bio" className="btn">
              Запустить энграмму <ArrowDown size={16} />
            </a>
            <SamuraiButton onClick={onOpenSamurai} />
          </div>
        </div>

        <div className="hidden items-end justify-end gap-6 md:flex">
          <svg
            viewBox="0 0 200 200"
            className="h-36 w-36 text-bone lg:h-44 lg:w-44"
            aria-hidden="true"
          >
            <defs>
              <path
                id="stamp-circle"
                d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
              />
            </defs>
            <text
              className="stamp-ring"
              style={{ transformOrigin: "100px 100px" }}
              fill="currentColor"
              fontFamily="JetBrains Mono, monospace"
              fontSize="14.5"
              fontWeight="700"
              letterSpacing="3.4"
            >
              <textPath href="#stamp-circle">
                NEVER FADE AWAY ✦ SAMURAI ✦ NIGHT CITY ✦ 2077 ✦
              </textPath>
            </text>
            <circle cx="100" cy="100" r="46" fill="#ff003c" />
            <text
              x="100"
              y="117"
              textAnchor="middle"
              fill="#000"
              fontSize="46"
              fontWeight="700"
            >
              侍
            </text>
          </svg>
        </div>
      </div>
    </div>

    <div className="marquee relative z-10 bg-acid py-2.5 font-display text-lg font-bold uppercase tracking-wide text-black md:text-xl">
      <div className="marquee__track" aria-hidden="true">
        <Ticker />
        <Ticker />
      </div>
    </div>
  </section>
);

export default Hero;

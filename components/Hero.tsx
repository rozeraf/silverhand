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
    {/* The page is display:none behind the boot terminal, and browsers don't
        fetch CSS backgrounds there; preload so the photo is ready when the
        terminal closes. React hoists these into <head>. */}
    <link
      rel="preload"
      as="image"
      href={ASSETS.heroBackgroundSmall}
      media="(max-width: 639.98px)"
    />
    <link
      rel="preload"
      as="image"
      href={ASSETS.heroBackground}
      media="(min-width: 640px)"
    />
    {/* The red duotone is baked into the image: no CSS filter or blend mode. */}
    <div
      className="hero__photo"
      style={
        {
          "--hero": `url("${ASSETS.heroBackground}")`,
          "--hero-sm": `url("${ASSETS.heroBackgroundSmall}")`,
        } as React.CSSProperties
      }
    />
    <div className="hero__halftone" />
    <div className="hero__shade" />

    <div className="relative z-10 mx-auto flex w-full max-w-[93.75rem] flex-1 flex-col justify-end px-5 pb-10 pt-28 md:px-10 md:pb-14">
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
          {/* The ring is its own element so its rotation stays on the compositor. */}
          <div className="relative h-36 w-36 lg:h-44 lg:w-44" aria-hidden="true">
            <svg
              viewBox="0 0 200 200"
              className="stamp-ring absolute inset-0 h-full w-full text-bone"
            >
              <defs>
                <path
                  id="stamp-circle"
                  d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                />
              </defs>
              <text
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
            </svg>
            <span className="absolute inset-[27%] flex items-center justify-center rounded-full bg-blood pb-[0.08em] text-[2.6rem] font-bold leading-none text-black lg:text-[3.2rem]">
              侍
            </span>
          </div>
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

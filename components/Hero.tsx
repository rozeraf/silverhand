import React, { useEffect, useRef } from "react";
import GlitchText from "./GlitchText";
import { ChevronDown, Crosshair, Battery, Wifi, MapPin } from "lucide-react";
import { ASSETS } from "../assets";
import SamuraiButton from "./SamuraiButton";

interface HeroProps {
  onOpenSamurai: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenSamurai }) => {
  const coordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCoords = (e: MouseEvent) => {
      if (!coordsRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      const latOffset = (y / window.innerHeight - 0.5) * 0.01;
      const lngOffset = (x / window.innerWidth - 0.5) * 0.01;

      const lat = (35.6895 - latOffset).toFixed(4);
      const lng = (139.6917 + lngOffset).toFixed(4);

      coordsRef.current.innerText = `COORDS: ${lat}° N, ${lng}° E`;
    };

    window.addEventListener("mousemove", updateCoords);
    return () => window.removeEventListener("mousemove", updateCoords);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Dynamic Background Image - Managed in assets.ts */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear hover:scale-105"
        style={{
          backgroundImage: `url("${ASSETS.heroBackground}")`,
          filter:
            "brightness(60%) contrast(110%) sepia(20%) hue-rotate(-10deg)",
        }}
      ></div>

      {/* Heavy Red/Dark Overlay Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0b0b0b] via-[#ff003c]/10 to-[#00f0ff]/10"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/80"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px]"></div>

      {/* Decorative Floating Kanji/Text Background - Hidden on mobile, subtle on tablet */}
      <div className="absolute top-1/4 right-4 md:right-10 text-[8rem] md:text-[15rem] lg:text-[20rem] font-black text-white/5 leading-none select-none pointer-events-none overflow-hidden font-cyber z-0 opacity-0 md:opacity-100 transition-opacity">
        SAMURAI
      </div>

      {/* HUD Elements - Top Left (Simplified on Mobile) */}
      <div className="absolute top-20 left-4 md:top-28 md:left-12 flex flex-col gap-2 z-20 pointer-events-none mix-blend-screen">
        <div className="hidden md:flex items-center gap-2 text-[#fcee0a]">
          <Crosshair size={20} className="animate-spin-slow" />
          <span className="font-mono text-xs tracking-widest">
            TARGET: ARASAKA_TOWER
          </span>
        </div>
        <div className="w-16 md:w-32 h-1 bg-[#ff003c]"></div>
        <div
          ref={coordsRef}
          className="font-mono text-[10px] md:text-xs text-[#00f0ff] opacity-70 tabular-nums min-w-[140px] md:min-w-[180px]"
        >
          COORDS: 35.6895° N, 139.6917° E
        </div>
      </div>

      {/* HUD Elements - Top Right (Hidden on small mobile) */}
      <div className="hidden sm:flex absolute top-20 right-4 md:top-28 md:right-12 items-center gap-4 z-20 font-mono text-xs text-[#fcee0a] pointer-events-none mix-blend-screen">
        <div className="flex items-center gap-1">
          <Wifi size={16} /> <span className="hidden md:inline">NET: CONN</span>
        </div>
        <div className="flex items-center gap-1">
          <Battery size={16} />{" "}
          <span className="hidden md:inline">MEM: 86%</span>
        </div>
        <div className="border border-[#fcee0a] px-2 py-0.5 animate-pulse">
          REC
        </div>
      </div>

      {/* Mobile Location Badge (Replacement for top-right HUD) */}
      <div className="sm:hidden absolute top-20 right-4 z-20">
        <div className="flex items-center gap-1 text-[#ff003c] font-mono text-[10px] border border-[#ff003c] px-2 py-1 bg-black/50 backdrop-blur-sm">
          <MapPin size={10} /> NC_CITY_CENTER
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-start justify-center h-full pt-16 md:pt-20">
        {/* Decorative Label */}
        <div className="mb-4 md:mb-8 flex items-center gap-4 relative">
          <div className="bg-[#fcee0a] text-black px-3 py-1 md:px-4 font-bold font-cyber text-xs md:text-sm tracking-widest clip-corner-inverse transform -skew-x-12 relative z-10">
            <span className="block transform skew-x-12">NIGHT CITY LEGEND</span>
          </div>
          <div className="h-[1px] w-12 md:w-20 bg-[#fcee0a] shadow-[0_0_10px_#fcee0a]"></div>
        </div>

        {/* Massive Typography - Fluid Scaling */}
        <div className="flex flex-col relative w-full">
          {/* Main Glitch Text: JOHNNY */}
          <div className="relative z-10 mix-blend-screen">
            <GlitchText
              text="JOHNNY"
              as="h1"
              className="font-black leading-[0.85] tracking-tighter"
              color="white"
              enableScramble={true}
            />
            {/* Custom CSS class for fluid font size injection via style, as tailwind arbitrary values can be messy for clamp */}
            <style>{`
                 #hero h1 { font-size: clamp(4rem, 16vw, 11rem); }
               `}</style>
          </div>

          {/* Overlapping Outline Text: SILVERHAND */}
          <div className="ml-2 md:ml-24 -mt-2 md:-mt-6 relative z-0 w-full">
            <GlitchText
              text="SILVERHAND"
              as="h1"
              className="font-black leading-none tracking-tighter uppercase italic break-words"
              color="blue"
              variant="outline"
            />
            <style>{`
                 #hero .text-stroke-cyan { font-size: clamp(2.5rem, 10vw, 10rem); }
                 @media (max-width: 400px) {
                   #hero .text-stroke-cyan { font-size: clamp(2rem, 12vw, 4rem); }
                 }
               `}</style>
          </div>
        </div>

        {/* Subtitle / Description */}
        <div className="mt-8 md:mt-12 max-w-xl border-l-2 border-[#ff003c] pl-4 md:pl-6 ml-1 md:ml-4 bg-black/60 backdrop-blur-sm p-4 relative overflow-hidden group z-20">
          <div className="absolute inset-0 bg-[#ff003c]/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          <h2 className="text-xl md:text-2xl font-cyber text-[#fcee0a] mb-2 relative">
            ЭНГРАММА
          </h2>
          <p className="text-gray-300 font-mono text-xs md:text-sm lg:text-base leading-relaxed relative">
            Рокербой. Террорист. Призрак в машине. <br />
            Цифровая тень, которая сожжет этот город дотла.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 md:mt-12 ml-1 md:ml-4 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto relative z-30">
          <a
            href="#bio"
            className="group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-transparent overflow-hidden border border-[#fcee0a] min-w-[200px] w-full sm:w-auto cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#fcee0a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

            {/* Text */}
            <span className="relative font-cyber font-bold text-[#fcee0a] group-hover:text-black text-base md:text-lg tracking-widest flex items-center justify-center gap-2 transition-colors">
              INITIATE
              <ChevronDown
                size={20}
                className="group-hover:translate-y-1 transition-transform"
              />
            </span>
          </a>

          {/* New SAMURAI Button */}
          <div className="w-full sm:w-auto relative z-30">
            <SamuraiButton
              onClick={onOpenSamurai}
              className="w-full sm:w-auto h-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#0b0b0b] to-transparent z-10 pointer-events-none"></div>

      {/* Decorative Japanese Text Bottom Right */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 text-[#ff003c] opacity-80 writing-vertical text-2xl md:text-4xl font-bold select-none font-sans pointer-events-none">
        侍
      </div>
    </section>
  );
};

export default Hero;

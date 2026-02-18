import React, { useEffect, useRef } from "react";
import GlitchText from "./GlitchText";
import { ChevronDown, Crosshair, Battery, Wifi } from "lucide-react";
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
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Dynamic Background Image - Managed in assets.ts */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
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
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Decorative Floating Kanji/Text Background */}
      <div className="absolute top-1/4 right-10 text-[20rem] font-black text-white/5 leading-none select-none pointer-events-none hidden lg:block overflow-hidden font-cyber z-0">
        SAMURAI
      </div>

      {/* HUD Elements - Top Left */}
      <div className="absolute top-28 left-6 md:left-12 flex flex-col gap-2 z-20 pointer-events-none mix-blend-screen">
        <div className="flex items-center gap-2 text-[#fcee0a]">
          <Crosshair size={20} className="animate-spin-slow" />
          <span className="font-mono text-xs tracking-widest">
            TARGET: ARASAKA_TOWER
          </span>
        </div>
        <div className="w-32 h-1 bg-[#ff003c]"></div>
        <div
          ref={coordsRef}
          className="font-mono text-xs text-[#00f0ff] opacity-70 tabular-nums min-w-[180px]"
        >
          COORDS: 35.6895° N, 139.6917° E
        </div>
      </div>

      {/* HUD Elements - Top Right */}
      <div className="absolute top-28 right-6 md:right-12 flex items-center gap-4 z-20 font-mono text-xs text-[#fcee0a] pointer-events-none mix-blend-screen">
        <div className="flex items-center gap-1">
          <Wifi size={16} /> NET: CONN
        </div>
        <div className="flex items-center gap-1">
          <Battery size={16} /> MEM: 86%
        </div>
        <div className="border border-[#fcee0a] px-2 py-0.5 animate-pulse">
          REC
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-start justify-center h-full pt-40 md:pt-20">
        {/* Decorative Label */}
        <div className="mb-8 flex items-center gap-4 relative">
          <div className="bg-[#fcee0a] text-black px-4 py-1 font-bold font-cyber text-sm tracking-widest clip-corner-inverse transform -skew-x-12 relative z-10">
            <span className="block transform skew-x-12">NIGHT CITY LEGEND</span>
          </div>
          <div className="h-[1px] w-20 bg-[#fcee0a] shadow-[0_0_10px_#fcee0a]"></div>
        </div>

        {/* Massive Typography */}
        <div className="flex flex-col relative">
          <GlitchText
            text="JOHNNY"
            as="h1"
            className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter z-10 mix-blend-screen"
            color="white"
            enableScramble={true}
          />

          {/* Overlapping Outline Text */}
          <div className="md:ml-24 -mt-2 md:-mt-6 relative z-0">
            <GlitchText
              text="SILVERHAND"
              as="h1"
              className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-none tracking-tighter uppercase italic"
              color="blue"
              variant="outline"
            />
          </div>
        </div>

        {/* Subtitle / Description */}
        <div className="mt-8 max-w-xl border-l-2 border-[#ff003c] pl-6 ml-2 md:ml-4 bg-black/60 backdrop-blur-sm p-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#ff003c]/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          <h2 className="text-2xl font-cyber text-[#fcee0a] mb-2 relative">
            ЭНГРАММА
          </h2>
          <p className="text-gray-300 font-mono text-sm md:text-base leading-relaxed relative">
            Рокербой. Террорист. Призрак в машине. <br />
            Цифровая тень, которая сожжет этот город дотла.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 ml-2 md:ml-4 flex flex-col sm:flex-row gap-6">
          <a
            href="#bio"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent overflow-hidden border border-[#fcee0a] min-w-[200px]"
          >
            <div className="absolute inset-0 bg-[#fcee0a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            {/* Text */}
            <span className="relative font-cyber font-bold text-[#fcee0a] group-hover:text-black text-lg tracking-widest flex items-center gap-2 transition-colors">
              INITIATE
              <ChevronDown
                size={20}
                className="group-hover:translate-y-1 transition-transform"
              />
            </span>
          </a>

          {/* New SAMURAI Button */}
          <SamuraiButton onClick={onOpenSamurai} />
        </div>
      </div>

      {/* Bottom Bar Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0b0b0b] to-transparent z-10"></div>

      {/* Decorative Japanese Text Bottom Right */}
      <div className="absolute bottom-8 right-8 z-20 text-[#ff003c] opacity-80 writing-vertical text-4xl font-bold hidden md:block select-none font-sans">
        侍
      </div>
    </section>
  );
};

export default Hero;
import React from "react";
import { Shield, Crosshair, Cpu, AlertTriangle, Target } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import GlitchText from "./GlitchText";
import { ASSETS } from "../assets";

const Arsenal: React.FC = () => {
  return (
    <section
      id="arsenal"
      className="py-16 md:py-24 bg-[#080808] relative border-t border-[#ff003c]/20 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute left-0 top-1/4 w-1 md:w-2 h-24 md:h-32 bg-[#ff003c] z-10"></div>
      <div className="absolute right-0 bottom-1/4 w-1 md:w-2 h-24 md:h-32 bg-[#00f0ff] z-10"></div>

      {/* Background Vector Watermark - Adjusted for mobile */}
      <div className="absolute -right-20 -top-20 text-white opacity-[0.03] pointer-events-none transform rotate-12 z-0 hidden md:block">
        <Target size={600} strokeWidth={0.5} />
      </div>
      <div className="absolute -left-20 bottom-0 text-[#ff003c] opacity-[0.02] pointer-events-none transform -rotate-12 z-0 hidden md:block">
        <Crosshair size={500} strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <RevealOnScroll className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[2px] w-8 md:w-12 bg-[#fcee0a]"></div>
            <span className="text-[#fcee0a] font-mono text-[10px] md:text-xs tracking-[0.2em]">
              CHARACTER_LOADOUT
            </span>
          </div>
          <GlitchText
            text="СТИЛЬ И АРСЕНАЛ"
            as="h2"
            className="text-3xl sm:text-4xl md:text-6xl font-black uppercase mb-4 md:mb-6"
            color="red"
          />
          <p className="text-gray-400 max-w-2xl font-mono text-xs md:text-base border-l-2 border-[#555] pl-4 leading-relaxed">
            Визуальный код легенды. Каждая деталь его образа — от хромированного
            протеза до уникального оружия — рассказывает историю войны, которую
            он ведет уже полвека.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* CARD 1: SILVER ARM */}
          <RevealOnScroll direction="left" delay={0} className="lg:col-span-1">
            <div className="h-full bg-[#111] border border-[#333] p-5 md:p-6 hover:border-[#fff] transition-colors group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <Cpu className="text-white" size={24} />
              </div>

              <h3 className="text-xl md:text-2xl font-cyber font-bold text-white mb-4 group-hover:text-stroke-cyan transition-colors">
                СЕРЕБРЯНАЯ РУКА
              </h3>

              <div className="w-full h-40 md:h-48 bg-gradient-to-b from-[#222] to-[#111] mb-6 relative overflow-hidden flex items-center justify-center group shrink-0">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                  style={{ backgroundImage: `url("${ASSETS.silverArm}")` }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="relative z-10 border border-white/20 px-3 py-1 bg-black/50 backdrop-blur-sm text-[10px] md:text-xs font-mono text-white">
                  MODEL: ARASAKA_PROTOTYPE
                </div>
              </div>

              <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 flex-grow">
                Кибернетический протез левой руки, полученный после ранения во
                время Центральноамериканской войны. Это не просто замена
                конечности, а символ его статуса "хромированного рокера".
              </p>

              <div className="bg-[#222] p-3 border-l-2 border-[#ff003c] mt-auto">
                <p className="text-[#ff003c] text-[10px] md:text-xs font-bold mb-1 flex items-center gap-2">
                  <AlertTriangle size={12} /> СКРЫТЫЕ ДЕТАЛИ
                </p>
                <p className="text-gray-300 text-[10px] md:text-xs italic leading-tight">
                  "На металле еле видно грубо соскобленное лого Arasaka. Он
                  пытался стереть следы производителя, чтобы не быть запятнанным
                  врагом."
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* CARD 2: VEST (Middle, smaller vertical card) */}
          <RevealOnScroll direction="up" delay={150} className="lg:col-span-1">
            <div className="h-full bg-[#111] border border-[#333] p-5 md:p-6 hover:border-[#fcee0a] transition-colors group flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <Shield
                  className="text-[#fcee0a] opacity-50 group-hover:opacity-100"
                  size={24}
                />
                <span className="text-[#fcee0a] font-mono text-[10px] md:text-xs border border-[#fcee0a] px-2 py-0.5">
                  ARMOR_LVL_4
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-cyber font-bold text-white mb-4">
                БРОНЕЖИЛЕТ
              </h3>

              <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 flex-grow">
                Джонни редко появляется без своего фирменного пуленепробиваемого
                жилета поверх майки. Для него сцена и поле боя — это одно и то
                же. Он всегда ожидает выстрела и всегда готов ответить.
              </p>

              <div className="grid grid-cols-2 gap-2 text-[10px] md:text-xs font-mono text-gray-500 mt-auto">
                <div className="bg-[#1a1a1a] p-2">МАТЕРИАЛ: КЕВЛАР</div>
                <div className="bg-[#1a1a1a] p-2">СТИЛЬ: ЭНТРОПИЗМ</div>
                <div className="bg-[#1a1a1a] p-2">СОСТОЯНИЕ: ПОНОШЕННОЕ</div>
                <div className="bg-[#1a1a1a] p-2">ВЕС: 4.2 КГ</div>
              </div>
            </div>
          </RevealOnScroll>

          {/* CARD 3: MALORIAN ARMS (Featured) */}
          <RevealOnScroll
            direction="right"
            delay={300}
            className="lg:col-span-1 md:col-span-2"
          >
            <div className="h-full bg-[#0b0b0b] border-2 border-[#00f0ff] p-5 md:p-6 relative overflow-hidden group flex flex-col">
              {/* Animated Scanline Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>

              <div className="flex justify-between items-start relative z-10 shrink-0">
                <h3 className="text-xl md:text-3xl font-cyber font-black text-[#00f0ff] italic">
                  MALORIAN ARMS 3516
                </h3>
                <Crosshair
                  className="text-[#00f0ff] animate-spin-slow"
                  size={24}
                />
              </div>

              {/* Weapon Image */}
              <div className="relative w-full h-40 md:h-56 my-4 md:my-6 flex items-center justify-center bg-gradient-to-r from-black via-[#00f0ff]/5 to-black border-y border-[#00f0ff]/20 shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
                <img
                  src={ASSETS.malorianGun}
                  alt="Malorian Arms 3516"
                  className="h-full w-full object-contain p-2 md:p-4 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]"
                />
              </div>

              <div className="mb-4 py-2 shrink-0">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[10px] md:text-xs font-mono text-[#00f0ff]">
                    <span>TYPE: SEMI-AUTO</span>
                    <span>AMMO: 14mm</span>
                  </div>
                  <div className="w-full bg-[#00f0ff]/10 h-1">
                    <div className="bg-[#00f0ff] h-full w-3/4 shadow-[0_0_10px_#00f0ff]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] md:text-xs font-mono text-gray-400 mt-2">
                    <span>MODES: RICOCHET // WALL-PIERCE // BURN</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#00f0ff]/10 p-4 border border-[#00f0ff]/50 relative mt-auto">
                <div className="absolute -top-2 -left-2 w-3 h-3 md:w-4 md:h-4 border-t border-l border-[#00f0ff]"></div>
                <div className="absolute -bottom-2 -right-2 w-3 h-3 md:w-4 md:h-4 border-b border-r border-[#00f0ff]"></div>

                <p className="text-[#00f0ff] text-[10px] md:text-xs font-bold mb-2">
                  &gt;&gt;&gt; ВНИМАНИЕ: ОТДАЧА
                </p>
                <p className="text-white text-[10px] md:text-xs italic opacity-90 leading-relaxed">
                  "Джонни хотел получить настолько мощный пистолет, что его
                  отдача{" "}
                  <span className="text-[#ff003c]">сломала бы кисть</span>{" "}
                  обычному человеку. Использовать Malorian в полную силу можно
                  только удерживая его кибернетической серебряной рукой."
                </p>
              </div>

              <div className="mt-4 text-right">
                <span className="inline-block bg-[#fcee0a] text-black text-[10px] font-bold px-2 py-1 transform -skew-x-12">
                  LEGENDARY ITEM
                </span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default Arsenal;

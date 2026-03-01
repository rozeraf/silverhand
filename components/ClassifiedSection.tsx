import React from "react";
import { AlertTriangle, FileWarning, EyeOff } from "lucide-react";
import GlitchText from "./GlitchText";
import RevealOnScroll from "./RevealOnScroll";

const ClassifiedSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#0a0000] relative border-y-4 border-[#ff003c] overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,60,0.05)_10px,rgba(255,0,60,0.05)_20px)] pointer-events-none"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-[#ff003c] opacity-5 rotate-12 pointer-events-none whitespace-nowrap">
        TOP SECRET
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <RevealOnScroll>
          <div className="border border-[#ff003c] bg-black p-6 md:p-10 shadow-[0_0_50px_rgba(255,0,60,0.2)] relative">
            <div className="flex items-center justify-between border-b-2 border-[#ff003c] pb-4 mb-8">
              <div className="flex items-center gap-3 text-[#ff003c]">
                <AlertTriangle size={32} className="animate-pulse" />
                <div>
                  <h3 className="font-cyber font-bold text-lg md:text-xl leading-none">
                    ARASAKA SECURE ARCHIVE
                  </h3>
                  <p className="font-mono text-xs tracking-[0.3em]">
                    CLEARANCE: MAXIMUM // OMEGA-CLASS
                  </p>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="bg-[#ff003c] text-black text-xs font-bold px-2 py-1 transform -skew-x-12">
                  EYES ONLY
                </div>
              </div>
            </div>

            <div className="mb-8 text-center">
              <GlitchText
                text="[CLASSIFIED] OPERATION: FALL OF THE TOWERS"
                as="h2"
                className="text-2xl md:text-4xl font-black text-[#ff003c] uppercase"
                color="red"
              />
            </div>

            <div className="font-mono text-sm md:text-base text-gray-300 space-y-6 leading-relaxed">
              <p>
                <span className="bg-[#ff003c]/20 text-[#ff003c] px-1 mr-2">
                  [REDACTED]
                </span>
                Общепринятая версия событий — что{" "}
                <span className="text-white font-bold">Джонни Сильверхенд</span>{" "}
                единолично ворвался в башню Arasaka с тактическим ядерным
                зарядом — является{" "}
                <span className="text-[#ff003c] underline decoration-wavy">
                  неточной
                </span>
                . В действительности Сильверхенд заключил контракт с{" "}
                <span className="text-[#fcee0a]">Militech</span>, получив
                полноценную штурмовую группу.
              </p>

              <p>
                Операцией руководил{" "}
                <span
                  className="text-white font-bold border-b border-dashed border-gray-500 hover:border-white transition-colors cursor-help"
                  title="Legendary Solo"
                >
                  Морган Блэкхенд
                </span>{" "}
                — легендарный соло, признанный лучшим оперативником своего
                класса, чьи возможности сопоставимы с Адамом Смэшером, а по ряду
                оценок превосходят его.
              </p>

              <div className="bg-[#ff003c]/10 border-l-2 border-[#ff003c] p-4 my-6">
                <div className="flex items-center gap-2 text-[#ff003c] font-bold text-xs mb-2">
                  <FileWarning size={14} />
                  <span>ANALYSIS OF RELIC DATA:</span>
                </div>
                <p className="text-xs md:text-sm italic text-gray-400">
                  "Версия событий, зафиксированная в энграмме Сильверхенда,
                  расходится с реальностью. Цифровая копия Альт Каннингем прямо
                  указывает:{" "}
                  <span className="text-white">
                    «Энграмма — это лишь субъективная версия Сильверхенда того,
                    что произошло на самом деле, и не имеет ничего общего с
                    реальностью.»
                  </span>{" "}
                  Учитывая задокументированный нарциссизм Сильверхенда,
                  переосмысление себя как единственного героя операции полностью
                  соответствует его психологическому профилю."
                </p>
              </div>

              <p>
                Настоящая судьба Роберта Джона Линдера после событий 2023 года
                остаётся{" "}
                <span className="bg-white text-black px-1 font-bold">
                  НЕИЗВЕСТНОЙ
                </span>
                . Официальные записи Arasaka по данному вопросу засекречены или
                уничтожены.
              </p>
            </div>

            <div className="mt-10 pt-4 border-t border-[#333] flex justify-between items-center text-[#ff003c]/50 font-mono text-xs">
              <div className="flex items-center gap-2">
                <EyeOff size={14} />
                <span>DO NOT DISTRIBUTE</span>
              </div>
              <div>FILE_ID: 9482-BETA-X</div>
            </div>

            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff003c]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff003c]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff003c]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff003c]"></div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ClassifiedSection;

import React from "react";
import { Skull, Music, BrainCircuit } from "lucide-react";
import GlitchText from "./GlitchText";
import RevealOnScroll from "./RevealOnScroll";
import { TimelineEvent } from "../types";
import { ASSETS } from "../assets";

const Biography: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      year: "2013",
      title: "Трагедия с Альт Каннингем",
      description:
        "Корпорация Arasaka похищает Альт Каннингем, лучшего нетраннера Найт-Сити и возлюбленную Джонни. Спасательная операция проваливается: Альт погибает физически, а её сознание становится узником Сети. Это событие навсегда меняет Сильверхенда, превращая его ненависть к корпорациям в личную вендетту.",
      icon: <Music className="w-6 h-6" />,
    },
    {
      year: "2023",
      title: "Падение Башни",
      description:
        'Финальный аккорд. Джонни возглавляет штурмовую группу Militech для атаки на Arasaka Tower. Цель — освободить Альт и взорвать тактическую ядерную бомбу. Джонни сходится в бою с легендарным соло Адамом Смешером и терпит поражение. Его тело погибает, но сознание похищается Сабуро Арасакой с помощью программы "Соулкиллер".',
      icon: <Skull className="w-6 h-6" />,
    },
    {
      year: "2077",
      title: "Пробуждение",
      description:
        "Спустя 50 лет энграмма Джонни активируется в голове наемника Ви после неудачного ограбления Konpeki Plaza. Биочип начинает переписывать мозг носителя, воскрешая рокера в новом мире, который он не узнает, но который все так же прогнил насквозь.",
      icon: <BrainCircuit className="w-6 h-6" />,
    },
  ];

  return (
    <section id="bio" className="py-24 bg-[#0b0b0b] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <RevealOnScroll className="mb-16 text-center lg:text-left">
          <span className="text-[#00f0ff] font-bold tracking-widest text-sm uppercase mb-2 block">
            История Легенды
          </span>
          <GlitchText
            text="КТО ТАКОЙ ДЖОННИ?"
            as="h2"
            className="text-4xl md:text-6xl font-black uppercase"
            color="yellow"
          />
        </RevealOnScroll>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Left Column: Sticky Image */}
            <div className="lg:w-5/12 relative">
                <RevealOnScroll direction="right" className="sticky top-24">
                    <div className="relative border-2 border-[#333] p-2 bg-[#111] group">
                        {/* Decorative corners */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#ff003c] z-20"></div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#fcee0a] z-20"></div>
                        
                        <div className="relative overflow-hidden aspect-[3/4]">
                            <img 
                                src={ASSETS.biographyPortrait} 
                                alt="Johnny Silverhand Portrait" 
                                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                            
                            {/* Glitch Overlay */}
                            <div className="absolute inset-0 bg-[#ff003c] mix-blend-color-dodge opacity-0 group-hover:opacity-20 transition-opacity duration-100"></div>

                            <div className="absolute bottom-4 left-4 text-white z-10">
                                <h3 className="font-cyber font-bold text-2xl uppercase italic">Robert John Linder</h3>
                                <p className="font-mono text-[#fcee0a] text-xs">STATUS: DECEASED (2023) // ENGRAM ACTIVE</p>
                            </div>
                        </div>

                        {/* Side Label */}
                        <div className="absolute -right-8 top-10 transform rotate-90 origin-top-left text-[#333] font-cyber text-xs tracking-[0.3em]">
                            NIGHT_CITY_ARCHIVES
                        </div>
                    </div>
                    
                    <div className="mt-6 text-gray-400 font-mono text-sm border-l-2 border-[#fcee0a] pl-4">
                        <p>
                             Дезертир. Рокербой. Террорист. Легенда Найт-Сити. Человек, который сжег половину города, чтобы доказать свою правоту.
                        </p>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Right Column: Timeline */}
            <div className="lg:w-7/12 relative">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-[#fcee0a] via-[#ff003c] to-[#00f0ff] opacity-30"></div>

                <div className="space-y-12">
                    {events.map((event, index) => (
                    <RevealOnScroll
                        key={index}
                        delay={index * 150}
                        direction="up"
                        className="relative pl-16"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#0b0b0b] border-2 border-[#00f0ff] z-20 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:border-[#fcee0a] transition-colors">
                            <div className="w-2 h-2 bg-[#fcee0a] rounded-full animate-pulse"></div>
                        </div>

                        {/* Content Box */}
                        <div
                            className={`
                                group bg-[#151515] border-l-4 ${index % 2 === 0 ? "border-[#ff003c]" : "border-[#fcee0a]"} 
                                p-6 relative transition-all duration-300 hover:bg-[#1f1f1f] cyber-card-hover clip-corner-inverse
                            `}
                        >
                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/10 group-hover:border-[#00f0ff] transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/10 group-hover:border-[#00f0ff] transition-colors"></div>

                            <div className="flex items-center gap-3 mb-3 text-white/50 group-hover:text-white transition-colors">
                            <div className={`${index % 2 === 0 ? "text-[#ff003c]" : "text-[#fcee0a]"}`}>
                                {event.icon}
                            </div>
                            <span className="font-cyber font-bold text-3xl">
                                {event.year}
                            </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 font-cyber uppercase tracking-wide group-hover:text-[#00f0ff] transition-colors">
                            {event.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">
                            {event.description}
                            </p>
                        </div>
                    </RevealOnScroll>
                    ))}
                </div>

                {/* Quote Block */}
                <RevealOnScroll
                    delay={400}
                    className="mt-20 p-8 border border-[#ff003c] bg-black/50 relative text-center backdrop-blur-sm group hover:border-[#fcee0a] transition-colors duration-500"
                >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b0b0b] px-4 text-[#ff003c] font-cyber text-xs border border-[#ff003c] group-hover:text-[#fcee0a] group-hover:border-[#fcee0a] transition-colors">
                        MEMORY_LOG_114
                    </div>
                    <div className="absolute top-0 left-0 w-2 h-2 bg-[#ff003c] group-hover:bg-[#fcee0a]"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#ff003c] group-hover:bg-[#fcee0a]"></div>

                    <blockquote className="text-xl md:text-3xl font-cyber italic text-white/90">
                        "Wake the f**k up, <span className="text-[#00f0ff]">Samurai</span>.
                        We have a city{" "}
                        <span className="text-[#ff003c] animate-pulse">to burn</span>."
                    </blockquote>
                </RevealOnScroll>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
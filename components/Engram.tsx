import React, { useState } from 'react';
import GlitchText from './GlitchText';
import RevealOnScroll from './RevealOnScroll';
import { Network, Fingerprint, RefreshCcw, UserPlus } from 'lucide-react';
import { ASSETS } from '../assets';

const Engram: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section id="engram" className="py-24 bg-[#050505] relative border-t border-[#fcee0a]/20 overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-[#00f0ff]/5 transform skew-x-12 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <RevealOnScroll className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#333] pb-8">
            <div className="max-w-2xl">
                <h2 className="text-[#fcee0a] font-cyber text-xl mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#fcee0a] animate-ping"></span>
                    ПРОЕКТ RELIC
                </h2>
                <GlitchText text="ЭНГРАММА И ВТОРАЯ ЖИЗНЬ" as="h2" className="text-4xl md:text-5xl font-black uppercase text-white" color="white" />
            </div>
            <div className="hidden md:block text-right">
                <p className="text-[#00f0ff] font-mono text-xs">SECURE_DATA_SHARD<br/>ENCRYPTED_Lv5</p>
            </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Column with 3D Tilt */}
            <RevealOnScroll direction="right" className="relative order-2 lg:order-1 perspective-1000">
                <div className="absolute inset-0 bg-[#00f0ff] blur-[100px] opacity-10 rounded-full"></div>
                
                <div 
                    className="relative border-2 border-[#333] bg-[#111] p-2 shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-transform duration-100 ease-out"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <div className="relative overflow-hidden group">
                        <img 
                            src={ASSETS.engramCard} 
                            alt="Cybernetic Concept" 
                            loading="lazy"
                            className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 contrast-125 scale-100 group-hover:scale-105"
                        />
                        {/* Glitch Overlay on Hover */}
                        <div className="absolute inset-0 bg-[#ff003c] mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <div className="absolute inset-0 bg-[#00f0ff] mix-blend-screen opacity-0 group-hover:opacity-20 transition-opacity translate-x-1"></div>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-black/90 px-4 py-2 border-l-2 border-[#ff003c] backdrop-blur-sm transform translate-z-10">
                        <span className="text-white font-mono text-xs block">SUBJECT: V & SILVERHAND</span>
                        <span className="text-[#ff003c] font-mono text-xs animate-pulse">SYNCHRONIZATION: 86%</span>
                    </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-[#1a1a1a] p-4 border-b-2 border-[#fcee0a] hover:bg-[#222] transition-colors group cursor-crosshair">
                        <h4 className="text-[#fcee0a] text-sm font-bold mb-1 flex justify-between">
                            ТИП ДАННЫХ
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">[SCAN]</span>
                        </h4>
                        <p className="text-xs text-gray-400">Псевдо-личность, Конструктор</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-4 border-b-2 border-[#00f0ff] hover:bg-[#222] transition-colors group cursor-crosshair">
                        <h4 className="text-[#00f0ff] text-sm font-bold mb-1 flex justify-between">
                            СТАТУС
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">[ACTIVE]</span>
                        </h4>
                        <p className="text-xs text-gray-400">Перезапись носителя</p>
                    </div>
                </div>
            </RevealOnScroll>

            {/* Text Column */}
            <div className="order-1 lg:order-2 space-y-10">
                
                {[
                    { icon: <Network size={20} />, title: "Что такое Энграмма?", text: "Это не душа. Это цифровая копия сознания, записанная на экспериментальный биочип Arasaka. Код, имитирующий мыслительные процессы, воспоминания и эмоции оригинального Джонни. Он заперт в микросхеме, пока несчастный случай не подключает его к нервной системе Ви.", color: "text-[#ff003c]" },
                    { icon: <UserPlus size={20} />, title: "Симбиоз с Ви", text: "Начав как враги, борющиеся за контроль над одним телом, Ви и Джонни проходят путь до глубокой духовной связи. Биочип не просто убивает Ви — он смешивает две личности. Ви становится жестче и решительнее, а Джонни... Джонни учится тому, чего был лишен при жизни: эмпатии.", color: "text-[#00f0ff]" },
                    { icon: <RefreshCcw size={20} />, title: "Трансформация", text: "Почему мы любим энграмму больше, чем живого Сильверхенда? Потому что эта версия способна на рост. Под влиянием Ви цифровой призрак осознает свои ошибки. От самовлюбленного нарцисса он эволюционирует в друга, готового уйти во тьму киберпространства, чтобы дать Ви шанс на жизнь.", color: "text-[#fcee0a]" },
                    { icon: <Fingerprint size={20} />, title: "Наследие", text: "\"Никогда не переставай бороться.\" — это кредо, которое он передает нам. Энграмма доказывает, что даже цифровая копия человека может проявить больше человечности, чем живые люди в Найт-Сити.", color: "text-white" }
                ].map((item, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 150} direction="left" className="flex gap-4 group">
                        <div className="flex-shrink-0 mt-1 relative">
                            <div className={`w-10 h-10 bg-[#222] flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300 ring-1 ring-transparent group-hover:ring-${item.color.split('[')[1]?.split(']')[0] || 'white'}`}>
                                {item.icon}
                            </div>
                            <div className="absolute inset-0 bg-current opacity-20 blur-lg rounded-full transform scale-0 group-hover:scale-150 transition-transform"></div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-cyber font-bold text-white mb-2 group-hover:translate-x-2 transition-transform">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">{item.text}</p>
                        </div>
                    </RevealOnScroll>
                ))}

            </div>
        </div>
      </div>
    </section>
  );
};

export default Engram;
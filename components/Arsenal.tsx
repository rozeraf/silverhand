import React from 'react';
import { Shield, Crosshair, Cpu, AlertTriangle, Target } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import GlitchText from './GlitchText';

const Arsenal: React.FC = () => {
  return (
    <section id="arsenal" className="py-24 bg-[#080808] relative border-t border-[#ff003c]/20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute left-0 top-1/4 w-2 h-32 bg-[#ff003c] z-10"></div>
      <div className="absolute right-0 bottom-1/4 w-2 h-32 bg-[#00f0ff] z-10"></div>
      
      {/* Background Vector Watermark */}
      <div className="absolute -right-20 -top-20 text-white opacity-[0.03] pointer-events-none transform rotate-12 z-0">
        <Target size={600} strokeWidth={0.5} />
      </div>
      <div className="absolute -left-20 bottom-0 text-[#ff003c] opacity-[0.02] pointer-events-none transform -rotate-12 z-0">
        <Crosshair size={500} strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <RevealOnScroll className="mb-16">
          <div className="flex items-center gap-4 mb-2">
             <div className="h-[2px] w-12 bg-[#fcee0a]"></div>
             <span className="text-[#fcee0a] font-mono text-xs tracking-[0.2em]">CHARACTER_LOADOUT</span>
          </div>
          <GlitchText text="СТИЛЬ И АРСЕНАЛ" as="h2" className="text-4xl md:text-6xl font-black uppercase mb-6" color="red" />
          <p className="text-gray-400 max-w-2xl font-mono text-sm md:text-base border-l-2 border-[#555] pl-4">
             Визуальный код легенды. Каждая деталь его образа — от хромированного протеза до уникального оружия — рассказывает историю войны, которую он ведет уже полвека.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* CARD 1: SILVER ARM */}
            <RevealOnScroll direction="left" delay={0} className="lg:col-span-1">
                <div className="h-full bg-[#111] border border-[#333] p-6 hover:border-[#fff] transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                        <Cpu className="text-white" size={32} />
                    </div>
                    
                    <h3 className="text-2xl font-cyber font-bold text-white mb-4 group-hover:text-stroke-cyan transition-colors">
                        СЕРЕБРЯНАЯ РУКА
                    </h3>
                    
                    <div className="w-full h-40 bg-gradient-to-b from-[#222] to-[#111] mb-6 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589254065878-42c9da9e2bc6?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
                        <div className="relative z-10 border border-white/20 px-4 py-1 bg-black/50 backdrop-blur-sm text-xs font-mono text-white">
                            MODEL: MILITECH_PROTOTYPE
                        </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        Кибернетический протез левой руки, полученный после ранения во время Центральноамериканской войны. Это не просто замена конечности, а символ его статуса "хромированного рокера".
                    </p>
                    
                    <div className="bg-[#222] p-3 border-l-2 border-[#ff003c]">
                        <p className="text-[#ff003c] text-xs font-bold mb-1 flex items-center gap-2">
                            <AlertTriangle size={12} /> СКРЫТЫЕ ДЕТАЛИ
                        </p>
                        <p className="text-gray-300 text-xs italic">
                            "На металле еле видно грубо соскобленное лого Arasaka. Он пытался стереть следы производителя, чтобы не быть запятнанным врагом."
                        </p>
                    </div>
                </div>
            </RevealOnScroll>

            {/* CARD 2: VEST (Middle, smaller vertical card) */}
            <RevealOnScroll direction="up" delay={150} className="lg:col-span-1">
                <div className="h-full bg-[#111] border border-[#333] p-6 hover:border-[#fcee0a] transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                        <Shield className="text-[#fcee0a] opacity-50 group-hover:opacity-100" size={32} />
                        <span className="text-[#fcee0a] font-mono text-xs border border-[#fcee0a] px-2 py-0.5">ARMOR_LVL_4</span>
                    </div>
                    
                    <h3 className="text-2xl font-cyber font-bold text-white mb-4">БРОНЕЖИЛЕТ</h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Джонни редко появляется без своего фирменного пуленепробиваемого жилета поверх майки. Для него сцена и поле боя — это одно и то же. Он всегда ожидает выстрела и всегда готов ответить.
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-500">
                        <div className="bg-[#1a1a1a] p-2">МАТЕРИАЛ: КЕВЛАР</div>
                        <div className="bg-[#1a1a1a] p-2">СТИЛЬ: ЭНТРОПИЗМ</div>
                        <div className="bg-[#1a1a1a] p-2">СОСТОЯНИЕ: ПОНОШЕННОЕ</div>
                        <div className="bg-[#1a1a1a] p-2">ВЕС: 4.2 КГ</div>
                    </div>
                </div>
            </RevealOnScroll>

            {/* CARD 3: MALORIAN ARMS (Featured) */}
            <RevealOnScroll direction="right" delay={300} className="lg:col-span-1 md:col-span-2">
                <div className="h-full bg-[#0b0b0b] border-2 border-[#00f0ff] p-6 relative overflow-hidden group">
                    {/* Animated Scanline Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
                    
                    <div className="flex justify-between items-start relative z-10">
                        <h3 className="text-2xl md:text-3xl font-cyber font-black text-[#00f0ff] italic">
                            MALORIAN ARMS 3516
                        </h3>
                        <Crosshair className="text-[#00f0ff] animate-spin-slow" size={28} />
                    </div>

                    <div className="my-6 border-y border-[#00f0ff]/30 py-4">
                        <div className="flex flex-col gap-2">
                             <div className="flex justify-between text-xs font-mono text-[#00f0ff]">
                                <span>TYPE: SEMI-AUTO</span>
                                <span>AMMO: 14mm</span>
                             </div>
                             <div className="w-full bg-[#00f0ff]/10 h-1">
                                <div className="bg-[#00f0ff] h-full w-3/4"></div>
                             </div>
                             <div className="flex justify-between text-xs font-mono text-gray-400 mt-2">
                                <span>MODES: RICOCHET // WALL-PIERCE // BURN</span>
                             </div>
                        </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        Единственное в своём роде оружие, изготовленное на заказ. Полуавтоматический пистолет со встроенным смартлинком.
                    </p>
                    
                    <div className="bg-[#00f0ff]/10 p-4 border border-[#00f0ff]/50 relative">
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-[#00f0ff]"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-[#00f0ff]"></div>
                        
                        <p className="text-[#00f0ff] text-xs font-bold mb-2">&gt;&gt;&gt; ВНИМАНИЕ: ОТДАЧА</p>
                        <p className="text-white text-xs italic opacity-90">
                           "Джонни хотел получить настолько мощный пистолет, что его отдача <span className="text-[#ff003c]">сломала бы кисть</span> обычному человеку. Использовать Malorian в полную силу можно только удерживая его кибернетической серебряной рукой."
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
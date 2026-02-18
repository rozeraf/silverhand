import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Disc, Mic2, Guitar, Drum, Music4 } from 'lucide-react';
import GlitchText from './GlitchText';
import RevealOnScroll from './RevealOnScroll';
import { ASSETS } from '../assets';

interface Track {
  title: string;
  duration: string; // Display duration
  file: string; // Filename in public/music/
}

const TRACKS: Track[] = [
  { title: "Chippin' In", duration: "3:33", file: "chippin_in.mp3" },
  { title: "Never Fade Away", duration: "3:09", file: "never_fade_away.mp3" },
  { title: "A Like Supreme", duration: "3:50", file: "a_like_supreme.mp3" },
  { title: "Archangel", duration: "4:12", file: "archangel.mp3" },
  { title: "Black Dog", duration: "4:22", file: "black_dog.mp3" },
];

const MEMBERS = [
  { name: "Johnny Silverhand", role: "Vocals / Guitar", icon: <Mic2 size={16} /> },
  { name: "Kerry Eurodyne", role: "Vocals / Guitar", icon: <Guitar size={16} /> },
  { name: "Nancy (Bes Isis)", role: "Keyboards", icon: <Music4 size={16} /> },
  { name: "Denny", role: "Drums", icon: <Drum size={16} /> },
  { name: "Henry", role: "Bass", icon: <Guitar size={16} /> },
];

const Samurai: React.FC = () => {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIdx];

  // Initialize Audio
  useEffect(() => {
    // Note for user: Place audio files in 'public/music/' folder
    audioRef.current = new Audio(`/music/${currentTrack.file}`);
    
    // Add event listeners for progress
    const updateProgress = () => {
      if (audioRef.current) {
        const duration = audioRef.current.duration || 1;
        setProgress((audioRef.current.currentTime / duration) * 100);
      }
    };
    
    const handleEnded = () => {
        setIsPlaying(false);
        handleNext();
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Track Change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = `/music/${TRACKS[currentTrackIdx].file}`;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play error (files missing?):", e));
      }
    }
  }, [currentTrackIdx]); // Don't include isPlaying to avoid loop

  // Handle Play/Pause toggle
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.warn("Ensure mp3 files are in public/music/", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIdx((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTrackIdx((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (audioRef.current) {
      const duration = audioRef.current.duration || 1;
      audioRef.current.currentTime = (val / 100) * duration;
      setProgress(val);
    }
  };

  return (
    <section id="samurai" className="py-24 bg-[#090909] relative border-t border-[#fcee0a]/20">
      {/* Background Logo Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none grayscale">
        <img src={ASSETS.samuraiLogo} alt="Samurai Logo Watermark" className="w-full h-full object-contain invert" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <RevealOnScroll className="mb-12 text-center">
            <div className="inline-block border-2 border-[#ff003c] p-1 mb-4">
                 <div className="bg-[#ff003c] px-3 py-0.5 text-black font-bold font-cyber text-xs tracking-[0.3em]">CHROME_ROCK_LEGENDS</div>
            </div>
            <div className="flex justify-center items-center gap-4 mb-2">
                <img src={ASSETS.samuraiLogo} alt="Samurai Logo" className="h-16 md:h-24 invert drop-shadow-[0_0_10px_rgba(255,0,60,0.5)]" />
            </div>
            <GlitchText text="SAMURAI" as="h2" className="text-5xl md:text-8xl font-black tracking-tighter text-white" color="red" />
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: PLAYER (4 Cols) */}
            <div className="lg:col-span-4">
                <RevealOnScroll direction="right" className="sticky top-24">
                    <div className="bg-[#111] border-2 border-[#333] p-6 relative group">
                         {/* Player Housing Decor */}
                         <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#fcee0a] clip-corner z-20"></div>
                         <div className="absolute top-1 right-2 text-black font-bold text-[10px] z-30 font-mono">2077</div>

                         {/* Album Art */}
                         <div className="relative aspect-square bg-[#000] mb-6 overflow-hidden border border-[#333]">
                            <img 
                                src={ASSETS.samuraiAlbum} 
                                alt="Album Cover" 
                                className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-105 contrast-125' : 'scale-100 grayscale'}`} 
                            />
                            {/* Spinning Disc Effect Overlay */}
                            <div className={`absolute inset-0 border-[40px] border-black/80 rounded-full scale-[0.9] opacity-0 ${isPlaying ? 'opacity-30 animate-spin-slow' : ''}`}></div>
                            
                            {/* Visualizer Bars (Fake CSS Animation) */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center gap-1 pb-2 px-4 opacity-80 mix-blend-screen">
                                {isPlaying && [1,2,3,4,5,6,7,8,9,10].map((i) => (
                                    <div key={i} className="w-2 bg-[#ff003c] animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDuration: `${0.2 + Math.random() * 0.5}s` }}></div>
                                ))}
                            </div>
                         </div>

                         {/* Track Info */}
                         <div className="mb-6">
                            <h3 className="text-[#00f0ff] font-cyber text-xl font-bold truncate">{currentTrack.title}</h3>
                            <p className="text-gray-400 font-mono text-xs tracking-wider">SAMURAI // GREATEST HITS</p>
                         </div>

                         {/* Progress Bar */}
                         <div className="mb-6 relative">
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={progress} 
                                onChange={handleSeek}
                                className="w-full h-1 bg-[#333] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#ff003c] [&::-webkit-slider-thumb]:rounded-none"
                            />
                            <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
                                <span>{(audioRef.current?.currentTime || 0).toFixed(1)}s</span>
                                <span>{currentTrack.duration}</span>
                            </div>
                         </div>

                         {/* Controls */}
                         <div className="flex items-center justify-between mb-6">
                            <button onClick={handlePrev} className="text-gray-400 hover:text-white hover:scale-110 transition-all"><SkipBack size={24} /></button>
                            
                            <button 
                                onClick={togglePlay} 
                                className="w-16 h-16 bg-[#fcee0a] rounded-full flex items-center justify-center text-black hover:bg-[#ff003c] hover:text-white transition-all shadow-[0_0_15px_rgba(252,238,10,0.4)]"
                            >
                                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                            </button>
                            
                            <button onClick={handleNext} className="text-gray-400 hover:text-white hover:scale-110 transition-all"><SkipForward size={24} /></button>
                         </div>

                         {/* Tracklist Mini */}
                         <div className="border-t border-[#333] pt-4 max-h-48 overflow-y-auto">
                            {TRACKS.map((track, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => setCurrentTrackIdx(idx)}
                                    className={`flex justify-between items-center py-2 px-2 cursor-pointer font-mono text-sm hover:bg-[#ffffff05] transition-colors ${currentTrackIdx === idx ? 'text-[#ff003c]' : 'text-gray-500'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        {currentTrackIdx === idx && <Disc size={12} className="animate-spin" />}
                                        <span>{idx + 1}. {track.title}</span>
                                    </div>
                                    <span className="text-xs">{track.duration}</span>
                                </div>
                            ))}
                         </div>
                         
                         {/* Folder Hint for Dev */}
                         <div className="absolute -bottom-8 left-0 text-[10px] text-gray-700 font-mono w-full text-center">
                            music_source: /public/music/*.mp3
                         </div>
                    </div>
                </RevealOnScroll>
            </div>

            {/* RIGHT COLUMN: HISTORY & INFO (8 Cols) */}
            <div className="lg:col-span-8 space-y-12">
                
                {/* Intro */}
                <RevealOnScroll>
                    <p className="text-xl md:text-2xl text-white font-sans leading-relaxed border-l-4 border-[#00f0ff] pl-6">
                        "Samurai — это не просто группа. Это крик. Это отказ подчиняться. Это хромированный кулак в лицо корпоративной системе."
                    </p>
                </RevealOnScroll>

                {/* Timeline History */}
                <div className="space-y-8 relative">
                     <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-[#333]"></div>

                     {/* 2000s */}
                     <RevealOnScroll delay={100} className="relative pl-10">
                        <div className="absolute left-0 top-1 w-7 h-7 bg-[#0b0b0b] border border-[#fcee0a] rounded-full flex items-center justify-center text-[#fcee0a] text-[10px] font-bold">01</div>
                        <h3 className="text-[#fcee0a] font-cyber text-2xl mb-2">2003-2008: РОЖДЕНИЕ И КРАХ</h3>
                        <div className="bg-[#111] p-6 border border-[#333]">
                            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                Основанная Джонни Сильверхендом и Керри Евродином, группа начинала с задворок баров Найт-Сити, таких как "Red Dirt". Взлёт был стремительным: исполнительный директор Universal Music Джек Мастерс подписал их через три недели после прослушивания. Сингл "Blistering Love" взорвал чарты.
                            </p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Однако в 2008 году сказка кончилась. Нэнси, клавишница, выбросила своего жестокого мужа из окна небоскреба. 7 месяцев тюрьмы для неё стали концом для Samurai. Группа распалась, не выдержав простоя.
                            </p>
                        </div>
                     </RevealOnScroll>

                     {/* 2020s */}
                     <RevealOnScroll delay={200} className="relative pl-10">
                        <div className="absolute left-0 top-1 w-7 h-7 bg-[#0b0b0b] border border-[#ff003c] rounded-full flex items-center justify-center text-[#ff003c] text-[10px] font-bold">02</div>
                        <h3 className="text-[#ff003c] font-cyber text-2xl mb-2">2023: ПАДЕНИЕ БАШНИ</h3>
                        <div className="bg-[#111] p-6 border border-[#333]">
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Слухи о воссоединении ходили годами, но история распорядилась иначе. Последний раз Джонни и Керри играли вместе в баре "The Hammer". Вскоре после этого Сильверхенд устроил ядерный теракт в Арасака-Тауэр, исчезнув навсегда. Многие записи того периода были уничтожены в "Ночном Холокосте".
                            </p>
                        </div>
                     </RevealOnScroll>

                     {/* 2077 */}
                     <RevealOnScroll delay={300} className="relative pl-10">
                         <div className="absolute left-0 top-1 w-7 h-7 bg-[#0b0b0b] border border-[#00f0ff] rounded-full flex items-center justify-center text-[#00f0ff] text-[10px] font-bold">03</div>
                        <h3 className="text-[#00f0ff] font-cyber text-2xl mb-2">2077: НАСЛЕДИЕ</h3>
                        <div className="bg-[#111] p-6 border border-[#333]">
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                Спустя 50 лет музыка Samurai всё ещё звучит на волнах Morro Rock Radio. В 2077 году, благодаря усилиям Ви (и энграммы Джонни), оригинальный состав собрался на один, последний концерт в том самом баре "Red Dirt", чтобы доказать, что рок-н-ролл никогда не умрет.
                            </p>
                            <div className="flex gap-2 mt-4">
                                {["Never Fade Away", "Black Dog", "Archangel"].map(tag => (
                                    <span key={tag} className="text-[10px] font-mono bg-[#333] px-2 py-1 text-gray-300">#{tag.replace(/\s/g, '_')}</span>
                                ))}
                            </div>
                        </div>
                     </RevealOnScroll>
                </div>

                {/* Members Grid */}
                <RevealOnScroll delay={400} className="pt-8 border-t border-[#333]">
                    <h3 className="text-white font-cyber text-xl mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#fcee0a]"></span> СОСТАВ ГРУППЫ
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {MEMBERS.map((member, i) => (
                            <div key={i} className="bg-[#151515] p-4 border border-transparent hover:border-[#fcee0a] transition-all group hover:-translate-y-1">
                                <div className="text-[#ff003c] mb-2 group-hover:text-[#fcee0a] transition-colors">{member.icon}</div>
                                <div className="font-bold text-white text-sm uppercase leading-tight mb-1">{member.name}</div>
                                <div className="text-gray-500 text-[10px] font-mono uppercase">{member.role}</div>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>

            </div>
        </div>
      </div>
    </section>
  );
};

export default Samurai;
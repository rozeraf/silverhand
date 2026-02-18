import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Disc, Mic2, Guitar, Drum, Music4, X, ArrowLeft } from 'lucide-react';
import GlitchText from './GlitchText';
import { ASSETS } from '../assets';

interface Track {
  title: string;
  duration: string;
  file: string;
}

const TRACKS: Track[] = [
  { title: "Chippin' In", duration: "3:33", file: "chippin_in.mp3" },
  { title: "Never Fade Away", duration: "3:09", file: "never_fade_away.mp3" },
  { title: "A Like Supreme", duration: "3:50", file: "a_like_supreme.mp3" },
  { title: "Archangel", duration: "4:12", file: "archangel.mp3" },
  { title: "Black Dog", duration: "4:22", file: "black_dog.mp3" },
];

const MEMBERS = [
  { name: "Johnny Silverhand", role: "Vocals / Guitar", icon: <Mic2 size={14} /> },
  { name: "Kerry Eurodyne", role: "Vocals / Guitar", icon: <Guitar size={14} /> },
  { name: "Nancy (Bes Isis)", role: "Keyboards", icon: <Music4 size={14} /> },
  { name: "Denny", role: "Drums", icon: <Drum size={14} /> },
  { name: "Henry", role: "Bass", icon: <Guitar size={14} /> },
];

interface SamuraiPageProps {
  onBack: () => void;
}

const Samurai: React.FC<SamuraiPageProps> = ({ onBack }) => {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = TRACKS[currentTrackIdx];

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio(`/music/${currentTrack.file}`);
    
    const updateProgress = () => {
      if (audioRef.current) {
        const duration = audioRef.current.duration || 1;
        setProgress((audioRef.current.currentTime / duration) * 100);
      }
    };
    
    const handleEnded = () => {
        setIsPlaying(false);
        handleNext(); // Auto play next could be added here logic wise
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
      const wasPlaying = isPlaying;
      audioRef.current.src = `/music/${TRACKS[currentTrackIdx].file}`;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(e => console.log("Audio file missing?", e));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIdx]);

  // Handle Play/Pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.warn("Check public/music folder", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleNext = () => setCurrentTrackIdx((prev) => (prev + 1) % TRACKS.length);
  const handlePrev = () => setCurrentTrackIdx((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (audioRef.current) {
      const duration = audioRef.current.duration || 1;
      audioRef.current.currentTime = (val / 100) * duration;
      setProgress(val);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col lg:flex-row overflow-hidden animate-[fadeIn_0.5s_ease-out]">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
      
      {/* LEFT PANEL: PLAYER (Fixed) */}
      <div className="lg:w-5/12 h-full relative border-r border-[#333] bg-[#0b0b0b] flex flex-col z-10 shadow-[20px_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Top Bar */}
        <div className="p-6 flex justify-between items-center border-b border-[#333]">
           <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-[#fcee0a] transition-colors group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-cyber text-sm tracking-widest">BACK TO CITY</span>
           </button>
           <div className="text-[#ff003c] font-cyber text-xs animate-pulse">LIVE_CONNECTION</div>
        </div>

        {/* Player Body */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden">
             {/* Visualizer Background */}
             <div className="absolute inset-0 flex items-end justify-center gap-2 opacity-10 pointer-events-none pb-20 px-10">
                 {isPlaying && [...Array(20)].map((_, i) => (
                    <div key={i} className="w-full bg-[#ff003c] animate-pulse transition-all" style={{ height: `${Math.random() * 80}%`, animationDuration: `${0.2 + Math.random() * 0.4}s` }}></div>
                 ))}
             </div>

             {/* Album Art */}
             <div className="relative w-full max-w-sm aspect-square bg-black border-2 border-[#333] mb-8 group shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                <img 
                    src={ASSETS.samuraiAlbum} 
                    alt="Album" 
                    className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-105 contrast-125 saturate-150' : 'grayscale scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                
                {/* Playing Indicator Overlay */}
                <div className="absolute bottom-4 left-4">
                    <GlitchText text="SAMURAI" className="text-3xl font-black italic" color="red" />
                    <div className="text-[#fcee0a] font-mono text-xs mt-1 tracking-[0.3em]">CHROME ROCK</div>
                </div>
             </div>

             {/* Controls Area */}
             <div className="w-full max-w-sm relative z-20">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-2xl font-cyber font-bold text-white mb-1 truncate">{currentTrack.title}</h2>
                        <div className="flex gap-2">
                             <span className="text-xs font-mono text-[#00f0ff] bg-[#00f0ff]/10 px-1">TRACK_0{currentTrackIdx + 1}</span>
                             <span className="text-xs font-mono text-gray-500">STEREO</span>
                        </div>
                    </div>
                    <div className="text-right font-mono text-[#fcee0a] text-lg">
                        {(audioRef.current?.currentTime || 0).toFixed(1)} <span className="text-xs text-gray-500">/ {currentTrack.duration}</span>
                    </div>
                </div>

                {/* Progress */}
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={progress} 
                    onChange={handleSeek}
                    className="w-full h-2 bg-[#222] rounded-none appearance-none cursor-pointer mb-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#ff003c] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                />

                {/* Buttons */}
                <div className="flex justify-center items-center gap-8">
                    <button onClick={handlePrev} className="text-gray-400 hover:text-white hover:scale-110 transition-transform"><SkipBack size={32} /></button>
                    <button 
                        onClick={togglePlay}
                        className="w-20 h-20 bg-[#fcee0a] text-black clip-button flex items-center justify-center hover:bg-[#ff003c] hover:text-white transition-all shadow-[0_0_20px_rgba(252,238,10,0.3)]"
                    >
                        {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
                    </button>
                    <button onClick={handleNext} className="text-gray-400 hover:text-white hover:scale-110 transition-transform"><SkipForward size={32} /></button>
                </div>
             </div>
        </div>
      </div>

      {/* RIGHT PANEL: INFO (Scrollable) */}
      <div className="lg:w-7/12 h-full overflow-y-auto bg-[#050505] relative custom-scrollbar">
          <div className="max-w-3xl mx-auto p-8 lg:p-16">
              
              <div className="flex justify-end mb-12">
                   <img src={ASSETS.samuraiLogo} alt="Logo" className="h-16 invert opacity-50" />
              </div>

              <div className="mb-16">
                  <h1 className="text-5xl md:text-7xl font-cyber font-black text-white mb-6 uppercase leading-none">
                      <span className="text-stroke-red text-transparent block">We are</span> 
                      Samurai
                  </h1>
                  <p className="text-xl text-gray-300 font-sans leading-relaxed border-l-4 border-[#fcee0a] pl-6">
                      Группа, которая отказалась продаваться. Музыка, которая стала гимном восстания. Мы играли не ради славы, а чтобы сжечь этот город дотла своим звуком.
                  </p>
              </div>

              {/* History Section */}
              <div className="space-y-12 mb-20 relative">
                   <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#ff003c] to-transparent opacity-30"></div>
                   
                   {[
                       { year: '2003', title: 'НАЧАЛО', text: 'Клуб "Rainbow Cadenza". Исполнительный директор Universal Джек Мастерс случайно заходит на гиг. Три недели спустя Samurai подписывают контракт, а "Blistering Love" разрывает Еврочарты.' },
                       { year: '2008', title: 'РАСКОЛ', text: 'Клавишница Нэнси попадает в тюрьму за то, что выбросила мужа-абьюзера из окна. 7 месяцев простоя убили группу. Каждый пошел своей дорогой.' },
                       { year: '2023', title: 'ЛЕГЕНДА', text: 'Джонни устраивает ядерный взрыв в Арасака-Тауэр. Группа становится мифом. Записи теряются в старой Сети.' },
                       { year: '2077', title: 'ВОСКРЕСЕНИЕ', text: 'Второй шанс. Последний концерт в баре Red Dirt. Спустя 50 лет они снова вышли на сцену.' }
                   ].map((item, i) => (
                       <div key={i} className="pl-8 relative group">
                           <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-[#0b0b0b] border border-[#ff003c] rotate-45 group-hover:bg-[#ff003c] transition-colors"></div>
                           <span className="font-mono text-[#ff003c] text-sm tracking-widest">{item.year}</span>
                           <h3 className="font-cyber text-2xl font-bold text-white mb-2">{item.title}</h3>
                           <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                       </div>
                   ))}
              </div>

              {/* Track List */}
              <div className="mb-20">
                  <h3 className="text-[#00f0ff] font-cyber text-xl mb-6 flex items-center gap-2">
                        <Disc size={20} /> DISCOGRAPHY
                  </h3>
                  <div className="bg-[#111] border border-[#333]">
                      {TRACKS.map((track, idx) => (
                          <div 
                              key={idx}
                              onClick={() => setCurrentTrackIdx(idx)}
                              className={`flex justify-between items-center p-4 border-b border-[#222] cursor-pointer hover:bg-[#1a1a1a] transition-colors group ${currentTrackIdx === idx ? 'bg-[#1a1a1a]' : ''}`}
                          >
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-gray-600 w-4">0{idx + 1}</span>
                                    <span className={`font-bold font-cyber ${currentTrackIdx === idx ? 'text-[#fcee0a]' : 'text-gray-300'} group-hover:text-white`}>{track.title}</span>
                                </div>
                                <span className="font-mono text-xs text-gray-500">{track.duration}</span>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Members */}
              <div>
                  <h3 className="text-[#fcee0a] font-cyber text-xl mb-6 flex items-center gap-2">
                        <Mic2 size={20} /> LINEUP
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {MEMBERS.map((member, i) => (
                            <div key={i} className="bg-[#111] p-4 border border-[#333] hover:border-[#ff003c] transition-colors">
                                <div className="text-[#ff003c] mb-2 opacity-80">{member.icon}</div>
                                <div className="font-bold text-white text-sm uppercase mb-1">{member.name}</div>
                                <div className="text-gray-500 text-[10px] font-mono uppercase">{member.role}</div>
                            </div>
                        ))}
                  </div>
              </div>

              <div className="mt-20 pt-10 border-t border-[#333] text-center">
                  <p className="font-cyber text-gray-600 text-xs tracking-[0.5em]">SAMURAI NEVER DIES</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Samurai;
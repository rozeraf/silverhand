import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Disc, Mic2, Guitar, Drum, Music4, ArrowLeft, BarChart3, Radio, ListMusic } from 'lucide-react';
import GlitchText from './GlitchText';
import { ASSETS } from '../assets';

interface Track {
  title: string;
  duration: string;
  file: string;
  cover?: string; // Optional specific cover for the track
}

const TRACKS: Track[] = [
  { 
    title: "Chippin' In", 
    duration: "3:33", 
    file: ASSETS.music.chippinIn,
    cover: ASSETS.albumCovers.chippinIn
  },
  { 
    title: "Never Fade Away", 
    duration: "3:09", 
    file: ASSETS.music.neverFadeAway,
    cover: ASSETS.albumCovers.neverFadeAway
  },
  { 
    title: "A Like Supreme", 
    duration: "3:50", 
    file: ASSETS.music.aLikeSupreme,
    cover: ASSETS.albumCovers.aLikeSupreme
  },
  { 
    title: "Archangel", 
    duration: "4:12", 
    file: ASSETS.music.archangel 
    // No specific cover, will fallback to main album
  },
  { 
    title: "Black Dog", 
    duration: "4:22", 
    file: ASSETS.music.blackDog,
    cover: ASSETS.albumCovers.blackDog
  },
];

const MEMBERS = [
  { name: "Johnny Silverhand", role: "Vocals / Guitar", icon: <Mic2 size={16} /> },
  { name: "Kerry Eurodyne", role: "Vocals / Guitar", icon: <Guitar size={16} /> },
  { name: "Nancy (Bes Isis)", role: "Keyboards", icon: <Music4 size={16} /> },
  { name: "Denny", role: "Drums", icon: <Drum size={16} /> },
  { name: "Henry", role: "Bass", icon: <Guitar size={16} /> },
];

const TIMELINE_EVENTS = [
  {
    year: '2003',
    title: 'FORMATION',
    description: 'Основана Джонни Сильверхендом и Керри Евродином в задних комнатах "Rainbow Cadenza". Их сырая энергия и антикорпоративные тексты мгновенно нашли отклик у бесправной молодежи Найт-Сити.'
  },
  {
    year: '2008',
    title: 'THE BREAKUP',
    description: 'После того как клавишница Нэнси была арестована за то, что выбросила мужа-абьюзера из окна, группа распалась. 7 месяцев тюрьмы для неё означали конец Samurai.'
  },
  {
    year: '2023',
    title: 'ARASAKA TOWER',
    description: 'Джонни возглавил ударную группу Militech, чтобы проникнуть в сердце Арасака-Тауэр и спасти Альт Каннингем. Миссия закончилась ядерным взрывом, уничтожившим центр города, и физической смертью Джонни.'
  },
  {
    year: '2077',
    title: 'THE REUNION',
    description: 'Спустя десятилетия выжившие участники воссоединились для одного последнего концерта в баре Red Dirt. Используя тело Ви как проводник для Джонни, они сыграли "A Like Supreme" в последний раз.'
  }
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
    // Create new audio instance
    audioRef.current = new Audio(currentTrack.file);
    audioRef.current.volume = 0.5; // Start at 50% volume to not blast ears
    
    const updateProgress = () => {
      if (audioRef.current) {
        const duration = audioRef.current.duration || 1;
        if (!isNaN(duration)) {
             setProgress((audioRef.current.currentTime / duration) * 100);
        }
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
      const wasPlaying = isPlaying;
      audioRef.current.src = TRACKS[currentTrackIdx].file;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(e => console.log("Audio file missing or blocked?", e));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIdx]);

  // Handle Play/Pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.warn("Ensure audio files exist in public/music folder", e));
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
    // Update visuals immediately
    setProgress(val);
    
    if (audioRef.current) {
      const duration = audioRef.current.duration || 0;
      if (duration > 0 && !isNaN(duration)) {
         audioRef.current.currentTime = (val / 100) * duration;
      }
    }
  };

  // Determine active cover image
  const activeCover = currentTrack.cover || ASSETS.samuraiAlbum;

  return (
    <div className="fixed inset-0 z-[100] bg-[#030303] text-white flex flex-col lg:flex-row overflow-hidden animate-[fadeIn_0.5s_ease-out]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,0,60,0.05),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

      {/* --- LEFT PANEL: PLAYER --- */}
      <div className="lg:w-5/12 h-full relative border-r border-[#222] bg-[#080808] flex flex-col z-10 shadow-[20px_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Decorative Grid Background for Player */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.02)_25%,rgba(255,255,255,.02)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.02)_75%,rgba(255,255,255,.02)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.02)_25%,rgba(255,255,255,.02)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.02)_75%,rgba(255,255,255,.02)_76%,transparent_77%,transparent)] bg-[size:50px_50px] pointer-events-none"></div>

        {/* Top Bar */}
        <div className="p-6 flex justify-between items-center border-b border-[#222] bg-[#0a0a0a]/80 backdrop-blur-md relative z-20">
           <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-[#fcee0a] transition-all group uppercase font-cyber text-xs tracking-widest border border-transparent hover:border-[#fcee0a] px-3 py-1 rounded-sm">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              EXIT_DB
           </button>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-[#ff003c] animate-pulse"></div>
             <span className="text-[#ff003c] font-cyber text-xs tracking-widest">LIVE_FEED</span>
           </div>
        </div>

        {/* Player Core */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 relative z-10">
             
             {/* Album Art Container */}
             <div className="relative w-full max-w-[320px] aspect-square mb-10 group perspective-1000">
                {/* Spinning Ring */}
                <div className={`absolute inset-[-20px] rounded-full border border-dashed border-[#333] ${isPlaying ? 'animate-spin-slow' : ''}`}></div>
                <div className={`absolute inset-[-10px] rounded-full border border-[#fcee0a]/20 ${isPlaying ? 'animate-spin-reverse-slow' : ''}`}></div>

                <div className="relative h-full w-full border-2 border-[#333] bg-black overflow-hidden shadow-[0_0_50px_rgba(255,0,60,0.15)] group-hover:shadow-[0_0_80px_rgba(255,0,60,0.3)] transition-shadow duration-500">
                    <img 
                        key={currentTrack.title} // Force re-render animation on track change
                        src={activeCover} 
                        alt="Album" 
                        className={`w-full h-full object-cover transition-all duration-700 animate-[fadeIn_0.5s_ease-out] ${isPlaying ? 'scale-110 contrast-125 saturate-150' : 'grayscale scale-100'}`}
                    />
                    
                    {/* Glitch Overlay on Image */}
                    <div className="absolute inset-0 bg-[#ff003c] mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#fcee0a]"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#fcee0a]"></div>
                </div>

                {/* Status Overlay */}
                <div className="absolute -bottom-6 left-0 w-full flex justify-between items-end font-mono text-[10px] text-[#00f0ff] uppercase tracking-widest">
                    <span>Codec: MP3_320</span>
                    <span>{isPlaying ? 'PLAYING...' : 'PAUSED'}</span>
                </div>
             </div>

             {/* Track Details */}
             <div className="w-full max-w-[320px] mb-8 text-center relative">
                <h2 className="text-3xl font-cyber font-bold text-white mb-2 truncate drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                    {currentTrack.title}
                </h2>
                <p className="text-[#ff003c] font-mono text-xs tracking-[0.4em] uppercase">
                    SAMURAI // SILVERHAND
                </p>
             </div>

             {/* Progress Bar styled as Tech Component */}
             <div className="w-full max-w-[320px] mb-8 relative group">
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1">
                    <span>{(audioRef.current?.currentTime || 0).toFixed(1)}</span>
                    <span>{currentTrack.duration}</span>
                </div>
                <div className="relative h-2 bg-[#1a1a1a] border border-[#333] overflow-hidden">
                    <div 
                        className="absolute top-0 left-0 h-full bg-[#fcee0a] shadow-[0_0_10px_#fcee0a]" 
                        style={{ width: `${progress}%` }}
                    ></div>
                    {/* Input range overlay for interaction */}
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="0.1"
                        value={progress} 
                        onChange={handleSeek}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <div className="absolute top-1/2 -left-2 w-1 h-3 bg-[#333] transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 -right-2 w-1 h-3 bg-[#333] transform -translate-y-1/2"></div>
             </div>

             {/* Controls */}
             <div className="flex justify-center items-center gap-8 w-full max-w-[320px]">
                <button 
                    onClick={handlePrev} 
                    className="text-gray-500 hover:text-[#00f0ff] transition-all hover:scale-110 active:scale-95"
                >
                    <SkipBack size={28} />
                </button>
                
                <button 
                    onClick={togglePlay}
                    className="w-16 h-16 bg-transparent border-2 border-[#fcee0a] text-[#fcee0a] rounded-sm flex items-center justify-center hover:bg-[#fcee0a] hover:text-black transition-all hover:shadow-[0_0_20px_#fcee0a] active:scale-95 group relative"
                >
                    {/* Decorative corners inside button */}
                    <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-current opacity-50"></div>
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-current opacity-50"></div>
                    
                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
                
                <button 
                    onClick={handleNext} 
                    className="text-gray-500 hover:text-[#00f0ff] transition-all hover:scale-110 active:scale-95"
                >
                    <SkipForward size={28} />
                </button>
             </div>
             
             {/* Fake EQ Visualizer */}
             <div className="mt-8 flex items-end justify-center gap-1 h-8 w-full max-w-[200px] opacity-40">
                {[...Array(16)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-1 bg-[#ff003c] transition-all duration-100 ${isPlaying ? 'animate-pulse' : 'h-1'}`} 
                        style={{ 
                            height: isPlaying ? `${Math.max(10, Math.random() * 100)}%` : '20%',
                            animationDelay: `${i * 0.05}s`
                        }}
                    ></div>
                ))}
             </div>
        </div>
      </div>

      {/* --- RIGHT PANEL: INFO --- */}
      <div className="lg:w-7/12 h-full overflow-y-auto bg-[#030303] relative custom-scrollbar scroll-smooth">
          
          {/* BACKGROUND ELEMENTS FOR RIGHT PANEL */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             {/* Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,60,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
             
             {/* Large Watermark Logo */}
             <div className="absolute -top-20 -right-20 w-[600px] h-[600px] opacity-[0.03] rotate-12">
                 <img src={ASSETS.samuraiLogo} alt="" className="w-full h-full object-contain invert" />
             </div>

             {/* Decorative Gradient Blobs */}
             <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#ff003c] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.05]"></div>
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#00f0ff] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.05]"></div>
             
             {/* Decorative Tech Lines */}
             <div className="absolute top-40 right-10 w-[2px] h-32 bg-gradient-to-b from-transparent via-[#333] to-transparent"></div>
             <div className="absolute bottom-40 left-10 w-[2px] h-32 bg-gradient-to-b from-transparent via-[#333] to-transparent"></div>
          </div>

          {/* Top Fade Overlay */}
          <div className="sticky top-0 h-20 bg-gradient-to-b from-[#030303] to-transparent z-20 pointer-events-none"></div>

          <div className="max-w-4xl mx-auto p-8 lg:p-16 pt-0 relative z-10">
              
              {/* Header Section */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b-2 border-[#333] pb-8 relative">
                   <div>
                       <div className="inline-flex items-center gap-2 mb-2 bg-[#ff003c]/10 px-3 py-1 border border-[#ff003c]/20 rounded-sm">
                            <Radio size={14} className="text-[#ff003c] animate-pulse" />
                            <span className="text-[#ff003c] font-mono text-[10px] tracking-widest uppercase">Encrypted Connection</span>
                       </div>
                       <h1 className="text-6xl md:text-8xl font-black font-cyber text-white uppercase leading-[0.85] tracking-tighter mb-4">
                          <span className="block text-stroke-thick text-transparent opacity-30">We Are</span>
                          <span className="relative inline-block">
                             Samurai
                             <span className="absolute -top-4 -right-8 text-2xl text-[#fcee0a] font-normal tracking-normal italic opacity-80 rotate-12">est. 2003</span>
                          </span>
                       </h1>
                       <p className="max-w-md text-gray-400 font-mono text-sm leading-relaxed border-l-2 border-[#fcee0a] pl-4">
                          Хромированный рок. Голос улиц. Мятеж, записанный на пленку. Единственная группа, которая сожгла город, чтобы доказать свою правоту.
                       </p>
                   </div>
                   
                   <div className="mt-6 md:mt-0 opacity-20 hover:opacity-100 transition-opacity duration-500">
                        <img src={ASSETS.samuraiLogo} alt="Logo" className="w-32 md:w-48 invert" />
                   </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                  
                  {/* Left Col: Tracklist */}
                  <div className="md:col-span-7">
                      <h3 className="text-white font-cyber text-xl mb-6 flex items-center gap-3">
                            <ListMusic className="text-[#00f0ff]" size={20} /> 
                            <span className="tracking-widest">DISCOGRAPHY</span>
                      </h3>
                      
                      <div className="space-y-1">
                          {TRACKS.map((track, idx) => (
                              <div 
                                  key={idx}
                                  onClick={() => setCurrentTrackIdx(idx)}
                                  className={`
                                      group relative flex justify-between items-center p-4 border border-transparent 
                                      cursor-pointer transition-all duration-300
                                      ${currentTrackIdx === idx 
                                          ? 'bg-[#111] border-[#fcee0a] text-[#fcee0a] shadow-[0_0_15px_rgba(252,238,10,0.1)]' 
                                          : 'hover:bg-[#111] hover:border-[#333] hover:translate-x-2 text-gray-400'}
                                  `}
                              >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <span className={`font-mono text-xs w-6 ${currentTrackIdx === idx ? 'text-[#fcee0a]' : 'text-[#333]'}`}>
                                            0{idx + 1}
                                        </span>
                                        <span className="font-bold font-cyber text-lg tracking-wide uppercase group-hover:text-white transition-colors">
                                            {track.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 relative z-10">
                                        {currentTrackIdx === idx && <BarChart3 size={16} className="animate-pulse" />}
                                        <span className="font-mono text-xs opacity-60">{track.duration}</span>
                                    </div>

                                    {/* Hover Fill Effect */}
                                    <div className="absolute inset-0 bg-[#ffffff03] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0"></div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Right Col: Timeline & Stats */}
                  <div className="md:col-span-5 space-y-12">
                      
                      {/* Timeline */}
                      <div>
                          <h3 className="text-white font-cyber text-xl mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 bg-[#ff003c]"></span>
                                <span className="tracking-widest">TIMELINE</span>
                          </h3>
                          <div className="relative border-l border-[#333] ml-3 space-y-6 pl-8 py-2">
                               {TIMELINE_EVENTS.map((item, i) => (
                                   <div key={i} className="relative group cursor-default">
                                       <div className="absolute -left-[37px] top-1.5 w-3 h-3 bg-[#0b0b0b] border border-[#555] rounded-full group-hover:border-[#ff003c] group-hover:bg-[#ff003c] transition-all duration-300 shadow-[0_0_0_transparent] group-hover:shadow-[0_0_10px_#ff003c]"></div>
                                       
                                       <div className="flex flex-col">
                                            <span className="text-[#ff003c] font-cyber font-bold text-sm mb-1 group-hover:text-[#fcee0a] transition-colors duration-300">{item.year}</span>
                                            <span className="text-gray-300 font-bold text-sm block group-hover:text-white transition-colors duration-300">{item.title}</span>
                                            
                                            {/* Expandable Details */}
                                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                                                <div className="overflow-hidden">
                                                    <p className="text-gray-500 font-mono text-xs leading-relaxed mt-2 border-l-2 border-[#ff003c] pl-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                       </div>
                                   </div>
                               ))}
                          </div>
                      </div>

                      {/* Members */}
                      <div>
                          <h3 className="text-white font-cyber text-xl mb-6 tracking-widest">PERSONNEL</h3>
                          <div className="grid grid-cols-1 gap-3">
                                {MEMBERS.map((member, i) => (
                                    <div key={i} className="flex items-center justify-between bg-[#111] p-3 border-l-2 border-transparent hover:border-[#00f0ff] transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="text-gray-600 group-hover:text-[#00f0ff] transition-colors">{member.icon}</div>
                                            <span className="text-gray-300 font-bold text-sm uppercase group-hover:text-white">{member.name}</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-600 uppercase group-hover:text-[#00f0ff]">{member.role.split(' ')[0]}</span>
                                    </div>
                                ))}
                          </div>
                      </div>

                  </div>

              </div>

              {/* Footer Note */}
              <div className="mt-20 border-t border-[#222] pt-8 flex justify-between items-end opacity-50 hover:opacity-100 transition-opacity">
                  <div className="font-mono text-[10px] text-gray-500 max-w-xs">
                      WARNING: LISTENING TO SUBVERSIVE MATERIAL MAY VIOLATE NCPD CODE 330.1. PROCEED AT OWN RISK.
                  </div>
                  <div className="text-right">
                       <div className="font-cyber text-2xl font-bold text-[#333]">NIGHT CITY</div>
                       <div className="font-mono text-xs text-[#ff003c]">ARCHIVES_2077</div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Samurai;
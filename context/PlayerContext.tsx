import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ASSETS } from "../assets";

export interface Track {
  title: string;
  duration: string;
  file: string;
  cover: string;
}

export const TRACKS: Track[] = [
  {
    title: "Chippin' In",
    duration: "3:30",
    file: ASSETS.music.chippinIn,
    cover: ASSETS.albumCovers.chippinIn,
  },
  {
    title: "Never Fade Away",
    duration: "3:10",
    file: ASSETS.music.neverFadeAway,
    cover: ASSETS.albumCovers.neverFadeAway,
  },
  {
    title: "A Like Supreme",
    duration: "3:49",
    file: ASSETS.music.aLikeSupreme,
    cover: ASSETS.albumCovers.aLikeSupreme,
  },
  {
    title: "Archangel",
    duration: "3:00",
    file: ASSETS.music.archangel,
    cover: ASSETS.albumCovers.archangel,
  },
  {
    title: "Black Dog",
    duration: "4:24",
    file: ASSETS.music.blackDog,
    cover: ASSETS.albumCovers.blackDog,
  },
];

interface PlayerState {
  trackIndex: number;
  track: Track;
  isPlaying: boolean;
  /** True once the listener has started anything; drives the navbar mini-player. */
  hasStarted: boolean;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  /** Select a track and start playing it. */
  playTrack: (index: number) => void;
  seek: (percent: number) => void;
}

interface PlayerProgress {
  currentTime: number;
  /** 0–100 */
  progress: number;
}

const PlayerContext = createContext<PlayerState | undefined>(undefined);
// Progress ticks ten times a second, so it lives in its own context: only the
// player screen re-renders on it, not the navbar.
const PlayerProgressContext = createContext<PlayerProgress>({
  currentTime: 0,
  progress: 0,
});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progressState, setProgressState] = useState<PlayerProgress>({
    currentTime: 0,
    progress: 0,
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  const startPlayback = useCallback(() => {
    audioRef.current?.play().catch((e) => {
      // Autoplay policy, missing file or an interrupted load: reflect it in the UI.
      if (e instanceof DOMException && e.name === "AbortError") return;
      console.warn("Audio playback failed", e);
      setIsPlaying(false);
    });
  }, []);

  const next = useCallback(
    () => setTrackIndex((prev) => (prev + 1) % TRACKS.length),
    [],
  );
  const prev = useCallback(
    () => setTrackIndex((p) => (p - 1 + TRACKS.length) % TRACKS.length),
    [],
  );

  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.5;
    audio.preload = "metadata";
    audioRef.current = audio;

    const sync = () => {
      const hasDuration = Number.isFinite(audio.duration) && audio.duration > 0;
      setProgressState({
        currentTime: audio.currentTime,
        progress: hasDuration ? (audio.currentTime / audio.duration) * 100 : 0,
      });
    };

    // isPlaying stays as is, so the next track starts automatically.
    audio.addEventListener("ended", next);
    audio.addEventListener("timeupdate", sync);
    audio.addEventListener("seeked", sync);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", next);
      audio.removeEventListener("timeupdate", sync);
      audio.removeEventListener("seeked", sync);
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, [next]);

  // Nothing is fetched until the listener starts the player.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasStarted) return;
    audio.src = TRACKS[trackIndex].file;
    setProgressState({ currentTime: 0, progress: 0 });
    if (isPlayingRef.current) startPlayback();
  }, [trackIndex, hasStarted, startPlayback]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (isPlaying) startPlayback();
    else audioRef.current?.pause();
  }, [isPlaying, startPlayback]);

  // timeupdate fires ~4×/s; a short interval keeps the tenths counter smooth.
  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      const audio = audioRef.current;
      if (!audio) return;
      const hasDuration = Number.isFinite(audio.duration) && audio.duration > 0;
      setProgressState({
        currentTime: audio.currentTime,
        progress: hasDuration ? (audio.currentTime / audio.duration) * 100 : 0,
      });
    }, 100);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const toggle = useCallback(() => {
    setHasStarted(true);
    setIsPlaying((playing) => !playing);
  }, []);

  const playTrack = useCallback((index: number) => {
    setHasStarted(true);
    setTrackIndex(index);
    setIsPlaying(true);
  }, []);

  const seek = useCallback((percent: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    audio.currentTime = (percent / 100) * audio.duration;
  }, []);

  const state = useMemo<PlayerState>(
    () => ({
      trackIndex,
      track: TRACKS[trackIndex],
      isPlaying,
      hasStarted,
      toggle,
      next,
      prev,
      playTrack,
      seek,
    }),
    [trackIndex, isPlaying, hasStarted, toggle, next, prev, playTrack, seek],
  );

  return (
    <PlayerContext.Provider value={state}>
      <PlayerProgressContext.Provider value={progressState}>
        {children}
      </PlayerProgressContext.Provider>
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within a PlayerProvider");
  return context;
};

export const usePlayerProgress = () => useContext(PlayerProgressContext);

import React from "react";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft } from "lucide-react";
import { ASSETS } from "../assets";
import { TRACKS, usePlayer, usePlayerProgress } from "../context/PlayerContext";

const formatPlaybackTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00.0";

  const totalTenths = Math.floor(seconds * 10);
  const minutes = Math.floor(totalTenths / 600);
  const remainingSeconds = Math.floor((totalTenths % 600) / 10);
  const tenths = totalTenths % 10;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}.${tenths}`;
};

const MEMBERS = [
  { name: "Johnny Silverhand", role: "Вокал / гитара" },
  { name: "Kerry Eurodyne", role: "Вокал / гитара" },
  { name: "Nancy (Bes Isis)", role: "Клавишные" },
  { name: "Denny", role: "Ударные" },
  { name: "Henry", role: "Бас" },
];

const TIMELINE_EVENTS = [
  {
    year: "2003",
    title: "Основание",
    description:
      "Основана Джонни Сильверхендом и Керри Евродином в задних комнатах «Rainbow Cadenza». Их сырая энергия и антикорпоративные тексты мгновенно нашли отклик у бесправной молодёжи Найт-Сити.",
  },
  {
    year: "2008",
    title: "Распад",
    description:
      "После того как клавишница Нэнси была арестована за то, что выбросила мужа-абьюзера из окна, группа распалась. 7 месяцев тюрьмы для неё означали конец Samurai.",
  },
  {
    year: "2023",
    title: "Башня Arasaka",
    description:
      "Джонни возглавил ударную группу Militech, чтобы проникнуть в сердце Арасака-Тауэр и спасти Альт Каннингем. Миссия закончилась ядерным взрывом, уничтожившим центр города, и физической смертью Джонни.",
  },
  {
    year: "2077",
    title: "Воссоединение",
    description:
      "Спустя десятилетия выжившие участники воссоединились для одного последнего концерта в баре Red Dirt. Используя тело Ви как проводник для Джонни, они сыграли «A Like Supreme» в последний раз.",
  },
];

interface SamuraiPageProps {
  onBack: () => void;
}

const Samurai = ({ onBack }: SamuraiPageProps) => {
  // Audio lives in PlayerProvider, so it keeps playing after this screen closes.
  const {
    trackIndex: currentTrackIdx,
    track: currentTrack,
    isPlaying,
    toggle: togglePlay,
    next: handleNext,
    prev: handlePrev,
    playTrack,
    seek,
  } = usePlayer();
  const { currentTime, progress } = usePlayerProgress();

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) =>
    seek(Number(e.target.value));

  const activeCover = currentTrack.cover || ASSETS.samuraiAlbum;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-ink text-bone animate-[fadeIn_0.35s_ease-out] lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:overflow-hidden">
      {/* Deck */}
      <div
        className={`relative flex min-h-[100svh] flex-col bg-blood text-black lg:min-h-0 lg:overflow-y-auto ${isPlaying ? "deck--playing" : ""}`}
      >
        <div className="flex items-center justify-between border-b-2 border-black px-5 py-4 md:px-8">
          <button
            type="button"
            onClick={onBack}
            className="label flex items-center gap-2 font-bold hover:underline"
          >
            <ArrowLeft size={16} /> Выход
          </button>
          <span className="label flex items-center gap-3 font-bold">
            <span className={`eq ${isPlaying ? "" : "eq--paused"}`}>
              <i />
              <i />
              <i />
            </span>
            {isPlaying ? "On air" : "Paused"} · 0{currentTrackIdx + 1}/0
            {TRACKS.length}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center px-5 py-10 md:px-10">
          <div className="deck__cover relative mx-auto mb-10 aspect-square w-[62%] max-w-[21.25rem]">
            <div className="vinyl" />
            <img
              key={currentTrack.title}
              src={activeCover}
              alt={`Обложка: ${currentTrack.title}`}
              className="relative z-10 h-full w-full border-2 border-black object-cover shadow-[0.625rem_0.625rem_0_#000] animate-[fadeIn_0.4s_ease-out]"
            />
          </div>

          <div className="label mb-2 font-bold">Samurai // Silverhand</div>
          <h2 className="display break-words text-[clamp(3rem,7.5vw,6.5rem)]">
            {currentTrack.title}
          </h2>

          <div className="mt-8">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleSeek}
              aria-label="Позиция воспроизведения"
              className="seek"
              style={{ "--p": `${progress}%` } as React.CSSProperties}
            />
            <div className="mt-1 flex justify-between font-mono text-xs font-bold tabular-nums">
              <span>{formatPlaybackTime(currentTime)}</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-blood transition-transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause size={30} fill="currentColor" />
              ) : (
                <Play size={30} fill="currentColor" className="ml-1" />
              )}
            </button>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Предыдущий трек"
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-black transition-colors hover:bg-black hover:text-blood"
            >
              <SkipBack size={22} fill="currentColor" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Следующий трек"
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-black transition-colors hover:bg-black hover:text-blood"
            >
              <SkipForward size={22} fill="currentColor" />
            </button>
          </div>
        </div>

        <p className="label border-t-2 border-black px-5 py-3 text-[0.5625rem] opacity-70 md:px-8">
          Music rights: CD PROJEKT RED / REFUSED / respective copyright holders
        </p>
      </div>

      {/* Liner notes */}
      <div className="custom-scrollbar relative lg:overflow-y-auto">
        <img
          src={ASSETS.samuraiLogo}
          alt=""
          className="pointer-events-none absolute -right-24 -top-16 w-[32.5rem] opacity-[0.06]"
        />
        <div className="relative px-5 py-12 md:px-12 md:py-16">
          <div className="section-index mb-6 text-blood">Est. 2003 · Night City</div>
          <h1 className="display text-[clamp(4rem,11vw,10.5rem)]">
            <span className="outline-text block">We are</span>
            Samurai
          </h1>
          <p className="mt-6 max-w-lg border-l-2 border-blood pl-5 text-base leading-relaxed text-bone/75">
            Хромированный рок. Голос улиц. Мятеж, записанный на плёнку.
            Единственная группа, которая сожгла город, чтобы доказать свою
            правоту.
          </p>

          <div className="section-index mb-2 mt-16 text-blood">Сет-лист</div>
          <ol className="border-b border-line">
            {TRACKS.map((track, idx) => {
              const active = currentTrackIdx === idx;
              return (
                <li key={track.title}>
                  <button
                    type="button"
                    onClick={() => playTrack(idx)}
                    aria-current={active}
                    className={`group flex w-full items-baseline gap-4 border-t border-line py-4 text-left transition-colors md:gap-6 ${active ? "text-blood" : "text-bone hover:text-blood"}`}
                  >
                    <span className="w-8 font-mono text-xs opacity-60">
                      0{idx + 1}
                    </span>
                    <span className="display flex-1 text-3xl transition-transform duration-300 group-hover:translate-x-2 md:text-5xl">
                      {track.title}
                    </span>
                    {active && (
                      <span className={`eq ${isPlaying ? "" : "eq--paused"}`}>
                        <i />
                        <i />
                        <i />
                      </span>
                    )}
                    <span className="font-mono text-xs opacity-60">
                      {track.duration}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-16 grid gap-14 xl:grid-cols-2">
            <div>
              <div className="section-index mb-6 text-blood">Хронология</div>
              <ol className="space-y-8">
                {TIMELINE_EVENTS.map((item) => (
                  <li key={item.year} className="grid grid-cols-[4.5rem_1fr] gap-4">
                    <span className="font-display text-3xl font-bold leading-none text-blood">
                      {item.year}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold uppercase tracking-wide">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-bone/65">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div className="section-index mb-6 text-blood">Состав</div>
              <ul>
                {MEMBERS.map((member) => (
                  <li
                    key={member.name}
                    className="flex items-baseline justify-between gap-4 border-t border-line py-3"
                  >
                    <span className="font-display text-xl font-bold uppercase">
                      {member.name}
                    </span>
                    <span className="label text-dust">{member.role}</span>
                  </li>
                ))}
              </ul>
              <p className="label mt-10 leading-relaxed text-dust">
                Warning: listening to subversive material may violate NCPD code
                330.1. Proceed at own risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Samurai;

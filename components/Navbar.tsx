import React, { useState, useEffect, useRef } from "react";
import { Pause, Play, Settings, Terminal as TerminalIcon } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import { useEscape, useScrollLock } from "../hooks/useOverlay";
import { useScramble } from "use-scramble";
import SamuraiButton from "./SamuraiButton";
import { ASSETS } from "../assets";

interface NavbarProps {
  onOpenSamurai: () => void;
  onOpenSettings?: () => void;
  onOpenTerminal?: () => void;
  useInternalScroll?: boolean;
  /** Logged in as Silverhand: the site is shown through his eyes. */
  johnnyView?: boolean;
}

const NAV_LINKS = [
  { name: "Главная", href: "#hero" },
  { name: "Досье", href: "#bio" },
  { name: "Арсенал", href: "#arsenal" },
  { name: "Энграмма", href: "#engram" },
];

const Navbar = ({
  onOpenSamurai,
  onOpenSettings,
  onOpenTerminal,
  useInternalScroll = false,
  johnnyView = false,
}: NavbarProps) => {
  const player = usePlayer();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useScrollLock(isOpen);
  useEscape(isOpen, () => setIsOpen(false));

  useEffect(() => {
    const scrollContainer = useInternalScroll
      ? document.querySelector<HTMLElement>(".crt-scroll-container")
      : null;
    const scrollTarget: Window | HTMLElement = scrollContainer || window;

    const sections = NAV_LINKS.map((link) =>
      document.querySelector<HTMLElement>(link.href),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = scrollContainer || document.documentElement;
      const scrollTop = scrollContainer ? el.scrollTop : window.scrollY;
      const max = el.scrollHeight - el.clientHeight;
      setScrolled(scrollTop > 40);
      // Playback head: written straight to a CSS variable, no re-render.
      navRef.current?.style.setProperty(
        "--progress",
        max > 0 ? String(Math.min(1, scrollTop / max)) : "0",
      );

      // Active link: the last section whose top has passed 40% of the screen.
      const line = window.innerHeight * 0.4;
      let current = 0;
      sections.forEach((section, i) => {
        // Sections are lazy-loaded, so look them up again until they exist.
        const node =
          section ??
          (sections[i] = document.querySelector<HTMLElement>(
            NAV_LINKS[i].href,
          ));
        if (node && node.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };

    // At most one measurement per frame, however many scroll events arrive.
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      scrollTarget.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [useInternalScroll]);

  const { ref: logoRef, replay: replayLogo } = useScramble({
    text: "SILVERHAND",
    speed: 0.5,
    tick: 1,
    step: 5,
    scramble: 5,
    seed: 1,
    chance: 1,
    overdrive: false,
    overflow: true,
    playOnMount: !useInternalScroll,
  });

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`nav ${scrolled || isOpen ? "nav--solid" : ""}`}
      >
        <div className="mx-auto flex h-14 max-w-(--page) items-center justify-between gap-6 px-5 md:px-10">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            onMouseEnter={replayLogo}
            className="flex items-center gap-2.5"
          >
            <img
              src={ASSETS.navLogo}
              alt=""
              className="h-7 w-7 object-contain"
            />
            <span
              ref={logoRef}
              className="font-display text-xl font-bold tracking-[0.12em] text-bone"
            >
              SILVERHAND
            </span>
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={active === i ? "true" : undefined}
                className={`nav__link ${active === i ? "nav__link--active" : ""}`}
              >
                <span>0{i + 1}</span>
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {player.hasStarted ? (
              <span className="mr-2 hidden items-center border border-line md:flex">
                <button
                  type="button"
                  onClick={player.toggle}
                  aria-label={player.isPlaying ? "Пауза" : "Воспроизвести"}
                  className="flex h-9 w-9 items-center justify-center text-blood hover:bg-blood hover:text-black"
                >
                  {player.isPlaying ? (
                    <Pause size={14} fill="currentColor" />
                  ) : (
                    <Play size={14} fill="currentColor" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={onOpenSamurai}
                  title="Открыть плеер"
                  className="label flex h-9 max-w-[13rem] items-center gap-2.5 border-l border-line px-3 text-bone hover:text-blood"
                >
                  <span
                    className={`eq text-blood ${player.isPlaying ? "" : "eq--paused"}`}
                  >
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="truncate">{player.track.title}</span>
                </button>
              </span>
            ) : null}
            {johnnyView && (
              <span
                className="label mr-2 hidden bg-acid px-2 py-1 font-bold text-black sm:inline"
                title="Вы вошли как Silverhand"
              >
                Глазами Джонни
              </span>
            )}
            <button
              type="button"
              onClick={onOpenTerminal}
              className="icon-btn hidden sm:inline-flex"
              aria-label="Терминал"
              title="Терминал"
            >
              <TerminalIcon size={18} />
            </button>
            <button
              type="button"
              onClick={onOpenSettings}
              className="icon-btn"
              aria-label="Настройки"
              title="Настройки"
            >
              <Settings size={18} />
            </button>
            <SamuraiButton
              onClick={onOpenSamurai}
              small
              className="ml-2 hidden sm:inline-flex"
            />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="label ml-2 h-9 border border-bone/40 px-3 text-bone lg:hidden"
              aria-expanded={isOpen}
              aria-label="Меню"
            >
              {isOpen ? "Закрыть" : "Меню"}
            </button>
          </div>
        </div>
        <div className="nav__progress" />
      </nav>

      <div
        className={`menu lg:hidden ${isOpen ? "menu--open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={isOpen ? 0 : -1}
              onClick={(e) => handleNavClick(e, link.href)}
              className="menu__link"
            >
              <span>0{i + 1}</span>
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => {
              setIsOpen(false);
              onOpenSamurai();
            }}
            className="btn btn--ink w-full"
          >
            Samurai — слушать
          </button>
          <button
            type="button"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => {
              setIsOpen(false);
              onOpenTerminal?.();
            }}
            className="btn btn--ink w-full"
          >
            <TerminalIcon size={16} /> Терминал
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { Menu, X, Settings, Terminal as TerminalIcon } from "lucide-react";
import { useScramble } from "use-scramble";
import SamuraiButton from "./SamuraiButton";
import { ASSETS } from "../assets";

interface NavbarProps {
  onOpenSamurai: () => void;
  onOpenSettings?: () => void;
  onOpenTerminal?: () => void;
  useInternalScroll?: boolean;
}

const Navbar = ({
  onOpenSamurai,
  onOpenSettings,
  onOpenTerminal,
  useInternalScroll = false,
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollContainer = useInternalScroll
      ? document.querySelector<HTMLElement>(".crt-scroll-container")
      : null;
    const scrollTarget: Window | HTMLElement = scrollContainer || window;

    const handleScroll = () => {
      const scrollTop =
        scrollTarget instanceof Window
          ? window.scrollY
          : scrollTarget.scrollTop;
      setScrolled(scrollTop > 50);
    };

    handleScroll();
    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollTarget.removeEventListener("scroll", handleScroll);
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

  const navLinks = [
    { name: "ГЛАВНАЯ", href: "#hero" },
    { name: "БИОГРАФИЯ", href: "#bio" },
    { name: "АРСЕНАЛ", href: "#arsenal" },
    { name: "ЭНГРАММА", href: "#engram" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 border-b border-transparent ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-[#ff003c]/30 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#fcee0a] transition-opacity ${scrolled ? "opacity-100" : "opacity-0"}`}
        ></div>
        <div
          className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#fcee0a] transition-opacity ${scrolled ? "opacity-100" : "opacity-0"}`}
        ></div>

        <div className="flex items-center justify-between h-16">
          <div
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
            onMouseEnter={replayLogo}
          >
            <img
              src={ASSETS.navLogo}
              alt="Samurai Logo"
              className="h-8 w-8 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#ff003c]"
            />
            <span
              ref={logoRef}
              className="font-cyber text-2xl font-bold tracking-widest text-white group-hover:text-[#00f0ff] transition-colors"
            >
              SILVERHAND
            </span>
          </div>

          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-8 mr-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative group font-cyber text-sm tracking-wider text-gray-300 px-3 py-2 transition-colors duration-200 overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-[#0b0b0b] transition-colors duration-200">
                    {link.name}
                  </span>
                  <span className="absolute inset-0 bg-[#00f0ff] transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 origin-left"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onOpenTerminal}
                className="text-gray-400 hover:text-[#00f0ff] transition-all duration-300 hover:scale-110"
                aria-label="Terminal"
                title="Access Terminal"
              >
                <TerminalIcon size={20} />
              </button>

              <button
                onClick={onOpenSettings}
                className="text-gray-400 hover:text-[#fcee0a] hover:rotate-90 transition-all duration-300"
                aria-label="Settings"
              >
                <Settings size={22} />
              </button>

              <SamuraiButton onClick={onOpenSamurai} />
            </div>
          </div>

          <div className="-mr-2 flex md:hidden gap-2">
            <button
              onClick={onOpenSettings}
              className="bg-black/50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-[#fcee0a] border border-transparent focus:outline-none"
            >
              <Settings size={22} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-black/50 inline-flex items-center justify-center p-2 rounded-md text-[#fcee0a] border border-[#fcee0a]/50 hover:bg-[#fcee0a]/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-x-0 top-[72px] bg-black/95 backdrop-blur-xl border-b border-[#00f0ff] transition-all duration-300 ease-in-out transform origin-top ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-cyber text-gray-300 hover:text-[#0b0b0b] hover:bg-[#fcee0a] block px-3 py-3 text-lg font-medium border-l-2 border-transparent hover:border-[#00f0ff] transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-4">
            <div className="flex gap-4">
              <button
                onClick={() => {
                  onOpenTerminal?.();
                  setIsOpen(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 text-gray-300 hover:text-[#00f0ff] font-cyber px-3 py-2 border border-gray-800 hover:border-[#00f0ff] transition-colors"
              >
                <TerminalIcon size={18} /> TERMINAL
              </button>
              <button
                onClick={() => {
                  onOpenSettings?.();
                  setIsOpen(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 text-gray-300 hover:text-[#fcee0a] font-cyber px-3 py-2 border border-gray-800 hover:border-[#fcee0a] transition-colors"
              >
                <Settings size={18} /> SETTINGS
              </button>
            </div>
            <SamuraiButton
              onClick={() => {
                onOpenSamurai();
                setIsOpen(false);
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

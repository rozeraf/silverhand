import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { useScramble } from 'use-scramble';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { ref: logoRef, replay: replayLogo } = useScramble({
    text: "SAMURAI",
    speed: 0.5,
    tick: 1,
    step: 5,
    scramble: 5,
    seed: 1,
    chance: 1,
    overdrive: false,
    overflow: true,
  });

  const navLinks = [
    { name: 'ГЛАВНАЯ', href: '#hero' },
    { name: 'БИОГРАФИЯ', href: '#bio' },
    { name: 'SAMURAI', href: '#samurai' },
    { name: 'АРСЕНАЛ', href: '#arsenal' },
    { name: 'ЭНГРАММА', href: '#engram' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed w-full z-40 transition-all duration-300 border-b border-transparent ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md border-[#ff003c]/30 py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative corner lines for HUD feel */}
        <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#fcee0a] transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#fcee0a] transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onMouseEnter={replayLogo}>
            <Zap className="text-[#fcee0a] group-hover:text-[#00f0ff] transition-colors" size={24} fill="currentColor" />
            <span ref={logoRef} className="font-cyber text-2xl font-bold tracking-widest text-white group-hover:text-[#00f0ff] transition-colors">
              SAMURAI
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative group font-cyber text-sm tracking-wider text-gray-300 px-3 py-2 transition-colors duration-200 overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-[#0b0b0b] transition-colors duration-200">{link.name}</span>
                  {/* Hover Background Slide */}
                  <span className="absolute inset-0 bg-[#00f0ff] transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 origin-left"></span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-black/50 inline-flex items-center justify-center p-2 rounded-md text-[#fcee0a] border border-[#fcee0a]/50 hover:bg-[#fcee0a]/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden fixed inset-x-0 top-[72px] bg-black/95 backdrop-blur-xl border-b border-[#00f0ff] transition-all duration-300 ease-in-out transform origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-cyber text-gray-300 hover:text-[#0b0b0b] hover:bg-[#fcee0a] block px-3 py-3 text-lg font-medium border-l-2 border-transparent hover:border-[#00f0ff] transition-all"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { Zap } from 'lucide-react';

interface SamuraiButtonProps {
  onClick: () => void;
  className?: string;
}

const SamuraiButton = ({ onClick, className = '' }: SamuraiButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center px-6 py-2 bg-transparent border-none outline-none cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 bg-[#fcee0a] transform -skew-x-12 clip-button transition-all duration-200 group-hover:bg-[#ff003c] group-hover:scale-105 shadow-[0_0_15px_rgba(252,238,10,0.5)] group-hover:shadow-[0_0_20px_rgba(255,0,60,0.6)]"></div>

      <div className="absolute top-0 left-2 w-full h-[1px] bg-black opacity-20 group-hover:opacity-0 transition-opacity"></div>
      <div className="absolute bottom-0 right-2 w-full h-[1px] bg-black opacity-20 group-hover:opacity-0 transition-opacity"></div>

      <span className="relative z-10 font-cyber font-black text-black text-lg tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
        <Zap size={18} fill="currentColor" className="hidden sm:block" />
        SAMURAI
      </span>
    </button>
  );
};

export default SamuraiButton;

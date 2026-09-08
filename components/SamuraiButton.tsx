import React from "react";
import { Zap } from "lucide-react";

interface SamuraiButtonProps {
  onClick: () => void;
  className?: string;
}

const SamuraiButton = ({ onClick, className = "" }: SamuraiButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`cp-yellow-button ${className}`}
    >
      <span className="flex items-center gap-2">
        <Zap size={18} fill="currentColor" className="hidden sm:block" />
        SAMURAI
      </span>
    </button>
  );
};

export default SamuraiButton;

import React from "react";
import { Disc3 } from "lucide-react";

interface SamuraiButtonProps {
  onClick: () => void;
  className?: string;
  small?: boolean;
}

const SamuraiButton = ({
  onClick,
  className = "",
  small = false,
}: SamuraiButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`btn btn--red ${small ? "btn--sm" : ""} ${className}`}
  >
    <Disc3 size={small ? 14 : 18} />
    Samurai
  </button>
);

export default SamuraiButton;

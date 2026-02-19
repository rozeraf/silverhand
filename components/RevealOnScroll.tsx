import React, { useEffect, useRef, useState } from "react";
import { useSettings } from "../context/SettingsContext";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

const RevealOnScroll: React.FC<RevealProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) => {
  const { enableAnimations } = useSettings();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If animations are disabled, we don't need the observer, just set visible
    if (!enableAnimations) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [enableAnimations]);

  let transformStyle = "";

  // If animations are disabled, or if it's visible, show normally
  if (!isVisible && enableAnimations) {
    if (direction === "up") transformStyle = "translate-y-12 opacity-0";
    if (direction === "left") transformStyle = "-translate-x-12 opacity-0";
    if (direction === "right") transformStyle = "translate-x-12 opacity-0";
  } else {
    transformStyle = "translate-y-0 translate-x-0 opacity-100";
  }

  return (
    <div
      ref={ref}
      className={`
        ${enableAnimations ? "transition-all duration-700 ease-out" : ""} 
        ${transformStyle} 
        ${className}
      `}
      style={enableAnimations ? { transitionDelay: `${delay}ms` } : {}}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;

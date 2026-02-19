import React, { useEffect, useState, useRef } from "react";
import { useSettings } from "../context/SettingsContext";

const CustomCursor = () => {
  const { enableCustomCursor } = useSettings();

  // Use a ref for the cursor element to modify styles directly without re-renders
  const cursorRef = useRef<HTMLDivElement>(null);

  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!enableCustomCursor) return;

    const mMove = (el: MouseEvent) => {
      // Direct DOM manipulation is much faster than React state updates for high-frequency events
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${el.clientX}px, ${el.clientY}px, 0)`;
      }

      const target = el.target as HTMLElement;
      const isLink =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.getAttribute("role") === "button";

      // Only trigger re-render if value actually changes (React does this check automatically for state, but good to know)
      setLinkHovered(isLink);
    };

    const mDown = () => setClicked(true);
    const mUp = () => setClicked(false);

    const mEnter = () => setHidden(false);
    const mLeave = () => setHidden(true);

    document.addEventListener("mousemove", mMove);
    document.addEventListener("mousedown", mDown);
    document.addEventListener("mouseup", mUp);
    document.body.addEventListener("mouseenter", mEnter);
    document.body.addEventListener("mouseleave", mLeave);

    return () => {
      document.removeEventListener("mousemove", mMove);
      document.removeEventListener("mousedown", mDown);
      document.removeEventListener("mouseup", mUp);
      document.body.removeEventListener("mouseenter", mEnter);
      document.body.removeEventListener("mouseleave", mLeave);
    };
  }, [enableCustomCursor]);

  // Don't render if disabled via settings, on touch devices, or off screen initially
  if (!enableCustomCursor) return null;
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches
  ) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block transition-opacity duration-300 ${hidden ? "opacity-0" : "opacity-100"}`}
      style={{
        // Initial position off-screen, updated via JS ref
        transform: `translate3d(-100px, -100px, 0)`,
        willChange: "transform", // Hardware acceleration hint
      }}
    >
      <div
        className={`relative -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out`}
      >
        {/* Center Dot */}
        <div
          className={`w-1 h-1 bg-[#ff003c] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${clicked ? "scale-150" : "scale-100"}`}
        />

        {/* Outer Ring / Crosshair Box */}
        <div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            border border-[#00f0ff] 
            transition-all duration-300
            ${linkHovered ? "w-8 h-8 rotate-45 border-[#fcee0a] border-2" : "w-5 h-5 rotate-0"}
            ${clicked ? "scale-75" : "scale-100"}
        `}
        >
          {/* Corner accents for the box */}
          {!linkHovered && (
            <>
              <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-[#00f0ff]"></div>
              <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-[#00f0ff]"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-[#00f0ff]"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-[#00f0ff]"></div>
            </>
          )}
        </div>

        {/* Infinite Crosshair Lines */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300vmax] h-[1px] bg-[#00f0ff] opacity-10 transition-opacity pointer-events-none ${clicked ? "opacity-30" : ""}`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[300vmax] bg-[#00f0ff] opacity-10 transition-opacity pointer-events-none ${clicked ? "opacity-30" : ""}`}
        ></div>
      </div>
    </div>
  );
};
export default CustomCursor;

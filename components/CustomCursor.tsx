import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useSettings } from "../context/SettingsContext";

interface CustomCursorProps {
  forceEnabled?: boolean;
  applyCrtWarp?: boolean;
}

const CustomCursor = ({
  forceEnabled = false,
  applyCrtWarp = false,
}: CustomCursorProps) => {
  const { enableCustomCursor } = useSettings();
  const isEnabled = enableCustomCursor || forceEnabled;

  const cursorRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;

    const mMove = (el: MouseEvent) => {
      if (cursorRef.current) {
        let x = el.clientX;
        let y = el.clientY;

        if (applyCrtWarp) {
          const normalizedX = (x / window.innerWidth) * 2 - 1;
          const normalizedY = (y / window.innerHeight) * 2 - 1;
          const radius2 = normalizedX ** 2 + normalizedY ** 2;
          const falloff = Math.min(radius2, 1.65);
          const scale = Math.max(
            52,
            Math.min(
              140,
              Math.min(window.innerWidth, window.innerHeight) * 0.12,
            ),
          );

          x -= normalizedX * falloff * 0.26 * scale;
          y -= normalizedY * falloff * 0.26 * scale;
        }

        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      const target = el.target as HTMLElement;
      const isLink =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.getAttribute("role") === "button";

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
  }, [applyCrtWarp, isEnabled]);

  if (!isEnabled) return null;
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches
  ) {
    return null;
  }

  return createPortal(
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block transition-opacity duration-300 ${hidden ? "opacity-0" : "opacity-100"}`}
      style={{
        transform: `translate3d(-100px, -100px, 0)`,
        willChange: "transform",
      }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out">
        <div
          className={`w-1 h-1 bg-[#ff003c] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${clicked ? "scale-150" : "scale-100"}`}
        />

        <div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            border border-[#00f0ff]
            transition-all duration-300
            ${linkHovered ? "w-8 h-8 rotate-45 border-[#fcee0a] border-2" : "w-5 h-5 rotate-0"}
            ${clicked ? "scale-75" : "scale-100"}
        `}
        >
          {!linkHovered && (
            <>
              <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-[#00f0ff]"></div>
              <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-[#00f0ff]"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-[#00f0ff]"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-[#00f0ff]"></div>
            </>
          )}
        </div>

        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300vmax] h-[1px] bg-[#00f0ff] opacity-10 transition-opacity pointer-events-none ${clicked ? "opacity-30" : ""}`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[300vmax] bg-[#00f0ff] opacity-10 transition-opacity pointer-events-none ${clicked ? "opacity-30" : ""}`}
        ></div>
      </div>
    </div>,
    document.body,
  );
};

export default CustomCursor;

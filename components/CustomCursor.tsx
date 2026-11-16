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
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${hidden ? "opacity-0" : "opacity-100"}`}
      style={{
        transform: `translate3d(-100px, -100px, 0)`,
        willChange: "transform",
      }}
    >
      <div className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood" />
      <div
        className={`cursor-ring absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 ${linkHovered ? "cursor-ring--link" : ""} ${clicked ? "cursor-ring--down" : ""}`}
      />
    </div>,
    document.body,
  );
};

export default CustomCursor;

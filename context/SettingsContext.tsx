import React, { createContext, useContext, useState, useEffect } from "react";
import { detectLowEnd } from "../lib/perf";

interface Settings {
  bootSequence: boolean;
  enableNoise: boolean;
  enableScanlines: boolean;
  /** Heavy CRT mode: WebGL + SVG barrel warp of the whole page. Only matters with enableScanlines. */
  enableCrtWarp: boolean;
  enableCustomCursor: boolean;
  enableAnimations: boolean;
  /** Lite rendering for weak devices; defaults to a hardware guess. */
  performanceMode: boolean;
}

interface SettingsContextType extends Settings {
  /** True when the heavy CRT geometry mode is actually active. */
  crtWarp: boolean;
  /** Scroll reveals and word-by-word type are on. */
  motion: boolean;
  updateSetting: (key: keyof Settings, value: boolean) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  bootSequence: true,
  enableNoise: true,
  enableScanlines: false,
  enableCrtWarp: false,
  enableCustomCursor: true,
  enableAnimations: true,
  performanceMode: detectLowEnd(),
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window === "undefined") return defaultSettings;

    const saved = localStorage.getItem("cyber_settings");

    if (!saved) {
      const hasVisited = localStorage.getItem("has_visited");
      return {
        ...defaultSettings,
        bootSequence: !hasVisited,
      };
    }

    try {
      return { ...defaultSettings, ...JSON.parse(saved) };
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem("cyber_settings", JSON.stringify(settings));
    localStorage.removeItem("has_visited");
  }, [settings]);

  const updateSetting = (key: keyof Settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => setSettings(defaultSettings);

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        crtWarp:
          settings.enableScanlines &&
          settings.enableCrtWarp &&
          !settings.performanceMode,
        motion: settings.enableAnimations && !settings.performanceMode,
        updateSetting,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within a SettingsProvider");
  return context;
};

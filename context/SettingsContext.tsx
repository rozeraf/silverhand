import React, { createContext, useContext, useState, useEffect } from "react";

interface Settings {
  bootSequence: boolean;
  enableNoise: boolean;
  enableScanlines: boolean;
  enableCustomCursor: boolean;
  enableAnimations: boolean;
}

interface SettingsContextType extends Settings {
  updateSetting: (key: keyof Settings, value: boolean) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  bootSequence: true,
  enableNoise: true,
  enableScanlines: true,
  enableCustomCursor: true,
  enableAnimations: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window === "undefined") return defaultSettings;

    const saved = localStorage.getItem("cyber_settings");

    // Compatibility check for previous "has_visited" logic
    // If no settings exist but 'has_visited' exists, we should respect that for bootSequence
    if (!saved) {
      const hasVisited = localStorage.getItem("has_visited");
      // If visited (true), bootSequence should be false (don't show intro).
      // If not visited (null), bootSequence should be true (show intro).
      return {
        ...defaultSettings,
        bootSequence: !hasVisited,
      };
    }

    return { ...defaultSettings, ...JSON.parse(saved) };
  });

  useEffect(() => {
    localStorage.setItem("cyber_settings", JSON.stringify(settings));

    // Sync legacy key so App.tsx's initial state logic (which runs before context provider in some setups, or alongside) stays consistent
    if (settings.bootSequence) {
      localStorage.removeItem("has_visited");
    } else {
      localStorage.setItem("has_visited", "true");
    }
  }, [settings]);

  const updateSetting = (key: keyof Settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => setSettings(defaultSettings);

  return (
    <SettingsContext.Provider
      value={{ ...settings, updateSetting, resetSettings }}
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

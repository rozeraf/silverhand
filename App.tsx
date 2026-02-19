import React, { useState, Suspense, lazy, useEffect } from "react";
import Terminal from "./components/Terminal"; // Replaces LoadingScreen
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import SettingsModal from "./components/SettingsModal";
import { useSettings } from "./context/SettingsContext";
import { ASSETS } from "./assets";

// Lazy load components
const Biography = lazy(() => import("./components/Biography"));
const ClassifiedSection = lazy(() => import("./components/ClassifiedSection"));
const Arsenal = lazy(() => import("./components/Arsenal"));
const Engram = lazy(() => import("./components/Engram"));
const Samurai = lazy(() => import("./components/Samurai"));
const Footer = lazy(() => import("./components/Footer"));

const App: React.FC = () => {
  const { enableNoise, enableScanlines, enableCustomCursor } = useSettings();

  // State for Terminal Visibility
  const [showTerminal, setShowTerminal] = useState(false);
  const [skipBoot, setSkipBoot] = useState(false);

  // State for Classified Content Access
  const [isClassified, setIsClassified] = useState(false);

  const [showSamuraiPage, setShowSamuraiPage] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Initial Boot Check
  useEffect(() => {
    // Check if user has visited before (for boot sequence)
    const hasVisited = localStorage.getItem("has_visited");

    // Check if user is already authorized for classified info
    const classifiedStatus = localStorage.getItem("classified") === "true";
    setIsClassified(classifiedStatus);

    if (!hasVisited) {
      // First visit: Show terminal with boot sequence
      setShowTerminal(true);
      setSkipBoot(false);
      localStorage.setItem("has_visited", "true");
    } else {
      // Subsequent visits: Site loads normally, terminal closed
      setShowTerminal(false);
      setSkipBoot(true); // If opened manually later, skip boot
    }
  }, []);

  // Set Favicon dynamically
  useEffect(() => {
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    (link as HTMLLinkElement).type = "image/png";
    (link as HTMLLinkElement).rel = "icon";
    (link as HTMLLinkElement).href = ASSETS.favicon;
    document.getElementsByTagName("head")[0].appendChild(link);
  }, []);

  const handleOpenTerminal = () => {
    setSkipBoot(true); // Always skip boot when opening manually
    setShowTerminal(true);
  };

  const handleAuthSuccess = (unlockedClassified: boolean) => {
    // Called by Terminal when login logic finishes
    setIsClassified(unlockedClassified);
  };

  return (
    <div
      className={`min-h-screen bg-[#0b0b0b] text-white selection:bg-[#00f0ff] selection:text-black relative ${enableCustomCursor ? "cursor-none" : "cursor-auto"}`}
    >
      {enableCustomCursor && <CustomCursor />}

      {/* Global Effects Controlled by Settings */}
      {enableScanlines && <div className="scanlines"></div>}
      {enableNoise && <div className="noise-bg"></div>}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onOpenTerminal={() => {
          setShowSettings(false);
          handleOpenTerminal();
        }}
      />

      {/* Interactive Terminal (Replaces LoadingScreen) */}
      <Terminal
        isOpen={showTerminal}
        onClose={() => setShowTerminal(false)}
        skipBoot={skipBoot}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Samurai Page Overlay */}
      {showSamuraiPage && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center text-[#ff003c] font-cyber">
              INITIALIZING_MUSIC_DB...
            </div>
          }
        >
          <Samurai onBack={() => setShowSamuraiPage(false)} />
        </Suspense>
      )}

      {/* Main App Content */}
      <div>
        <Navbar
          onOpenSamurai={() => setShowSamuraiPage(true)}
          onOpenSettings={() => setShowSettings(true)}
          onOpenTerminal={handleOpenTerminal}
        />

        <main>
          <Hero onOpenSamurai={() => setShowSamuraiPage(true)} />

          <Suspense
            fallback={
              <div className="h-96 w-full flex items-center justify-center bg-[#0b0b0b]">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-1 bg-[#ff003c] animate-pulse mb-2"></div>
                  <div className="font-cyber text-[#00f0ff] animate-pulse">
                    LOADING_DATA_SHARDS...
                  </div>
                </div>
              </div>
            }
          >
            <Biography />

            {/* Classified Section - Only renders if authorized */}
            {isClassified && <ClassifiedSection />}

            <Arsenal />
            <Engram />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default App;

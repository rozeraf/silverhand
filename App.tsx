import React, { useState, Suspense, lazy, useEffect } from "react";
import Terminal from "./components/Terminal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import SettingsModal from "./components/SettingsModal";
import CrtShader from "./components/CrtShader";
import CrtOverlay from "./components/CrtOverlay";
import SectionTransition from "./components/SectionTransition";
import { useSettings } from "./context/SettingsContext";

const Biography = lazy(() => import("./components/Biography"));
const ClassifiedSection = lazy(() => import("./components/ClassifiedSection"));
const Arsenal = lazy(() => import("./components/Arsenal"));
const Engram = lazy(() => import("./components/Engram"));
const Samurai = lazy(() => import("./components/Samurai"));
const DeveloperNote = lazy(() => import("./components/DeveloperNote"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  const {
    bootSequence,
    enableNoise,
    enableScanlines,
    enableCustomCursor,
    crtWarp,
  } = useSettings();

  const [showTerminal, setShowTerminal] = useState(false);
  const [skipBoot, setSkipBoot] = useState(false);
  const [isClassified, setIsClassified] = useState(false);
  const [showSamuraiPage, setShowSamuraiPage] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const enableCrtGeometry =
    crtWarp && !showTerminal && !showSettings && !showSamuraiPage;

  useEffect(() => {
    setIsClassified(localStorage.getItem("classified") === "true");
    if (bootSequence) {
      setSkipBoot(false);
      setShowTerminal(true);
    }
    // Boot sequence is decided once per page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenTerminal = () => {
    setSkipBoot(true);
    setShowTerminal(true);
  };

  const handleAuthSuccess = (unlockedClassified: boolean) => {
    setIsClassified(unlockedClassified);
  };

  return (
    <div
      className={`${
        crtWarp
          ? `crt-scroll-container h-screen overflow-x-hidden overflow-y-auto ${enableCrtGeometry ? "crt-barrel-surface" : ""}`
          : "min-h-screen"
      } bg-[#0b0b0b] text-white selection:bg-[#00f0ff] selection:text-black relative ${enableCustomCursor || crtWarp ? "cursor-none" : "cursor-auto"}`}
    >
      {(enableCustomCursor || crtWarp) && (
        <CustomCursor
          forceEnabled={crtWarp}
          applyCrtWarp={enableCrtGeometry}
        />
      )}

      {crtWarp ? <CrtShader /> : enableScanlines && <CrtOverlay />}
      {enableNoise && !crtWarp && <div className="noise-bg"></div>}

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onOpenTerminal={() => {
          setShowSettings(false);
          handleOpenTerminal();
        }}
      />

      <Terminal
        isOpen={showTerminal}
        onClose={() => setShowTerminal(false)}
        skipBoot={skipBoot}
        onAuthSuccess={handleAuthSuccess}
      />

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

      <div>
        <Navbar
          onOpenSamurai={() => setShowSamuraiPage(true)}
          onOpenSettings={() => setShowSettings(true)}
          onOpenTerminal={handleOpenTerminal}
          useInternalScroll={crtWarp}
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
            {isClassified && (
              <>
                <SectionTransition />
                <ClassifiedSection />
                <SectionTransition direction="out" />
              </>
            )}
            <Arsenal />
            <Engram />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <DeveloperNote />
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default App;

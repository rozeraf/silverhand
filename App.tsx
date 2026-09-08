import React, { useState, Suspense, lazy, useEffect } from "react";
import Terminal from "./components/Terminal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import SettingsModal from "./components/SettingsModal";
import CrtShader from "./components/CrtShader";
import SectionTransition from "./components/SectionTransition";
import { useSettings } from "./context/SettingsContext";
import { ASSETS } from "./assets";

const Biography = lazy(() => import("./components/Biography"));
const ClassifiedSection = lazy(() => import("./components/ClassifiedSection"));
const Arsenal = lazy(() => import("./components/Arsenal"));
const Engram = lazy(() => import("./components/Engram"));
const Samurai = lazy(() => import("./components/Samurai"));
const DeveloperNote = lazy(() => import("./components/DeveloperNote"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  const { enableNoise, enableScanlines, enableCustomCursor } = useSettings();

  const [showTerminal, setShowTerminal] = useState(false);
  const [skipBoot, setSkipBoot] = useState(false);
  const [isClassified, setIsClassified] = useState(false);
  const [showSamuraiPage, setShowSamuraiPage] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const enableCrtGeometry =
    enableScanlines && !showTerminal && !showSettings && !showSamuraiPage;

  useEffect(() => {
    const hasVisited = localStorage.getItem("has_visited");
    const classifiedStatus = localStorage.getItem("classified") === "true";
    setIsClassified(classifiedStatus);

    if (!hasVisited) {
      setShowTerminal(true);
      setSkipBoot(false);
      localStorage.setItem("has_visited", "true");
    } else {
      setShowTerminal(false);
      setSkipBoot(true);
    }
  }, []);

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
    setSkipBoot(true);
    setShowTerminal(true);
  };

  const handleAuthSuccess = (unlockedClassified: boolean) => {
    setIsClassified(unlockedClassified);
  };

  return (
    <div
      className={`${
        enableScanlines
          ? `crt-scroll-container h-screen overflow-x-hidden overflow-y-auto ${enableCrtGeometry ? "crt-barrel-surface" : ""}`
          : "min-h-screen"
      } bg-[#0b0b0b] text-white selection:bg-[#00f0ff] selection:text-black relative ${enableCustomCursor || enableScanlines ? "cursor-none" : "cursor-auto"}`}
    >
      {(enableCustomCursor || enableScanlines) && (
        <CustomCursor
          forceEnabled={enableScanlines}
          applyCrtWarp={enableCrtGeometry}
        />
      )}

      {enableScanlines && <CrtShader />}
      {enableNoise && !enableScanlines && <div className="noise-bg"></div>}

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
          useInternalScroll={enableScanlines}
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

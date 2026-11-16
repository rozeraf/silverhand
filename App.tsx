import React, { useState, Suspense, lazy, useEffect } from "react";
import Terminal from "./components/Terminal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import SettingsModal from "./components/SettingsModal";
import CrtShader from "./components/CrtShader";
import CrtOverlay from "./components/CrtOverlay";
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
  const [showUnlockToast, setShowUnlockToast] = useState(false);
  // Bumped whenever the view switches, to replay the smear cut.
  const [cut, setCut] = useState(0);
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
    if (unlockedClassified !== isClassified) setCut((n) => n + 1);
    setIsClassified(unlockedClassified);
    setShowUnlockToast(unlockedClassified);
  };

  // The whole site has two views: the official record and Johnny's own.
  // CSS keys off this attribute (see "Two views" in styles/main.css).
  useEffect(() => {
    document.documentElement.dataset.view = isClassified
      ? "johnny"
      : "official";
  }, [isClassified]);

  return (
    <div
      className={`${
        crtWarp
          ? `crt-scroll-container h-screen overflow-x-hidden overflow-y-auto ${enableCrtGeometry ? "crt-barrel-surface" : ""}`
          : "min-h-screen"
      } bg-ink text-bone relative ${enableCustomCursor || crtWarp ? "cursor-none" : "cursor-auto"}`}
    >
      {(enableCustomCursor || crtWarp) && (
        <CustomCursor
          forceEnabled={crtWarp}
          applyCrtWarp={enableCrtGeometry}
        />
      )}

      {crtWarp ? <CrtShader /> : enableScanlines && <CrtOverlay />}
      {enableNoise && !crtWarp && (
        <>
          <div className="noise-bg"></div>
          <div className="relic-fx" aria-hidden="true">
            <i />
            <i />
            <i />
            <b>
              <span>⚠ Warning</span>
              <span>Relic malfunction</span>
            </b>
          </div>
        </>
      )}

      {cut > 0 && (
        <div key={cut} className="smear-cut" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      )}

      {showUnlockToast && (
        <div
          className="view-toast"
          role="status"
          onAnimationEnd={() => setShowUnlockToast(false)}
        >
          <span className="label font-bold">Engram unlocked</span>
          <span className="font-display text-lg font-bold uppercase leading-none">
            Теперь вы смотрите глазами Джонни
          </span>
        </div>
      )}

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
            <div className="label fixed inset-0 z-[100] flex items-center justify-center bg-blood text-black">
              Initializing_music_db…
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
          johnnyView={isClassified}
        />

        <main>
          <Hero onOpenSamurai={() => setShowSamuraiPage(true)} />

          <Suspense
            fallback={
              <div className="label flex h-96 w-full items-center justify-center bg-ink text-blood">
                <span className="animate-pulse">Loading_data_shards…</span>
              </div>
            }
          >
            <Biography />
            {isClassified && (
<ClassifiedSection />
            )}
            <Arsenal />
            <Engram />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <DeveloperNote onOpenTerminal={handleOpenTerminal} />
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default App;

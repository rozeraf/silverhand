import React, {
  useState,
  Suspense,
  lazy,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useEscape, useScrollLock } from "./hooks/useOverlay";
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
    performanceMode,
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
  // The barrel filter makes the scroll container the containing block for
  // fixed elements, so they scroll with it. The terminal and the player are
  // fine (the page is hidden and scrolled to the top while they are open);
  // the settings dialog floats over a scrolled page, so it turns warp off.
  const enableCrtGeometry = crtWarp && !showSettings;

  // Full-screen overlays (terminal, player) hide the page instead of covering
  // it: a fixed layer over a full-height page let the page show through on slow
  // phones and ended up in full-page screenshots. The scroll position is kept
  // here and restored on close.
  const fullScreen = showTerminal || showSamuraiPage;
  const savedScroll = useRef(0);
  const scroller = () =>
    crtWarp
      ? document.querySelector<HTMLElement>(".crt-scroll-container")
      : null;
  const rememberScroll = () => {
    if (fullScreen) return;
    savedScroll.current = scroller()?.scrollTop ?? window.scrollY;
  };
  const firstRun = useRef(true);
  useLayoutEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const top = fullScreen ? 0 : savedScroll.current;
    const el = scroller();
    if (el) el.scrollTop = top;
    else window.scrollTo({ top, behavior: "instant" });
    // Only the open/close transition matters here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullScreen]);

  // The player has its own address (#samurai), so Back closes it instead of
  // leaving the site, and a link with #samurai opens it.
  const openSamurai = () => {
    rememberScroll();
    if (history.state?.overlay !== "samurai") {
      history.pushState({ overlay: "samurai" }, "", "#samurai");
    }
    setShowSamuraiPage(true);
  };
  const closeSamurai = () => {
    if (history.state?.overlay === "samurai") history.back();
    else setShowSamuraiPage(false);
  };
  useEffect(() => {
    const onPop = () =>
      setShowSamuraiPage(history.state?.overlay === "samurai");
    window.addEventListener("popstate", onPop);
    if (location.hash === "#samurai" && history.state?.overlay !== "samurai") {
      // Put a plain entry under the player so Back lands on the site.
      history.replaceState(null, "", location.pathname + location.search);
      history.pushState({ overlay: "samurai" }, "", "#samurai");
    }
    if (history.state?.overlay === "samurai") setShowSamuraiPage(true);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    setIsClassified(localStorage.getItem("classified") === "true");
    if (bootSequence) {
      rememberScroll();
      setSkipBoot(false);
      setShowTerminal(true);
    }
    // Boot sequence is decided once per page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CSS switches to cheap rendering under html[data-perf="lite"].
  useLayoutEffect(() => {
    document.documentElement.dataset.perf = performanceMode ? "lite" : "full";
  }, [performanceMode]);

  // html[data-crt="lite"] adds the CRT touches that live on page elements
  // (heading colour fringe); the overlay itself is CrtOverlay.
  useLayoutEffect(() => {
    document.documentElement.dataset.crt = crtWarp
      ? "warp"
      : enableScanlines
        ? "lite"
        : "off";
  }, [crtWarp, enableScanlines]);

  // html[data-cursor="custom"] hides the system cursor everywhere (main.css).
  const siteCursor = enableCustomCursor || crtWarp;
  useLayoutEffect(() => {
    document.documentElement.dataset.cursor = siteCursor ? "custom" : "native";
  }, [siteCursor]);

  const overlayOpen = showTerminal || showSettings || showSamuraiPage;
  // Full-screen overlays hide the page, so only the settings dialog, which
  // floats over the page, needs to lock its scroll.
  useScrollLock(showSettings);
  // Escape closes the topmost overlay.
  useEscape(overlayOpen, () => {
    if (showSettings) setShowSettings(false);
    else if (showTerminal) setShowTerminal(false);
    else closeSamurai();
  });

  const handleOpenTerminal = () => {
    rememberScroll();
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
      } bg-ink text-bone relative`}
    >
      {siteCursor && (
        <CustomCursor
          forceEnabled={crtWarp}
          applyCrtWarp={enableCrtGeometry}
        />
      )}

      {crtWarp ? <CrtShader /> : enableScanlines && <CrtOverlay />}
      {enableNoise && !crtWarp && !performanceMode && (
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
          <Samurai onBack={closeSamurai} />
        </Suspense>
      )}

      <div hidden={fullScreen}>
        <Navbar
          onOpenSamurai={openSamurai}
          onOpenSettings={() => setShowSettings(true)}
          onOpenTerminal={handleOpenTerminal}
          useInternalScroll={crtWarp}
          johnnyView={isClassified}
        />

        <main>
          <Hero onOpenSamurai={openSamurai} />

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

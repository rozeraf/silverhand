import React, { useState, Suspense, lazy, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import SettingsModal from "./components/SettingsModal";

// Lazy load components
const Biography = lazy(() => import("./components/Biography"));
const Arsenal = lazy(() => import("./components/Arsenal"));
const Engram = lazy(() => import("./components/Engram"));
const Samurai = lazy(() => import("./components/Samurai"));
const Footer = lazy(() => import("./components/Footer"));

const App: React.FC = () => {
  // Инициализируем состояние загрузки на основе localStorage
  // Если 'has_visited' существует, loading = false. Если нет - true.
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !localStorage.getItem("has_visited");
    }
    return true;
  });

  const [showSamuraiPage, setShowSamuraiPage] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Функция, вызываемая после окончания загрузки
  const handleLoadingComplete = () => {
    setLoading(false);
    // Записываем флаг, что пользователь увидел интро
    localStorage.setItem("has_visited", "true");
  };

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white selection:bg-[#00f0ff] selection:text-black relative">
      <CustomCursor />

      {/* Global Effects */}
      <div className="scanlines"></div>
      <div className="noise-bg"></div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
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

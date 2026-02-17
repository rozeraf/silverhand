import React, { useState, Suspense, lazy } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';

// Lazy load non-critical components to improve initial load time
const Biography = lazy(() => import('./components/Biography'));
const Engram = lazy(() => import('./components/Engram'));
const Footer = lazy(() => import('./components/Footer'));

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white selection:bg-[#00f0ff] selection:text-black relative">
      <CustomCursor />
      
      {/* Scanline overlay global */}
      <div className="scanlines"></div>
      <div className="noise-bg"></div>
      
      <Navbar />
      
      <main>
        {/* Hero is critical, so we don't lazy load it */}
        <Hero />
        
        <Suspense fallback={
          <div className="h-96 w-full flex items-center justify-center bg-[#0b0b0b]">
             <div className="flex flex-col items-center">
                <div className="w-16 h-1 bg-[#ff003c] animate-pulse mb-2"></div>
                <div className="font-cyber text-[#00f0ff] animate-pulse">LOADING_DATA_SHARDS...</div>
             </div>
          </div>
        }>
          <Biography />
          <Engram />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
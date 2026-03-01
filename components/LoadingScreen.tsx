import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootSequence = [
    "INITIALIZING RELIC BIOCHIP v2.0...",
    "CHECKING NEURAL LINK...",
    "ESTABLISHING SECURE CONNECTION...",
    "LOADING ENGRAM DATA: SILVERHAND, J...",
    "SYNCHRONIZING MEMORY FRAGMENTS...",
    "SYSTEM BREACH DETECTED... IGNORING...",
    "OVERRIDING SECURITY PROTOCOLS...",
    "WAKE THE F*** UP, SAMURAI...",
  ];

  useEffect(() => {
    let currentLog = 0;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 150);

    const logTimer = setInterval(() => {
      if (currentLog < bootSequence.length) {
        setLogs((prev) => [...prev, bootSequence[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logTimer);
        setTimeout(onComplete, 800);
      }
    }, 400);

    return () => {
      clearInterval(progressTimer);
      clearInterval(logTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono text-[#ff003c] p-8 overflow-hidden">
      <div className="w-full max-w-2xl border-2 border-[#ff003c] p-6 relative">
        <div className="absolute top-0 left-0 bg-[#ff003c] text-black text-xs px-2 py-1 font-bold">
          BIOS_CHECK
        </div>

        <div className="mb-8 space-y-2 h-64 overflow-y-auto font-cyber text-sm md:text-base">
          {logs.map((log, index) => (
            <div key={index} className="flex">
              <span className="mr-4 text-[#fcee0a]">{`> `}</span>
              <span className="typing-effect">{log}</span>
            </div>
          ))}
        </div>

        <div className="relative w-full h-6 border border-[#ff003c] p-1">
          <div
            className="h-full bg-[#ff003c] transition-all duration-100 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-[#fcee0a]">
          <span>RELIC INTEGRITY</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

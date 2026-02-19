import React, { useState, useEffect } from "react";
import { X, Terminal, MonitorPlay, Save } from "lucide-react";
import GlitchText from "./GlitchText";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [bootEnabled, setBootEnabled] = useState(true);

  // При открытии проверяем состояние localStorage
  useEffect(() => {
    if (isOpen) {
      // Если ключа 'has_visited' НЕТ, значит интро включено (первый запуск или сброс)
      // Если ключ ЕСТЬ, значит интро выключено (уже видели)
      const hasVisited = localStorage.getItem("has_visited");
      setBootEnabled(!hasVisited);
    }
  }, [isOpen]);

  const toggleBootSequence = () => {
    if (bootEnabled) {
      // Выключаем интро: говорим системе, что мы "уже посещали" сайт
      localStorage.setItem("has_visited", "true");
      setBootEnabled(false);
    } else {
      // Включаем интро: удаляем запись о посещении
      localStorage.removeItem("has_visited");
      setBootEnabled(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-lg bg-[#0b0b0b] border-2 border-[#fcee0a] shadow-[0_0_20px_rgba(252,238,10,0.3)] clip-corner-inverse">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#fcee0a]/30 bg-[#fcee0a]/5">
          <div className="flex items-center gap-2 text-[#fcee0a]">
            <Terminal size={20} />
            <span className="font-cyber tracking-widest text-sm">
              SYSTEM_CONFIG
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#ff003c] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          <div className="text-center mb-8">
            <GlitchText
              text="НАСТРОЙКИ ИНТЕРФЕЙСА"
              as="h3"
              className="text-2xl font-bold uppercase mb-2"
              color="yellow"
            />
            <div className="h-[1px] w-24 bg-[#ff003c] mx-auto"></div>
          </div>

          {/* Option: Boot Sequence */}
          <div className="flex items-center justify-between group">
            <div className="flex items-start gap-4">
              <div
                className={`p-2 bg-[#222] border border-[#333] group-hover:border-[#00f0ff] transition-colors ${bootEnabled ? "text-[#00f0ff]" : "text-gray-600"}`}
              >
                <MonitorPlay size={24} />
              </div>
              <div>
                <h4 className="text-white font-cyber text-lg tracking-wide group-hover:text-[#00f0ff] transition-colors">
                  BOOT SEQUENCE
                </h4>
                <p className="text-gray-500 text-xs font-mono max-w-[200px]">
                  Воспроизводить анимацию загрузки биочипа при следующем входе.
                </p>
              </div>
            </div>

            {/* Cyber Toggle Switch */}
            <button
              onClick={toggleBootSequence}
              className={`
                relative w-14 h-7 border transition-all duration-300
                ${
                  bootEnabled
                    ? "border-[#00f0ff] bg-[#00f0ff]/10"
                    : "border-[#333] bg-transparent"
                }
              `}
            >
              <div
                className={`
                  absolute top-0.5 bottom-0.5 w-6 bg-current transition-all duration-300
                  ${
                    bootEnabled
                      ? "right-0.5 bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
                      : "left-0.5 bg-[#333]"
                  }
                `}
              />
            </button>
          </div>

          {/* Info Status */}
          <div className="mt-8 p-3 bg-[#111] border-l-2 border-[#ff003c] font-mono text-xs text-gray-400">
            STATUS:{" "}
            {bootEnabled ? (
              <span className="text-[#00f0ff] animate-pulse">
                BOOT_SEQ_ARMED
              </span>
            ) : (
              <span className="text-gray-600">BOOT_SEQ_BYPASSED</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#333] flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-[#fcee0a] text-black font-cyber text-sm font-bold px-6 py-2 hover:bg-white transition-colors clip-button"
          >
            <Save size={16} />
            APPLY & EXIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

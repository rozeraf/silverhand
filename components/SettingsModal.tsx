import React from "react";
import {
  X,
  Terminal,
  MonitorPlay,
  Save,
  Film,
  Zap,
  Activity,
  MousePointer2,
} from "lucide-react";
import GlitchText from "./GlitchText";
import { useSettings } from "../context/SettingsContext";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    bootSequence,
    enableNoise,
    enableScanlines,
    enableCustomCursor,
    enableAnimations,
    updateSetting,
  } = useSettings();

  if (!isOpen) return null;

  const ToggleOption = ({
    label,
    description,
    value,
    onChange,
    icon: Icon,
  }: {
    label: string;
    description: string;
    value: boolean;
    onChange: () => void;
    icon: React.ElementType;
  }) => (
    <div className="flex items-center justify-between group py-4 border-b border-[#222] last:border-0">
      <div className="flex items-start gap-4">
        <div
          className={`p-2 bg-[#111] border border-[#333] group-hover:border-[#00f0ff] transition-colors ${value ? "text-[#00f0ff]" : "text-gray-600"}`}
        >
          <Icon size={20} />
        </div>
        <div>
          <h4 className="text-white font-cyber text-base tracking-wide group-hover:text-[#00f0ff] transition-colors">
            {label}
          </h4>
          <p className="text-gray-500 text-xs font-mono max-w-[200px] leading-tight mt-1">
            {description}
          </p>
        </div>
      </div>

      <button
        onClick={onChange}
        className={`
          relative w-12 h-6 border transition-all duration-300 flex-shrink-0 ml-4
          ${
            value
              ? "border-[#00f0ff] bg-[#00f0ff]/10"
              : "border-[#333] bg-transparent"
          }
        `}
      >
        <div
          className={`
            absolute top-0.5 bottom-0.5 w-5 bg-current transition-all duration-300
            ${
              value
                ? "right-0.5 bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
                : "left-0.5 bg-[#333]"
            }
          `}
        />
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-2xl bg-[#0b0b0b] border-2 border-[#fcee0a] shadow-[0_0_20px_rgba(252,238,10,0.3)] clip-corner-inverse max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#fcee0a]/30 bg-[#fcee0a]/5 shrink-0">
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
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="text-center mb-8">
            <GlitchText
              text="НАСТРОЙКИ СИСТЕМЫ"
              as="h3"
              className="text-2xl font-bold uppercase mb-2"
              color="yellow"
            />
            <div className="h-[1px] w-24 bg-[#ff003c] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <div className="md:col-span-2 mb-2">
              <h5 className="text-[#ff003c] font-cyber text-xs tracking-widest mb-4 border-b border-[#ff003c]/20 pb-1">
                ОБЩИЕ
              </h5>
            </div>

            <div className="md:col-span-2">
              <ToggleOption
                label="BOOT SEQUENCE"
                description="Анимация загрузки биочипа при входе."
                value={bootSequence}
                onChange={() => updateSetting("bootSequence", !bootSequence)}
                icon={MonitorPlay}
              />
            </div>

            <div className="md:col-span-2 mt-6 mb-2">
              <h5 className="text-[#ff003c] font-cyber text-xs tracking-widest mb-4 border-b border-[#ff003c]/20 pb-1">
                ВИЗУАЛИЗАЦИЯ & FX
              </h5>
            </div>

            <ToggleOption
              label="FILM GRAIN"
              description="Эффект пленочного шума на фоне."
              value={enableNoise}
              onChange={() => updateSetting("enableNoise", !enableNoise)}
              icon={Film}
            />

            <ToggleOption
              label="SCANLINES"
              description="Эффект ЭЛТ-монитора и линии развертки."
              value={enableScanlines}
              onChange={() =>
                updateSetting("enableScanlines", !enableScanlines)
              }
              icon={Activity}
            />

            <ToggleOption
              label="SMART CURSOR"
              description="Кастомный курсор с интерфейсом."
              value={enableCustomCursor}
              onChange={() =>
                updateSetting("enableCustomCursor", !enableCustomCursor)
              }
              icon={MousePointer2}
            />

            <ToggleOption
              label="ANIMATIONS"
              description="Эффекты появления при скролле (Fade In)."
              value={enableAnimations}
              onChange={() =>
                updateSetting("enableAnimations", !enableAnimations)
              }
              icon={Zap}
            />
          </div>

          {/* Info Status */}
          <div className="mt-8 p-3 bg-[#111] border-l-2 border-[#ff003c] font-mono text-xs text-gray-400 flex justify-between items-center">
            <span>
              VRAM USAGE:{" "}
              {enableNoise && enableScanlines ? "HIGH" : "OPTIMIZED"}
            </span>
            <span
              className={enableAnimations ? "text-[#00f0ff]" : "text-gray-600"}
            >
              {enableAnimations
                ? "PERFORMANCE_MODE: OFF"
                : "PERFORMANCE_MODE: ON"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#333] flex justify-end shrink-0 bg-[#0b0b0b]">
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

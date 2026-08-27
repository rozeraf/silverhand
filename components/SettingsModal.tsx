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
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import GlitchText from "./GlitchText";
import { useSettings } from "../context/SettingsContext";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal?: () => void;
}

const SettingsModal = ({ isOpen, onClose, onOpenTerminal }: SettingsModalProps) => {
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
    <div className="flex items-center justify-between group py-3 md:py-4 border-b border-[#222] last:border-0">
      <div className="flex items-start gap-3 md:gap-4">
        <div
          className={`p-2 bg-[#111] border border-[#333] group-hover:border-[#00f0ff] transition-colors ${value ? "text-[#00f0ff]" : "text-gray-600"}`}
        >
          <Icon size={18} className="md:w-5 md:h-5" />
        </div>
        <div>
          <h4 className="text-white font-cyber text-sm md:text-base tracking-wide group-hover:text-[#00f0ff] transition-colors">
            {label}
          </h4>
          <p className="text-gray-500 text-[10px] md:text-xs font-mono max-w-[180px] md:max-w-[200px] leading-tight mt-1">
            {description}
          </p>
        </div>
      </div>

      <button
        onClick={onChange}
        className={`
          relative w-10 h-5 md:w-12 md:h-6 border transition-all duration-300 flex-shrink-0 ml-4
          ${
            value
              ? "border-[#00f0ff] bg-[#00f0ff]/10"
              : "border-[#333] bg-transparent"
          }
        `}
      >
        <div
          className={`
            absolute top-0.5 bottom-0.5 w-4 md:w-5 bg-current transition-all duration-300
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 md:p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-[95%] max-w-2xl bg-[#0b0b0b] border-2 border-[#fcee0a] shadow-[0_0_20px_rgba(252,238,10,0.3)] clip-corner-inverse max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-3 md:p-4 border-b border-[#fcee0a]/30 bg-[#fcee0a]/5 shrink-0">
          <div className="flex items-center gap-2 text-[#fcee0a]">
            <Terminal size={18} className="md:w-5 md:h-5" />
            <span className="font-cyber tracking-widest text-xs md:text-sm">
              SYSTEM_CONFIG
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#ff003c] transition-colors p-1"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="text-center mb-6 md:mb-8">
            <GlitchText
              text="НАСТРОЙКИ СИСТЕМЫ"
              as="h3"
              className="text-xl md:text-2xl font-bold uppercase mb-2"
              color="yellow"
            />
            <div className="h-[1px] w-16 md:w-24 bg-[#ff003c] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <div className="md:col-span-2 mb-2">
              <h5 className="text-[#ff003c] font-cyber text-[10px] md:text-xs tracking-widest mb-2 md:mb-4 border-b border-[#ff003c]/20 pb-1">
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

            <div className="md:col-span-2 mt-2">
              <button
                onClick={onOpenTerminal}
                className="w-full flex items-center justify-between p-3 border border-[#333] hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#111] text-[#00f0ff] border border-[#333]">
                    <Terminal size={18} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-cyber text-sm tracking-wide">
                      SYSTEM TERMINAL
                    </h4>
                    <p className="text-gray-500 text-[10px] font-mono">
                      Access NetWatch console
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-gray-500 group-hover:text-[#00f0ff] group-hover:translate-x-1 transition-all"
                />
              </button>
            </div>

            <div className="md:col-span-2 mt-4 md:mt-6 mb-2">
              <h5 className="text-[#ff003c] font-cyber text-[10px] md:text-xs tracking-widest mb-2 md:mb-4 border-b border-[#ff003c]/20 pb-1">
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

            <div className="md:col-span-2 mt-5 border border-[#fcee0a]/70 bg-[#fcee0a]/[0.035] shadow-[inset_0_0_24px_rgba(252,238,10,0.035)]">
              <div className="flex items-center justify-between gap-3 border-b border-[#fcee0a]/30 bg-[#fcee0a]/10 px-3 py-2">
                <div className="flex items-center gap-2 text-[#fcee0a]">
                  <AlertTriangle size={15} />
                  <span className="font-cyber text-[10px] md:text-xs tracking-[0.2em]">
                    EXPERIMENTAL
                  </span>
                </div>
                <span className="border border-[#ff003c] bg-[#ff003c]/10 px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-[#ff003c]">
                  HIGH GPU LOAD
                </span>
              </div>

              <div className="px-3 md:px-4">
                <ToggleOption
                  label="CRT SHADER"
                  description="WebGL-развертка, фосфор, шум, преломление и геометрическое искривление."
                  value={enableScanlines}
                  onChange={() =>
                    updateSetting("enableScanlines", !enableScanlines)
                  }
                  icon={Activity}
                />
              </div>

              <div className="mx-3 mb-3 flex items-start gap-2 border-l-2 border-[#ff003c] bg-black/50 p-3 font-mono text-[9px] leading-relaxed text-gray-400 md:mx-4 md:mb-4 md:text-[10px]">
                <AlertTriangle
                  size={14}
                  className="mt-0.5 shrink-0 text-[#ff003c]"
                />
                <p>
                  Ресурсоёмкая экспериментальная функция. SVG displacement и
                  fullscreen WebGL могут значительно снизить FPS, увеличить
                  нагрузку на GPU и энергопотребление устройства.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8 p-3 bg-[#111] border-l-2 border-[#ff003c] font-mono text-[10px] md:text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0">
            <span>
              VRAM USAGE:{" "}
              {enableScanlines
                ? "CRITICAL"
                : enableNoise
                  ? "MODERATE"
                  : "OPTIMIZED"}
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

        <div className="p-3 md:p-4 border-t border-[#333] flex justify-end shrink-0 bg-[#0b0b0b]">
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-[#fcee0a] text-black font-cyber text-xs md:text-sm font-bold px-4 py-2 md:px-6 hover:bg-white transition-colors clip-button"
          >
            <Save size={14} className="md:w-4 md:h-4" />
            APPLY & EXIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

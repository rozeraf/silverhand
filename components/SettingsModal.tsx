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
  Tv,
  Gauge,
} from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { isGecko } from "../lib/perf";

const GECKO = isGecko();

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal?: () => void;
}

const ToggleOption = ({
  label,
  description,
  value,
  onChange,
  icon: Icon,
  disabled = false,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: () => void;
  icon: React.ElementType;
  disabled?: boolean;
}) => (
  <div
    className={`flex items-center justify-between gap-4 border-t border-line py-4 ${disabled ? "opacity-40" : ""}`}
  >
    <div className="flex items-start gap-4">
      <Icon
        size={18}
        className={`mt-0.5 shrink-0 ${value && !disabled ? "text-blood" : "text-dust"}`}
      />
      <div>
        <h4 className="font-mono text-sm font-bold uppercase tracking-[0.12em] text-bone">
          {label}
        </h4>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-dust">
          {description}
        </p>
      </div>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className="switch"
    />
  </div>
);

const SettingsModal = ({ isOpen, onClose, onOpenTerminal }: SettingsModalProps) => {
  const {
    bootSequence,
    enableNoise,
    enableScanlines,
    enableCrtWarp,
    enableCustomCursor,
    enableAnimations,
    performanceMode,
    crtWarp,
    updateSetting,
  } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-3 animate-[fadeIn_0.2s_ease-out] md:p-6">
      <div className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col border border-line bg-ink shadow-[0.75rem_0.75rem_0_var(--red)] animate-[rise_0.3s_ease-out]">
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4 md:px-8">
          <div>
            <div className="section-index text-blood">System_config</div>
            <h3 className="display mt-2 text-4xl md:text-5xl [@media(max-height:32rem)]:hidden">
              Настройки
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="icon-btn"
          >
            <X size={20} />
          </button>
        </div>

        <div className="custom-scrollbar overflow-y-auto px-5 py-6 md:px-8">
          <div className="label mb-1 text-dust">Общие</div>
          <ToggleOption
            label="Boot sequence"
            description="Анимация загрузки биочипа при входе."
            value={bootSequence}
            onChange={() => updateSetting("bootSequence", !bootSequence)}
            icon={MonitorPlay}
          />
          <button
            type="button"
            onClick={onOpenTerminal}
            className="group flex w-full items-center justify-between border-t border-line py-4 text-left"
          >
            <span className="flex items-start gap-4">
              <Terminal size={18} className="mt-0.5 shrink-0 text-dust" />
              <span>
                <span className="block font-mono text-sm font-bold uppercase tracking-[0.12em] text-bone group-hover:text-blood">
                  System terminal
                </span>
                <span className="mt-1 block text-xs text-dust">
                  Консоль NetWatch и загадка разработчика
                </span>
              </span>
            </span>
            <ChevronRight
              size={18}
              className="text-dust transition-transform group-hover:translate-x-1 group-hover:text-blood"
            />
          </button>

          <ToggleOption
            label="Performance mode"
            description="Облегчённый режим для слабых устройств: без зерна, размытия, теней и анимаций появления. Включается сам, если устройство похоже на слабое."
            value={performanceMode}
            onChange={() => updateSetting("performanceMode", !performanceMode)}
            icon={Gauge}
          />

          <div className="label mb-1 mt-8 text-dust">Визуализация и FX</div>
          <ToggleOption
            label="Film grain"
            description="Плёночный шум и редкие сбои Relic на экране."
            value={enableNoise}
            onChange={() => updateSetting("enableNoise", !enableNoise)}
            disabled={performanceMode}
            icon={Film}
          />
          <ToggleOption
            label="Smart cursor"
            description="Кастомный курсор с интерфейсом."
            value={enableCustomCursor}
            onChange={() =>
              updateSetting("enableCustomCursor", !enableCustomCursor)
            }
            icon={MousePointer2}
          />
          <ToggleOption
            label="Animations"
            description="Появление блоков и слов по одному при прокрутке."
            value={enableAnimations}
            onChange={() =>
              updateSetting("enableAnimations", !enableAnimations)
            }
            disabled={performanceMode}
            icon={Zap}
          />
          <ToggleOption
            label="CRT display"
            description="Сканлайны, фосфорная маска, виньетка и мерцание. Лёгкий режим без WebGL."
            value={enableScanlines}
            onChange={() => updateSetting("enableScanlines", !enableScanlines)}
            icon={Tv}
          />

          <div className="mt-8 border border-acid/60">
            <div className="hazard h-2" />
            <div className="flex items-center justify-between gap-3 px-4 pt-4">
              <span className="label flex items-center gap-2 text-acid">
                <AlertTriangle size={14} /> Experimental
              </span>
              <span className="label bg-blood px-2 py-0.5 text-black">
                High GPU load
              </span>
            </div>
            <div className="px-4">
              <ToggleOption
                label="CRT geometry warp"
                description={
                  enableScanlines
                    ? "WebGL-шейдер и искривление всей страницы под выпуклый кинескоп."
                    : "Сначала включите CRT display."
                }
                value={enableCrtWarp}
                disabled={!enableScanlines || performanceMode}
                onChange={() => updateSetting("enableCrtWarp", !enableCrtWarp)}
                icon={Activity}
              />
            </div>
            {GECKO && (
              <p className="mx-4 mb-3 border-l-2 border-blood pl-3 font-mono text-[0.6875rem] leading-relaxed text-bone">
                <span className="font-bold text-blood">Ваш браузер на движке Firefox.</span>{" "}
                Он считает этот фильтр на процессоре, а не на видеокарте: вся
                страница перерисовывается заново каждый кадр, и FPS падает до
                единиц. Для warp лучше браузер на Chromium.
              </p>
            )}
            <p className="px-4 pb-4 font-mono text-[0.625rem] leading-relaxed text-dust">
              Ресурсоёмкая экспериментальная функция: браузер заново прогоняет
              всю страницу через SVG displacement при каждом скролле и
              анимации, поверх работает fullscreen WebGL. FPS может сильно
              упасть, а нагрузка и энергопотребление вырасти.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-line px-5 py-4 md:px-8">
          <span className="label text-dust">
            VRAM:{" "}
            <span className={crtWarp ? "text-blood" : "text-bone"}>
              {crtWarp
                ? "Critical"
                : enableScanlines || enableNoise
                  ? "Moderate"
                  : "Optimized"}
            </span>
          </span>
          <button type="button" onClick={onClose} className="btn btn--red btn--sm">
            <Save size={14} /> Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

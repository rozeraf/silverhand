import React from "react";
import {
  X,
  Terminal,
  MonitorPlay,
  Film,
  Zap,
  Activity,
  MousePointer2,
  ChevronRight,
  Tv,
  Gauge,
  RotateCcw,
} from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { detectLowEnd, isGecko } from "../lib/perf";

const GECKO = isGecko();
const LOW_END = detectLowEnd();
const NO_MOUSE =
  typeof window !== "undefined" && matchMedia("(hover: none)").matches;

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal?: () => void;
}

/**
 * One setting. The whole row is the switch (a big target on touch screens).
 * `value` is what is actually in effect, not just the stored choice: a
 * setting overridden by another one shows as off (or forced on) and says why
 * in `lockedReason`, while the stored choice is kept for when the lock lifts.
 */
const Toggle = ({
  label,
  description,
  value,
  onChange,
  icon: Icon,
  lockedReason,
  tags,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: () => void;
  icon: React.ElementType;
  lockedReason?: string;
  tags?: React.ReactNode;
}) => {
  const locked = Boolean(lockedReason);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      disabled={locked}
      onClick={onChange}
      className="setting group flex w-full items-center justify-between gap-4 border-t border-line py-4 text-left"
    >
      <span className="flex items-start gap-4">
        <Icon
          size={18}
          className={`setting__dim mt-0.5 shrink-0 transition-colors ${value ? "text-blood" : "text-dust"}`}
        />
        <span>
          <span className="setting__dim flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="setting__label font-mono text-sm font-bold uppercase tracking-[0.12em] text-bone">
              {label}
            </span>
            {tags}
          </span>
          <span className="setting__dim mt-1 block max-w-md text-xs leading-relaxed text-dust">
            {description}
          </span>
          {lockedReason && (
            <span className="mt-1.5 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-acid">
              {lockedReason}
            </span>
          )}
        </span>
      </span>
      <span className="switch" data-on={value} aria-hidden="true" />
    </button>
  );
};

const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-8">
    <h4 className="label mb-1 text-dust">{title}</h4>
    {children}
  </section>
);

const LOAD = [
  { label: "Optimized", tone: "bg-bone" },
  { label: "Moderate", tone: "bg-acid" },
  { label: "Critical", tone: "bg-blood" },
] as const;

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
    motion,
    updateSetting,
    resetSettings,
  } = useSettings();

  if (!isOpen) return null;

  const grain = enableNoise && !performanceMode;
  const load = crtWarp ? 2 : enableScanlines || grain ? 1 : 0;
  const perfLock = performanceMode ? "Выключено режимом производительности" : undefined;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-3 animate-[fadeIn_0.2s_ease-out] md:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col border border-line bg-ink shadow-[0.75rem_0.75rem_0_var(--red)] animate-[rise_0.3s_ease-out]"
      >
        <div className="flex shrink-0 items-start justify-between border-b border-line px-5 py-4 md:px-8">
          <div>
            <div className="section-index text-blood">System_config</div>
            <h3
              id="settings-title"
              className="display mt-2 text-4xl md:text-5xl [@media(max-height:32rem)]:hidden"
            >
              Настройки
            </h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Закрыть" className="icon-btn">
            <X size={20} />
          </button>
        </div>

        <div className="custom-scrollbar overflow-y-auto px-5 pb-6 md:px-8">
          {/* Performance mode overrides several settings below, so it comes
              first and stands apart. */}
          <div className={`setting-card mt-6 border px-4 ${performanceMode ? "border-blood/70 bg-blood/[0.06]" : "border-line"}`}>
            <Toggle
              label="Performance mode"
              description="Облегчённый режим для слабых устройств: без зерна, размытия, теней, анимаций и WARP."
              value={performanceMode}
              onChange={() => updateSetting("performanceMode", !performanceMode)}
              icon={Gauge}
              tags={
                LOW_END && (
                  <span className="label border border-line px-1.5 py-0.5 text-[0.5625rem] text-dust">
                    Авто · слабое устройство
                  </span>
                )
              }
            />
          </div>

          <Group title="Экран">
            <Toggle
              label="CRT display"
              description="Строки развёртки, фосфорная решётка, виньетка и мерцание. Лёгкий режим без WebGL."
              value={enableScanlines}
              onChange={() => updateSetting("enableScanlines", !enableScanlines)}
              icon={Tv}
            />
            {/* Depends on CRT display: drawn as a branch of it. */}
            <div className="ml-[0.5625rem] border-l border-line pl-5 md:pl-7">
              <Toggle
                label="Geometry warp"
                description="Выпуклый кинескоп: WebGL-шейдер и искривление всей страницы. Очень тяжело для видеокарты."
                value={crtWarp}
                onChange={() => updateSetting("enableCrtWarp", !enableCrtWarp)}
                icon={Activity}
                lockedReason={
                  performanceMode
                    ? "Недоступно в режиме производительности"
                    : !enableScanlines
                      ? "Сначала включите CRT display"
                      : undefined
                }
                tags={
                  <>
                    <span className="label bg-acid px-1.5 py-0.5 text-[0.5625rem] text-black">
                      Experimental
                    </span>
                    <span className="label bg-blood px-1.5 py-0.5 text-[0.5625rem] text-black">
                      High GPU load
                    </span>
                  </>
                }
              />
              {GECKO && (
                <p className="mb-4 border-l-2 border-blood pl-3 font-mono text-[0.6875rem] leading-relaxed text-bone">
                  <span className="font-bold text-blood">Ваш браузер на движке Firefox.</span>{" "}
                  Он считает этот фильтр на процессоре, а не на видеокарте: вся
                  страница перерисовывается заново каждый кадр, и FPS падает до
                  единиц. Для warp лучше браузер на Chromium.
                </p>
              )}
            </div>
            <Toggle
              label="Film grain"
              description="Плёночный шум и редкие сбои Relic на экране."
              value={grain}
              onChange={() => updateSetting("enableNoise", !enableNoise)}
              icon={Film}
              lockedReason={perfLock}
            />
          </Group>

          <Group title="Интерфейс">
            <Toggle
              label="Animations"
              description="Появление блоков, слова по одному и пометки Джонни, которые пишутся при прокрутке."
              value={motion}
              onChange={() => updateSetting("enableAnimations", !enableAnimations)}
              icon={Zap}
              lockedReason={perfLock}
            />
            <Toggle
              label="Smart cursor"
              description="Курсор сайта вместо системного."
              value={!NO_MOUSE && (enableCustomCursor || crtWarp)}
              onChange={() => updateSetting("enableCustomCursor", !enableCustomCursor)}
              icon={MousePointer2}
              lockedReason={
                NO_MOUSE
                  ? "Только для мыши"
                  : crtWarp
                    ? "Включён warp: курсор искривляется вместе с экраном"
                    : undefined
              }
            />
            <Toggle
              label="Boot sequence"
              description="Загрузка биочипа и терминал при каждом входе на сайт."
              value={bootSequence}
              onChange={() => updateSetting("bootSequence", !bootSequence)}
              icon={MonitorPlay}
            />
            <button
              type="button"
              onClick={onOpenTerminal}
              className="setting group flex w-full items-center justify-between border-t border-line py-4 text-left"
            >
              <span className="flex items-start gap-4">
                <Terminal size={18} className="mt-0.5 shrink-0 text-dust" />
                <span>
                  <span className="setting__label block font-mono text-sm font-bold uppercase tracking-[0.12em] text-bone">
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
          </Group>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-line px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <span className="flex gap-1" aria-hidden="true">
              {LOAD.map((level, i) => (
                <i
                  key={level.label}
                  className={`block h-3 w-5 ${i <= load ? LOAD[load].tone : "bg-line"}`}
                />
              ))}
            </span>
            <span className="label text-dust">
              Нагрузка:{" "}
              <span className={load === 2 ? "text-blood" : "text-bone"}>
                {LOAD[load].label}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetSettings}
              className="label flex items-center gap-1.5 px-2 py-2 text-dust transition-colors hover:text-bone"
            >
              <RotateCcw size={13} /> Сбросить
            </button>
            <button type="button" onClick={onClose} className="btn btn--red btn--sm">
              Готово
            </button>
          </div>
          <p className="label hidden w-full text-[0.5625rem] text-dust/70 sm:block">
            Изменения применяются и сохраняются сразу
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

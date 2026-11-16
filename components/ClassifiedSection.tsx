import React from "react";
import RevealOnScroll from "./RevealOnScroll";

/** A phrase hidden under a censor bar until hovered, focused or tapped. */
const Redact = ({ children }: { children: React.ReactNode }) => (
  <span className="redact" tabIndex={0}>
    {children}
  </span>
);

const ClassifiedSection = () => (
  <section className="relative overflow-hidden bg-ink py-20 md:py-28">
    <div className="hazard absolute inset-x-0 top-0 h-3" />
    <div className="hazard absolute inset-x-0 bottom-0 h-3" />
    <div
      className="display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 whitespace-nowrap text-[26vw] text-blood/[0.06]"
      aria-hidden="true"
    >
      Top secret
    </div>

    <div className="relative mx-auto max-w-4xl px-5">
      <RevealOnScroll>
        <div className="mb-6 flex items-center justify-between gap-4 text-blood">
          <span className="section-index">A2 — Доступ разблокирован</span>
          <span className="label">Clearance: Omega</span>
        </div>

        <article className="dossier-sheet px-6 py-10 md:px-14 md:py-14">
          <div className="relative">
            <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-ink pb-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em]">
                  Arasaka Secure Archive
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] opacity-60">
                  File 9482-BETA-X · Eyes only
                </div>
              </div>
              <span className="rubber-stamp text-2xl md:text-4xl">
                Top secret
              </span>
            </header>

            <h2 className="display mt-8 text-4xl md:text-6xl">
              Операция:
              <br />
              Падение башен
            </h2>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] opacity-60">
              Наведите на закрашенные фрагменты, чтобы снять цензуру
            </p>

            <div className="mt-8 space-y-6 text-sm leading-7 md:text-[15px] md:leading-8">
              <p>
                Общепринятая версия событий — что Джонни Сильверхенд единолично
                ворвался в башню Arasaka с тактическим ядерным зарядом —
                является <Redact>неточной</Redact>. В действительности
                Сильверхенд заключил контракт с <Redact>Militech</Redact>,
                получив <Redact>полноценную штурмовую группу</Redact>.
              </p>
              <p>
                Операцией руководил <Redact>Морган Блэкхенд</Redact> —
                легендарный соло, признанный лучшим оперативником своего
                класса, чьи возможности сопоставимы с Адамом Смэшером, а по
                ряду оценок превосходят его.
              </p>

              <aside className="border-l-4 border-blood bg-ink/[0.06] p-5">
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blood">
                  Анализ данных Relic
                </div>
                <p>
                  Версия событий, зафиксированная в энграмме Сильверхенда,
                  расходится с реальностью. Цифровая копия Альт Каннингем прямо
                  указывает:{" "}
                  <strong>
                    «Энграмма — это лишь субъективная версия Сильверхенда того,
                    что произошло на самом деле, и не имеет ничего общего с
                    реальностью.»
                  </strong>{" "}
                  Учитывая задокументированный нарциссизм Сильверхенда,
                  переосмысление себя как единственного героя операции
                  полностью соответствует его психологическому профилю.
                </p>
              </aside>

              <p>
                Настоящая судьба Роберта Джона Линдера после событий 2023 года
                остаётся <Redact>неизвестной</Redact>. Официальные записи
                Arasaka по данному вопросу засекречены или уничтожены.
              </p>
            </div>

            <footer className="mt-10 flex justify-between gap-4 border-t border-ink/30 pt-4 text-[11px] uppercase tracking-[0.2em] opacity-60">
              <span>Do not distribute</span>
              <span>Стр. 1 / 1</span>
            </footer>
          </div>
        </article>
      </RevealOnScroll>
    </div>
  </section>
);

export default ClassifiedSection;

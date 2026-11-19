import React from "react";
import RevealOnScroll from "./RevealOnScroll";

/** A phrase hidden under a censor bar until hovered, focused or tapped. */
const Redact = ({ children }: { children: React.ReactNode }) => (
  <span className="redact" tabIndex={0}>
    {children}
  </span>
);

interface Finding {
  title: string;
  body: React.ReactNode;
  /** What Johnny scrawls next to it: his version of the same event. */
  scrawl: string;
}

// The record follows the tabletop canon (Cyberpunk RED and earlier R. Talsorian
// books), where the raid differs from what the engram remembers in 2077.
// Sources disagree on some details (casualties, who set the bomb off), and the
// text says so instead of picking a side.
const FINDINGS: Finding[] = [
  {
    title: "Это была операция Militech",
    body: (
      <>
        Шла Четвёртая корпоративная война. Рейд на башни Arasaka 20 августа
        2023 года спланировала и оплатила <Redact>Militech</Redact>. Цель —
        уничтожить защищённую базу данных Arasaka и стереть «Соулкиллер». Это
        была войсковая операция, а не месть одного человека.
      </>
    ),
    scrawl: "я шёл за Альт. остальное — их дела.",
  },
  {
    title: "Групп было три",
    body: (
      <>
        <strong>Alpha</strong> — Сильверхенд, Бестия, Шайтан, журналист Томпсон
        и нетраннер Спайдер Мёрфи. Задача: прорваться к лабораториям
        «Соулкиллера», вытащить Альт Каннингем и{" "}
        <Redact>отвлечь охрану на себя</Redact>. <strong>Beta</strong> шла вниз,
        к базе данных, <Redact>с тактическим ядерным зарядом</Redact>.{" "}
        <strong>Omega</strong> под командованием{" "}
        <Redact>Моргана Блэкхенда</Redact> обеспечивала прикрытие и эвакуацию.
      </>
    ),
    scrawl: "«отвлечь». то есть мы были приманкой.",
  },
  {
    title: "Бомбу нёс не он",
    body: (
      <>
        В памяти энграммы Джонни сам проносит заряд в башню и сам его взводит.
        По документам заряд шёл с другой группой. Кто в итоге привёл его в
        действие, <Redact>не установлено до сих пор</Redact>.
      </>
    ),
    scrawl: "бомбу нёс я. Я.",
  },
  {
    title: "Он погиб в лаборатории, а не на крыше",
    body: (
      <>
        Джонни разрядил оба ствола в Адама Смэшера. Тот{" "}
        <Redact>
          перерубил его пополам очередью из автоматического дробовика
        </Redact>
        . Плена и допроса не было: обороной башни руководил Кэй Арасака, а не
        Сабуро. Эти минуты дали остальным время закончить работу.
      </>
    ),
    scrawl: "я помню крышу. и Сабуро. помню же.",
  },
  {
    title: "Альт освободил не он",
    body: (
      <>
        В сеть вошла <Redact>Спайдер Мёрфи</Redact>. Она выпустила Альт, и та
        рассеялась по Сети. Позже Мёрфи вставила в тело Джонни чип, который
        получила от Альт.
      </>
    ),
    scrawl: "Мёрфи. выходит, я ей должен.",
  },
  {
    title: "Последним на крыше остался Блэкхенд",
    body: (
      <>
        Когда AV с выжившими уходил с крыши, там появился Смэшер в силовой
        броне. Морган Блэкхенд остался его задержать.{" "}
        <Redact>Чем закончился бой, неизвестно.</Redact>
      </>
    ),
    scrawl: "Морган. вот кто был легендой.",
  },
  {
    title: "Цена",
    body: (
      <>
        Взрыв уничтожил обе башни и корпоративный центр. Источники расходятся в
        цифрах: от 12 000 погибших в первые минуты до сотен тысяч в следующие
        месяцы. Небо над городом почти два года оставалось красным — отсюда
        «Время Красных». Власти обвинили во взрыве саму Arasaka; позже
        журналист Трейс Сантьяго доказал, что это ложь.
      </>
    ),
    scrawl: "я хотел, чтобы город сгорел. хотел же?",
  },
];

/** Findings held down with a strip of tape, to break the column's rhythm. */
const TAPED = new Set([1, 4]);

/** Cover-page particulars, all restated from the findings below. */
const CASE_FIELDS: [string, string][] = [
  ["Дата", "20.08.2023"],
  ["Объект", "Башни Arasaka, Найт-Сити"],
  ["Операция", "Militech, три группы"],
  ["Субъект", "Сильверхенд, Джонни"],
  ["Источник", "Независимый, не энграмма"],
];

const COMPARISON: [string, string, string][] = [
  ["Состав", "Четверо: он, Бестия, Шайтан, Мёрфи", "Три группы и бойцы Militech"],
  ["Бомба", "Нёс и взвёл сам", "Шла с группой Beta"],
  ["Альт", "Освободил он", "Освободила Спайдер Мёрфи"],
  [
    "Смерть",
    "Ранен на крыше, взят живым, «Соулкиллер» по приказу Сабуро",
    "Убит Смэшером в лаборатории",
  ],
  [
    "Главный герой",
    "Джонни Сильверхенд",
    "Операция Militech; на крыше — Блэкхенд",
  ],
];

// Laid out as a case file spread on a desk rather than one endless sheet: a
// cover page (pinned on desktop), one slip per finding, and the comparison
// table on a landscape memo.
const ClassifiedSection = () => (
  <section className="relative overflow-clip bg-ink py-20 md:py-28">
    <div className="hazard absolute inset-x-0 top-0 h-3" />
    <div className="hazard absolute inset-x-0 bottom-0 h-3" />

    <div className="relative mx-auto max-w-(--page) px-3 md:px-10">
      <div className="mb-8 flex items-center justify-between gap-4 text-blood">
        <span className="section-index">A2 — Вскрытый архив</span>
        <span className="label hidden sm:inline">Clearance: Omega</span>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 xl:gap-20">
        {/* Cover page */}
        {/* Pinned while the slips scroll by, but only where it fits the
            screen; a sticky element taller than the viewport hides its end. */}
        <RevealOnScroll
          direction="right"
          className="lg:[@media(min-height:50rem)]:sticky lg:[@media(min-height:50rem)]:top-20"
        >
          <article className="dossier-sheet dossier-cover px-5 py-8 md:px-10 md:py-9">
            <div className="relative">
              <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-ink pb-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em]">
                    Arasaka Secure Archive
                  </div>
                  <div className="mt-1 text-[0.6875rem] uppercase tracking-[0.2em] opacity-60">
                    File 9482-BETA-X · 20.08.2023 · Eyes only
                  </div>
                </div>
                <span className="rubber-stamp text-2xl md:text-3xl">
                  Top secret
                </span>
              </header>

              <h2 className="display mt-7 text-4xl md:text-5xl">
                Что произошло
                <br />в башне на самом деле
              </h2>
              <p className="mt-5 text-sm leading-7 md:text-[0.9375rem]">
                Энграмма — не протокол. Она хранит события такими, какими их
                запомнил и пересказал себе Сильверхенд. Ниже то, что удалось
                восстановить по независимым источникам.
              </p>
<dl className="mt-7 grid grid-cols-[auto_1fr] gap-x-6 border-y-2 border-ink text-[0.6875rem] uppercase tracking-[0.14em]">
                {CASE_FIELDS.map(([k, v]) => (
                  <React.Fragment key={k}>
                    <dt className="border-t border-ink/20 py-2.5 opacity-60 first-of-type:border-t-0">
                      {k}
                    </dt>
                    <dd className="border-t border-ink/20 py-2.5 font-bold first-of-type:border-t-0">
                      {v}
                    </dd>
                  </React.Fragment>
                ))}
              </dl>

              <p className="mt-6 text-[0.6875rem] uppercase tracking-[0.2em] opacity-60">
                Наведите на закрашенные фрагменты, чтобы снять цензуру
              </p>
            </div>
          </article>
        </RevealOnScroll>

        {/* One slip per finding */}
        {/* Starts lower than the cover on desktop, so the headline is read
            first and the details follow. */}
        <ol className="space-y-4 md:space-y-7 lg:mt-[min(30vh,16rem)]">
          {/* Witness statement first: the engram itself is unreliable.
              Alt's lines are verbatim from Cyberpunk 2077; the Russian is ours. */}
          <li className="dossier-slip">
            <RevealOnScroll className="dossier-sheet">
              <figure className="relative px-5 py-7 md:px-9 md:py-9">
                <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em]">
                  <span className="text-blood">Показания свидетеля</span>
                  <span className="opacity-60">Альт Каннингем · Cyberpunk 2077</span>
                </figcaption>
                <blockquote className="border-l-4 border-blood pl-4 font-display text-xl font-bold uppercase leading-snug md:pl-6 md:text-3xl">
                  «То, что ты видел, — его субъективный взгляд на случившееся.
                  Искажённая версия событий, которую он запер в подсознании и
                  проигрывал снова и снова. Она не имеет ничего общего с
                  правдой.»
                </blockquote>
                <p
                  lang="en"
                  className="mt-4 text-xs leading-relaxed opacity-70 md:pl-6 md:text-[0.8125rem]"
                >
                  “What you saw was his subjective view of what happened. A
                  warped account of events he locked away in his subconscious
                  and replayed time and again. It bears no resemblance to the
                  truth.”
                </p>
                <p className="scrawl mt-3">Альт. и ты туда же.</p>
              </figure>
            </RevealOnScroll>
          </li>

          {FINDINGS.map((item, i) => (
            <li key={item.title} className="dossier-slip">
              {TAPED.has(i) && (
                <span className="tape tape--tl z-10" aria-hidden="true" />
              )}
              <RevealOnScroll className="dossier-sheet">
                {/* Phones: number and title share a row, text runs full width
                    below. Desktop: the number gets its own column. */}
                <div className="relative px-5 py-7 md:grid md:grid-cols-[4rem_1fr] md:gap-x-6 md:px-9 md:py-9">
                  <div className="flex items-start gap-3 md:contents">
                    <span className="font-display text-4xl font-bold leading-none text-blood md:row-span-3 md:text-5xl">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-2xl font-bold uppercase leading-tight md:col-start-2 md:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 md:col-start-2 md:text-[0.9375rem] md:leading-8">
                    {item.body}
                  </p>
                  <div className="md:col-start-2">
                    <p className="scrawl mt-3">{item.scrawl}</p>
                  </div>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
      </div>

      {/* Landscape memo with the comparison table */}
      <RevealOnScroll className="dossier-memo-wrap mx-auto mt-14 max-w-6xl md:mt-20">
        <article className="dossier-sheet dossier-memo px-5 pt-9 md:px-12 md:pt-11">
          <div className="relative">
            <header className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-4">
              <h3 className="font-display text-2xl font-bold uppercase leading-none md:text-4xl">
                Сверка показаний
              </h3>
              <span className="text-[0.6875rem] uppercase tracking-[0.2em] opacity-60">
                Memo · энграмма против архива
              </span>
            </header>

            <div className="border-2 border-ink">
              <div className="hidden bg-ink text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-bone md:grid md:grid-cols-[9rem_1fr_1fr]">
                <span className="p-3" />
                <span className="p-3">Помнит энграмма</span>
                <span className="p-3 text-acid">Установлено</span>
              </div>
              {COMPARISON.map(([topic, memory, fact]) => (
                <div
                  key={topic}
                  className="border-t border-ink/30 text-sm leading-relaxed first:border-t-0 md:grid md:grid-cols-[9rem_1fr_1fr] md:first:border-t"
                >
                  <span className="block bg-ink px-3 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-bone md:bg-transparent md:p-3 md:text-ink">
                    {topic}
                  </span>
                  <span className="block px-3 pt-3 opacity-60 md:p-3">
                    <span className="mb-1 block text-[0.625rem] font-bold uppercase tracking-[0.14em] md:hidden">
                      Помнит энграмма
                    </span>
                    {memory}
                  </span>
                  <span className="block p-3 font-bold md:border-l md:border-ink/30">
                    <span className="mb-1 block text-[0.625rem] uppercase tracking-[0.14em] text-blood md:hidden">
                      Установлено
                    </span>
                    {fact}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <p className="scrawl scrawl--right">
                красивая табличка. меня там не было, что ли?
              </p>
            </div>

            <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-ink/30 pt-4 text-[0.6875rem] uppercase tracking-[0.16em] opacity-60 md:flex-row">
              <span>
                Сведено по настольному канону Cyberpunk (R. Talsorian Games)
              </span>
              <span>Do not distribute</span>
            </footer>
          </div>
        </article>
      </RevealOnScroll>
    </div>
  </section>
);

export default ClassifiedSection;

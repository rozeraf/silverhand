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

const ClassifiedSection = () => (
  <section className="relative overflow-hidden bg-ink py-20 md:py-28">
    <div className="hazard absolute inset-x-0 top-0 h-3" />
    <div className="hazard absolute inset-x-0 bottom-0 h-3" />

    <div className="relative mx-auto max-w-5xl px-2 md:px-5">
      <RevealOnScroll>
        <div className="mb-6 flex items-center justify-between gap-4 text-blood">
          <span className="section-index">A2 — Вскрытый архив</span>
          <span className="label hidden sm:inline">Clearance: Omega</span>
        </div>

        <article className="dossier-sheet px-5 py-10 md:px-14 md:py-14">
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
              <span className="rubber-stamp text-2xl md:text-4xl">
                Top secret
              </span>
            </header>

            <h2 className="display mt-8 text-4xl md:text-6xl">
              Что произошло
              <br />в башне на самом деле
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 md:text-[0.9375rem]">
              Энграмма — не протокол. Она хранит события такими, какими их
              запомнил и пересказал себе Сильверхенд. Ниже то, что удалось
              восстановить по независимым источникам.
            </p>
            {/* Alt's lines are verbatim from Cyberpunk 2077; the Russian is ours. */}
            <figure className="mt-8 border-l-4 border-blood bg-ink/[0.06] p-5 md:p-7">
              <blockquote className="font-display text-xl font-bold uppercase leading-snug md:text-3xl">
                «То, что ты видел, — его субъективный взгляд на случившееся.
                Искажённая версия событий, которую он запер в подсознании и
                проигрывал снова и снова. Она не имеет ничего общего с
                правдой.»
              </blockquote>
              <p
                lang="en"
                className="mt-4 text-xs leading-relaxed opacity-70 md:text-[0.8125rem]"
              >
                “What you saw was his subjective view of what happened. A
                warped account of events he locked away in his subconscious
                and replayed time and again. It bears no resemblance to the
                truth.”
              </p>
              <figcaption className="mt-4 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-blood">
                Альт Каннингем · Cyberpunk 2077
              </figcaption>
            </figure>
            <p className="scrawl mt-3">Альт. и ты туда же.</p>

            <p className="mt-6 text-[0.6875rem] uppercase tracking-[0.2em] opacity-60">
              Наведите на закрашенные фрагменты, чтобы снять цензуру
            </p>

            <ol className="mt-10">
              {FINDINGS.map((item, i) => (
                <li
                  key={item.title}
                  className="grid gap-x-6 gap-y-2 border-t border-ink/30 py-7 md:grid-cols-[3.5rem_1fr]"
                >
                  <span className="font-display text-4xl font-bold leading-none text-blood">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase leading-tight md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 md:text-[0.9375rem] md:leading-8">
                      {item.body}
                    </p>
                    <p className="scrawl mt-3">{item.scrawl}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 border-2 border-ink">
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
            <p className="scrawl scrawl--right mt-4 block text-right">
              красивая табличка. меня там не было, что ли?
            </p>

            <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-ink/30 pt-4 text-[0.6875rem] uppercase tracking-[0.16em] opacity-60 md:flex-row">
              <span>
                Сведено по настольному канону Cyberpunk (R. Talsorian Games)
              </span>
              <span>Do not distribute</span>
            </footer>
          </div>
          <div className="tear tear--sheet" aria-hidden="true" />
        </article>
      </RevealOnScroll>
    </div>
  </section>
);

export default ClassifiedSection;

import React from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHead from "./SectionHead";
import Kinetic from "./Kinetic";
import { ASSETS } from "../assets";

const EVENTS = [
  {
    year: "2013",
    tag: "Потеря",
    title: "Трагедия с Альт Каннингем",
    description:
      "Корпорация Arasaka похищает Альт Каннингем, лучшего нетраннера Найт-Сити и возлюбленную Джонни. Спасательная операция проваливается: Альт погибает физически, а её сознание становится узником Сети. Это событие навсегда меняет Сильверхенда, превращая его ненависть к корпорациям в личную вендетту.",
    note: "Не «погибает». Её убили.",
  },
  {
    year: "2023",
    tag: "Смерть",
    title: "Падение Башни",
    description:
      "Финальный аккорд. Джонни возглавляет штурмовую группу Militech для атаки на Arasaka Tower. Цель — освободить Альт и взорвать тактическую ядерную бомбу. Джонни сходится в бою с легендарным соло Адамом Смэшером и терпит поражение. Его тело погибает, но сознание похищается Сабуро Арасакой с помощью программы «Соулкиллер».",
    note: "Смэшер. Я запомнил.",
  },
  {
    year: "2077",
    tag: "Пробуждение",
    title: "Пробуждение",
    description:
      "Спустя 50 лет энграмма Джонни активируется в голове наёмника Ви после неудачного ограбления Konpeki Plaza. Биочип начинает переписывать мозг носителя, воскрешая рокера в новом мире, который он не узнаёт, но который всё так же прогнил насквозь.",
    note: "Полвека прошло. Город всё тот же.",
  },
];

const Biography = () => (
  <>
    <section id="bio" className="paper overflow-hidden py-20 md:py-32">
      <div className="mx-auto max-w-[93.75rem] px-5 md:px-10">
        <SectionHead
          index="A1"
          kicker="Досье"
          title={
            <>
              Кто такой
              <br />
              Джонни<span className="text-blood">?</span>
            </>
          }
          aside={
            <>
              NCPD File № 2023-0820
              <br />
              Night City Archives
            </>
          }
          lede={
            <>
              <p>
                Дезертир. Рокербой. Террорист. Легенда Найт-Сити. Человек,
                который сжёг половину города, чтобы доказать свою правоту.
              </p>
              <p className="scrawl mt-4">и это они ещё по-доброму</p>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <RevealOnScroll direction="right">
            <div className="lg:sticky lg:top-24">
              <figure className="evidence mx-auto max-w-sm lg:mx-0 lg:max-w-md">
                <img
                  src={ASSETS.samuraiLogo}
                  alt=""
                  className="sticker johnny-only -right-8 top-1/3 rotate-12"
                />
                <span className="tape tape--tl" />
                <span className="tape tape--tr" />
                <div className="evidence__backdrop relative aspect-[4/5] overflow-hidden">
                  <img
                    src={ASSETS.biographyPortrait}
                    srcSet={ASSETS.srcSet.biographyPortrait}
                    sizes="(min-width: 1024px) 28rem, 24rem"
                    decoding="async"
                    alt="Портрет Джонни Сильверхенда"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="rubber-stamp rubber-stamp--photo absolute bottom-5 right-4 text-3xl md:text-4xl">
                    Deceased
                  </span>
                </div>
                <figcaption className="flex items-baseline justify-between gap-4 px-1 py-3 font-mono text-[0.6875rem] uppercase tracking-wider text-ink">
                  <span className="font-bold">Linder, Robert John</span>
                  <span className="opacity-60">Exhibit 01</span>
                </figcaption>
              </figure>
              <p className="scrawl scrawl--right mx-auto mt-5 block max-w-sm text-right lg:mx-0 lg:max-w-md">
                «deceased». ага, щас
              </p>

              <dl className="mx-auto mt-6 max-w-sm font-mono text-xs uppercase tracking-wider lg:mx-0 lg:max-w-md">
                {(
                  [
                    ["Позывной", "Johnny Silverhand"],
                    [
                      "Род занятий",
                      <>
                        Рокербой, <span className="struck">дезертир</span>
                      </>,
                    ],
                    ["Группа", "Samurai"],
                    [
                      "Статус",
                      <>
                        <span className="circled">Мёртв (2023)</span>
                        {"  // энграмма активна"}
                      </>,
                    ],
                  ] as [string, React.ReactNode][]
                ).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between gap-6 border-t border-ink/25 py-2.5"
                  >
                    <dt className="opacity-55">{k}</dt>
                    <dd className="text-right font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="scrawl mx-auto mt-4 block max-w-sm lg:mx-0 lg:max-w-md">
                с ИХ войны я ушёл сам
              </p>
              <p className="official-only label mx-auto mt-4 max-w-sm opacity-50 lg:mx-0 lg:max-w-md">
                Запись заверена Arasaka Corp. Пометки на полях отсутствуют.
              </p>
            </div>
          </RevealOnScroll>

          <div className="border-b-2 border-ink">
            {EVENTS.map((event, index) => (
              <RevealOnScroll key={event.year} delay={index * 120}>
                <article className="year-row">
                  <div>
                    <div className="year-row__year">{event.year}</div>
                    <div className="label mt-3 text-blood">
                      Запись 0{index + 1} · {event.tag}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase leading-tight md:text-3xl">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/80 md:text-base">
                      {event.description}
                    </p>
                    <p className="scrawl mt-4">{event.note}</p>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
    <div className="tear" aria-hidden="true" />

    <section className="relative overflow-hidden bg-blood pb-16 pt-24 text-black md:pb-24 md:pt-32">
      <div className="mx-auto max-w-[93.75rem] px-5 md:px-10">
        <RevealOnScroll>
          <div className="section-index mb-6">Memory_log_114</div>
          <Kinetic
            as="blockquote"
            className="display text-[clamp(2.75rem,10.5vw,10rem)]"
            step={110}
            parts={[
              "«Wake the f**k up,",
              "\n",
              "Samurai.",
              "\n",
              ["We have a city", "outline-text"],
              "\n",
              "to burn.»",
            ]}
          />
        </RevealOnScroll>
      </div>
    </section>
  </>
);

export default Biography;

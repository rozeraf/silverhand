import React from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHead from "./SectionHead";
import { ASSETS } from "../assets";

interface Item {
  code: string;
  name: string;
  image: string;
  srcSet?: string;
  alt: string;
  text: string;
  specs: [string, string][];
  note?: string;
  /** Johnny's own remark, in marker. */
  scrawl: string;
  /** Opaque renders fill the frame; cut-out PNGs sit on the grid. */
  cover?: boolean;
}

const MALORIAN: Item = {
  code: "Malorian_Arms_3516",
  name: "Malorian Arms 3516",
  image: ASSETS.malorianGun,
  srcSet: ASSETS.srcSet.malorianGun,
  alt: "Пистолет Malorian Arms 3516",
  cover: true,
  text: "Джонни хотел получить настолько мощный пистолет, что его отдача сломала бы кисть обычному человеку. Использовать Malorian в полную силу можно только удерживая его кибернетической серебряной рукой.",
  specs: [
    ["Тип", "Полуавтомат"],
    ["Калибр", "14 мм"],
    ["Режимы", "Рикошет / Пробитие / Поджог"],
  ],
  note: "Внимание: отдача ломает кисть без киберпротеза.",
  scrawl: "тебе сломает руку. мне — нет.",
};

const ITEMS: Item[] = [
  {
    code: "Arm_Arasaka_Prototype",
    name: "Серебряная рука",
    image: ASSETS.silverArm,
    srcSet: ASSETS.srcSet.silverArm,
    alt: "Кибернетическая рука Джонни Сильверхенда",
    cover: true,
    text: "Кибернетический протез левой руки, полученный после ранения во время Центральноамериканской войны. Это не просто замена конечности, а символ его статуса «хромированного рокера».",
    specs: [
      ["Тип", "Киберпротез"],
      ["Сторона", "Левая"],
      ["Покрытие", "Хром"],
    ],
    note: "На металле еле видно грубо соскобленное лого Arasaka. Он пытался стереть следы производителя, чтобы не быть запятнанным врагом.",
    scrawl: "сточил сам. напильником.",
  },
  {
    code: "Vest_JS // Armor_Lvl_4",
    name: "Бронежилет",
    image: ASSETS.vest,
    srcSet: ASSETS.srcSet.vest,
    alt: "Бронежилет Джонни Сильверхенда",
    text: "Джонни редко появляется без своего фирменного пуленепробиваемого жилета поверх майки. Для него сцена и поле боя — это одно и то же. Он всегда ожидает выстрела и всегда готов ответить.",
    specs: [
      ["Материал", "Кевлар"],
      ["Стиль", "Энтропизм"],
      ["Состояние", "Поношенное"],
      ["Вес", "4.2 кг"],
    ],
    scrawl: "спасал чаще, чем друзья",
  },
];

/** Paper tag on a string, as on items in an evidence locker. */
const EvidenceTag = ({ no, className = "" }: { no: number; className?: string }) => (
  <div className={`evtag ${className}`}>
    <span className="opacity-60">Вещдок</span>
    <strong>№ 0{no}</strong>
    <span className="opacity-60">NC-2023-0820</span>
  </div>
);

const Details = ({ item }: { item: Item }) => (
  <>
    <p className="text-[0.9375rem] leading-relaxed text-bone/75 md:text-base">
      {item.text}
    </p>
    <dl className="spec mt-6">
      {item.specs.map(([k, v]) => (
        <React.Fragment key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </React.Fragment>
      ))}
    </dl>
    {item.note && (
      <p className="mt-6 border-l-2 border-blood pl-4 font-mono text-xs leading-relaxed text-bone/75">
        <span className="text-blood">// </span>
        {item.note}
      </p>
    )}
    <p className="scrawl scrawl--dark mt-5">{item.scrawl}</p>
  </>
);

const Arsenal = () => (
  <section
    id="arsenal"
    className="relative overflow-hidden bg-ink py-20 md:py-32"
  >
    <div className="mx-auto max-w-[93.75rem] px-5 md:px-10">
      <SectionHead
        index="B1"
        kicker="Арсенал"
        title={
          <>
            Стиль <span className="outline-text text-blood">и</span> арсенал
          </>
        }
        aside={<>Хранилище вещдоков · 03 предмета</>}
        lede={
          <p>
            Визуальный код легенды. Каждая деталь его образа — от
            хромированного протеза до уникального оружия — рассказывает историю
            войны, которую он ведёт уже полвека.
          </p>
        }
      />

      {/* Main exhibit */}
      <RevealOnScroll>
        <article className="relative">
          <div className="blueprint aspect-[4/3] md:aspect-[21/9]">
            <img
              src={MALORIAN.image}
              srcSet={MALORIAN.srcSet}
              sizes="(min-width: 1500px) 93rem, 100vw"
              decoding="async"
              alt={MALORIAN.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <span className="tick tick--tl" />
            <span className="tick tick--tr" />
            <span className="tick tick--bl" />
            <span className="tick tick--br" />
            <span className="label absolute right-7 top-7 bg-acid px-2 py-1 text-black">
              Iconic
            </span>
            <h3 className="display absolute bottom-5 left-5 right-5 text-[clamp(2.75rem,9.5vw,9rem)] md:bottom-8 md:left-8">
              Malorian <span className="outline-text">Arms</span> 3516
            </h3>
          </div>
          <EvidenceTag no={1} className="-top-5 left-6 md:left-10" />
          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <div className="label text-blood md:col-span-3">
              Главный экспонат
              <br />
              <span className="text-dust">{MALORIAN.code}</span>
            </div>
            <div className="md:col-span-9 lg:col-span-7">
              <Details item={MALORIAN} />
            </div>
          </div>
        </article>
      </RevealOnScroll>

      {/* The rest of the locker */}
      <div className="mt-20 grid gap-x-10 gap-y-20 md:mt-28 md:grid-cols-2 lg:gap-x-16">
        {ITEMS.map((item, index) => (
          <RevealOnScroll key={item.code} delay={index * 150}>
            <article className={`relative ${index === 1 ? "md:mt-24" : ""}`}>
              <div
                className={`blueprint aspect-[4/3] ${item.cover ? "" : "blueprint--cutout"}`}
              >
                <img
                  src={item.image}
                  srcSet={item.srcSet}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  decoding="async"
                  alt={item.alt}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full ${item.cover ? "object-cover" : "object-contain p-6 md:p-10"}`}
                />
                <span className="tick tick--tl" />
                <span className="tick tick--tr" />
                <span className="tick tick--bl" />
                <span className="tick tick--br" />
              </div>
              <EvidenceTag
                no={index + 2}
                className={index === 0 ? "-top-5 right-6" : "-top-5 left-6"}
              />
              <div className="label mt-6 text-dust">{item.code}</div>
              <h3 className="display mt-2 text-5xl md:text-6xl">{item.name}</h3>
              <div className="mt-5">
                <Details item={item} />
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export default Arsenal;

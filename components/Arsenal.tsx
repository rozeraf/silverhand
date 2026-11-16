import React from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHead from "./SectionHead";
import { ASSETS } from "../assets";

interface Item {
  code: string;
  name: string;
  image: string;
  alt: string;
  text: string;
  specs: [string, string][];
  note?: string;
  /** Johnny's own remark, in marker. */
  scrawl: string;
  iconic?: boolean;
  /** Opaque renders fill the frame; cut-out PNGs sit on the grid. */
  cover?: boolean;
}

const ITEMS: Item[] = [
  {
    code: "Arm_Arasaka_Prototype",
    name: "Серебряная рука",
    image: ASSETS.silverArm,
    cover: true,
    alt: "Кибернетическая рука Джонни Сильверхенда",
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
  {
    code: "Malorian_Arms_3516",
    name: "Malorian Arms 3516",
    image: ASSETS.malorianGun,
    cover: true,
    alt: "Пистолет Malorian Arms 3516",
    text: "Джонни хотел получить настолько мощный пистолет, что его отдача сломала бы кисть обычному человеку. Использовать Malorian в полную силу можно только удерживая его кибернетической серебряной рукой.",
    specs: [
      ["Тип", "Полуавтомат"],
      ["Калибр", "14 мм"],
      ["Режимы", "Рикошет / Пробитие / Поджог"],
    ],
    note: "Внимание: отдача ломает кисть без киберпротеза.",
    scrawl: "тебе сломает руку. мне — нет.",
    iconic: true,
  },
];

const Arsenal = () => (
  <section
    id="arsenal"
    className="relative overflow-hidden bg-ink py-20 md:py-32"
  >
    <div className="mx-auto max-w-[1500px] px-5 md:px-10">
      <SectionHead
        index="B1"
        kicker="Арсенал"
        title={
          <>
            Стиль <span className="outline-text text-blood">и</span> арсенал
          </>
        }
        aside={<>Character_loadout · 03 предмета</>}
        lede={
          <p>
            Визуальный код легенды. Каждая деталь его образа — от
            хромированного протеза до уникального оружия — рассказывает историю
            войны, которую он ведёт уже полвека.
          </p>
        }
      />

      <div className="space-y-20 md:space-y-32">
        {ITEMS.map((item, index) => {
          const flip = index % 2 === 1;
          return (
            <article
              key={item.code}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
            >
              <RevealOnScroll
                direction={flip ? "left" : "right"}
                className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
              >
                <div className="blueprint aspect-[16/10]">
                  <span className="tick tick--tl" />
                  <span className="tick tick--tr" />
                  <span className="tick tick--bl" />
                  <span className="tick tick--br" />
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full ${item.cover ? "object-cover" : "object-contain p-6 md:p-10"}`}
                  />
                  <span
                    className="display outline-text pointer-events-none absolute -bottom-5 right-4 text-[8rem] text-bone/50 md:text-[13rem]"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <span className="label absolute left-7 top-7 bg-ink/80 px-2 py-1 text-bone/80">
                    {item.code}
                  </span>
                  {item.iconic && (
                    <span className="label absolute right-7 top-7 bg-acid px-2 py-1 text-black">
                      Iconic
                    </span>
                  )}
                </div>
              </RevealOnScroll>

              <RevealOnScroll
                delay={120}
                className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}
              >
                <div className="label mb-4 text-blood">
                  Предмет 0{index + 1} / 03
                </div>
                <h3 className="display text-5xl md:text-6xl xl:text-7xl">
                  {item.name}
                </h3>
                <p className="mt-6 text-[15px] leading-relaxed text-bone/75 md:text-base">
                  {item.text}
                </p>
                <dl className="spec mt-8">
                  {item.specs.map(([k, v]) => (
                    <React.Fragment key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </React.Fragment>
                  ))}
                </dl>
                {item.note && (
                  <p className="mt-8 border-l-2 border-blood pl-4 font-mono text-xs leading-relaxed text-bone/60">
                    <span className="text-blood">// </span>
                    {item.note}
                  </p>
                )}
                <p className="scrawl scrawl--dark mt-6">{item.scrawl}</p>
              </RevealOnScroll>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Arsenal;

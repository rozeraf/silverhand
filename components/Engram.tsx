import React, { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHead from "./SectionHead";
import { ASSETS } from "../assets";
import { useSettings } from "../context/SettingsContext";

const THESES = [
  {
    title: "Что такое энграмма?",
    text: "Это не душа. Это цифровая копия сознания, записанная на экспериментальный биочип Arasaka. Код, имитирующий мыслительные процессы, воспоминания и эмоции оригинального Джонни. Он заперт в микросхеме, пока несчастный случай не подключает его к нервной системе Ви.",
  },
  {
    title: "Симбиоз с Ви",
    text: "Начав как враги, борющиеся за контроль над одним телом, Ви и Джонни проходят путь до глубокой духовной связи. Биочип не просто убивает Ви — он смешивает две личности. Ви становится жёстче и решительнее, а Джонни учится тому, чего был лишён при жизни: эмпатии.",
  },
  {
    title: "Трансформация",
    text: "Почему мы любим энграмму больше, чем живого Сильверхенда? Потому что эта версия способна на рост. Под влиянием Ви цифровой призрак осознаёт свои ошибки. От самовлюблённого нарцисса он эволюционирует в друга, готового уйти во тьму киберпространства, чтобы дать Ви шанс на жизнь.",
  },
  {
    title: "Наследие",
    text: "«Никогда не переставай бороться» — это кредо, которое он передаёт нам. Энграмма доказывает, что даже цифровая копия человека может проявить больше человечности, чем живые люди в Найт-Сити.",
  },
];

const Engram = () => {
  const { crtWarp } = useSettings();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (crtWarp) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: y * -12, y: x * 12 });
  };

  return (
    <section
      id="engram"
      className="relative overflow-hidden border-t border-line bg-[#050607] py-20 md:py-32"
    >
      <div
        className="display outline-text pointer-events-none absolute -right-[4vw] top-10 text-[30vw] leading-none text-relic/10"
        aria-hidden="true"
      >
        Relic
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead
          className="text-relic"
          index="B2"
          kicker="Проект Relic"
          title={
            <span className="text-bone">
              Энграмма
              <br />и вторая жизнь
            </span>
          }
          aside={<>Secure_data_shard · Encrypted_Lv5</>}
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <RevealOnScroll direction="right" className="lg:col-span-5">
            <div className="lg:sticky lg:top-24" style={{ perspective: 1000 }}>
              <div
                className="relic-frame mx-auto max-w-md lg:max-w-none"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setRotation({ x: 0, y: 0 })}
                style={{
                  transform: crtWarp
                    ? "none"
                    : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
              >
                <img
                  src={ASSETS.engramCard}
                  alt="Биочип Relic"
                  loading="lazy"
                  className="block aspect-square w-full object-cover"
                />
                <div className="relic-frame__scan" />
                <span className="label absolute right-4 top-4 z-10 text-relic">
                  Biochip // Relic 2.0
                </span>
                <span className="label absolute bottom-4 left-4 z-10 bg-black/70 px-2 py-1 text-relic">
                  Subject: V &amp; Silverhand
                </span>
              </div>

              <div className="mx-auto mt-8 max-w-md lg:max-w-none">
                <div className="mb-2 flex items-end justify-between">
                  <span className="label text-relic">Синхронизация</span>
                  <span className="font-display text-5xl font-bold leading-none text-relic">
                    86%
                  </span>
                </div>
                <div className="meter">
                  <i style={{ width: "86%" }} />
                </div>
                <dl className="spec mt-6">
                  <dt>Тип данных</dt>
                  <dd>Псевдоличность, конструкт</dd>
                  <dt>Статус</dt>
                  <dd className="text-blood">Перезапись носителя</dd>
                </dl>
              </div>
            </div>
          </RevealOnScroll>

          <ol className="lg:col-span-7">
            {THESES.map((item, idx) => (
              <RevealOnScroll key={item.title} delay={idx * 100}>
                <li className="group grid gap-x-8 gap-y-3 border-t border-line py-8 md:grid-cols-[5rem_1fr] md:py-10">
                  <span className="font-display text-5xl font-bold leading-none text-relic/30 transition-colors duration-300 group-hover:text-relic">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-bone/70 md:text-base">
                      {item.text}
                    </p>
                  </div>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Engram;

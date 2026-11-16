import React from "react";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHead from "./SectionHead";
import Kinetic from "./Kinetic";
import { ASSETS } from "../assets";

const Engram = () => (
  <section
    id="engram"
    className="relative overflow-hidden border-t border-line bg-[#070505] py-20 md:py-32"
  >
    <div
      className="display outline-text pointer-events-none absolute -right-[4vw] top-10 text-[30vw] leading-none text-blood/15"
      aria-hidden="true"
    >
      Relic
    </div>

    <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
      <SectionHead
        className="text-blood"
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

      {/* The chip itself, in its own colours */}
      <RevealOnScroll>
        <figure className="relic-frame aspect-[4/3] sm:aspect-[16/9]">
          <img
            src={ASSETS.engramCard}
            alt="Биочип Relic производства Arasaka"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relic-frame__scan" />
          <span className="tick tick--tr" />

          <span className="label absolute left-4 top-4 z-10 text-bone/70 md:left-8 md:top-8">
            Biochip // Relic 2.0 · Arasaka
          </span>

          <figcaption className="absolute bottom-4 left-4 z-10 hidden sm:block md:bottom-8 md:left-8">
            <div className="label text-blood">Subject</div>
            <div className="font-display text-2xl font-bold uppercase leading-tight md:text-5xl">
              V &amp; Silverhand
            </div>
          </figcaption>

          <div className="absolute bottom-4 right-4 z-10 hidden w-44 bg-black/75 p-3 backdrop-blur-sm sm:block md:bottom-8 md:right-8 md:w-64 md:p-5">
            <div className="label text-blood">Синхронизация</div>
            <div className="mt-1 font-display text-4xl font-bold leading-none text-blood md:text-7xl">
              86%
            </div>
            <div className="meter mt-2 text-blood md:mt-3">
              <i style={{ width: "86%" }} />
            </div>
            <div className="label mt-2 hidden text-dust md:block">
              Статус: <span className="text-bone">перезапись носителя</span>
            </div>
          </div>
        </figure>

        {/* On phones the readouts sit under the image instead of over the chip */}
        <div className="mt-4 flex items-end justify-between gap-4 sm:hidden">
          <div>
            <div className="label text-blood">Subject</div>
            <div className="font-display text-2xl font-bold uppercase leading-tight">
              V &amp; Silverhand
            </div>
          </div>
          <div className="w-32 text-right">
            <div className="font-display text-4xl font-bold leading-none text-blood">
              86%
            </div>
            <div className="meter mt-2 text-blood">
              <i style={{ width: "86%" }} />
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Four theses, four different shapes */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <RevealOnScroll className="lg:col-span-7">
          <article className="flex h-full flex-col justify-between bg-blood p-7 text-black md:p-10">
            <div className="label font-bold">01 · Что такое энграмма?</div>
            <div>
              <Kinetic
                as="h3"
                className="display mt-10 block text-[clamp(3.5rem,8vw,7.5rem)]"
                step={160}
                parts={["Это не душа."]}
              />
              <p className="mt-6 max-w-2xl text-[15px] font-medium leading-relaxed md:text-lg">
                Это цифровая копия сознания, записанная на экспериментальный
                биочип Arasaka. Код, имитирующий мыслительные процессы,
                воспоминания и эмоции оригинального Джонни. Он заперт в
                микросхеме, пока несчастный случай не подключает его к нервной
                системе Ви.
              </p>
            </div>
          </article>
        </RevealOnScroll>

        <RevealOnScroll delay={120} className="lg:col-span-5">
          <article className="flex h-full flex-col border border-line p-7 md:p-10">
            <div className="label text-blood">02 · Симбиоз с Ви</div>
            <div className="mt-8 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-3">
              <div>
                <div className="display text-[clamp(2rem,9vw,4.5rem)]">Ви</div>
                <div className="label mt-2 text-dust">жёстче, решительнее</div>
              </div>
              <span className="display pb-7 text-2xl text-blood md:text-3xl">×</span>
              <div className="text-right">
                <div className="display text-[clamp(2rem,9vw,4.5rem)] text-blood">
                  Джонни
                </div>
                <div className="label mt-2 text-dust">учится эмпатии</div>
              </div>
            </div>
            <div className="mt-5 flex h-2">
              <i className="block h-full w-[14%] bg-bone" />
              <i className="block h-full flex-1 bg-blood" />
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-bone/70 md:text-base">
              Начав как враги, борющиеся за контроль над одним телом, Ви и
              Джонни проходят путь до глубокой духовной связи. Биочип не просто
              убивает Ви — он смешивает две личности.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll className="lg:col-span-5">
          <article className="flex h-full flex-col border border-line p-7 md:p-10">
            <div className="label text-blood">03 · Трансформация</div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="display outline-text text-5xl text-bone/60 md:text-6xl">
                Нарцисс
              </span>
              <ArrowRight className="text-blood" size={36} />
              <span className="display text-5xl md:text-6xl">Друг</span>
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-bone/70 md:text-base">
              Почему мы любим энграмму больше, чем живого Сильверхенда? Потому
              что эта версия способна на рост. Под влиянием Ви цифровой призрак
              осознаёт свои ошибки и становится другом, готовым уйти во тьму
              киберпространства, чтобы дать Ви шанс на жизнь.
            </p>
            <p className="scrawl scrawl--dark mt-5">
              «нарцисс». ладно. было дело.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll delay={120} className="lg:col-span-7">
          <article className="paper flex h-full flex-col justify-between p-7 md:p-10">
            <div className="label font-bold">04 · Наследие</div>
            <div>
              <Kinetic
                as="blockquote"
                className="display mt-10 text-[clamp(2.75rem,6vw,5.5rem)]"
                step={130}
                parts={["«Никогда не переставай", ["бороться»", "text-blood"]]}
              />
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink/80 md:text-base">
                Это кредо, которое он передаёт нам. Энграмма доказывает, что
                даже цифровая копия человека может проявить больше человечности,
                чем живые люди в Найт-Сити.
              </p>
            </div>
          </article>
        </RevealOnScroll>
      </div>

      <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <dl className="spec md:min-w-[26rem]">
          <dt>Тип данных</dt>
          <dd>Псевдоличность, конструкт</dd>
        </dl>
        <p className="scrawl scrawl--dark scrawl--right">
          я не «конструкт». я — это я.
        </p>
      </div>
    </div>
  </section>
);

export default Engram;

import React from "react";

const LINKS = [
  { name: "Cyberpunk.net", href: "https://www.cyberpunk.net/us/en/" },
  { name: "NetWatch", href: "https://cyberpunk.fandom.com/wiki/NetWatch" },
  { name: "Blackwall", href: "https://cyberpunk.fandom.com/wiki/Blackwall" },
];

const Footer = () => (
  <footer className="relative overflow-hidden bg-black pt-16 md:pt-24">
    <div className="mx-auto max-w-[93.75rem] px-5 md:px-10">
      <div className="grid gap-10 border-b border-line pb-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="section-index mb-4 text-blood">Конец записи</p>
          <p className="display text-4xl md:text-5xl">Never fade away</p>
          <p className="scrawl scrawl--dark mt-4">и не собираюсь.</p>
        </div>

        <nav className="md:col-span-3" aria-label="Внешние ссылки">
          <p className="label mb-4 text-dust">Сеть</p>
          <ul className="space-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="nav__link"
                >
                  <span>↗</span>
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 text-xs leading-relaxed text-dust md:col-span-4">
          <p className="text-bone/80">
            Это неофициальный некоммерческий фан-проект, не одобренный и не
            поддерживаемый CD PROJEKT RED.
          </p>
          <p>
            CYBERPUNK 2077, связанные персонажи, изображения и товарные знаки
            принадлежат CD PROJEKT S.A. Композиции SAMURAI исполнены REFUSED.
            Авторские права на музыку и звукозаписи принадлежат CD PROJEKT RED,
            REFUSED и/или соответствующим правообладателям.
          </p>
        </div>
      </div>

      <div className="label flex flex-col justify-between gap-2 py-5 text-dust md:flex-row">
        <span>2077 Night City Archives // Unofficial fan project</span>
        <span>Connection_ID: 8492-AFX</span>
      </div>
    </div>

    <div
      className="display outline-text pointer-events-none -mb-[0.13em] select-none text-center text-[25.5vw] leading-[0.8] text-blood"
      aria-hidden="true"
    >
      Samurai
    </div>
  </footer>
);

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black border-t-2 border-[#ff003c] pt-12 pb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <div className="grid grid-cols-4 gap-1">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-cyber font-bold text-white tracking-wider">
              SAMURAI
            </h2>
            <p className="text-gray-500 text-sm mt-1">NEVER FADE AWAY</p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://www.cyberpunk.net/us/en/"
              className="text-gray-400 hover:text-[#fcee0a] transition-colors font-cyber text-sm"
            >
              CYBERPUNK.NET
            </a>
            <a
              href="https://cyberpunk.fandom.com/wiki/NetWatch"
              className="text-gray-400 hover:text-[#00f0ff] transition-colors font-cyber text-sm"
            >
              NETWATCH
            </a>
            <a
              href="https://cyberpunk.fandom.com/wiki/Blackwall"
              className="text-gray-400 hover:text-[#ff003c] transition-colors font-cyber text-sm"
            >
              BLACKWALL
            </a>
          </div>
        </div>

        <div className="mb-8 border-t border-gray-800 pt-6 font-mono text-[10px] leading-relaxed text-gray-600 md:text-xs">
          <p className="mb-2 text-gray-400">
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

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
          <p>2077 NIGHT CITY ARCHIVES // UNOFFICIAL FAN PROJECT</p>
          <p className="mt-2 md:mt-0">CONNECTION_ID: 8492-AFX</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Terminal as TerminalIcon } from "lucide-react";

interface DeveloperNoteProps {
  onOpenTerminal?: () => void;
}

const DeveloperNote = ({ onOpenTerminal }: DeveloperNoteProps) => (
  <aside className="bg-acid text-black">
    <div className="hazard h-3" />
    <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
      <div>
        <p className="section-index mb-3">Сообщение разработчика</p>
        <p className="display max-w-4xl text-3xl md:text-5xl">
          Пожалуйста, уделите больше времени терминалу и загадке, оставленной
          мною
        </p>
      </div>
      {onOpenTerminal && (
        <button
          type="button"
          onClick={onOpenTerminal}
          className="btn btn--ink shrink-0"
        >
          <TerminalIcon size={16} /> Открыть терминал
        </button>
      )}
    </div>
    <div className="hazard h-3" />
  </aside>
);

export default DeveloperNote;

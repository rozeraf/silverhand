import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Fonts are bundled with the app (Cyrillic + Latin subsets) so the design never
// depends on a third-party font CDN being reachable.
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/700.css";
import "@fontsource/golos-text/400.css";
import "@fontsource/golos-text/500.css";
import "@fontsource/golos-text/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/caveat/700.css";
import "./styles/main.css";
import { SettingsProvider } from "./context/SettingsContext";
import { PlayerProvider } from "./context/PlayerContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </SettingsProvider>
  </React.StrictMode>,
);

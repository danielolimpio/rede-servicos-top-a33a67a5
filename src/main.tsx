import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPwaInstall } from "./lib/pwaInstall";

createRoot(document.getElementById("root")!).render(<App />);

initPwaInstall();

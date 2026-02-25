import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./animation.css";
import ReactGA from "react-ga4";

ReactGA.initialize("G-VTXBS72MQF");
createRoot(document.getElementById("root")!).render(<App />);

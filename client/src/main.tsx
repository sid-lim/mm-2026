import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Restore path after GitHub Pages 404 redirect
const params = new URLSearchParams(window.location.search);
const redirectPath = params.get('p');
if (redirectPath) {
  window.history.replaceState(null, '', redirectPath);
}

createRoot(document.getElementById("root")!).render(<App />);

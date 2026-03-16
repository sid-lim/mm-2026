import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const params = new URLSearchParams(window.location.search);
const redirectPath = params.get('p');
if (redirectPath) {
  window.history.replaceState(
    null,
    '',
    '/mm-2026' + (redirectPath || '/')
  );
}

createRoot(document.getElementById("root")!).render(<App />);

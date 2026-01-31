import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { registerThemeManager } from "./global/themeManager";

console.log("🚀 main.jsx: Application starting...");

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("❌ main.jsx: Root element not found!");
} else {
  console.log("✅ main.jsx: Root element found, rendering App...");
  registerThemeManager();
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

import { createContext, useState, useEffect } from "react";
import { STORAGE_KEYS, DARK_THEME, LIGHT_THEME } from "../utils/constants";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  console.log("🎨 ThemeProvider: Initializing State...");

  useEffect(() => {
    console.log("🎨 ThemeProvider: MOUNTED");
    return () => console.log("🎨 ThemeProvider: UNMOUNTED");
  }, []);

  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    console.log("📦 ThemeProvider: Stored theme found:", stored);
    return stored === DARK_THEME || stored === LIGHT_THEME
      ? stored
      : LIGHT_THEME;
  });

  useEffect(() => {
    console.log("✨ ThemeProvider: Theme changed to:", theme);
    document.body.classList.toggle("dark-theme", theme === DARK_THEME);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === DARK_THEME ? LIGHT_THEME : DARK_THEME));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

import { useTheme } from "../hooks/useTheme";
import { DARK_THEME, LIGHT_THEME } from "../utils/constants";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const iconSrc =
    theme === DARK_THEME ? "/assets/lightmode.png" : "/assets/darkmode.jpeg";

  return (
    <button id="themeToggle" className="theme-toggle" onClick={toggleTheme}>
      <span className="theme-icon">
        <img src={iconSrc} alt="Mode toggle" />
      </span>
    </button>
  );
};

export default ThemeToggle;

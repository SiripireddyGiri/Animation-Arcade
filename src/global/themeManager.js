import { STORAGE_KEYS, DARK_THEME, LIGHT_THEME } from '../utils/constants';

export const registerThemeManager = () => {
  if (typeof window === 'undefined') return;
  window.ThemeManager = {
    applyTheme: (theme) => {
      const isDark = theme === DARK_THEME;
      document.body.classList.toggle('dark-theme', isDark);
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      const icon = document.querySelector('#themeToggle img');
      if (icon) {
        icon.src = isDark ? '/assets/lightmode.png' : '/assets/darkmode.jpeg';
      }
    },
    updateIcon: (theme) => {
      const isDark = theme === DARK_THEME;
      const icon = document.querySelector('#themeToggle img');
      if (icon) {
        icon.src = isDark ? '/assets/lightmode.png' : '/assets/darkmode.jpeg';
      }
    },
    getCurrentTheme: () => {
      const stored = localStorage.getItem(STORAGE_KEYS.THEME);
      if (stored === DARK_THEME || stored === LIGHT_THEME) return stored;
      return document.body.classList.contains('dark-theme') ? DARK_THEME : LIGHT_THEME;
    },
  };
};

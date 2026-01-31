export const STORAGE_KEYS = {
  THEME: "animation-arcade-theme",
  USER: "animation-arcade-user",
  USERS: "animation-arcade-users",
  PROGRESS: "animation-arcade-progress",
};

export const DARK_THEME = "dark";
export const LIGHT_THEME = "light";

export const EDITOR_CONSTANTS = {
  LEVEL_START: 0,
  LINE_NUMBER_START: 1,
  FIRST_INPUT_INDEX: 0,
  LINE_INCREMENT: 1,
  FOCUS_DELAY: 100,
  BLANK_PLACEHOLDER: "_____",
  NAVIGATION: {
    FORWARD: 1,
    BACKWARD: -1,
  },
  KEYS: {
    ENTER: "Enter",
  },
};

export const EDITOR_CSS_CLASSES = {
  CODE_LINE: "code-line",
  CODE_LINE_TEXT: "code-line-text",
  CODE_LINE_BLANK: "code-line-blank",
  BLANK_INPUT: "blank-input",
  CORRECT: "correct",
  ERROR: "error",
};

export const SELECTORS = {
  LEVEL_TITLE: ".level-title",
  DESCRIPTION: ".game-description",
  CODE_CONTENT: "#codeContent",
  LINE_NUMBERS: "#lineNumbers",
  HINTS_LIST: "#hintsList",
  CURRENT_LEVEL: "#currentLevel",
  TOTAL_LEVELS: "#totalLevels",
  SUBMIT_BTN: ".submit-btn",
  OUTPUT_BOX: ".output-box",
  PREV_ARROW: "#prevArrow",
  NEXT_ARROW: "#nextArrow",
  BALL: ".ball",
  GROUND: ".ground",
};

export const ROUTES = {
  HOME: "/",
  GAME: "/game",
  LEVELS: "/levels",
};

export const TABS = {
  LOGIN: "login",
  SIGNUP: "signup",
};

export const MESSAGE_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
};

export const MESSAGES = {
  FILL_REQUIRED: "Please fill in all required fields",
  DUPLICATE_EMAIL: "This email is already registered",
  LOGIN_REQUIRED: "Please login to start playing",
  LOGOUT_CONFIRM: "Are you sure you want to logout?",
  EMAIL_NOT_FOUND: "No account found with this email",
  INCORRECT_PASSWORD: "Incorrect password",
};

export const UI_DELAYS = {
  TOOLTIP_FOCUS: 100,
  MESSAGE_DISPLAY: 3000,
  TAB_SWITCH: 300,
  MODAL_CLOSE: 300,
  FORM_SUBMIT: 300,
  LOGOUT: 2100,
  SIGNUP_COMPLETE: 1200,
  LOGIN_COMPLETE: 1050,
  WELCOME_MESSAGE: 2000,
  TOOLTIP_AUTO_HIDE: 4000,
};

export const UI_STRINGS = {
  SHOW_SOLUTION: "Show Hints",
  SUCCESS: "Success!",
  NEXT: "Next",
  COMPLETION_TITLE: "You've completed all levels!",
  ERROR_TITLE: "Error Loading Game",
  ERROR_MESSAGE_1: "Please check that all files are loaded correctly.",
  ERROR_MESSAGE_2: "Check browser console for details.",
  FAILED_TO_LOAD_LEVELS: "Failed to load levels",
  ERROR_LOADING_LEVELS: "Error loading levels data:",
  FAILED_TO_INITIALIZE: "Failed to initialize game:",
};

export const VALIDATOR_CONSTANTS = {
  DELAYS: {
    SUCCESS_MESSAGE: 2000,
  },
  NAVIGATION: {
    NEXT_LEVEL: 1,
  },
};

export const getHTMLTemplates = () => ({
  OUTPUT_BOX: `
    <div class="ground">
      <div class="stadium-lights"></div>
      <div class="ball"></div>
    </div>
  `,
  COMPLETION_MESSAGE: `
    <div class="completion-container">
      <div class="confetti"></div>
      <h2>You've completed all levels!</h2>
    </div>
  `,
  ERROR_MESSAGE: `
    <div class="error-message">
      <h2>⚠️ Error Loading Levels</h2>
      <p>Please refresh the page to try again.</p>
    </div>
  `,
});

export const VALIDATION_MSGS = {
  NAME_REQUIRED: "Name is required",
  NAME_TOO_SHORT: "Name must be at least 2 characters",
  PASSWORD_TOO_SHORT: "Password must be at least 6 characters",
  PASSWORDS_DONT_MATCH: "Passwords do not match",
  EMAIL_NOT_FOUND: "No account found with this email",
  INCORRECT_PASSWORD: "Incorrect password",
};

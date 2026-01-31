import { getLevels } from "./levelsData";
import { UI_STRINGS, VALIDATOR_CONSTANTS } from "./constants";

export class GameValidator {
  constructor(editor) {
    this.editor = editor;
  }

  normalizeValue(value) {
    return value
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/\s*\(\s*/g, "(")
      .replace(/\s*\)\s*/g, ")")
      .replace(/\s*,\s*/g, ",")
      .replace(/;+$/g, "")
      .trim();
  }

  checkAnswer() {
    const inputs = this.editor.inputs;
    let allCorrect = true;

    inputs.forEach((input) => {
      const userAnswer = input.value.trim().toLowerCase();
      const correctAnswer = input.dataset.answer.toLowerCase();

      const normalizedUser = this.normalizeCSS(userAnswer);
      const normalizedCorrect = this.normalizeCSS(correctAnswer);

      if (normalizedUser === normalizedCorrect) {
        input.classList.remove("error");
        input.classList.add("correct");
      } else {
        input.classList.remove("correct");
        input.classList.add("error");
        allCorrect = false;
      }
    });

    if (allCorrect) {
      this.editor.onSuccess();
    }

    return allCorrect;
  }

  normalizeCSS(css) {
    return css
      .replace(/\s+/g, " ")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*;\s*/g, ";")
      .trim();
  }

  handleSuccess(level) {
    const ground = document.querySelector(".ground");
    if (ground) {
      ground.classList.add("lights-on");
    }
    this.editor.applyAnimation(level.expectedCSS);
    if (this.editor.elements?.submitBtn) {
      this.editor.elements.submitBtn.textContent = UI_STRINGS.SUCCESS;
    }
    this.editor.progressManager?.markLevelComplete?.(this.editor.currentLevel);

    let delay = VALIDATOR_CONSTANTS.DELAYS.SUCCESS_MESSAGE;
    const levels = getLevels();
    if (this.editor.currentLevel === levels.length - 1) {
      delay = 6000;
    }

    setTimeout(() => {
      this.updateSubmitButton();
      this.navigateToNextLevel();
    }, delay);
  }

  updateSubmitButton() {
    if (this.editor.elements?.submitBtn) {
      this.editor.elements.submitBtn.textContent = UI_STRINGS.NEXT;
    }
  }

  navigateToNextLevel() {
    const levels = getLevels();
    const nextLevelIndex =
      this.editor.currentLevel + VALIDATOR_CONSTANTS.NAVIGATION.NEXT_LEVEL;

    if (nextLevelIndex < levels.length) {
      this.editor.loadLevel(nextLevelIndex);
    } else {
      this.editor.showCompletionMessage();
    }
  }
}

export const validateName = (name) => {
  if (!name || name.length < 2) {
    return "Name must be at least 2 characters";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const validateMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
};

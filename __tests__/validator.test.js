import { jest } from "@jest/globals";

const mockGetLevels = jest.fn();

jest.unstable_mockModule("../src/utils/levelsData.js", () => ({
  getLevels: mockGetLevels,
}));

const { GameValidator } = await import("../src/utils/validator.js");
const { VALIDATOR_CONSTANTS, UI_STRINGS } =
  await import("../src/utils/constants.js");

describe("GameValidator", () => {
  let validator;
  let mockEditor;
  let mockLevels;

  const createMockLevel = (id, expectedCSS) => ({ id, expectedCSS });
  const createMockButton = () => ({ textContent: "" });

  beforeEach(() => {
    jest.useFakeTimers();

    mockLevels = [
      createMockLevel(1, "transform: rotate(45deg)"),
      createMockLevel(2, "transform: scale(2)"),
      createMockLevel(3, "transform: translate(100px)"),
    ];

    mockGetLevels.mockReturnValue(mockLevels);

    mockEditor = {
      currentLevel: 0,
      inputs: [],
      elements: {
        submitBtn: null,
      },
      applyAnimation: jest.fn(),
      loadLevel: jest.fn(),
      showCompletionMessage: jest.fn(),
      progressManager: {
        markLevelComplete: jest.fn(),
      },
    };

    validator = new GameValidator(mockEditor);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test("normalizeValue should handle complex CSS with spaces and semicolons", () => {
    const complexInput = "TRANSFORM: ROTATE( 45DEG ) SCALE( 2 );;";
    const expectedOutput = "transform: rotate(45deg)scale(2)";

    const result = validator.normalizeValue(complexInput);
    expect(result).toBe(expectedOutput);
  });

  test("handleSuccess should apply animation and update button", () => {
    const level = createMockLevel(1, "transform: rotate(45deg)");
    mockEditor.elements.submitBtn = createMockButton();

    document.body.innerHTML = `
      <div class="ground"></div>
      <button class="submit-btn">${UI_STRINGS.NEXT}</button>
    `;

    validator.handleSuccess(level);

    expect(mockEditor.applyAnimation).toHaveBeenCalledWith(level.expectedCSS);
    expect(mockEditor.progressManager.markLevelComplete).toHaveBeenCalledWith(
      mockEditor.currentLevel,
    );
    expect(mockEditor.elements.submitBtn.textContent).toBe(UI_STRINGS.SUCCESS);

    jest.advanceTimersByTime(VALIDATOR_CONSTANTS.DELAYS.SUCCESS_MESSAGE);

    expect(mockEditor.elements.submitBtn.textContent).toBe(UI_STRINGS.NEXT);
    expect(mockEditor.loadLevel).toHaveBeenCalledWith(
      mockEditor.currentLevel + VALIDATOR_CONSTANTS.NAVIGATION.NEXT_LEVEL,
    );
  });
});

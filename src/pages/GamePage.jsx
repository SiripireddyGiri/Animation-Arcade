import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import { GameValidator } from "../utils/validator";
import ThemeToggle from "../components/ThemeToggle";
import Editor from "../components/Editor";
import Hints from "../components/Hints";
import Output from "../components/Output";
import {
  ROUTES,
  EDITOR_CONSTANTS,
  EDITOR_CSS_CLASSES,
  SELECTORS,
} from "../utils/constants";

const GamePage = () => {
  console.log("🎮 GamePage: Mounting...");
  const {
    currentLevel,
    levels,
    loading,
    error,
    setCurrentLevel,
    markLevelComplete,
  } = useGame();

  const [inputs, setInputs] = useState([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [submitLabel, setSubmitLabel] = useState("Next");

  const level = levels[currentLevel];

  useEffect(() => {
    const styleId = "level-keyframes-style";
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = level?.keyframes || "";
    return () => {
      const existing = document.getElementById(styleId);
      if (existing) existing.textContent = "";
    };
  }, [level]);

  useEffect(() => {
    // Reset ball position/styles when level changes
    const resetBall = () => {
      const ball = document.querySelector(SELECTORS.BALL);
      if (ball) {
        ball.removeAttribute("style");
        // Force reflow
        void ball.offsetWidth;
      }
    };
    resetBall();

    if (level && level.blanks) {
      const initialInputs = level.blanks.map((blank) => ({
        value: "",
        answer: blank.answer,
        status: "",
      }));
      setTimeout(() => {
        setInputs(initialInputs);
        setShowCompletion(false);
        setSubmitLabel("Next");
      }, 0);
    }
  }, [currentLevel, level]);

  const applyAnimation = (cssRule) => {
    const ball = document.querySelector(SELECTORS.BALL);
    if (!ball) return;
    ball.removeAttribute("style");
    const rules = cssRule.split(";").filter((r) => r.trim());
    rules.forEach((rule) => {
      const [property, value] = rule.split(":").map((s) => s.trim());
      if (property && value) {
        const camelCase = property.replace(/-([a-z])/g, (_, letter) =>
          letter.toUpperCase(),
        );
        ball.style[camelCase] = value;
      }
    });
  };

  const handleValidate = () => {
    let allCorrect = true;

    const updatedInputs = inputs.map((input) => {
      const userAnswer = input.value.trim().toLowerCase();
      const correctAnswer = input.answer.toLowerCase();

      const normalizedUser = normalizeCSS(userAnswer);
      const normalizedCorrect = normalizeCSS(correctAnswer);

      if (normalizedUser === normalizedCorrect) {
        return { ...input, status: EDITOR_CSS_CLASSES.CORRECT };
      } else {
        allCorrect = false;
        return { ...input, status: EDITOR_CSS_CLASSES.ERROR };
      }
    });

    setInputs(updatedInputs);

    if (allCorrect) {
      if (level?.expectedCSS) {
        applyAnimation(level.expectedCSS);
      }
      markLevelComplete(currentLevel);
      setSubmitLabel("Success!");
      const delay = 2000;
      setTimeout(() => {
        setSubmitLabel("Next");
        const nextIndex = currentLevel + 1;
        if (nextIndex < levels.length) {
          setCurrentLevel(nextIndex);
        } else {
          setShowCompletion(true);
        }
      }, delay);
    } else {
      const staticParts = (level.code || [])
        .filter(
          (line) =>
            line.includes(":") &&
            !line.includes("{") &&
            !line.includes("}") &&
            !line.includes(EDITOR_CONSTANTS.BLANK_PLACEHOLDER),
        )
        .map((l) => l.trim());
      const inputParts = [];
      updatedInputs.forEach((input, idx) => {
        const blankLineIndex = level.blanks[idx]?.line;
        const line = level.code[blankLineIndex] || "";
        if (line.includes(":")) {
          const candidate = line
            .replace(EDITOR_CONSTANTS.BLANK_PLACEHOLDER, input.value)
            .trim();
          if (!candidate.includes("{") && !candidate.includes("}")) {
            inputParts.push(candidate.replace(/;+\s*$/, ";"));
          }
        }
      });
      const cssRule = [...staticParts, ...inputParts].join(" ");
      if (cssRule) {
        applyAnimation(cssRule);
      }
    }
  };

  const normalizeCSS = (css) => {
    return css
      .replace(/\s+/g, " ")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*;\s*/g, ";")
      .trim();
  };

  const handlePrevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1);
    }
  };

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const canGoPrev = currentLevel > 0;
  const canGoNext = currentLevel < levels.length - 1;

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading levels...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>⚠️ Error Loading Levels</h2>
        <p>{error}</p>
        <p>Please refresh the page to try again.</p>
      </div>
    );
  }

  if (!level) {
    console.warn("⚠️ GamePage: level is undefined.", {
      currentLevel,
      levelsCount: levels.length,
    });
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Level not found</h2>
        <p>Current Level Index: {currentLevel}</p>
        <p>Total Levels: {levels.length}</p>
        {levels.length === 0 && (
          <p>
            Levels data is empty. Please check the network tab or console for
            load errors.
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <header className="top-bar">
        <div className="logo">Animation Arcade</div>
        <div className="header-actions">
          <Link to={ROUTES.HOME}>
            <button className="home-btn">Home</button>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="main-layout">
        <section className="left-section">
          <Editor
            level={level}
            onValidate={handleValidate}
            inputs={inputs}
            setInputs={setInputs}
            submitLabel={submitLabel}
          />
          <Hints level={level} />
        </section>

        <section className="right-section">
          <div className="levels-bar">
            <span>
              <img
                className={`arrows ${!canGoPrev ? "disabled" : ""}`}
                id="prevArrow"
                src="/assets/left-arrow.svg"
                alt="Previous"
                onClick={handlePrevLevel}
                style={{
                  opacity: canGoPrev ? "1" : "0.5",
                  pointerEvents: "auto",
                  cursor: canGoPrev ? "pointer" : "default",
                }}
              />
            </span>
            <span className="level-text">
              Level <span id="currentLevel">{level.id}</span> of{" "}
              <span id="totalLevels">{levels.length}</span>
            </span>
            <span>
              <img
                className={`arrows ${!canGoNext ? "disabled" : ""}`}
                id="nextArrow"
                src="/assets/right-arrow.svg"
                alt="Next"
                onClick={handleNextLevel}
                style={{
                  opacity: canGoNext ? "1" : "0.5",
                  pointerEvents: "auto",
                  cursor: canGoNext ? "pointer" : "default",
                }}
              />
            </span>
          </div>
          <Output showCompletion={showCompletion} />
        </section>
      </main>
    </>
  );
};

export default GamePage;

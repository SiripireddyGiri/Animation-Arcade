import { useState, useRef, useEffect } from "react";

const Hints = ({ level }) => {
  const [hintStage, setHintStage] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setHintStage(0);
      setRevealed(false);
      overlayRef.current?.classList.remove("open");
    }, 0);
  }, [level]);

  if (!level) return null;

  const openOverlay = () => {
    overlayRef.current?.classList.add("open");
  };

  const closeOverlay = () => {
    overlayRef.current?.classList.remove("open");
  };

  const nextStage = () => {
    const next = Math.min(hintStage + 1, 2);
    setHintStage(next);
    openOverlay();
    if (next === 2) {
      setRevealed(true);
    }
  };

  const renderOverlayContent = () => {
    const conceptText =
      level?.hints?.concept ||
      "Start with the basic property and its typical value pattern.";
    const expectedCSS = level?.expectedCSS || level?.answer || "";
    if (hintStage === 0) {
      return (
        <>
          <div className="hint-title">Hint 1: Understanding the Concept</div>
          <div className="hint-body">{conceptText}</div>
          <a
            href="#"
            className="hint-link"
            onClick={(e) => {
              e.preventDefault();
              nextStage();
            }}
          >
            Go to Hint 2 →
          </a>
        </>
      );
    }
    if (hintStage === 1) {
      return (
        <>
          <div className="hint-title">Hint 2: CSS Pattern</div>
          <div className="hint-body">
            <strong>Expected format:</strong>
            <br />
            <code>{expectedCSS}</code>
          </div>
          <a
            href="#"
            className="hint-link"
            onClick={(e) => {
              e.preventDefault();
              nextStage();
            }}
          >
            Show Solution →
          </a>
        </>
      );
    }
    return (
      <>
        <div className="hint-title">✓ Solution</div>
        <div className="hint-body solution">
          <strong>Complete Answer:</strong>
          <br />
          <code>{expectedCSS}</code>
        </div>
      </>
    );
  };

  return (
    <div className="hints">
      <h3>Hints:</h3>
      <ul id="hintsList">
        <li className="hint-item-wide">
          <button
            type="button"
            className={`show-solution-btn ${revealed ? "revealed" : ""}`}
            onClick={() => {
              if (!revealed) {
                openOverlay();
              }
            }}
            disabled={revealed}
          >
            {revealed ? "Solution Revealed" : "Show Hints"}
          </button>
        </li>
      </ul>
      <div className="hint-overlay" ref={overlayRef}>
        <button
          className="close-btn"
          aria-label="Close hints"
          onClick={closeOverlay}
        >
          ×
        </button>
        <div className="hint-overlay-content">{renderOverlayContent()}</div>
      </div>
    </div>
  );
};

export default Hints;

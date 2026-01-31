const Output = ({ showCompletion = false }) => {
  return (
    <div className="output-box">
      {showCompletion ? (
        <div className="completion-container">
          <div className="confetti"></div>
          <h2>You've completed all levels!</h2>
        </div>
      ) : (
        <div className="ground">
          <div className="stadium-lights"></div>
          <div className="ball"></div>
        </div>
      )}
    </div>
  );
};

export default Output;

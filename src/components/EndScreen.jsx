function EndScreen({
  points,
  possiblePoints,
  questionAmount,
  correctAnswers,
  highScore,
  dispatch,
}) {
  return (
    <div className="end-container">
      <div className="end-container-box">
        <span>
          {correctAnswers}/{questionAmount}
        </span>
        <span>Correct Answer</span>
      </div>
      <div className="end-container-box">
        <span>
          {points}/{possiblePoints}
        </span>
        <span>Score</span>
      </div>
      <div className="end-container-box">
        <span>{highScore}</span>
        <span>High Score</span>
      </div>
      <button className="btn" onClick={() => dispatch({ type: "restartQuiz" })}>
        Quiz Again
      </button>
    </div>
  );
}

export default EndScreen;

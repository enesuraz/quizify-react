import { useEffect } from "react";
import QuizOptions from "./QuizOptions";

function QuizScreen({
  question,
  dispatch,
  answer,
  index,
  questionAmount,
  timeRemaining,
}) {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "timeQuiz" });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  const mins = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">
        {index + 1}. {question.question}
      </h2>
      <QuizOptions question={question} answer={answer} dispatch={dispatch} />
      <div className="quiz-actions">
        <div className="quiz-timer">
          {mins}:{seconds}
        </div>
        {answer !== null && index !== questionAmount - 1 && (
          <button
            className="btn"
            onClick={() => dispatch({ type: "nextQuiz" })}
          >
            Next
          </button>
        )}
        {answer !== null && index === questionAmount - 1 && (
          <button
            className="btn"
            onClick={() => dispatch({ type: "finishQuiz" })}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
export default QuizScreen;

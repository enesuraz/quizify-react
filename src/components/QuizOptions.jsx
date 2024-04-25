function QuizOptions({ question, dispatch, answer }) {
  const isAnswer = answer !== null;

  return (
    <div className="quiz-options">
      {question.options.map((quiz, index) => (
        <div className="quiz" key={quiz}>
          <input
            type="radio"
            id={`quiz-check--${index}`}
            className="quiz-check"
            onChange={() => dispatch({ type: "answerQuiz", payload: index })}
            name="answer"
            disabled={isAnswer}
          />
          <label
            htmlFor={`quiz-check--${index}`}
            className="quiz-label"
          ></label>
          <h3
            className={`quiz-option ${
              isAnswer
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
          >
            {quiz}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default QuizOptions;

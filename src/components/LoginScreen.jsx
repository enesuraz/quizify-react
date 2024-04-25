function LoginScreen({ questionAmount, dispatch }) {
  return (
    <div className="login">
      <h1 className="login-title">
        Welcome to the <em>Quizify</em>
      </h1>
      <p className="login-description">
        {questionAmount} Question to master in programing languages
      </p>
      <div style={{ textAlign: "center" }}>
        <button className="btn" onClick={() => dispatch({ type: "startQuiz" })}>
          Let's Start
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;

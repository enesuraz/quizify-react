import { useReducer } from "react";
import LoginScreen from "./components/LoginScreen";
import { useEffect } from "react";
import Error from "./components/Error";
import Loader from "./components/Loader";
import QuizScreen from "./components/QuizScreen";
import EndScreen from "./components/EndScreen";

const SECS_PER_QUESTION = 20;

// For production
const BASE_ENDPOINT =
  "https://opentdb.com/api.php?amount=15&category=18&difficulty=easy&type=multiple";

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
// For production

// For development
/* const BASE_ENDPOINT = "http://localhost:9000/questions" */
// For development

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  status: "loading",
  points: 0,
  correctAnswers: 0,
  highScore: 0,
  timeRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "getData":
      return { ...state, questions: action.payload, status: "ready" };
    case "getError":
      return { ...state, status: "error" };
    case "getLoading":
      return { ...state, status: "loading" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "answerQuiz": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption == action.payload
            ? state.points + question.points
            : state.points,
        correctAnswers:
          question.correctOption == action.payload
            ? state.correctAnswers++
            : state.correctAnswers,
      };
    }
    case "nextQuiz":
      return { ...state, index: ++state.index, answer: null };
    case "finishQuiz":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restartQuiz":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "timeQuiz":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      correctAnswers,
      highScore,
      timeRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionAmount = questions.length;
  const possiblePoints = questions
    .map((q) => q.points)
    .reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    async function getData() {
      try {
        dispatch({ type: "getLoading" });
        const res = await fetch(BASE_ENDPOINT);
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();

        // For development
        /* dispatch({type:'getData',payload:data}) */
        // For development

        // For Production
        let questions = data.results.map((result) => {
          return {
            question: result.question,
            options: shuffle([
              ...result.incorrect_answers,
              result.correct_answer,
            ]),
            points: 10,
            correctAnswer: result.correct_answer,
          };
        });

        questions = questions.map((question) => {
          return {
            ...question,
            correctOption: question.options.indexOf(question.correctAnswer),
          };
        });
        dispatch({ type: "getData", payload: questions });
        // For Production
      } catch (err) {
        dispatch({ type: "getError" });
      }
    }
    getData();
  }, []);

  return (
    <div className="app">
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && (
        <LoginScreen questionAmount={questionAmount} dispatch={dispatch} />
      )}
      {status === "active" && (
        <QuizScreen
          question={questions[index]}
          dispatch={dispatch}
          index={index}
          answer={answer}
          questionAmount={questionAmount}
          timeRemaining={timeRemaining}
        />
      )}
      {status === "finish" && (
        <EndScreen
          points={points}
          possiblePoints={possiblePoints}
          questionAmount={questionAmount}
          correctAnswers={correctAnswers}
          highScore={highScore}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default App;

import quizActions from './actions';
import { arrayEqual } from '@iso/lib/helpers/utility';
const initialState = {
  quizes: {},
  questions: {},
  gettingStarted: false,
  activeQuestion: 0,
  total: 0,
  correct: 0,
  wrong: 0,
  submitted: false,
  answers: false,
};

export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case quizActions.START_QUIZ:
      return { ...state, gettingStarted: true };
    case quizActions.SET_QUIZ_DATA:
      return { ...state, quizes: action.payload, gettingStarted: false };
    case quizActions.SET_QUESTION_DATA:
      return {
        ...state,
        questions: action.payload,
        total: action.payload.total,
      };
    case quizActions.SET_QUESTION_ANSWER:
      const { questions, activeQuestion, correct, wrong } = state;
      const currentQuizz = questions.data[activeQuestion];
      let rightAnswer = false;
      if (Array.isArray(action.payload)) {
        rightAnswer = arrayEqual(action.payload, currentQuizz['answers']);
      } else {
        rightAnswer = currentQuizz['answers'] === action.payload ? true : false;
      }
      let correctAnswer = rightAnswer ? correct + 1 : correct;
      let wrongAnswer = !rightAnswer ? wrong + 1 : wrong;
      return {
        ...state,
        correct: correctAnswer,
        wrong: wrongAnswer,
        submitted: true,
        answers: rightAnswer,
        questions: {
          data: [
            ...questions.data.slice(0, activeQuestion),
            {
              ...questions.data[activeQuestion],
              showAnswer: true,
            },
            ...questions.data.slice(activeQuestion + 1),
          ],
        },
      };
    case quizActions.NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: state.activeQuestion + 1,
        submitted: false,
        answers: false,
      };

    default:
      return state;
  }
}

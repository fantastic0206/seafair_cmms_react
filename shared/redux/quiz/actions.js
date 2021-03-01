const quizActions = {
  START_QUIZ: 'START_QUIZ',
  GET_QUIZ_DATA: 'GET_QUIZ_DATA',
  GET_QUESTION_DATA: 'GET_QUESTION_DATA',
  SET_QUESTION_DATA: 'SET_QUESTION_DATA',
  SET_QUIZ_DATA: 'SET_QUIZ_DATA',
  SET_QUESTION_ANSWER: 'SET_QUESTION_ANSWER',
  NEXT_QUESTION: 'NEXT_QUESTION',
  // Load Data Actions
  startQuiz: () => ({
    type: quizActions.START_QUIZ,
  }),
  getQuestionData: () => ({
    type: quizActions.GET_QUESTION_DATA,
  }),
  getQuizData: () => ({
    type: quizActions.GET_QUIZ_DATA,
  }),
  setQuizData: payload => ({
    type: quizActions.SET_QUIZ_DATA,
    payload,
  }),
  setQuestionData: payload => ({
    type: quizActions.SET_QUESTION_DATA,
    payload,
  }),
  setQuestionAnswer: payload => ({
    type: quizActions.SET_QUESTION_ANSWER,
    payload,
  }),
  nextQuestion: payload => ({
    type: quizActions.NEXT_QUESTION,
    payload,
  }),
};

export default quizActions;

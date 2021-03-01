// saga.js
import { all, takeEvery, put, select } from 'redux-saga/effects';
import quizActions from './actions';
import FakeQuestion from './fakeQuestion';
import FakeQuiz from './fakeQuizes';

const getQuizes = state => state.quiz;

function* questionRenderEffectSaga() {
  let questons;
  questons = FakeQuestion;
  yield put(quizActions.setQuestionData(questons));
}

function* quizRenderEffectSaga() {
  let quizes;
  quizes = FakeQuiz;
  yield put(quizActions.setQuizData(quizes));
}

export default function* questionSaga() {
  yield all([
    takeEvery(quizActions.GET_QUESTION_DATA, questionRenderEffectSaga),
    takeEvery(quizActions.GET_QUIZ_DATA, quizRenderEffectSaga),
  ]);
}

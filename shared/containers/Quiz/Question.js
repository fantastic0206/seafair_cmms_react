import React, { Component } from 'react';
import SingleQuestion from './SingleQuestion';
import MultipleQuestion from './MultipleQuestion';

export default class Question extends Component {
  // The render function, where we actually tell the browser what it should show
  render() {
    const {
      question,
      answers,
      submitted,
      total,
      activeQuestion,
      wrong,
      correct,
    } = this.props;
    if (question.type === 'single') {
      return (
        <SingleQuestion
          question={question}
          setQuestionAnswer={this.props.setQuestionAnswer}
          nextQuestion={this.props.nextQuestion}
          answers={answers}
          correct={correct}
          wrong={wrong}
          total={total}
          activeQuestion={activeQuestion}
          submitted={submitted}
        />
      );
    } else {
      return (
        <MultipleQuestion
          question={question}
          setQuestionAnswer={this.props.setQuestionAnswer}
          nextQuestion={this.props.nextQuestion}
          total={total}
          correct={correct}
          wrong={wrong}
          activeQuestion={activeQuestion}
          submitted={submitted}
        />
      );
    }
  }
}

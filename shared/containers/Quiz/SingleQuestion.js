import React, { Component, Fragment } from 'react';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import Button, { ButtonGroup } from '@iso/components/uielements/button';

export default class SingleQuestion extends Component {
  // Then we add our constructor which receives our props
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      showResult: false,
    };
  }
  showResult = (e) => {
    this.setState({ showResult: true });
  };
  onRadioChange = (e) => {
    this.setState({ answer: e.target.value });
  };
  answerQuestion = (e) => {
    if (this.state.answer !== '') {
      this.props.setQuestionAnswer(this.state.answer);
    } else {
      alert('Please select an answer');
    }
  };
  nextQuestion = (e) => {
    this.setState({ answer: '' });
    this.props.nextQuestion();
  };
  // The render function, where we actually tell the browser what it should show
  render() {
    const {
      question,
      answers,
      submitted,
      total,
      activeQuestion,
      correct,
      wrong,
    } = this.props;
    console.log(activeQuestion, 'active');
    console.log(total, 'total');
    return (
      <div>
        {!this.state.showResult ? (
          <Fragment>
            {' '}
            {!question.showAnswer ? (
              <Fragment>
                <RadioGroup
                  onChange={this.onRadioChange}
                  options={question.options}
                />
                <Button type="primary" onClick={this.answerQuestion}>
                  Submit
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <RadioGroup
                  onChange={this.onRadioChange}
                  options={question.options}
                  disabled
                />
                {activeQuestion < total - 1 ? (
                  <Button type="primary" onClick={this.nextQuestion}>
                    Next
                  </Button>
                ) : (
                  <Button type="primary" onClick={this.showResult}>
                    Show Result
                  </Button>
                )}
              </Fragment>
            )}
            {submitted && answers ? (
              <Fragment>
                <p>Correct answer!</p>
              </Fragment>
            ) : null}
            {submitted && !answers ? (
              <Fragment>
                <p>Wrong answer! Correct Answer is :{question.answers}</p>
              </Fragment>
            ) : null}
          </Fragment>
        ) : (
          <Fragment>
            <p>Your correct answer: {correct}</p>
            <p>Your wrong answer: {wrong}</p>
          </Fragment>
        )}
      </div>
    );
  }
}

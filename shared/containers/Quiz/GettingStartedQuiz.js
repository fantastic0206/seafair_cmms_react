import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'react-redux';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import IntlMessages from '@iso/components/utility/intlMessages';
import basicStyle from '@iso/assets/styles/constants';
import actions from '@iso/redux/quiz/actions';

class GettingStartedQuiz extends Component {
  startQuiz = e => {
    this.props.startQuiz();
  };
  // The render function, where we actually tell the browser what it should show
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box title={<IntlMessages id="Getting started your quiz" />}>
              <Button type="primary" onClick={this.startQuiz}>
                Start Quiz
              </Button>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
  };
}
export default connect(mapStateToProps, { ...actions })(GettingStartedQuiz);

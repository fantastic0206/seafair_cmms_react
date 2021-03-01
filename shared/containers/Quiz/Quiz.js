import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import ContentHolder from '@iso/components/utility/contentHolder';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import IntlMessages from '@iso/components/utility/intlMessages';
import basicStyle from '@iso/assets/styles/constants';
import actions from '@iso/redux/quiz/actions';
import Quizes from './Quizes';

// const { getQuizData } = actions;

function Quiz(props) {
  useEffect(() => {
    props.getQuizData();
  }, []);
  const { rowStyle, colStyle, gutter } = basicStyle;
  const { quizes } = props.quiz;
  return (
    <LayoutWrapper>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} sm={24} xs={24} style={colStyle}>
          {quizes ? (
            <Box title={<IntlMessages id="WELCOME TO ISOMORPHIC QUIZ" />}>
              <ContentHolder>
                <Quizes quizes={quizes} />
              </ContentHolder>
            </Box>
          ) : null}
        </Col>
      </Row>
    </LayoutWrapper>
  );
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
  };
}
export default connect(
  mapStateToProps,
  { ...actions }
)(Quiz);

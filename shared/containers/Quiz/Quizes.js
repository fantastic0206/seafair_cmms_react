import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import Card from '../UIElements/Card/Card.styles';
import basicStyle from '@iso/assets/styles/constants';
import { Link } from 'react-router-dom';

export default class Quizes extends Component {
  // Then we add our constructor which receives our props
  constructor(props) {
    super(props);
  }
  // The render function, where we actually tell the browser what it should show
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { data } = this.props.quizes;
    return (
      <Row style={rowStyle} gutter={gutter} justify="start">
        {data
          ? data.map(quiz => (
              <Col md={8} sm={24} xs={24} style={colStyle}>
                <Card bodyStyle={{ padding: 0 }}>
                  <div className="custom-image">
                    <img alt="example" width="100%" src={quiz.thumbnail} />
                  </div>
                  <div className="custom-card">
                    <h3>{<IntlMessages id={quiz.title} />}</h3>
                    <p>{<IntlMessages id={quiz.description} />}</p>
                    <Link to={`quiz/${quiz.slug}`}>
                      <Button type="primary" onClick={this.answerQuestion}>
                        Start Quiz
                      </Button>
                    </Link>
                  </div>
                </Card>
              </Col>
            ))
          : null}
      </Row>
    );
  }
}

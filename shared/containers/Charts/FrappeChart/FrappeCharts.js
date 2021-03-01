import React from 'react';
import { Row, Col } from 'antd';
import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import ContentHolder from '@iso/components/utility/contentHolder';
import basicStyle from '@iso/assets/styles/constants';
import FrappeChart from './FrappeChart';
import { getHeatMapData, startDate, endDate } from './utils';
const labels = [
  '12am-3am',
  '3am-6am',
  '6am-9am',
  '9am-12pm',
  '12pm-3pm',
  '3pm-6pm',
  '6pm-9pm',
  '9pm-12am',
];
const config = {
  // colors: ["#21ba45", "#98d85b"],
  axisOptions: { xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: 1 },
  height: 300,
};

export default function FrappeCharts() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  return (
    <LayoutWrapper className="isoMapPage">
      <PageHeader>Frappe Charts</PageHeader>

      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} xs={24} style={colStyle}>
          <Box title={'Bar Chart'}>
            <ContentHolder>
              <FrappeChart
                type="bar"
                data={{
                  labels,
                  datasets: [
                    {
                      name: 'Some Data',
                      color: 'light-blue',
                      values: [25, 40, 30, 35, 8, 52, 17, -4],
                    },
                    {
                      name: 'Another Set',
                      color: 'violet',
                      values: [25, 50, -10, 15, 18, 32, 27, 14],
                    },
                    {
                      name: 'Yet Another',
                      color: 'blue',
                      values: [15, 20, -3, -15, 58, 12, -17, 37],
                    },
                  ],
                }}
                {...config}
              />
            </ContentHolder>
          </Box>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} xs={24} style={colStyle}>
          <Box title={'Line Chart'}>
            <ContentHolder>
              <FrappeChart
                type="line"
                data={{
                  labels,
                  datasets: [
                    {
                      name: 'Some Data',
                      color: 'light-blue',
                      values: [25, 40, 30, 35, 8, 52, 17, -4],
                    },
                    {
                      name: 'Another Set',
                      color: 'violet',
                      values: [25, 50, -10, 15, 18, 32, 27, 14],
                    },
                    {
                      name: 'Yet Another',
                      color: 'blue',
                      values: [15, 20, -3, -15, 58, 12, -17, 37],
                    },
                  ],
                }}
                {...config}
              />
            </ContentHolder>
          </Box>
        </Col>
      </Row>

      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} xs={24} style={colStyle}>
          <Box title={'Mixed Chart'}>
            <ContentHolder>
              <FrappeChart
                type="axis-mixed"
                data={{
                  labels,
                  datasets: [
                    {
                      name: 'Some Data',
                      color: 'light-blue',
                      values: [25, 40, 30, 35, 8, 52, 17, -4],
                      chartType: 'bar',
                    },
                    {
                      name: 'Another Set',
                      color: 'violet',
                      values: [25, 50, -10, 15, 18, 32, 27, 14],
                      chartType: 'line',
                    },
                    {
                      name: 'Yet Another',
                      color: 'blue',
                      values: [15, 20, -3, -15, 58, 12, -17, 37],
                      chartType: 'line',
                    },
                  ],
                }}
                {...config}
              />
            </ContentHolder>
          </Box>
        </Col>
      </Row>

      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} xs={24} style={colStyle}>
          <Box title="Heatmap Chart">
            <ContentHolder>
              <FrappeChart
                type="heatmap"
                data={{
                  dataPoints: getHeatMapData(),
                  start: startDate,
                  end: endDate,
                }}
                {...config}
              />
            </ContentHolder>
          </Box>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} xs={24} style={colStyle}>
          <Box title="Pie Chart">
            <ContentHolder>
              <FrappeChart
                type="pie"
                data={{
                  labels: [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                    'Sun',
                  ],
                  datasets: [
                    {
                      name: 'Dataset 1',
                      values: [18, 40, 30, 35, 8, 52, 17, -4],
                      chartType: 'bar',
                    },
                    {
                      name: 'Dataset 2',
                      values: [30, 50, -10, 15, 18, 32, 27, 14],
                      chartType: 'line',
                    },
                  ],
                }}
                {...config}
              />
            </ContentHolder>
          </Box>
        </Col>

        <Col md={12} xs={24} style={colStyle}>
          <Box title="Percentage Chart">
            <ContentHolder>
              <FrappeChart
                type="percentage"
                data={{
                  labels: [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                    'Sun',
                  ],
                  datasets: [
                    {
                      name: 'Dataset 1',
                      values: [18, 40, 30, 35, 8, 52, 17, -4],
                    },
                    {
                      name: 'Dataset 2',
                      values: [30, 50, -10, 15, 18, 32, 27, 14],
                    },
                  ],
                }}
                {...config}
              />
            </ContentHolder>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}

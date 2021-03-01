import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@iso/components/Feedback/Modal';

import { Col, Row, Form } from 'antd';

import './table.css';
import {
  // ActionBtn,
  Fieldset,
  Label,
} from './UsersContentModal.styles';
import MeterReadingAction from '../redux/meterreading/actions';
import ScheduledMaintenanceShowListAction from '../redux/scheduledmaintenanceshowlist/actions';
import { set } from 'nprogress';

// import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';

export default function (props) {
  const {
    visible,
    title,
    smId,
    strCode,
    page1State,
    sheduledShowList,
    intScheduledMaintenanceStatusID,
  } = props;

  const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
  };

  const { initData } = MeterReadingAction;
  const { addSMTrigger, updateData } = ScheduledMaintenanceShowListAction;
  const dispatch = useDispatch();
  const { meterreadingunits } = useSelector((state) => state.MeterReading);

  const [scheduledTriggerId, setScheduledTriggerId] = React.useState(null);
  React.useEffect(() => {
    dispatch(initData());
  }, [visible]);

  const [schduleList, setSchduleList] = React.useState([]);

  React.useEffect(() => {
    setSchduleList(sheduledShowList.split(','));
    console.log(strCode);
    if (page1State == 'show list') {
      // setScheduledTriggerId(sheduledTrigger._id);
      // setBolTSWFriday(sheduledTrigger.bolTSWFriday);
      // setIntAssetEventTypeID(sheduledTrigger.intAssetEventTypeID!=null?sheduledTrigger.intAssetEventTypeID._id:null);
    }
  }, [sheduledShowList, page1State, visible]);

  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        // okText="New"
        title={title}
        width={500}
        onOk={props.onCancel}
        onCancel={props.onCancel}
        footer={null}
      >
        <div>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24}>
              Code
            </Col>
            <Col md={24} sm={24} xs={24}>
              &nbsp;<b>{strCode}</b>
            </Col>
            <Col md={24} sm={24} xs={24}>
              Description
            </Col>
          </Row>

          <table>
            <thead>
              <tr>
                <th style={{ width: '30%' }}>
                  <span className="listHeaderLabel35">type</span>
                </th>
                <th>
                  <span className="listHeaderLabel35">Date</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {schduleList.length != 0 ? (
                schduleList.map((row) => {
                  return (
                    <tr className="listRow" key={row}>
                      <td className="column" style={{ textAlign: 'center' }}>
                        <p className="ion-clock"></p>
                      </td>
                      <td className="column">
                        <p className="context">{row}</p>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    style={{ textAlign: 'center', fontSize: '14px' }}
                    colSpan="2"
                  >
                    No Data!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {}
      </Modal>
    </div>
  );
}

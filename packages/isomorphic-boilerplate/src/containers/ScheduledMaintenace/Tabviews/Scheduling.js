import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from '@iso/components/utility/customScrollBar';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import ContentHolder from '@iso/components/utility/contentHolder';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
// import addDoubleImg from '../../../assets/images/new-group-inner-list.png';
import ScheduledMaintenanceTriggerModal from '../../../component/ScheduledMaintenanceTriggerModal';
import ScheduledMaintenanceShowListModal from '../../../component/ScheduledMaintenanceShowListModal';
import { Button } from 'antd';
import newAddImg from '../../../assets/images/new-inner-list.png';
import '../../../component/table.css';
import ScheduledMaintenanceTriggerAction from '../../../redux/scheduledmaintenancetrigger/actions';
import ScheduledMaintenanceShowListAction from '../../../redux/scheduledmaintenanceshowlist/actions';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginBottom: '20px',
};
export default function (props) {
  const dispatch = useDispatch();
  const { smId, strCode } = props;
  const [radioAnyTrigerVal, setRadioAnyTrigerVal] = React.useState(1);
  const [
    scheduledMaintenanceModalActive,
    setScheduledMaintenanceModalActive,
  ] = React.useState(false);
  const [
    scheduledMaintenanceShowListModalActive,
    setScheduledMaintenanceShowListModalActive,
  ] = React.useState(false);
  const { scheduledtriggers, isDelete } = useSelector(
    (state) => state.ScheduledMaintenanceTrigger
  );
  const [selectedSchedulTrigger, setSelectedSchedulTrigger] = React.useState(
    {}
  );
  const [selectedSchedulShowList, setSelectedSchedulShowList] = React.useState(
    ''
  );
  const [pageState, setPageState] = React.useState('add');
  const [page1State, setPage1State] = React.useState('add');
  const {
    getScheduledTriggers,
    deleteData,
  } = ScheduledMaintenanceTriggerAction;
  const { getSelectedSchedulShowList } = ScheduledMaintenanceShowListAction;
  const onChange = (event) => {
    setRadioAnyTrigerVal(event.target.value);
  };
  const handleCancel = () => {
    setScheduledMaintenanceModalActive(false);
  };
  const handleSchdulinglistCancel = () => {
    setScheduledMaintenanceShowListModalActive(false);
  };
  React.useEffect(() => {
    dispatch(getScheduledTriggers(smId));
    dispatch(getSelectedSchedulShowList(smId));
  }, []);

  const onRowClick = (row) => {
    setPageState('edit');
    setSelectedSchedulTrigger(row);
    setScheduledMaintenanceModalActive(true);
  };
  const onSchdulingShowListClick = (row) => {
    setPage1State('show list');
    setSelectedSchedulShowList(row);
    setScheduledMaintenanceShowListModalActive(true);
  };
  const deleteRow = (id, smId) => {
    dispatch(deleteData(id, smId));
  };
  return (
    <div className="PageContent">
      <Row
        style={rowStyle}
        gutter={16}
        style={{
          background: '#e8edf0',
          padding: '5px 0 3px 10px',
          marginBottom: '15px',
        }}
      >
        <Col md={24} sm={24} xs={24}>
          <div style={{ color: '#738796' }}>Cost Tracking</div>
        </Col>
      </Row>
      {/* <ContentHolder> */}
      <RadioGroup onChange={onChange} name="value" value={radioAnyTrigerVal}>
        <Radio style={radioStyle} value={1}>
          all of the triggers fire
        </Radio>
        <Radio style={radioStyle} value={2}>
          any of the triggers fire
        </Radio>
      </RadioGroup>
      {/* </ContentHolder> */}
      <Scrollbars style={{ width: '80%', height: 'calc(30vh - 70px)' }}>
        <table style={{ overflow: 'auto', width: '95%' }}>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>
                <span className="listHeaderLabel35">Trigger Description</span>
              </th>
              <th style={{ width: '20%' }}>
                <span className="listHeaderLabel35">Current Asset Reading</span>
              </th>
              <th style={{ width: '20%' }}>
                <span className="listHeaderLabel35">
                  Next Trigger Threshold
                </span>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scheduledtriggers.length != 0 ? (
              scheduledtriggers.map((row) => {
                // console.log(scheduling make row", row)
                return (
                  <tr className="listRow" key={row._id}>
                    <td
                      className="column"
                      onClick={() => {
                        onRowClick(row);
                      }}
                    >
                      <p className="context">{row.strScheduleDescription}</p>
                    </td>
                    <td
                      className="column"
                      onClick={() => {
                        onRowClick(row);
                      }}
                    >
                      <p className="context"></p>
                    </td>
                    <td
                      className="column lessTxt"
                      onClick={() => {
                        onSchdulingShowListClick(row.strthreshold);
                      }}
                    >
                      <p className="context" title={row.strthreshold}>
                        {row.strthreshold}
                      </p>
                    </td>
                    <td className="column">
                      {' '}
                      <Button
                        className="DltBtn"
                        // icon="delete"
                        onClick={() => {
                          deleteRow(row._id, row.intScheduledMaintenanceID._id);
                        }}
                      >
                        <i className="ion-android-delete" />
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  style={{ textAlign: 'center', fontSize: '14px' }}
                  colSpan="4"
                >
                  No Data!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Scrollbars>
      <div
        style={{
          color: 'rgb(102, 115, 136)',
          fontSize: '10pt',
          background: '#f7f7f7',
          border: '1px solid rgb(241, 243, 246)',
          height: '25px',
        }}
      >
        <span
          style={{
            float: 'left',
            marginLeft: '4px',
            marginRight: '4px',
            cursor: 'pointer',
          }}
        >
          <img
            src={newAddImg}
            onClick={() => {
              setPageState('add');
              setScheduledMaintenanceModalActive(true);
            }}
          ></img>
        </span>
      </div>
      {/* MODAL PART */}
      <ScheduledMaintenanceTriggerModal
        visible={scheduledMaintenanceModalActive}
        title="SCHEDULED MAINTENACE TRIGGER"
        smId={smId}
        onCancel={handleCancel}
        pageState={pageState}
        sheduledTrigger={selectedSchedulTrigger}
      ></ScheduledMaintenanceTriggerModal>

      <ScheduledMaintenanceShowListModal
        visible={scheduledMaintenanceShowListModalActive}
        title="SCHEDULE MAINTENANCE UPCOMING"
        smId={smId}
        strCode={strCode}
        onCancel={handleSchdulinglistCancel}
        pageState={page1State}
        sheduledShowList={selectedSchedulShowList}
      ></ScheduledMaintenanceShowListModal>

      {/* END */}
    </div>
  );
}

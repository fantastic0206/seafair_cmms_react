import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import { Col, Row, Form } from 'antd';
import notification from '@iso/components/Notification';
import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import AssetModal from './AssetModal';

import BusinessGroupModal from './BusinessGroupModal';
import BusinessModal from './BusinessModal';

import ScheduledTaskAction from '../redux/scheduledtask/actions';
import { Fieldset, Label, GeneralLine } from './UsersContentModal.styles';
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginTop: '10px',
  marginBottom: '10px',
};
const rowFooterStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginTop: '10px',
};
const Option = SelectOption;
export default function (props) {
  const {
    visible,
    title,
    pageState,
    workorderId,
    parentWorkOrderTaskId,
    assetId,
    intParentWorkOrderTaskID,
  } = props;
  // const {initData} = MeterReadingAction;
  const { add, getById, updateData, deleteData } = ScheduledTaskAction;
  const dispatch = useDispatch();
  // const { meterreadingunits } = useSelector((state) => state.MeterReading);
  const { scheduledtask } = useSelector((state) => state.ScheduledTask);
  const [assingedUserModalActive, setAssingedUserModalActive] = React.useState(
    false
  );
  const [intAssignedToUserID, setIntAssignedToUserID] = React.useState(null);
  const [assingedUserName, setAssingedUserName] = React.useState('');
  const [dblTimeEstimatedHours, setDblTimeEstimatedHours] = React.useState(
    null
  );
  const [
    intParentScheduledTaskID,
    setIntParentScheduledTaskID,
  ] = React.useState(null);
  const [intScheduledTaskId, setIntScheduledTaskId] = React.useState(null);
  // const [intWorkOrderTaskId,setIntWorkOrderTaskId]=React.useState(null);

  const [assetModalActive, setAssetModalActive] = React.useState(false);
  // const [assetName, setAssetName]=React.useState("");
  const [strAssetIds, setStrAssetIds] = React.useState('');
  const [strAssets, setStrAssets] = React.useState('');

  const [businessGroupModal, setBusinessGroupModal] = React.useState(false);
  const [businessModal, setBusinessModal] = React.useState(false);
  const [businessGroupName, setBusinessGroupName] = React.useState('');
  const [businessName, setBusinessName] = React.useState('');
  const [assetName, setAssetName] = React.useState('');

  // // const [value, onChange] = React.useState(new Date());
  // React.useEffect(() => {
  //   if(pageState=='edit' && visible){
  //     console.log('get data');
  //    dispatch(getById(scheduledTaskId))
  //   }
  // }, [visible]);

  React.useEffect(() => {
    if (Object.keys(scheduledtask).length != 0) {
      setIntAssignedToUserID(
        scheduledtask.intAssignedToUserID != null
          ? scheduledtask.intAssignedToUserID._id
          : null
      );
      setAssingedUserName(
        scheduledtask.intAssignedToUserID != null
          ? scheduledtask.intAssignedToUserID.strFullName
          : ''
      );
      setDblTimeEstimatedHours(scheduledtask.dblTimeEstimatedHours);
      setIntParentScheduledTaskID(scheduledtask.intParentScheduledTaskID);
    }
  }, [scheduledtask]);
  const handleCancel = () => {
    setBusinessGroupModal(false);
  };

  const handleBusinessCancel = () => {
    setBusinessModal(false);
  };

  const selectAssingUser = (row) => {
    setIntAssignedToUserID(row._id);
    setAssingedUserName(row.strFullName);
  };
  const onSave = () => {
    var sendData = {};

    sendData.intWorkOrderID = workorderId;
    sendData.intAssetID = assetId;
    sendData.strBusiness = businessName;
    sendData.strBusinessGroup = businessGroupName;

    if (pageState == 'add') {
      sendData.intParentWorkOrderTaskID = parentWorkOrderTaskId;
      dispatch(add(sendData));
    } else {
      sendData.intParentWorkOrderTaskID = intParentWorkOrderTaskID;
      dispatch(updateData(sendData, intParentWorkOrderTaskID));
    }
    props.onCancel();
  };

  const onDelete = () => {
    // dispatch(deleteData(scheduledTaskId));
    props.onCancel();
  };

  const selectGroup = (row) => {
    setBusinessGroupName(row.strGroupName);
  };

  const selectBusiness = (row) => {
    setBusinessName(row.strName);
  };

  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        title={title}
        onOk={onSave}
        footer={null}
        width={300}
        onCancel={props.onCancel}
      >
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px' }}>
            <Form>
              <Fieldset>
                <Label>Asset</Label>
                <Input placeholder="" value={props.assetName} disabled />
              </Fieldset>
            </Form>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px' }}>
            <Form>
              <Fieldset>
                <Label>Business</Label>
                <div style={{ position: 'relative' }}>
                  <Input
                    label="Business"
                    placeholder=""
                    value={businessName}
                    onChange={() => {
                      setBusinessModal(true);
                    }}
                  />
                  <i
                    className="ionicons ion-arrow-down-b"
                    onClick={() => {
                      setBusinessModal(true);
                    }}
                    style={{
                      fontSize: '25px',
                      cursor: 'pointer',
                      position: 'absolute',
                      marginLeft: '5px',
                    }}
                  />
                </div>
              </Fieldset>
            </Form>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px' }}>
            <Form>
              <Fieldset>
                <Label>Business Group</Label>
                <div style={{ position: 'relative' }}>
                  <Input
                    label="Business Group"
                    placeholder=""
                    value={businessGroupName}
                    onChange={() => {
                      setBusinessGroupModal(true);
                    }}
                  />
                  <i
                    className="ionicons ion-arrow-down-b"
                    onClick={() => {
                      setBusinessGroupModal(true);
                    }}
                    style={{
                      fontSize: '25px',
                      cursor: 'pointer',
                      position: 'absolute',
                      marginLeft: '5px',
                    }}
                  ></i>
                </div>
              </Fieldset>
            </Form>
          </Col>
        </Row>
        <Row style={rowFooterStyle} gutter={16} justify="start">
          <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px' }}>
            <Button
              type="primary"
              className="saveBtn"
              onClick={onSave}
              style={{ marginLeft: '10px', marginRight: '10px' }}
            >
              <span>Save</span>
            </Button>
          </Col>
        </Row>
      </Modal>

      <BusinessGroupModal
        visible={businessGroupModal}
        title="Business Group"
        selectGroup={selectGroup}
        onCancel={handleCancel}
      />

      <BusinessModal
        visible={businessModal}
        title="Business"
        selectBusiness={selectBusiness}
        onCancel={handleBusinessCancel}
      />
    </div>
  );
}

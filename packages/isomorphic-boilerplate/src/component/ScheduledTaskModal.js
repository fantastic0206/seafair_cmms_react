import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Input, { Textarea } from "@iso/components/uielements/input";
import Modal from "@iso/components/Feedback/Modal";
// import { DatePicker, Space } from 'antd';
import { Col, Row, Form } from "antd";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import Button from "@iso/components/uielements/button";
import notification from "@iso/components/Notification";
import Select, { SelectOption } from "@iso/components/uielements/select";
import AssingedUserModal from "./UsersContentModal";
import MeterReadingAction from "../redux/meterreading/actions";
import ScheduledTaskAction from "../redux/scheduledtask/actions";
import { Fieldset, Label, GeneralLine } from "./UsersContentModal.styles";
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginTop: "10px",
  marginBottom: "10px",
};
const rowFooterStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginTop: "10px",
};

const Option = SelectOption;
export default function (props) {
  const {
    visible,
    title,
    intScheduledMaintenanceID,
    pageState,
    assetName,
    assetId,
    scheduledTaskId,
    strAssetIds
  } = props;
  const { initData } = MeterReadingAction;
  const { add, getById, updateData, deleteData } = ScheduledTaskAction;
  const dispatch = useDispatch();
  const { meterreadingunits } = useSelector((state) => state.MeterReading);
  const { scheduledtask } = useSelector((state) => state.ScheduledTask);
  const [assingedUserModalActive, setAssingedUserModalActive] = React.useState(
    false
  );
  // const [completedUserModalActive,setCompletedUserModalActive]=React.useState(false);
  const [intTaskType, setIntTaskType] = React.useState(0);
  const [strDescription, setStrDescription] = React.useState("");
  const [intAssignedToUserID, setIntAssignedToUserID] = React.useState(null);
  const [assingedUserName, setAssingedUserName] = React.useState("");
  const [intMeterReadingUnitID, setIntMeterReadingUnitID] = React.useState(3);
  const [dblTimeEstimatedHours, setDblTimeEstimatedHours] = React.useState(
    null
  );
  const [bolPassNotify,setBolPassNotify]=React.useState(false);
  const [bolFailNotify,setBolFailNotify]=React.useState(false);
  const [strResult,setStrResult]=React.useState('');
  // const [intOrder, setIntOrder] = React.useState(null);

  React.useEffect(() => {
    dispatch(initData());
    if (pageState == "edit" && visible) {
      dispatch(getById(scheduledTaskId));
    }
  }, [visible]);

  React.useEffect(() => {
    if (Object.keys(scheduledtask).length != 0) {
      setIntTaskType(scheduledtask.intTaskType);
      setStrDescription(scheduledtask.strDescription);
      setIntAssignedToUserID(
        scheduledtask.intAssignedToUserID != null
          ? scheduledtask.intAssignedToUserID._id
          : null
      );
      setAssingedUserName(
        scheduledtask.intAssignedToUserID != null
          ? scheduledtask.intAssignedToUserID.strFullName
          : ""
      );
      setIntMeterReadingUnitID(scheduledtask.intMeterReadingUnitID);
      setDblTimeEstimatedHours(scheduledtask.dblTimeEstimatedHours);
      setBolPassNotify(scheduledtask.strResult=="Pass"?true:false);
      setBolFailNotify(scheduledtask.strResult=="Fail"?true:false);
    }
  }, [scheduledtask]);

  const handleCancel = () => {
    setAssingedUserModalActive(false);
  };

  const selectAssingUser = (row) => {
    setIntAssignedToUserID(row._id);
    setAssingedUserName(row.strFullName);
  };

  const onSave = () => {
    if (strDescription == "") {
      notification("info", "Please put the description.");
      return;
    }
    var sendData = {};
    sendData.intTaskType = intTaskType;
    sendData.dblTimeEstimatedHours = dblTimeEstimatedHours;
    if(assetId=="All")
    sendData.intAssetID = strAssetIds;
    else
    sendData.intAssetID =assetId;
    sendData.intAssignedToUserID = intAssignedToUserID;
    sendData.intMeterReadingUnitID = intMeterReadingUnitID;
    sendData.intParentScheduledTaskID = 0;
    sendData.intScheduledMaintenanceID = intScheduledMaintenanceID;
    sendData.strDescription = strDescription;

    if(intTaskType==3){
      if(!bolPassNotify && !bolFailNotify)
      sendData.strResult="";
      else{
        sendData.strResult=bolPassNotify?"Pass":"Fail";
      }     
      sendData.bolInspection=bolPassNotify?true:false;
    }
    else{
      sendData.strResult="";
    }

    if (pageState == "edit") dispatch(updateData(sendData, scheduledTaskId));
    else dispatch(add(sendData));
    props.onCancel();
  };
  const onDelete = () => {
    dispatch(deleteData(scheduledTaskId));
    props.onCancel();
  };
  const showMeterReadingUnit = () => {
    if (intTaskType == 2) {
      return (
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={24} style={{ marginBottom: "2px" }}></Col>
          <Col md={16} sm={16} xs={24} style={{ marginBottom: "2px" }}>
            <Select
              defaultValue={3}
              value={intMeterReadingUnitID}
              style={{ width: "80%" }}
              onChange={(value) => {
                setIntMeterReadingUnitID(value);
              }}
            >
              {meterreadingunits.map((row) => {
                return (
                  <Option key={row._id} value={row._id}>
                    {row.strName + "(" + row.strSymbol + ")"}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
      );
    }
  };
  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        title={title}
        onOk={onSave}
        footer={null}
        onCancel={props.onCancel}
      >
        <GeneralLine>Task Details</GeneralLine>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={10} sm={10} xs={24} style={{ marginBottom: "2px" }}>
            <Label>Choose Task Type</Label>
          </Col>
          <Col md={14} sm={14} xs={24} style={{ marginBottom: "2px" }}>
            <Select
              defaultValue={intTaskType}
              value={intTaskType}
              style={{ width: "55%" }}
              onChange={(value) => {
                setIntTaskType(value);
              }}
            >
              <Option value={0}>General</Option>
              <Option value={1}>Text</Option>
              <Option value={2}>Meter reading</Option>
              <Option value={3}>Inspection</Option>
            </Select>
          </Col>
        </Row>
        {showMeterReadingUnit()}
        <Fieldset>
          <Label>Description*</Label>
          <Textarea
            value={strDescription}
            onChange={(event) => setStrDescription(event.target.value)}
            placeholder=""
            rows={3}
          />
        </Fieldset>
         {
           intTaskType!=3?
           <div>           
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={10} style={{ marginBottom: "2px" }}>
            <Label>Asset</Label>
          </Col>
          <Col md={16} sm={16} xs={12} style={{ marginBottom: "2px" }}>
            <span>{assetName}</span>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={10} sm={10} xs={24} style={{ marginBottom: "2px" }}>
            <Label>Assigned To User</Label>
          </Col>
          <Col md={14} sm={14} xs={24} style={{ marginBottom: "2px" }}>
            <div style={{ position: "relative" }}>
              <Input
                placeholder=""
                value={assingedUserName}
                style={{ width: "70%" }}
              />
              <i
                className="ionicons ion-arrow-down-b"
                onClick={() => {
                  setAssingedUserModalActive(true);
                }}
                style={{
                  fontSize: "25px",
                  cursor: "pointer",
                  position: "absolute",
                  marginLeft: "5px",
                }}
              ></i>
            </div>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={10} sm={10} xs={24} style={{ marginBottom: "2px" }}>
            <Label>Time Estimate (hours)</Label>
          </Col>
          <Col md={14} sm={14} xs={24} style={{ marginBottom: "2px" }}>
            <Input
              placeholder=""
              value={dblTimeEstimatedHours}
              onChange={(event) => setDblTimeEstimatedHours(event.target.value)}
              style={{ width: "60%" }}
            />
          </Col>
        </Row>
        <GeneralLine>Completion Details</GeneralLine>
           </div>:<div>
              <Row style={rowStyle} gutter={16} justify="start">
              <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
                <Label style={{fontWeight:"bold"}}>Pass</Label>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={10} sm={10} xs={24} style={{marginBottom:'2px',paddingLeft:"25px"}}>           
                <Checkbox  checked={bolPassNotify} onChange={(event)=>{setBolPassNotify(event.target.checked);setBolFailNotify(event.target.checked?false:false)}}>Notify Users</Checkbox>
              </Col>
            </Row>   
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={10} sm={10} xs={24} style={{marginBottom:'2px',}}>           
                <Label style={{fontWeight:"bold"}}>Fail</Label>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={10} sm={10} xs={24} style={{marginBottom:'20px',paddingLeft:"25px"}}>           
                <Checkbox  checked={bolFailNotify} onChange={(event)=>{setBolFailNotify(event.target.checked);setBolPassNotify(event.target.checked?false:false)}}>Notify Users</Checkbox>
              </Col>
            </Row>   
           </div>
         }     
        
      
        <Row style={rowFooterStyle} gutter={16} justify="start">
          <Col md={24} sm={24} xs={24} style={{ marginBottom: "2px" }}>
            <Button
              type="primary"
              className="saveBtn"
              onClick={onSave}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <span>Save</span>
            </Button>
            <Button type="danger" className="saveBtn" onClick={onDelete}>
              <span>Delete</span>
            </Button>
          </Col>
        </Row>
      </Modal>
      {/* customer modal start */}
      <AssingedUserModal
        visible={assingedUserModalActive}
        title="Users"
        group="all"
        selectUser={selectAssingUser}
        onCancel={handleCancel}
      ></AssingedUserModal>

      {/* customer modal end */}
    </div>
  );
}

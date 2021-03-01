import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
// import DateTimePicker from 'react-datetime-picker';
import { DatePicker, Space } from 'antd';
import { Col, Row,Form} from "antd";
// import 'moment/locale/en-US';
// import locale from 'antd/lib/locale/zh_CN';
 import moment from "moment";
 import Button from '@iso/components/uielements/button';
 import notification from '@iso/components/Notification';
 import Radio, { RadioGroup } from '@iso/components/uielements/radio';

import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import Select, { SelectOption } from '@iso/components/uielements/select';
import AssingedUserModal from './UsersContentModal';
import CompletedUserModal from './UsersContentModal';
// import StatusModal from './StatusModal';
import WorkOrderStatusModal from './WorkOrderStatusModal';
import MeterReadingAction from "../redux/meterreading/actions";
import WorkOrderAction from "../redux/workorder/actions";

import WorkOrderTaskAction from '../redux/workordertask/actions';
import PriorityModal from './PriorityModal';
import MaintenanceTypeModal from './MaintenanceTypeModal';

import {
  Fieldset,  
  Label,  
  GeneralLine
} from './UsersContentModal.styles';
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginTop:"10px",
  marginBottom:"10px"
};
const rowFooterStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginTop:"10px", 
};

const Option = SelectOption;
export default function (props) {
  const gutter = 16;

  const {  visible,title,data,pageState} = props; 
  const [strICRNumber, setStrICRNumber] = React.useState("");
  const [strSystem, setStrSystem] = React.useState("");
  const [strSubSystem, setStrSubSystem] = React.useState("");
  const [strAuthorizedInspection, setStrAuthorizedInspection] = React.useState("");
  const [strReference, setStrReference] = React.useState("");
  const [strInspectionFrequency, setStrInspectionFrequency] = React.useState("");
  const [strInspectionCriteria, setStrInspectionCriteria] = React.useState("");
  const [strDeficiencyAction, setStrDeficiencyAction] = React.useState("");
 
  const handleCancel = () => {
  };
  const onChange=(value, dateString)=> {
    // setDtmStartDate(dateString);
  }
  const onChangeComplete=(value,dateString)=>{
    
    // setDtmDateCompleted(dateString);
  }
  const selectStatus = (sel) => {    
    // setIntWorkOrderStatusID(sel.intSysCode);
    // setSelectedStatusText(sel.strName);
  };
  const onSave=()=>{
    let info = {};
    if (data != null)
      info.id = data.id;
    info.strICRNumber = strICRNumber;
    info.strSystem = strSystem;
    info.strSubSystem = strSubSystem;
    info.strAuthorizedInspection = strAuthorizedInspection;
    info.strReference = strReference;
    info.strInspectionFrequency = strInspectionFrequency;
    info.strInspectionCriteria = strInspectionCriteria;
    info.strDeficiencyAction = strDeficiencyAction;
    props.onChangeInfo(info, false);
    props.onCancel();
  }
  const onDelete=()=>{   
    if (data != null) {
      let info = {};
      info.id = data.id;
      props.onChangeInfo(info, true);
    }
    props.onCancel();
  }
  const onCancel=()=>{
    props.onCancel();
  }

  React.useEffect(() => {
    if (data == null){
      setStrICRNumber("");
      setStrSystem("");
      setStrSubSystem("");
      setStrAuthorizedInspection("");
      setStrReference("");
      setStrInspectionFrequency("");
      setStrInspectionCriteria("");
      setStrDeficiencyAction("");
    } 
    else {
      setStrICRNumber(data.strICRNumber);
      setStrSystem(data.strSystem);
      setStrSubSystem(data.strSubSystem);
      setStrAuthorizedInspection(data.strAuthorizedInspection);
      setStrReference(data.strReference);
      setStrInspectionFrequency(data.strInspectionFrequency);
      setStrInspectionCriteria(data.strInspectionCriteria);
      setStrDeficiencyAction(data.strDeficiencyAction);
    }
  }, [visible]);
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
    <GeneralLine>Inspection Details</GeneralLine>
    <Row style={rowStyle} gutter={gutter} justify="start">
      <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
        <Label>ICR Number</Label>
      </Col>
      <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
        <Input                       
          placeholder=""
          value={strICRNumber}
          onChange={ (event) => {
            setStrICRNumber(event.target.value);
          }}
        />
      </Col>
    </Row>
    <Row style={rowStyle} gutter={gutter} justify="start">
      <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
        <Label>System</Label>
      </Col>
      <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
        <Input                       
          placeholder=""
          value={strSystem}
          onChange={ (event) => {
            setStrSystem(event.target.value);
          }}
        />
      </Col>
    </Row>
    <Row style={rowStyle} gutter={gutter} justify="start">
      <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
        <Label>SubSystem</Label>
      </Col>
      <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
        <Input                       
          placeholder=""
          value={strSubSystem}
          onChange={ (event) => {
            setStrSubSystem(event.target.value);
          }}
        />
      </Col>
    </Row>
    <div  style={{
        borderBottom: '1px solid #E9E9E9',
        paddingBottom: '5px',
        marginBottom:'10px'
      }}>
    </div>
    <Row style={rowStyle} gutter={gutter} justify="start">
      <Col md={24} sm={24} xs={24} style={{marginBottom:'2px'}}>           
        <Label>Authorization</Label>
      </Col>
      <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
        <Label>Authorized Inspector</Label>
      </Col>
      <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
        <Input                       
          placeholder=""
          value={strAuthorizedInspection}
          onChange={ (event) => {
            setStrAuthorizedInspection(event.target.value);
          }}
        />
      </Col>
    </Row>
    <Row style={rowStyle} gutter={gutter} justify="start">
      <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
        <Label>References</Label>
      </Col>
      <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
        <Input                       
          placeholder=""
          value={strReference}
          onChange={ (event) => {
            setStrReference(event.target.value);
          }}
        />
      </Col>
    </Row>
    <Row style={rowStyle} gutter={gutter} justify="start">
      <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
        <Label>Inspection Frequency</Label>
      </Col>
      <Col md={24} sm={24} xs={24} style={{marginBottom:'2px'}}>
        <Input                       
          placeholder=""
          value={strInspectionFrequency}
          onChange={ (event) => {
            setStrInspectionFrequency(event.target.value);
          }}
        />
      </Col>
    </Row>
    <div  style={{
        borderBottom: '1px solid #E9E9E9',
        paddingBottom: '5px',
        marginBottom:'10px'
      }}>
    </div>
    <Row style={rowStyle} gutter={gutter} justify="start">
      <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
        <Label>Inspection Criteria</Label>
      </Col>
      <Col md={24} sm={24} xs={24} style={{marginBottom:'2px'}}>
        <Textarea
          placeholder=""
          value={strInspectionCriteria}
          onChange={ (event) => {
            setStrInspectionCriteria(event.target.value);
          }}
          rows={3}
        />
      </Col>
    </Row>
    <Row style={rowStyle} gutter={gutter} justify="start">
      <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
        <Label>Deficiency Action</Label>
      </Col>
      <Col md={24} sm={24} xs={24} style={{marginBottom:'2px'}}>
        <Textarea
          placeholder=""
          value={strDeficiencyAction}
          onChange={ (event) => {
            setStrDeficiencyAction(event.target.value);
          }}
          rows={3}
        />
      </Col>
    </Row>
    <Row style={rowFooterStyle} gutter={gutter} justify="start">
      <Col md={24} sm={24} xs={24} style={{marginBottom:'2px'}}>
        <Button className="cancelBtn" onClick={onCancel} style={{marginLeft:"10px",marginRight:"10px"}}>
          <span>Cancel</span>
        </Button>           
        <Button type="primary" className="saveBtn" onClick={onSave} style={{marginLeft:"10px",marginRight:"10px"}}>
          <span>Save</span>
        </Button>
        { pageState == "edit" &&
          <Button type="danger" className="deleteBtn"  onClick={onDelete} >
            <span>Delete</span>
          </Button>
        }
      </Col>
    </Row>
  </Modal>
  </div>
 )
}
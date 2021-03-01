import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
// import DateTimePicker from 'react-datetime-picker';
import { DatePicker, Space } from 'antd';
import { Col, Row,Form} from "antd";
 import moment from "moment";
 import notification from '@iso/components/Notification';
 import Button from '@iso/components/uielements/button';
// import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import Select, { SelectOption } from '@iso/components/uielements/select';
import AssingedUserModal from './UsersContentModal';
import CompletedUserModal from './UsersContentModal';
// import StatusModal from './StatusModal';
// import AssotiedWorkOrderModal from './AssotiedWorkOrderModal';
import MeterReadingAction from "../redux/meterreading/actions";
import WorkOrderTaskAction from '../redux/workordertask/actions';
// import EventTypeModal from './EventTypeModal';
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
  const {  visible,title,workorderId,pageState,workordertaskId,parentWorkOrderTaskId,assetId} = props; 
  // const {initData} = MeterReadingAction;
  const {addWorkOrderTask,getById ,updateData,deleteData}=WorkOrderTaskAction;
  const dispatch = useDispatch();
  // const { meterreadingunits } = useSelector((state) => state.MeterReading);
  const { workordertask } = useSelector((state) => state.WorkOrderTask);

  const [assingedUserModalActive,setAssingedUserModalActive]=React.useState(false);
  const [completedUserModalActive,setCompletedUserModalActive]=React.useState(false);
 
  const [intAssignedToUserID, setIntAssignedToUserID]=React.useState(null);
  const [assingedUserName, setAssingedUserName]=React.useState('');

  const [intCompletedByUserID,setIntCompletedByUserID]=React.useState(null);
  const [completedUserName,setCompletedUserName]=React.useState(null);

  const [dblTimeEstimatedHours,setDblTimeEstimatedHours]=React.useState(null);
  const [dblTimeSpentHours,setDblTimeSpentHours]=React.useState(null);
  const [dtmDateCompleted,setDtmDateCompleted]=React.useState(null);
 
  const [intWorkOrderID,setIntWorkOrderID]=React.useState(null);
  const [intWorkOrderTaskId,setIntWorkOrderTaskId]=React.useState(null);
  const [intParentWorkOrderTaskID,setIntParentWorkOrderTaskID]=React.useState(null);

  // // const [value, onChange] = React.useState(new Date());
  React.useEffect(() => {  
    if(pageState=='edit' && visible){
      console.log('get data');
     dispatch(getById(workordertaskId))
    }    
  }, [visible]);

  React.useEffect(() => {
    if(Object.keys(workordertask).length!=0){
     
    setIntWorkOrderID(workordertask.intWorkOrderID);
    // setStrDescription(workordertask.strDescription);     
    setDtmDateCompleted(workordertask.dtmDateCompleted);
    setIntAssignedToUserID(workordertask.intAssignedToUserID!=null?workordertask.intAssignedToUserID._id:null);
    setAssingedUserName(workordertask.intAssignedToUserID!=null?workordertask.intAssignedToUserID.strFullName:'')
    setIntCompletedByUserID(workordertask.intCompletedByUserID!=null?workordertask.intCompletedByUserID._id:null);
    setCompletedUserName(workordertask.intCompletedByUserID!=null?workordertask.intCompletedByUserID.strFullName:'')
    setDblTimeEstimatedHours(workordertask.dblTimeEstimatedHours);
    setDblTimeSpentHours(workordertask.dblTimeSpentHours);
    setIntWorkOrderTaskId(workordertask._id);
    setIntParentWorkOrderTaskID(workordertask.intParentWorkOrderTaskID)
    
    }
  }, [workordertask]);
  
  const handleCancel = () => {
    setAssingedUserModalActive(false);
    setCompletedUserModalActive(false);   
  };
 
  const selectCompletedUser=(row)=>{
      setCompletedUserName(row.strFullName);
      setIntCompletedByUserID(row._id);
  }
  const selectAssingUser=(row)=>{
    setIntAssignedToUserID(row._id);
    setAssingedUserName(row.strFullName);
  }  
  const onOk=()=>{
    console.log('ok');
  }
  // const onChange=(value, dateString)=> {
  //   setDtmStartDate(dateString);
  // }
  const onChangeComplete=(value,dateString)=>{
    setDtmDateCompleted(dateString);
  }
  const onSave=()=>{
    
    var sendData={};    
    sendData.intWorkOrderID=workorderId;  
    sendData.dtmDateCompleted=dtmDateCompleted;
    sendData.intCompletedByUserID=intCompletedByUserID;
    sendData.intAssignedToUserID=intAssignedToUserID;
    sendData.dblTimeEstimatedHours=dblTimeEstimatedHours;
    sendData.dblTimeSpentHours=dblTimeSpentHours; 
    sendData.strDescription="(labor)";    
    if(pageState=="add")
      sendData.intParentWorkOrderTaskID=parentWorkOrderTaskId;
    else
      sendData.intParentWorkOrderTaskID=intParentWorkOrderTaskID;
    sendData.intAssetID=assetId;
  
    if(pageState=="edit")
      dispatch(updateData(sendData,intWorkOrderTaskId));
    else
      dispatch(addWorkOrderTask(sendData));

     props.onCancel();
  }
 
  const onDelete=()=>{
    dispatch(deleteData(intWorkOrderTaskId));
    props.onCancel();
  }
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

  <Row style={rowStyle} gutter={16} justify="start">
          <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
            <Label>Assigned To User</Label>
          </Col>
          <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
              <div style={{position:'relative'}}>
                  <Input
                      label="Set Offline By User"
                      placeholder=""
                      value={assingedUserName}
                      style={{width:"70%"}}
                  />
                  <i className="ionicons ion-arrow-down-b"
                      onClick={()=>{setAssingedUserModalActive(true)}}
                    style={{ fontSize: "25px", cursor: "pointer" , 
                      position: "absolute",
                    marginLeft: "5px"}}
                      ></i>
                </div>
          </Col>
    </Row>

    <Row style={rowStyle} gutter={16} justify="start">
          <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
            <Label>Date Completed</Label>
          </Col>
          <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
             <DatePicker showTime value={dtmDateCompleted!=null?moment(dtmDateCompleted,'YYYY-MM-DD HH:mm:ss'):""} onChange={onChangeComplete} style={{width:'80%'}} onOk={onOk} />
          </Col>
    </Row>      
    
    <Row style={rowStyle} gutter={16} justify="start">
          <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
            <Label>Completed By User</Label>
          </Col>
          <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
              <div style={{position:'relative'}}>
                  <Input
                      label="completed by user"
                      placeholder=""
                     value={completedUserName}
                      style={{width:"70%"}}
                  />
                  <i className="ionicons ion-arrow-down-b"
                      onClick={()=>{setCompletedUserModalActive(true)}}
                    style={{ fontSize: "25px", cursor: "pointer" , 
                      position: "absolute",
                    marginLeft: "5px"}}
                      ></i>
                </div>
          </Col>
    </Row>
 
    <Row style={rowStyle} gutter={16} justify="start">
          <Col md={12} sm={12} xs={24} style={{marginBottom:'2px'}}>           
           
            <Fieldset>
            <Label>Time estimate (hours)</Label>
            <Input
                      placeholder=""
                       value={dblTimeEstimatedHours}
                       onChange={(event)=>setDblTimeEstimatedHours(event.target.value)}
                      style={{width:"70%"}}
                  />
            </Fieldset>
          </Col>
          <Col md={12} sm={12} xs={24} style={{marginBottom:'2px'}}>
              <Fieldset>
                <Label>Time Spents (hours)</Label>
                <Input
                          placeholder=""
                          value={dblTimeSpentHours}
                          onChange={(event)=>setDblTimeSpentHours(event.target.value)}
                          style={{width:"70%"}}
                      />
                </Fieldset>
          </Col>
    </Row>    
    <Row style={rowFooterStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24} style={{marginBottom:'2px'}}>           
                <Button type="primary" className="saveBtn" onClick={onSave} style={{marginLeft:"10px",marginRight:"10px"}}>
                  <span>Save</span>
                </Button>
                <Button type="danger" className="saveBtn"  onClick={onDelete} >
                  <span>Delete</span>
                </Button>
            </Col>
          </Row>
  </Modal>
  {/* customer modal start */}
      < AssingedUserModal
        visible={assingedUserModalActive}
        title="Users"
        group="all"
        selectUser={selectAssingUser}
        onCancel={handleCancel}
      >
      </AssingedUserModal>

      < CompletedUserModal
        visible={completedUserModalActive}
        title="Users"
        group="all"
        selectUser={selectCompletedUser}
        onCancel={handleCancel}
      >
      </CompletedUserModal>
          
        {/* customer modal end */}
  </div>
 )
}
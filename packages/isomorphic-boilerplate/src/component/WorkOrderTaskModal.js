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
  const {  visible,title,workorderId,pageState,workordertaskId,assetName,assetId,strAssetIds} = props; 
  const {initData} = MeterReadingAction;
  const {add}=WorkOrderAction;
  const {addWorkOrderTask,getById ,updateData,deleteData}=WorkOrderTaskAction;
  
  const dispatch = useDispatch();
  const { meterreadingunits } = useSelector((state) => state.MeterReading);
  const { workordertask } = useSelector((state) => state.WorkOrderTask);

  const [assingedUserModalActive,setAssingedUserModalActive]=React.useState(false);
  const [completedUserModalActive,setCompletedUserModalActive]=React.useState(false);
  const [intTaskType,setIntTaskType]=React.useState(0);
  const [strDescription,setStrDescription]=React.useState('');

  const [intAssignedToUserID, setIntAssignedToUserID]=React.useState(null);
  const [assingedUserName, setAssingedUserName]=React.useState('');

  const [intCompletedByUserID,setIntCompletedByUserID]=React.useState(null);
  const [completedUserName,setCompletedUserName]=React.useState(null);

  const [intMeterReadingUnitID,setIntMeterReadingUnitID]=React.useState(3)

  const [dtmStartDate,setDtmStartDate]=React.useState(null);
  const [dblTimeEstimatedHours,setDblTimeEstimatedHours]=React.useState(null);
  const [dblTimeSpentHours,setDblTimeSpentHours]=React.useState(null);
  const [strTaskNotesCompletion,setStrTaskNotesCompletion]=React.useState('')

  const [dtmDateCompleted,setDtmDateCompleted]=React.useState(null);
  const [strResult,setStrResult]=React.useState('');
  const [intWorkOrderID,setIntWorkOrderID]=React.useState(null);
  const [intWorkOrderTaskId,setIntWorkOrderTaskId]=React.useState(null);
  const [statusModalActive,setStatusModalActive]=React.useState(false);
  const [selectedStatusText,setSelectedStatusText]=React.useState("");
  const [intWorkOrderStatusID,setIntWorkOrderStatusID]=React.useState(null);
  const [priorityTxt, setPriorityTxt] = React.useState("");
  const [priorityModalActive,setPriorityModalActive]=React.useState(false);
  const [intPriorityID, setIntPriorityID] = React.useState(null);
  const [maintainTypeModalActive, setMaintainTypeModalActive] = React.useState(
    false
  );
  const [maintanaceTypeTxt, setMaintanaceTypeTxt] = React.useState("");
  const [intMaintenanceTypeID, setIntMaintenanceTypeID] = React.useState(null);
  const [bolInspection,setBolInspection]=React.useState(false);
  const [bolCreateWorkOrder,setBolCreateWorkOrder]=React.useState(false);
  const [bolPassNotify,setBolPassNotify]=React.useState(false);
  const [bolFailNotify,setBolFailNotify]=React.useState(false);
  // const [value, onChange] = React.useState(new Date());
 
 
  React.useEffect(() => {
    dispatch(initData()); 
    if(pageState=='edit' && visible){
     dispatch(getById(workordertaskId))
    }    
  }, [visible]);

  React.useEffect(() => {
    if(Object.keys(workordertask).length!=0){   
     setIntTaskType(workordertask.intTaskType);  
     setIntWorkOrderID(workordertask.intWorkOrderID);
    setStrDescription(workordertask.strDescription);   
 
   setDtmStartDate(workordertask.dtmStartDate); 
   setDtmDateCompleted(workordertask.dtmDateCompleted);
    setIntAssignedToUserID(workordertask.intAssignedToUserID!=null?workordertask.intAssignedToUserID._id:null);
    setAssingedUserName(workordertask.intAssignedToUserID!=null?workordertask.intAssignedToUserID.strFullName:'')
    setIntCompletedByUserID(workordertask.intCompletedByUserID!=null?workordertask.intCompletedByUserID._id:null);
    setCompletedUserName(workordertask.intAssignedToUserID!=null?workordertask.intAssignedToUserID.strFullName:'')
    setIntMeterReadingUnitID(workordertask.intMeterReadingUnitID);
    setDblTimeEstimatedHours(workordertask.dblTimeEstimatedHours);
    setDblTimeSpentHours(workordertask.dblTimeSpentHours);
    setStrResult(workordertask.strResult);
    setStrTaskNotesCompletion(workordertask.strTaskNotesCompletion);
    setIntWorkOrderTaskId(workordertask._id);
    setBolPassNotify(workordertask.strResult=="Pass"?true:false);
    setBolFailNotify(workordertask.strResult=="Fail"?true:false);
    }
  }, [workordertask]);
  
  const handleCancel = () => {
    setAssingedUserModalActive(false);
    setCompletedUserModalActive(false);   
    setStatusModalActive(false);
    setPriorityModalActive(false);
    setMaintainTypeModalActive(false)
  };
 
  const selectCompletedUser=(row)=>{
      setCompletedUserName(row.strFullName);
      setIntCompletedByUserID(row._id);
  }
  const selectAssingUser=(row)=>{
    setIntAssignedToUserID(row._id);
    setAssingedUserName(row.strFullName);
  } 
  const selectedPriority = (id, txt) => {
    setPriorityTxt(txt);
    setIntPriorityID(id);
  };
  const selectMaintenanceType = (id, txt) => {
    setMaintanaceTypeTxt(txt);
    setIntMaintenanceTypeID(id);
  };
  const onOk=()=>{
    console.log('ok');
  }
  const onChange=(value, dateString)=> {
    setDtmStartDate(dateString);
  }
  const onChangeComplete=(value,dateString)=>{
    
    setDtmDateCompleted(dateString);
  }
  const selectStatus = (sel) => {    
    setIntWorkOrderStatusID(sel.intSysCode);
    setSelectedStatusText(sel.strName);
  };
  const onSave=()=>{
    if(strDescription==""){
      notification('info',"Please put the description.");
      return;
    }
    if(intTaskType==3 && bolCreateWorkOrder){
      if(intWorkOrderStatusID==null){
        notification('info',"Please select a work order status.");
        return;
      }
      if(intPriorityID==null){
        notification('info',"Please select a priority type.");
        return;
      }
    }
    
    var sendData={};    
    sendData.intWorkOrderID=workorderId;
    sendData.intTaskType=intTaskType;
    sendData.dtmStartDate=dtmStartDate;
    sendData.dtmDateCompleted=dtmDateCompleted;
    sendData.intCompletedByUserID=intCompletedByUserID;
    sendData.intAssignedToUserID=intAssignedToUserID;
    sendData.dblTimeEstimatedHours=dblTimeEstimatedHours;
    sendData.dblTimeSpentHours=dblTimeSpentHours;
    sendData.intMeterReadingUnitID=intMeterReadingUnitID;
    sendData.strDescription=strDescription;
    sendData.strTaskNotesCompletion=strTaskNotesCompletion;
    sendData.intParentWorkOrderTaskID=0;   
    if(intTaskType==3){
      if(!bolPassNotify && !bolFailNotify)
      sendData.strResult="";
      else{
        sendData.strResult=bolPassNotify?"Pass":"Fail";
      }     
      sendData.bolInspection=bolPassNotify?true:false;
    }
    else{
      sendData.strResult=strResult;
    }
  
   
 
    if(assetId=="All")
    sendData.intAssetID = strAssetIds;
    else
    sendData.intAssetID =assetId;    

    if(pageState=="edit")
      dispatch(updateData(sendData,intWorkOrderTaskId));
    else
      dispatch(addWorkOrderTask(sendData));
  
      if(intTaskType==3 && bolCreateWorkOrder){
        var workOrder={};
        workOrder.intRequestedByUserID=localStorage.getItem("user_id");
        workOrder.intWorkOrderStatusID=intWorkOrderStatusID;
        workOrder.intPriorityID=intPriorityID;
        workOrder.intMaintenanceTypeID=intMaintenanceTypeID;
        workOrder.intSiteID=1;  
        dispatch(add(workOrder));
      }

    props.onCancel();
  }
  const onDelete=()=>{   
    dispatch(deleteData(intWorkOrderTaskId));
    props.onCancel();
  }

  const showMeterReadingUnit=()=>{
      if(intTaskType==2){
      return  <Row style={rowStyle} gutter={16} justify="start">
                  <Col md={8} sm={8} xs={24} style={{marginBottom:'2px'}}>           
                  </Col>
                  <Col md={16} sm={16} xs={24} style={{marginBottom:'2px'}}>
                      <Select defaultValue={3} value={intMeterReadingUnitID} style={{width:"80%"}} 
                        onChange={(value)=>{setIntMeterReadingUnitID(value);}}
                      >
                          {
                              meterreadingunits.map((row)=>{
                              return <Option key={row._id} value={row._id}>{row.strName+"("+row.strSymbol+")"}</Option> 
                              })
                          } 
                    </Select>           
                  </Col>
            </Row>
    }   
  } 
  
  const modalBody=()=>{
    return  <div>
    {showMeterReadingUnit()}
 
     <Fieldset>
     <Label>Description*</Label>
     <Textarea
                  value={strDescription}
                  onChange={(event)=>setStrDescription(event.target.value)}               
                  placeholder=""
                  rows={3}
                  
                 />
   </Fieldset>
   <Row style={rowStyle} gutter={16} justify="start">
           <Col md={8} sm={8} xs={10} style={{marginBottom:'2px'}}>           
             <Label>Asset</Label>
           </Col>
           <Col md={16} sm={16} xs={12} style={{marginBottom:'2px'}}>
  <span>{assetName}</span>
           </Col>
     </Row>
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
             <Label>Start Date</Label>
           </Col>
           <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
              <DatePicker showTime value={dtmStartDate!=null?moment(dtmStartDate,'YYYY-MM-DD HH:mm:ss'):""} onChange={onChange} style={{width:'70%'}} onOk={onOk} />
           </Col>
     </Row>    
     <Row style={rowStyle} gutter={16} justify="start">
           <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
             <Label>Time Estimate (hours)</Label>
           </Col>
           <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
                 <Input
                       placeholder=""
                        value={dblTimeEstimatedHours}
                        onChange={(event)=>setDblTimeEstimatedHours(event.target.value)}
                       style={{width:"60%"}}
                   />
           </Col>
     </Row>
     <GeneralLine>Result</GeneralLine>
     <Row style={rowStyle} gutter={16} justify="start">
           <Col md={6} sm={6} xs={20} style={{marginBottom:'2px'}}>           
                    <Input
                       placeholder=""
                        value={strResult}
                        onChange={(event)=>setStrResult(event.target.value)}
                       style={{width:"100%"}}
                   />
           </Col>
           <Col md={6} sm={6} xs={4} style={{marginBottom:'2px'}}>           
                   <Label>cycles</Label>
           </Col>
     </Row>
 
     <GeneralLine>Completion Details</GeneralLine>
     
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
           <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
             <Label>Date Completed</Label>
           </Col>
           <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
              <DatePicker showTime value={dtmDateCompleted!=null?moment(dtmDateCompleted,'YYYY-MM-DD HH:mm:ss'):""} onChange={onChangeComplete} style={{width:'70%'}} onOk={onOk} />
           </Col>
     </Row>    
     <Row style={rowStyle} gutter={16} justify="start">
           <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
             <Label>Time Spents (hours)</Label>
           </Col>
           <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
                 <Input
                       placeholder=""
                        value={dblTimeSpentHours}
                        onChange={(event)=>setDblTimeSpentHours(event.target.value)}
                       style={{width:"60%"}}
                   />
           </Col>
     </Row>
     <Fieldset>
     <Label>Task Completion Notes</Label>
     <Textarea
                   label=""
                   value={strTaskNotesCompletion}
                   onChange={(event)=>setStrTaskNotesCompletion(event.target.value)}
                   placeholder=""
                   rows={3}                 
                 />
   </Fieldset>
   </div>
  }
  const insepctionBody=()=>{
    return <div>
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
          <Col md={10} sm={10} xs={24} style={{marginBottom:'2px',paddingLeft:"25px"}}>           
             <Checkbox  checked={bolFailNotify} onChange={(event)=>{setBolFailNotify(event.target.checked);setBolPassNotify(event.target.checked?false:false)}}>Notify Users</Checkbox>
          </Col>
         </Row>    
         <Row style={rowStyle} gutter={16} justify="start">
          <Col md={20} sm={20} xs={24} style={{marginBottom:'2px',paddingLeft:"25px"}}>           
             <Checkbox checked={bolCreateWorkOrder} onChange={(event)=>setBolCreateWorkOrder(event.target.checked)}>Create a Follow-on Work Order </Checkbox>
          </Col>
         </Row>  
         {
           bolCreateWorkOrder? <div>
            <Row style={rowStyle} gutter={16} justify="start">
                 {/* <Col md={3} sm={3} xs={12} style={colStyle}></Col> */}
                 <Col md={18} sm={18} xs={24} style={{paddingLeft:"25px"}} >
                   <Form>
                     <Fieldset>
                       <Label>Work Order Status *</Label>
                       <div style={{ position: "relative" }}>
                         <Input
                           label="Work Order Status"
                           placeholder=""
                           value={selectedStatusText}
                           onChange={() => {
                             setStatusModalActive(true);
                           }}
                           style={{ width: "90%" }}
                         />
                         <i
                           className="ionicons ion-arrow-down-b"
                           onClick={() => {
                             setStatusModalActive(true);
                           }}
                           style={{
                             fontSize: "25px",
                             cursor: "pointer",
                             position: "absolute",
                             marginLeft: "5px",
                           }}
                         ></i>
                       </div>
                     </Fieldset>
                   </Form>
                 </Col>
                 </Row>  
               <Row style={rowStyle} gutter={16} justify="start">
                 <Col md={18} sm={18} xs={24} style={{paddingLeft:"25px"}} >
                 <Form>
                     <Fieldset>
                       <Label>Priority *</Label>
                       <div style={{ position: "relative" }}>
                         <Input
                           label="Priority"
                           placeholder=""
                           value={priorityTxt}
                           style={{ width: "90%" }}
                         />
                         <i
                           className="ionicons ion-arrow-down-b"
                           onClick={() => {
                             setPriorityModalActive(true);
                           }}
                           style={{
                             fontSize: "25px",
                             cursor: "pointer",
                             position: "absolute",
                             marginLeft: "5px",
                           }}
                         ></i>
                       </div>
                     </Fieldset>
                   </Form>
                   </Col>
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">
                 <Col md={18} sm={18} xs={24} style={{paddingLeft:"25px"}} >
                <Form>
                     <Fieldset>
                       <Label>Maintenance Type</Label>
                       <div style={{ position: "relative" }}>
                         <Input
                           label="Maintenance Type"
                           placeholder=""
                           value={maintanaceTypeTxt}
                           style={{ width: "90%" }}
                         />
                         <i
                           className="ionicons ion-arrow-down-b"
                           onClick={() => {
                             setMaintainTypeModalActive(true);
                           }}
                           style={{
                             fontSize: "25px",
                             cursor: "pointer",
                             position: "absolute",
                             marginLeft: "5px",
                           }}
                         ></i>
                       </div>
                     </Fieldset>
                   </Form>
                   </Col>
                   </Row>
                   </div> :null
         }
         
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={24} sm={24} xs={24} style={{paddingLeft:"5px",marginTop:"20px"}} >
               <Form>
                <Fieldset>
                <Label>Description*</Label>
                <Textarea
                              value={strDescription}
                              onChange={(event)=>setStrDescription(event.target.value)}               
                              placeholder=""
                              rows={3}
                              
                            />
              </Fieldset>
              </Form>
              </Col>
              </Row>
        {/* <RadioGroup onChange={onChange} name="value" >
                    <Radio style={radioStyle} value={1}>
                          Pass
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                          Fail
                    </Radio>
                </RadioGroup> */}
    </div>
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
<GeneralLine>Task Details</GeneralLine>
    <Row style={rowStyle} gutter={16} justify="start">
          <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
            <Label>Choose Task Type</Label>
          </Col>
          <Col md={14} sm={14} xs={24} style={{marginBottom:'2px'}}>
               <Select defaultValue={intTaskType} value={intTaskType} style={{width:"55%"}} 
                onChange={(value)=>{setIntTaskType(value);}}
               >
                  <Option value={0}>General</Option>
                  <Option value={1}>Text</Option>
                  <Option value={2}>Meter reading</Option>     
                  <Option value={3}>Inspection</Option>     
            </Select>           
          </Col>
    </Row>
   {intTaskType!=3?modalBody():insepctionBody()}
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
          
      <WorkOrderStatusModal
        visible={statusModalActive}
        selectStatus={selectStatus}
        title="WORK ORDER STATUS"
        onCancel={handleCancel}
      ></WorkOrderStatusModal>
      <PriorityModal
        visible={priorityModalActive}
        selectedPriority={selectedPriority}
        title="PRIORITIES"
        onCancel={handleCancel}
      ></PriorityModal>
        <MaintenanceTypeModal
        visible={maintainTypeModalActive}
        selectMaintenanceType={selectMaintenanceType}
        title="MAINTENACE TYPES"
        onCancel={handleCancel}
      ></MaintenanceTypeModal>
   {/* customer modal end */}
  </div>
 )
}
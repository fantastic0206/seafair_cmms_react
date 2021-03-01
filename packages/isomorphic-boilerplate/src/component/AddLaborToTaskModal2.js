import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import { Col, Row,Form} from "antd";
import notification from '@iso/components/Notification';
 import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import AssingedUserModal from './UsersContentModal';
import ScheduledTaskAction from '../redux/scheduledtask/actions';
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
  const {  visible,title,pageState,scheduledTaskId,assetId,intScheduledMaintenanceID} = props; 
  // const {initData} = MeterReadingAction;
  const {add,getById ,updateData,deleteData}=ScheduledTaskAction;
  const dispatch = useDispatch();
  // const { meterreadingunits } = useSelector((state) => state.MeterReading);
  const { scheduledtask } = useSelector((state) => state.ScheduledTask);
  const [assingedUserModalActive,setAssingedUserModalActive]=React.useState(false); 
  const [intAssignedToUserID, setIntAssignedToUserID]=React.useState(null);
  const [assingedUserName, setAssingedUserName]=React.useState('');
  const [dblTimeEstimatedHours,setDblTimeEstimatedHours]=React.useState(null); 
  const [intParentScheduledTaskID,setIntParentScheduledTaskID]=React.useState(null);
  const [intScheduledTaskId,setIntScheduledTaskId]=React.useState(null);
  // const [intWorkOrderTaskId,setIntWorkOrderTaskId]=React.useState(null);

  // // const [value, onChange] = React.useState(new Date());
  React.useEffect(() => {  
    if(pageState=='edit' && visible){
      console.log('get data');
     dispatch(getById(scheduledTaskId))
    }    
  }, [visible]);

  React.useEffect(() => {
    if(Object.keys(scheduledtask).length!=0){   
    setIntAssignedToUserID(scheduledtask.intAssignedToUserID!=null?scheduledtask.intAssignedToUserID._id:null);
    setAssingedUserName(scheduledtask.intAssignedToUserID!=null?scheduledtask.intAssignedToUserID.strFullName:'')
    setDblTimeEstimatedHours(scheduledtask.dblTimeEstimatedHours);  
    setIntParentScheduledTaskID(scheduledtask.intParentScheduledTaskID);    
    }
  }, [scheduledtask]);  
  const handleCancel = () => {
    setAssingedUserModalActive(false);  
  };

  const selectAssingUser=(row)=>{
    setIntAssignedToUserID(row._id);
    setAssingedUserName(row.strFullName);
  } 
  const onSave=()=>{
    if(intAssignedToUserID==null || dblTimeEstimatedHours==null ){
      notification('info',"Please put value.");
      return;
    }
    var sendData={};    
    // sendData.intWorkOrderID=workorderId;  
    sendData.intAssignedToUserID=intAssignedToUserID;
    sendData.dblTimeEstimatedHours=dblTimeEstimatedHours;
    sendData.strDescription="(labor)";    
    sendData.intAssetID=assetId;
    sendData.intScheduledMaintenanceID=intScheduledMaintenanceID;

     if(pageState=="add"){
      sendData.intParentScheduledTaskID=scheduledTaskId;
      dispatch(add(sendData));
     }     
    else{
        sendData.intParentScheduledTaskID=intParentScheduledTaskID;
        dispatch(updateData(sendData,scheduledTaskId));
    }
     props.onCancel();
  }
 
  const onDelete=()=>{
    dispatch(deleteData(scheduledTaskId));
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
  width={300}
  onCancel={props.onCancel}
>

  <Row style={rowStyle} gutter={16} justify="start">
          <Col md={24} sm={24} xs={24} style={{marginBottom:'2px'}}>           
            
            <Form>
                  <Fieldset>
                  <Label>Assigned To User</Label>
                  <div style={{position:'relative'}}>
                  <Input
                      label="Set Offline By User"
                      placeholder=""
                      value={assingedUserName}
                     
                  />
                  <i className="ionicons ion-arrow-down-b"
                      onClick={()=>{setAssingedUserModalActive(true)}}
                    style={{ fontSize: "25px", cursor: "pointer" , 
                      position: "absolute",
                    marginLeft: "5px"}}
                      ></i>
                </div>
                  </Fieldset>
                </Form>
          </Col>          
    </Row> 
    
 
    <Row style={rowStyle} gutter={16} justify="start">
          <Col md={15} sm={15} xs={24} style={{marginBottom:'2px'}}>           
          <Form>
            <Fieldset>
            <Label>Time estimate (hours)</Label>
            <Input
                      placeholder=""
                       value={dblTimeEstimatedHours}
                       onChange={(event)=>setDblTimeEstimatedHours(event.target.value)}                     
                  />
            </Fieldset>
            </Form>
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

    
          
        {/* customer modal end */}
  </div>
 )
}
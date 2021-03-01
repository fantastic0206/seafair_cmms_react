import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import DateTimePicker from 'react-datetime-picker';
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import UsersContentModal from '../../../component/UsersContentModal';
import StatusModal from '../../../component/StatusModal';
import AssotiedWorkOrderModal from '../../../component/AssotiedWorkOrderModal';
import EventTypeModal from '../../../component/EventTypeModal';
import {
  Fieldset,
  Form,
  Label,  
  GeneralLine
} from './OnlineContent.styles';
export default function (props) {
  const {  visible,title} = props; 
  const [value, onChange] = React.useState(new Date());
  const [userModalActive,setUserModalActive]=React.useState(false);
  const [statusModalActive, setStatusModalActive]=React.useState(false);
  const [assotiteWorkModalActive,setAssotiteWorkModalActive]=React.useState(false);
  const [eventTypeModalActive,setEventTypeModalActive]=React.useState(false);
  const [selectedStatusId,setSelectedStatusId]=React.useState('');
  const [selectedStatusText,setSelectedStatusText]=React.useState('');
  const [intSetOnlineByUserID,setIntSetOnlineByUserID]=React.useState(localStorage.getItem('user_id'));
  const [intSetOnlineByUserName,setIntSetOnlineByUserName]=React.useState(localStorage.getItem('user_name'));
  const [strAssociateWorkOrder,setStrAssociateWorkOrder]=React.useState('');
  const [strAssetEventTypeName,setStrAssetEventTypeName]=React.useState('');
  React.useEffect(() => {
  }, [visible]);

  const handleCancel = () => {
    setUserModalActive(false);  
    setStatusModalActive(false);
    setAssotiteWorkModalActive(false);
    setEventTypeModalActive(false);
  };
  const selectStatus=(sel)=>{
     setSelectedStatusId(sel._id);
     setSelectedStatusText(sel.strName);
  }
  const selectUser=(row)=>{
      setIntSetOnlineByUserName(row.strFullName);
      setIntSetOnlineByUserID(row._id);
  }
  const selectedWorkOrder=(row)=>{
    setStrAssociateWorkOrder("WO "+row.strCode)
  }
  const selectedAssetEventType=(row)=>{
      setStrAssetEventTypeName(row.strEventCode+"-"+row.strEventName);
  }
  const changeSate=()=>{
    props.selectedOnlineState(props.stateFlag);
    props.onCancel();
  }
 return (
   <div>
  <Modal
  visible={visible}
  onClose={props.onCancel}
  title={title}  
  onOk={changeSate}
  onCancel={props.onCancel}
>
 
   <Form>
  <Fieldset>
    <Label>Offline From</Label>
    <DateTimePicker
        onChange={onChange}
        value={value}
      />   
  </Fieldset>
  <Fieldset>
    <Label>Set Offline By User</Label>
     <div style={{position:'relative'}}>
     <Input
         label="Set Offline By User"
         placeholder=""
         value={intSetOnlineByUserName}
         style={{width:"95%"}}
    />
     <i className="ionicons ion-arrow-down-b"
        onClick={()=>{setUserModalActive(true)}}
       style={{ fontSize: "25px", cursor: "pointer" , 
        position: "absolute",
       marginLeft: "5px"}}
         ></i>
      </div>
  </Fieldset>
  <Fieldset>
    <Label>Status</Label>
     <div style={{position:"relative"}}>
     <Input
         label="Status"
         placeholder="Status"
         style={{width:"95%"}}
         value={selectedStatusText}
         onChange={()=>{statusModalActive(true)}}
    />
    <i className="ionicons ion-arrow-down-b"
      onClick={()=>{setStatusModalActive(true)}}
       style={{ fontSize: "25px", cursor: "pointer" , 
        position: "absolute",
       marginLeft: "5px"}}
         ></i>
    </div>
  </Fieldset>
  <Fieldset>
    <Label>Associated Work Order</Label>
    <div style={{position:"relative"}}>
     <Input
         label="Associated Work Order"
         placeholder=""
         value={strAssociateWorkOrder}
         onChange={()=>{setAssotiteWorkModalActive(true)}}
         style={{width:"95%"}}
    />
    <i className="ionicons ion-arrow-down-b"
        onClick={()=>{setAssotiteWorkModalActive(true)}}
       style={{ fontSize: "25px", cursor: "pointer" , 
        position: "absolute",
       marginLeft: "5px"}}
         ></i>
    </div>
  </Fieldset>
  <Fieldset>
    <Label>Additional Info</Label>
    <Textarea
                  label="Additional Info"
                  placeholder=""
                  rows={3}
                 
                />
  </Fieldset>
  <GeneralLine>Generate Asset Event</GeneralLine>
     <Fieldset>
      <Checkbox checked={false} >Generate an event</Checkbox>
     </Fieldset>
  <Fieldset>
    <Label>Event Type</Label>
    <div style={{position:'relative'}}>
    <Input
         label="Event Type"
         placeholder=""
         value={strAssetEventTypeName}
         onChange={()=>{setEventTypeModalActive(true)}}
         style={{width:"95%"}}
    />
     <i className="ionicons ion-arrow-down-b"
        onClick={()=>{setEventTypeModalActive(true)}}
       style={{ fontSize: "25px", cursor: "pointer" , 
        position: "absolute",
       marginLeft: "5px"}}
         ></i>
         </div>
  </Fieldset>
  <Fieldset>
    <Label>Event Description</Label>
    <Textarea
                  label="Event Description"
                  placeholder=""
                  rows={3}
                 
                />
  </Fieldset>
  </Form>
  </Modal>
  {/* customer modal start */}
      < UsersContentModal
        visible={userModalActive}
        title="Users"
        group="all"
        selectUser={selectUser}
        onCancel={handleCancel}
      >
      </UsersContentModal>
      <StatusModal
        visible={statusModalActive}
        selectStatus={selectStatus}
        title="REASONS TO SET ASSET ONLINE"
        onCancel={handleCancel}
      >
      </StatusModal>
      <AssotiedWorkOrderModal
       visible={assotiteWorkModalActive}
       title="WORK ORDERS"
       selectedWorkOrder={selectedWorkOrder}
       onCancel={handleCancel}
      ></AssotiedWorkOrderModal>

      <EventTypeModal 
      visible={eventTypeModalActive}
      title="ASSET EVENT TYPES"
      selectedAssetEventType={selectedAssetEventType}
      onCancel={handleCancel}
      >

      </EventTypeModal>
   {/* customer modal end */}
  </div>
 )
}
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row } from "antd";
import notification from '@iso/components/Notification';
import MeterReadingUnitModal from './MeterReadingUnitModal';
import './table.css'
import {
  ActionBtn,
  Fieldset,
  Form,
  Label, 
} from './UsersContentModal.styles';

import MeterReadingAction from "../redux/meterreading/actions";
export default function (props) {
  const {  visible,title,assetName,assetId} = props;   
  const { addMetering,add } = MeterReadingAction;
  const dispatch = useDispatch();
  const [newModalActive, setNewModalActive] = React.useState(false);
  const [strName, setStrName]=React.useState('');
  const [strDescription, setStrDescription]=React.useState('');
  const [dblMeterReading,setDblMeterReading]=React.useState('0.0');
  const [intMeterReadingUnitsID,setIntMeterReadingUnitsID]=React.useState(null);
  const [meterReadingUntTxt,setMeterReadingUntTxt]=React.useState('');
  const [meterReadingUnitModalActive,setMeterReadingUnitModalActive]=React.useState(false);
  
  
 React.useEffect(() => { 
  // dispatch(initData());
}, []);

 const onSave = () => {
  if(strName==''){
    notification('info',"Please put the Name!");
    return;
  }  
  var sendData={}; 
  sendData.strName=strName;  
  sendData.strDescription=strDescription;  
  setNewModalActive(false);
  dispatch(add(sendData));// adding the meteriding unit
  
}
const handleCancel=()=>{
  setMeterReadingUnitModalActive(false);
}
const selectedMeterReadingUnit=(row)=>{
  setMeterReadingUntTxt(row.strName+"("+row.strSymbol+")");
  setIntMeterReadingUnitsID(row._id);
}
const onSaveMetering=()=>{
  if(intMeterReadingUnitsID==null){
    notification('info',"Please select a  Meter Reading Unit!");
    return;
  }
  var sendData={}; 
  sendData.intSubmittedByUserID=localStorage.getItem("user_id");  
  sendData.intMeterReadingUnitsID=intMeterReadingUnitsID;  
  sendData.dblMeterReading=dblMeterReading;  
  sendData.intAssetID=assetId;   
  dispatch(addMetering(sendData));
  props.onCancel()
 
}
 return (
   <div>
      <Modal
      visible={visible}
      width={350}
      onClose={props.onCancel}     
      title={title}  
      onOk={onSaveMetering}
      onCancel={props.onCancel}
    >
    <div>
    <Form>
            <Fieldset>
             <Label>Asset</Label>
             <span>{assetName}</span>
            </Fieldset>
          <Fieldset>
            <Label>Meter Reading</Label>
            <Input
                label="Name"
                placeholder=""       
                value={dblMeterReading}  
                onChange={(event)=>setDblMeterReading(event.target.value)}    
            />
          </Fieldset>
          <Fieldset>
            <Label>Meter Reading Units</Label>
            <div style={{position:"relative"}}>
            <Input
                label="Facility"
                style={{width:"90%"}}
                value={meterReadingUntTxt}
                onChange={()=>setMeterReadingUnitModalActive(true)}
                placeholder=""             
            />
             <i
              className="ionicons ion-arrow-down-b"
              onClick={() => {
                setMeterReadingUnitModalActive(true);
              }}
              style={{ fontSize: "25px", cursor: "pointer" ,marginLeft:"3px"}}
            ></i>
            </div>
          </Fieldset>
        </Form>
    </div> 
      </Modal>
      <Modal
      visible={false}
      width={300}
      onClose={()=>{setMeterReadingUnitModalActive(false)}}     
      title="METER READING UNITS"  
      onOk={onSave}
      onCancel={()=>{setMeterReadingUnitModalActive(false)}}
    >
        <div>
        <Form>
          <Fieldset>
            <Label>Name</Label>
            <Input
                label="Name"
                placeholder=""       
                value={strName}  
                onChange={(event)=>setStrName(event.target.value)}
            />
          </Fieldset>
          <Fieldset>
            <Label>Description</Label>
            <Input
                label="Name"
                placeholder=""       
                value={strName}  
                onChange={(event)=>setStrName(event.target.value)}
            />
          </Fieldset>
        </Form>
        </div>
      </Modal>
      <MeterReadingUnitModal
        visible={meterReadingUnitModalActive}
        onCancel={handleCancel}
         title={"METER READING UNITS"}
         selectedMeterReadingUnit={selectedMeterReadingUnit}
      >

      </MeterReadingUnitModal>
  </div>
 )
}
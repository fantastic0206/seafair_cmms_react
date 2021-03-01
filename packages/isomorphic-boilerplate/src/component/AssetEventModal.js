import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
// import { Col, Row } from "antd";
import notification from '@iso/components/Notification';
import AssetEventTypesModal from './EventTypeModal';
import './table.css'
import {
  ActionBtn,
  Fieldset,
  Form,
  Label, 
} from './UsersContentModal.styles';

import AssetEventAction from "../redux/assetevent/actions";
export default function (props) {
  const {  visible,title,assetName,assetId} = props;   
  const { add } = AssetEventAction;
  const dispatch = useDispatch();
  // const [newModalActive, setNewModalActive] = React.useState(false);
  const [strName, setStrName]=React.useState('');
  const [strDescription, setStrDescription]=React.useState('');
  // const [dblMeterReading,setDblMeterReading]=React.useState('0.0');
  // const [intMeterReadingUnitsID,setIntMeterReadingUnitsID]=React.useState(null);
  const [assetEvemtTxt,setAssetEvemtTxt]=React.useState('');
  const [intAssetEventTypeID,setIntAssetEventTypeID]=React.useState(null);
  const [assetEventModalActive,setAssetEventModalActive]=React.useState(false);
  const [strAdditionalDescription,setStrAdditionalDescription]=React.useState('');
  
 React.useEffect(() => { 
  // dispatch(initData());
}, []);

 const onSave = () => {
  if(assetEvemtTxt==''){
    notification('info',"Please select a Asset Event Type.");
    return;
  }  
  if(strAdditionalDescription==''){
    notification('info',"Please put the additional description.");
    return;
  }  
  var sendData={}; 
  sendData.intAssetEventTypeID=intAssetEventTypeID;  
  sendData.intAssetID=assetId; 
  sendData.intSubmittedByUserID=localStorage.getItem("user_id");
  sendData.strAdditionalDescription=strAdditionalDescription;
  dispatch(add(sendData));// adding the meteriding unit
  props.onCancel();
}
const handleCancel=()=>{
  setAssetEventModalActive(false);
}
const selectedAssetEventType=(row)=>{
  setAssetEvemtTxt(row.strEventCode+"-"+row.strEventName);
  setIntAssetEventTypeID(row._id);
}

 return (
   <div>
      <Modal
      visible={visible}
      width={350}
      onClose={props.onCancel}     
      title={title}  
      onOk={onSave}
      onCancel={props.onCancel}
    >
    <div>
    <Form>
            <Fieldset>
             <Label>Asset</Label>
             <span>{assetName}</span>
            </Fieldset>
          
          <Fieldset>
            <Label>Asset Event Type</Label>
            <div style={{position:"relative"}}>
            <Input
                label="Facility"
                style={{width:"90%"}}
                value={assetEvemtTxt}
                onChange={()=>setAssetEventModalActive(true)}
                placeholder=""             
            />
             <i
              className="ionicons ion-arrow-down-b"
              onClick={() => {
                setAssetEventModalActive(true);
              }}
              style={{ fontSize: "25px", cursor: "pointer" ,marginLeft:"3px"}}
            ></i>
            </div>
          </Fieldset>

          <Fieldset>
            <Label>Additional Description</Label>          
            <Textarea
                  placeholder=""
                  value={strAdditionalDescription}
                  onChange={(event)=>{
                    setStrAdditionalDescription(event.target.value);
                   }}                   
                  row={8}
                  style={{ height: "100px"}}
                ></Textarea>
             
          </Fieldset>
        </Form>
    </div> 
      </Modal>      
      <AssetEventTypesModal
        visible={assetEventModalActive}
        onCancel={handleCancel}
         title={"ASSET EVENT TYPES"}
         selectedAssetEventType={selectedAssetEventType}
        //  selectedMeterReadingUnit={selectedMeterReadingUnit}
      >
      </AssetEventTypesModal>
  </div>
 )
}
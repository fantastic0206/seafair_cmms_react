import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';

import notification from '@iso/components/Notification';
import UsersContentModal from './UsersContentModal';

import './table.css'
import {
  Fieldset,
  Form,
  Label, 
} from './UsersContentModal.styles';

import AssetuserAction from "../redux/assetuser/actions";
export default function (props) {
  const {  visible,title,assetName,assetId,pageState,assetUserInf} = props;   
  const { add ,updateData} = AssetuserAction;
  const dispatch = useDispatch();
  const [intMeterReadingUnitsID,setIntMeterReadingUnitsID]=React.useState(null);
  const [userName,setUserName]=React.useState('');
  const [intUserID,setIntUserID]=React.useState(null);
  const [userModalActive,setUserModalActive]=React.useState(false);
  const [intAssetUserTypeID,setintAssetUserTypeID]=React.useState(0);
  
  
 React.useEffect(() => { 
  console.log(pageState);
  if(pageState=="edit"){
    setIntUserID(assetUserInf.intUserID._id);
    setintAssetUserTypeID(assetUserInf.intUserID.bolGroup?1:0);
    setUserName(assetUserInf.intUserID.bolGroup?"Any member of the '"+assetUserInf.intUserID.strFullName+"' grop":assetUserInf.intUserID.strFullName);
  }
}, [pageState,assetUserInf]);

const handleCancel=()=>{
  setUserModalActive(false);
}
const onSave=()=>{
  if(intUserID==null){
    notification('info',"Please select a  User");
    return;
  }

  var sendData={}; 
  sendData.intAssetUserTypeID=intAssetUserTypeID;    
  sendData.intUserID=intUserID;    
  sendData.intAssetID=assetId;   
  console.log(sendData);
  if(pageState=="edit"){
    dispatch(updateData(sendData,assetUserInf._id));
  }
  else{
    dispatch(add(sendData));
  }

  props.onCancel()
 
}
const selectedUser=(row)=>{ 
  setIntUserID(row._id);
  setintAssetUserTypeID(row.bolGroup?1:0);
  setUserName(row.bolGroup?"Any member of the '"+row.strFullName+"' grop":row.strFullName);
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
            <Label>User</Label>
            <div style={{position:"relative"}}>
            <Input
                label="Facility"
                style={{width:"90%"}}
                value={userName}
                onChange={()=>setUserModalActive(true)}
                placeholder=""             
            />
             <i
              className="ionicons ion-arrow-down-b"
              onClick={() => {
                setUserModalActive(true);
              }}
              style={{ fontSize: "25px", cursor: "pointer" ,marginLeft:"3px"}}
            ></i>
            </div>
          </Fieldset>
        </Form>
    </div> 
      </Modal>
     
        < UsersContentModal
        visible={userModalActive}
        title="Users"
        selectUser={selectedUser}
        onCancel={handleCancel}
      ></UsersContentModal>
  </div>
 )
}
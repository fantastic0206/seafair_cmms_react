import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import Button from "@iso/components/uielements/button";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import notification from '@iso/components/Notification';
import AssetCategoryModal from './AssetCategoryModal';
import AssetCategoryAction from "../redux/assetcategory/actions";
import { Col, Row } from "antd";
import {
  ActionBtn,
  Fieldset,
  Form,
  Label, 
} from './UsersContentModal.styles';

const { updateData,initData,deleteData } = AssetCategoryAction;
export default function (props) {
  const {  visible,title,assetName,assetId,selectedParentId,intSysCode} = props; 
  const dispatch = useDispatch();
  const { assetcategories, isDelete } = useSelector((state) => state.AssetCategory); 
  const [data, setData] = React.useState([]);
  const [assetCategoryActive, setAssetCategoryActive] = React.useState(false);
  const [currentModalActive,setCurrentModalActive] = React.useState(false);
  const [strName,setStrName]=React.useState('Asset Category #');
  const [parentText,setParentText]=React.useState('');
  const [parentId,setParentId]=React.useState('');
  
  React.useEffect(() => {   
    setCurrentModalActive(visible);  
  }, []);

  React.useEffect(()=>{
    setStrName(assetName);
    dispatch(initData());
   // parentText()
  },[assetName])
  React.useEffect(()=>{
    assetcategories.map((row)=>{      
      if(row._id==selectedParentId){
        setParentText(row.strName);
        setParentId(row._id);
      }
    })
  },[assetcategories])
  
 const handleCancel = () => {
    setAssetCategoryActive(false);
};
const selectedParent=(selectedId)=>{
  setParentText(selectedId.title);
  setParentId(selectedId._id);
  setAssetCategoryActive(false);  

};
const onSave = () => {  
 
  var sendData={};
  sendData.intParentID=parentId==''?0:parentId;
  sendData.strName=strName;   
  props.onCancel();
  dispatch(updateData(sendData,assetId));
  
}
const onDelete=(e)=>{
  if(intSysCode!=12){
    notification('error',"You cannot delete a system-level category.");
    return;  
  }
  dispatch(deleteData(assetId));
  props.onCancel();
  
}
 return (
   <div>
     <Modal
       visible={visible}
       width={350}
       okText="Save"
       title={title}    
       onOk={onSave}
       onCancel={props.onCancel}
       footer={null}
     >
       <div>
         <Form>
           <Fieldset>
             <Label>Name</Label>
             <Input label="Name"
              value={strName}
              onChange={(event)=>{setStrName(event.target.value)}}
             placeholder="" />
           </Fieldset>
           <Fieldset>
             <Label>Parent</Label>
             <div style={{ position: "relative" }}>
               <Input label="Parent" placeholder="" 
                value={parentText}
                onChange={()=>{setAssetCategoryActive(true)}}
               style={{width:"95%"}}/>
               <i
                 className="ionicons ion-arrow-down-b"
                 onClick={() => {                  
                   setAssetCategoryActive(true);
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
       </div>         
       <div style={{ marginTop: "25px",textAlign:'right' }}>
        <Button  onClick={onDelete} className="saveBtn" style={{marginRight:"6px"}}>
              <span>Delete</span>
        </Button>
        <Button  type="primary" onClick={onSave} className="saveBtn">
              <span>Save</span>
        </Button>
       </div>
       
     </Modal>
    <AssetCategoryModal
      visible={assetCategoryActive}
      selectedCategory={selectedParent}
      onCancel={handleCancel}
      title={'ASSET CATEGORIES'}
      onCancel={handleCancel}
    ></AssetCategoryModal>
   </div>
 );
}
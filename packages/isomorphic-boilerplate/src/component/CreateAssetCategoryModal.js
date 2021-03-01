import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import AssetCategoryModal from './AssetCategoryModal';
import AssetCategoryAction from "../redux/assetcategory/actions";
// import { Col, Row } from "antd";
// import notification from '@iso/components/Notification';
import {
  ActionBtn,
  Fieldset,
  Form,
  Label, 
} from './UsersContentModal.styles';

const { add } = AssetCategoryAction;
export default function (props) {
  const {  visible,title} = props; 
  const dispatch = useDispatch();
 
  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    marginTop:"-20px"
  };
  const [data, setData] = React.useState([]);
  const [assetCategoryActive, setAssetCategoryActive] = React.useState(false);
  const [currentModalActive,setCurrentModalActive] = React.useState(false);
  const [strName,setStrName]=React.useState('Asset Category #');
  const [parentText,setParentText]=React.useState('');
  const [parentId,setParentId]=React.useState('');
  React.useEffect(() => {   
    setCurrentModalActive(visible);
    console.log(visible);
  }, []);
 const handleCancel = () => {
    setAssetCategoryActive(false);
};
const selectedParent=(selectedId)=>{
  setParentText(selectedId.title);
  setParentId(selectedId._id);
  setAssetCategoryActive(false);
  console.log(selectedId,'selectedId');

};
const onSave = () => {  
  // if(parentId==''){
  //   notification('info',"Please put the Parent!");
  //   return;
  // }
  
  var sendData={};
  sendData.intParentID=parentId==''?0:parentId;
  sendData.strName=strName;  
  props.onCancel(); 
  dispatch(add(sendData));
  
}
 return (
   <div>
     <Modal
       visible={visible}
       onClose={props.onCancel}
       okText="Save"
       title={title}    
       onOk={onSave}
       onCancel={props.onCancel}
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
       <div style={{ marginTop: "3px" }}></div>
     </Modal>
    <AssetCategoryModal
      visible={assetCategoryActive}
      selectedCategory={selectedParent}
      parentKind={"Assets"}
      onCancel={handleCancel}
      title={'ASSET CATEGORIES'}
      onCancel={handleCancel}
    ></AssetCategoryModal>
   </div>
 );
}
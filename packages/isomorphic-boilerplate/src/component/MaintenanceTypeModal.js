import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import Select, { SelectOption } from '@iso/components/uielements/select';
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row } from "antd";
import ContentHolder from '@iso/components/utility/contentHolder';
import notification from '@iso/components/Notification';

import './table.css'
// import {
//   ActionBtn,
//   Fieldset,
//   Form,
//   Label, 
// } from './UsersContentModal.styles';
// import WorkOrderStatusAction from "../redux/workorderstatus/actions";


const Option = SelectOption;
export default function (props) {
  const {  visible,title} = props; 
  React.useEffect(() => {
  }, [visible]);

  const [data, setData] = React.useState([]);
  const [newModalActive, setNewModalActive] = React.useState(false);

  // const { add,initData } = WorkOrderStatusAction;
  const dispatch = useDispatch();
  // const { status } = useSelector((state) => state.WorkOrderStatus);
  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
  };

//  const onSave = () => {
//   if(strName==''){
//     console.log(controlVal['pig'],controlVal)
//     notification('info',"Please put the Name!");
//     return;
//   }  
//   var sendData={}; 
//   sendData.strName=strName;  
//   sendData.intControlID=intControlID;  
//   setNewModalActive(false);
//   // dispatch(add(sendData));
  
// }
const onRowClick=(id,str)=>{
  // console.log(id,str,'pp')
  props.selectMaintenanceType(id,str);
  props.onCancel();
 
}
 return (
   <div>
     <Modal
       visible={visible}
       onClose={props.onCancel}
       okText="New"
       footer={null}
       title={title}
       onOk={() => {
         setNewModalActive(true);
       }}
       onCancel={props.onCancel}
     >
       <div>
         <Row style={rowStyle} gutter={16} justify="start">
           <Col md={12} sm={12} xs={24}></Col>
           <Col md={12} sm={12} xs={24}>
             <InputSearch
               placeholder="input search text"
               // value={category}
               // onChange={onCategorySearchChange}
               style={{ width: "100%" }}
             />
           </Col>
         </Row>
       </div>
       <div style={{ marginTop: "3px", height: "200px" ,    overflow: "auto"}}>
         <table>
           <thead>
             <tr>
               <th style={{ width: "50%" }}>
                 <span className="listHeaderLabel35">Name</span>
               </th>
               <th style={{ width: "50%" }}>
                 <span className="listHeaderLabel35">Description</span>
               </th>
               <th>
                 <span className="listHeaderLabel35">Color</span>
               </th>
             </tr>
           </thead>

           <tbody>
             <tr
               className="listRow"
               key="1"
               onClick={() => {
                 onRowClick(1,"Preventive");
               }}
             >
               <td className="column">
                 <p className="context">Preventive</p>
               </td>
               <td className="column">
                 <p className="context">Preventive</p>
               </td>
               <td className="column">
                 <div className="calor_pattern_1">
                   <p className="context">2d61ae</p>
                 </div>
               </td>
             </tr>
             <tr
               className="listRow"
               key="2"
               onClick={() => {
                 onRowClick(2,"Damage");
               }}
             >
               <td className="column">
                 <p className="context">Damage</p>
               </td>
               <td className="column">
                 <p className="context">Damage</p>
               </td>
               <td className="column">
                 <div className="calor_pattern_2">
                   <p className="context">cc4140</p>
                 </div>
               </td>
             </tr>
             <tr
               className="listRow"
               key="3"
               onClick={() => {
                 onRowClick(3,"Corrective");
               }}
             >
               <td className="column">
                 <p className="context">Corrective</p>
               </td>
               <td className="column">
                 <p className="context">Corrective</p>
               </td>
               <td className="column">
                 <div className="calor_pattern_3">
                   <p className="context">74bc50</p>
                 </div>
               </td>
             </tr>
             <tr
               className="listRow"
               key="4"
               onClick={() => {
                 onRowClick(4,"Safety");
               }}
             >
               <td className="column">
                 <p className="context">Safety</p>
               </td>
               <td className="column">
                 <p className="context">Safety</p>
               </td>
               <td className="column">
                 <div className="calor_pattern_4">
                   <p className="context">FF9900</p>
                 </div>
               </td>
             </tr>
             <tr
               className="listRow"
               key="5"
               onClick={() => {
                 onRowClick(5,"Upgrade");
               }}
             >
               <td className="column">
                 <p className="context">Upgrade</p>
               </td>
               <td className="column">
                 <p className="context">Upgrade</p>
               </td>
               <td className="column">
                 <div className="calor_pattern_5">
                   <p className="context">6fae9c</p>
                 </div>
               </td>
             </tr>
             <tr
               className="listRow"
               key="6"
               onClick={() => {
                 onRowClick(6,"Electrical");
               }}
             >
               <td className="column">
                 <p className="context">Electrical</p>
               </td>
               <td className="column">
                 <p className="context">Electrical</p>
               </td>
               <td className="column">
                 <div className="calor_pattern_6">
                   <p className="context">d2ca4e</p>
                 </div>
               </td>
             </tr>
             <tr
               className="listRow"
               key="7"
               onClick={() => {
                 onRowClick(7,"Project");
               }}
             >
               <td className="column">
                 <p className="context">Project</p>
               </td>
               <td className="column">
                 <p className="context">Project</p>
               </td>
               <td className="column">
                 <div className="calor_pattern_7">
                   <p className="context">967855</p>
                 </div>
               </td>
             </tr>
             <tr
               className="listRow"
               key="8"
               onClick={() => {
                 onRowClick(8,"Inspection");
               }}
             >
               <td className="column">
                 <p className="context">Inspection</p>
               </td>
               <td className="column">
                 <p className="context">Inspection</p>
               </td>
               <td className="column">
                 <div className="calor_pattern_8">
                   <p className="context">638582</p>
                 </div>
               </td>
             </tr>
             <tr
               className="listRow"
               key="9"
               onClick={() => {
                 onRowClick(9,"Meter reading");
               }}
             >
               <td className="column">
                 <p className="context">Meter reading</p>
               </td>
               <td className="column">
                 <p className="context">Meter reading</p>
               </td>
               <td className="column">
                 <div className="calor_pattern_9">
                   <p className="context">7F7F7F</p>
                 </div>
               </td>
             </tr>
             <tr
               className="listRow"
               key="10"
               onClick={() => {
                 onRowClick(10,"Other");
               }}
             >
               <td className="column">
                 <p className="context">Other</p>
               </td>
               <td className="column">
                 <p className="context">Other</p>
               </td>
               <td className="column">
                 <div className="calor_pattern_10">
                   <p className="context">d36e87</p>
                 </div>
               </td>
             </tr>
           </tbody>
         </table>
       </div>
     </Modal>
     {/* <Modal
      visible={newModalActive}
      width={350}
      onClose={()=>{setNewModalActive(false)}}     
      title="WORK ORDER STATUS"  
      onOk={onSave}
      onCancel={()=>{setNewModalActive(false)}}
    >
        
        <Form>
          <Fieldset>
           
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={17} sm={17} xs={24} >
              <Label>Name</Label>
              <Input
                label="Name"
                placeholder=""       
                value={strName}  
                onChange={(event)=>setStrName(event.target.value)}    
            />
                </Col>
                <Col md={7} sm={7} xs={24} >
                      <Label>Control</Label>
                    <Select
                      defaultValue={intControlID}
                      onChange={(event)=>{setIntControlID(event)}}
                      // style={{ width: '120px' }}
                    >
                         <Option value="100">Pending</Option> 
                        <Option value="102">Closed</Option>
                        <Option value="101">Active</Option>
                        <Option value="103">Draft</Option>
                    </Select>
                  
                </Col>
            </Row>
          </Fieldset>          
        </Form>
      </Modal> */}
   </div>
 );
}
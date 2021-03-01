import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import Select, { SelectOption } from '@iso/components/uielements/select';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row } from "antd";
// import ContentHolder from '@iso/components/utility/contentHolder';
// import notification from '@iso/components/Notification';

import './table.css'
// import {
//   ActionBtn,
//   Fieldset,
//   Form,
//   Label, 
// } from './UsersContentModal.styles';


const Option = SelectOption;
export default function (props) {
  const {  visible,title} = props; 
  React.useEffect(() => {
  }, [visible]);

  // const [data, setData] = React.useState([]);
  const [newModalActive, setNewModalActive] = React.useState(false);
  // const [strName, setStrName]=React.useState('');
  // const [intControlID,setIntControlID]=React.useState('100');
  // const [strDescription, setStrDescription]=React.useState('');
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
  props.selectedPriority(id,str);
  props.onCancel();
 
}
 return (
   <div>
     <Modal
       visible={visible}
       onClose={props.onCancel}
      //  okText="New"
       title={title}
       footer={null}
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
       <div style={{ marginTop: "3px", height: "170px" }}>
         <table>
           <thead>
             <tr>
               <th style={{ width: "40%" }}>
                 <span className="listHeaderLabel35">Name</span>
               </th>
               <th style={{ width: "40%" }}>
                 <span className="listHeaderLabel35">Description</span>
               </th>              
             </tr>
           </thead>

           <tbody>
             <tr
               className="listRow"
               key="1"
               onClick={() => {
                 onRowClick(1,"Highest");
               }}
             >
               <td className="column">
                 <p className="context">Highest</p>
               </td>
               <td className="column">
                 <p className="context"></p>
               </td>               
             </tr>
             <tr
               className="listRow"
               key="2"
               onClick={() => {
                 onRowClick(2,"High");
               }}
             >
               <td className="column">
                 <p className="context">High</p>
               </td>
               <td className="column">
                 <p className="context"></p>
               </td>              
             </tr>
             <tr
               className="listRow"
               key="3"
               onClick={() => {
                 onRowClick(3,"Medium");
               }}
             >
               <td className="column">
                 <p className="context">Medium</p>
               </td>
               <td className="column">
                 <p className="context"></p>
               </td>               
             </tr>
             <tr
               className="listRow"
               key="4"
               onClick={() => {
                 onRowClick(4,"Low");
               }}
             >
               <td className="column">
                 <p className="context">Low</p>
               </td>
               <td className="column">
                 <p className="context"></p>
               </td>               
             </tr>
             <tr
               className="listRow"
               key="5"
               onClick={() => {
                 onRowClick(5,"Lowest");
               }}
             >
               <td className="column">
                 <p className="context">Lowest</p>
               </td>
               <td className="column">
                 <p className="context"></p>
               </td>              
             </tr>
           </tbody>
         </table>
       </div>
     </Modal>
    
   </div>
 );
}
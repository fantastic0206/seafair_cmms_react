import React from 'react';
import { useDispatch } from 'react-redux';
// import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
// import Select, { SelectOption } from '@iso/components/uielements/select';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
// import { Col, Row } from "antd";

import './table.css'

export default function (props) {
  const {  visible,title} = props;  

  // const dispatch = useDispatch();
  const frequencyList=["Weekly","Monthly","Bimonthly","Trimonthly","Quarterly","Biannual","Annual","Random"];
  // const rowStyle = {
  //   width: "100%",
  //   display: "flex",
  //   flexFlow: "row wrap",
  // };

const onRowClick=(id,str)=>{
  props.selectedFrequency(id,str);
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
       onCancel={props.onCancel}
     >
       <div>
         {/* <Row style={rowStyle} gutter={16} justify="start">
           <Col md={12} sm={12} xs={24}></Col>
           <Col md={12} sm={12} xs={24}>
             <InputSearch
               placeholder="input search text"
               // value={category}
               // onChange={onCategorySearchChange}
               style={{ width: "100%" }}
             />
           </Col>
         </Row> */}
       </div>
       <div style={{ marginTop: "3px", height: "200px",overflow:"auto" }}>
         <table>
           <thead>
             <tr>
               <th style={{ width: "70%" }}>
                 <span className="listHeaderLabel35">Name</span>
               </th>
               <th style={{ width: "*" }}>
                 <span className="listHeaderLabel35"></span>
               </th>              
             </tr>
           </thead>

           <tbody>
           {          
              frequencyList.map((value,index)=>{
                return  <tr
                  className="listRow"
                  key={index}
                  onClick={() => {
                    onRowClick(index,value);
                  }}
                >
                  <td className="column">
                   <p className="context">{value}</p>
                  </td>
                  <td className="column">
                    <p className="context"></p>
                  </td>               
                </tr>    
              })
            } 
           </tbody>
         </table>
       </div>
     </Modal>
     
   </div>
 );
}
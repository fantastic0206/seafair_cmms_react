import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row } from "antd";
import notification from '@iso/components/Notification';
import './table.css'
import {
  ActionBtn,
  Fieldset,
  Form,
  Label, 
} from './UsersContentModal.styles';
import StatusAction from "../redux/status/actions";
export default function (props) {
  const {  visible,title} = props; 
  React.useEffect(() => {
  }, [visible]);
  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    marginTop:"-20px",
    background: "#e0e7ed",
    marginLeft:'2px'
  };
  const [data, setData] = React.useState([]);
  const [newModalActive, setNewModalActive] = React.useState(false);
  const [strName, setStrName]=React.useState('');
  const [strDescription, setStrDescription]=React.useState('');
  const { add,initData } = StatusAction;
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.Status);
  
//  React.useEffect(() => { 
//    dispatch(initData());
// }, []);

//  const onSave = () => {
//   if(strName==''){
//     notification('info',"Please put the Name!");
//     return;
//   }  
//   var sendData={}; 
//   sendData.strName=strName;  
//   sendData.strDescription=strDescription;  
//   setNewModalActive(false);
//   dispatch(add(sendData));
  
// }
const onRowClick=(row)=>{
  props.selectedBusinessType(row);
  props.onCancel();
 
}
 return (
   <div>
      <Modal
      visible={visible}
      onClose={props.onCancel}
      okText="New"
      title={title}  
      footer={null}
      onCancel={props.onCancel}
    >
    <div>
      <Row style={rowStyle} gutter={16} justify="start">
          <Col md={12} sm={12} xs={24} >         
            
          </Col>
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
    <div style={{marginTop:"3px",height:"170px"}}>
      <table  >
        <thead>
          <tr>
            <th style={{width:"50%"}} ><span className="listHeaderLabel35">Name</span></th>
            <th><span className="listHeaderLabel35">Relation Type</span></th>
          </tr>
        </thead>

        <tbody>
       
                 <tr className="listRow" key={1} onClick={()=>{onRowClick(1)}}>
                      <td className="column"><p className="context">Supplier</p></td>
                      <td className="column"><p className="context">Vendor</p></td>
                  </tr>
                  <tr className="listRow" key={2} onClick={()=>{onRowClick(2)}}>
                      <td className="column"><p className="context">Manufacture</p></td>
                      <td className="column"><p className="context">Vendor</p></td>
                  </tr>
                  <tr className="listRow" key={3} onClick={()=>{onRowClick(3)}}>
                      <td className="column"><p className="context">Service Provider</p></td>
                      <td className="column"><p className="context">Vendor</p></td>
                  </tr>
                  <tr className="listRow" key={4} onClick={()=>{onRowClick(4)}}>
                      <td className="column"><p className="context">Owner</p></td>
                      <td className="column"><p className="context">Customer</p></td>
                  </tr>
                  <tr className="listRow" key={5} onClick={()=>{onRowClick(5)}}>
                      <td className="column"><p className="context">Customer</p></td>
                      <td className="column"><p className="context">Customer</p></td>
                  </tr>
             
          
        </tbody>
        
      </table>     
      </div>
      </Modal>
      
  </div>
 )
}
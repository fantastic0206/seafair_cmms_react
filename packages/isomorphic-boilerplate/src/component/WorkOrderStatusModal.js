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
import {
  ActionBtn,
  Fieldset,
  Form,
  Label, 
} from './UsersContentModal.styles';
import WorkOrderStatusAction from "../redux/workorderstatus/actions";
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginTop:"-20px"
};
var controlVal={
  101:"Active",
  102:"Closed",
  103:"Draft",
  100:"Pending",
}
const Option = SelectOption;
export default function (props) {
  const {  visible,title} = props; 
  React.useEffect(() => {
  }, [visible]);

  const [data, setData] = React.useState([]);
  const [newModalActive, setNewModalActive] = React.useState(false);
  const [strName, setStrName]=React.useState('');
  const [intControlID,setIntControlID]=React.useState('100');
  const [strDescription, setStrDescription]=React.useState('');
  const { add,initData } = WorkOrderStatusAction;
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.WorkOrderStatus);
  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
  };
 React.useEffect(() => { 
   dispatch(initData());
}, []);

 const onSave = () => {
  if(strName==''){
    console.log(controlVal['pig'],controlVal)
    notification('info',"Please put the Name!");
    return;
  }  
  var sendData={}; 
  sendData.strName=strName;  
  sendData.intControlID=intControlID;  
  if(strName=="Requested"){
    sendData.intSysCode=2;    
  }
  else if(strName=="Assigned"){
    sendData.intSysCode=3;   
  }
  else if(strName=="Open"){
    sendData.intSysCode=4;   
  }
  else if(strName=="Work In Progress"){
    sendData.intSysCode=5;   
  }
  else if(strName=="On Hold"){
    sendData.intSysCode=6;   
  }
  else if(strName=="Closed, Completed"){
    sendData.intSysCode=7;   
  }
  else if(strName=="Draft"){
    sendData.intSysCode=8;   
  }
  else if(strName=="Closed, Incomplete"){
    sendData.intSysCode=9;
  }
  else {
    sendData.intSysCode=10;
  }
  setNewModalActive(false);
  dispatch(add(sendData));
  
}
const onRowClick=(row)=>{
  props.selectStatus(row);
  props.onCancel();
 
}
 return (
  <div>
    <Modal
    visible={visible}
    onClose={props.onCancel}
    okText="New"
    title={title}  
    onOk={() =>{setNewModalActive(true)}}
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
    <div style={{marginTop:"3px",height:"170px",overflow:'auto'}}>
      <table  >
        <thead>
          <tr>
            <th style={{width:"50%"}} ><span className="listHeaderLabel35">Name</span></th>
            <th><span className="listHeaderLabel35">Description</span></th>
          </tr>
        </thead>

        <tbody>
          {
            status.length!=0?
              status.map((row)=>{
                return <tr className="listRow" key={row.key} onClick={()=>{onRowClick(row)}}>
                      <td className="column"><p className="context">{row.strName}</p></td>
                      <td className="column"><p className="context">{controlVal[row.intControlID]}</p></td>
                    </tr>
              })
              :<tr ><td style={{textAlign:"center",fontSize:"14px"}} colSpan="2">No Data!</td></tr>
          
          }
          
          
        </tbody>
        
      </table>
      {/* <TableWrapper
              // rowSelection={rowSelection}
              dataSource={status}
              columns={columns}
              pagination={false}
              className="isoGroupTable"
            /> */}
      </div>
      </Modal>
      <Modal
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
      </Modal>
  </div>
 )
}
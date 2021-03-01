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
import EventTypeAction from "../redux/eventtype/actions";
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginTop:"-20px",
  marginLeft:"2px",
  background: "#e0e7ed",
}; 
export default function (props) {
  const {  visible,title} = props; 
  const dispatch = useDispatch();
  const { add,initData } = EventTypeAction;
   const [newModalActive, setNewModalActive] = React.useState(false);
  const [strEventCode , setStrEventCode]=React.useState('AE ');
  const [strEventDescription , setStrEventDescription]=React.useState('');
  const [strEventName , setStrEventName]=React.useState('New Asset Event Type #');
  const { eventTypes } = useSelector((state) => state.EventType);
  React.useEffect(() => {
    dispatch(initData());
  }, []);
  const onSave = () => {
    if(strEventCode==''){
      notification('info',"Please put the code!");
      return;
    }  
    var sendData={}; 
    sendData.strEventCode=strEventCode;  
    sendData.strEventDescription=strEventDescription;
    sendData.strEventName=strEventName;  
    setNewModalActive(false);
    dispatch(add(sendData));
    
  }
  const onRowClick=(row)=>{
    props.selectedAssetEventType(row);
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
    <div style={{marginTop:"3px",height:"190px"}}>
      {/* <TableWrapper
              // rowSelection={rowSelection}
              dataSource={data}
              columns={columns}
              pagination={false}
              className="isoGroupTable"
            /> */}
      <table style={{overflow:'auto'}} >
        <thead>
          <tr>
            <th style={{width:"25%"}} ><span className="listHeaderLabel35">Event Code</span></th>
            <th style={{width:"28%"}} ><span className="listHeaderLabel35">Event Name</span></th>
            <th><span className="listHeaderLabel35">Description</span></th>
          </tr>
        </thead>

        <tbody>
       {
            eventTypes.length!=0?
              eventTypes.map((row)=>{
                return <tr className="listRow" key={row.key} onClick={()=>{onRowClick(row)}}>
                      <td className="column"><p className="context">{row.strEventCode}</p></td>
                      <td className="column"><p className="context">{row.strEventName}</p></td>
                      <td className="column"><p className="context">{row.strEventDescription}</p></td>
                    </tr>
              })
              :<tr ><td style={{textAlign:"center",fontSize:"14px"}} colSpan="2">No Data!</td></tr>
          
          }       
        </tbody>
        
      </table>
      </div>
      </Modal>
      <Modal
      visible={newModalActive}
      
      title="ASSET EVENT TYPE"  
      onOk={onSave}
      onCancel={()=>{setNewModalActive(false)}}
    >
        <Form>
          <Fieldset>
            <Label>Event Code</Label>
            <Input
                label="Event Code"
                placeholder=""   
                value={strEventCode}
                onChange={(event)=>{setStrEventCode(event.target.value)}}                 
            />
          </Fieldset>
          <Fieldset>
            <Label>Event Name</Label>
            <Input
                label="Event Name"
                placeholder=""    
                value={strEventName} 
                onChange={(event)=>{setStrEventName(event.target.value)}}        
            />
          </Fieldset>
          <Fieldset>
            <Label>Description</Label>
            <Textarea
                  label="Description"
                  placeholder=""
                  rows={4}
                  value={strEventDescription}
                 onChange={(event)=>{setStrEventDescription(event.target.value)}}
                />
          </Fieldset>
        </Form>
      </Modal>
  </div>
 )
}
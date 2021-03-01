import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import Select, { SelectOption } from '@iso/components/uielements/select';
import { Col, Row } from "antd";
import notification from '@iso/components/Notification';
import './table.css'
import {
  ActionBtn,
  Fieldset,
  Form,
  Label, 
} from './UsersContentModal.styles';
import MeterReadingAction from "../redux/meterreading/actions";
const Option = SelectOption;
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
  const { add,initData } = MeterReadingAction;
  const dispatch = useDispatch();
  const { meterreadingunits ,isDelete} = useSelector((state) => state.MeterReading);
  // const { status } = useSelector((state) => state.Status);
  const [newModalActive, setNewModalActive] = React.useState(false);
  const [strName, setStrName]=React.useState('New Meter Reading Unit #');
  const [strSymbol,setStrSymbol]=React.useState('?');
  const [intPrecision,setIntPrecision]=React.useState(2);

 React.useEffect(() => { 
   dispatch(initData());
}, []);

 const onSave = () => {
  if(strName==''){
    notification('info',"Please put the Name!");
    return;
  }  
  var sendData={}; 
  sendData.strName=strName;  
  sendData.strSymbol=strSymbol;  
  sendData.intPrecision=intPrecision;  
  setNewModalActive(false);
  dispatch(add(sendData));
  
}
const onRowClick=(row)=>{
  props.selectedMeterReadingUnit(row);
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
    <div style={{marginTop:"3px",height:"170px"}}>
      <table  >
        <thead>
          <tr>
            <th style={{width:"30%"}} ><span className="listHeaderLabel35">Symbol</span></th>
            <th><span className="listHeaderLabel35">Name</span></th>
          </tr>
        </thead>

        <tbody>
        {
            meterreadingunits.length!=0?
            meterreadingunits.map((row)=>{
                return <tr className="listRow" key={row.key} onClick={()=>{onRowClick(row)}}>                    
                      <td className="column"><p className="context">{row.strSymbol}</p></td>
                      <td className="column"><p className="context">{row.strName}</p></td>
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
      width={300}
      onClose={()=>{setNewModalActive(false)}}     
      title="MTER READING UNIT"  
      onOk={onSave}
      onCancel={()=>{setNewModalActive(false)}}
    >
        <Form>
          <Fieldset>
            <Label>Name</Label>
            <Input
                label="Name"
                placeholder=""       
                value={strName}  
                onChange={(event)=>setStrName(event.target.value)}    
            />
          </Fieldset>
          <Fieldset>
            <Label>Symbol</Label>
            <Input
                label="Name"
                placeholder=""       
                value={strSymbol}  
                onChange={(event)=>setStrSymbol(event.target.value)}    
            />
          </Fieldset>
          <Fieldset>
            <Label>Precision</Label>
            <Select defaultValue="2" style={{width:"50%"}} onChange={(value)=>{setIntPrecision(value);}}>
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                  
            </Select>
          </Fieldset>
        </Form>
      </Modal>
  </div>
 )
}
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import notification from '@iso/components/Notification';
import { Col, Row } from "antd";
import './table.css'
import {
  ActionBtn,
  Fieldset,
  Form,
  Label, 
} from './UsersContentModal.styles';
import AccountAction from "../redux/account/actions";
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
    height: "38px",
    borderBottom: "1px solid rgb(174,193,208)",
    paddingTop:'2px',
    marginLeft:'2px'
  }; 
  const { add,initData } = AccountAction;
  const dispatch = useDispatch();
  const [newModalActive, setNewModalActive] = React.useState(false);
  const [strCode,setStrCode]=React.useState('');
  const [strDescription,setStrDescription]=React.useState('');
  const { accounts } = useSelector((state) => state.Account);

 const onSave = () => {
  if(strCode==''){
    notification('info',"Please put the code!");
    return;
  }  
  var sendData={}; 
  sendData.strCode=strCode;  
  sendData.strDescription=strDescription;  
  setNewModalActive(false);
  dispatch(add(sendData));  
} 
React.useEffect(() => { 
  dispatch(initData());
}, [visible]);
const onRowClick=(row)=>{
  props.selectedAccount(row);
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
    <div style={{marginTop:"3px",height:"200px"}}>     
     <table>
        <thead>
          <tr>
            <th style={{width:"30%"}} ><span className="listHeaderLabel35">Code</span></th>
            <th><span className="listHeaderLabel35">Description</span></th>
          </tr>
        </thead>

        <tbody>
        {
            accounts.length!=0?
              accounts.map((row)=>{
                return <tr className="listRow" key={row.key} onClick={()=>{onRowClick(row)}}>
                      <td className="column"><p className="context">{row.strCode}</p></td>
                      <td className="column"><p className="context">{row.strDescription}</p></td>
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
      onClose={()=>{setNewModalActive(false)}}     
      title="ACCOUNT"  
      width={300}
      onOk={onSave}
      onCancel={()=>{setNewModalActive(false)}}
    >
        <Form>
          <Fieldset>
            <Label>Code</Label>
            <Input
                label="Code"
                onChange={(event)=>setStrCode(event.target.value)}
                placeholder=""             
            />
          </Fieldset>
          <Fieldset>
            <Label>Description</Label>
            <Textarea
                  label="Description"
                  placeholder=""
                  rows={2}
                  onChange={(event)=>setStrDescription(event.target.value)}
                />
          </Fieldset>
        </Form>
      </Modal>
  </div>
 )
}
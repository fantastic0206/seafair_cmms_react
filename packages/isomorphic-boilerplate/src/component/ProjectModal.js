import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row } from "antd";
import notification from '@iso/components/Notification';
import './table.css'
import {
  // ActionBtn,
  Fieldset,
  Form,
  Label, 
} from './UsersContentModal.styles';
import ProjectAction from "../redux/project/actions";
export default function (props) {
  const {  visible,title} = props; 
  React.useEffect(() => {
  }, [visible]);
  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    marginTop:"-20px"
  };
  const [data, setData] = React.useState([]);
  const [newModalActive, setNewModalActive] = React.useState(false);
  const [strName, setStrName]=React.useState('');
  const [strDescription, setStrDescription]=React.useState('');
  const { add,initData } = ProjectAction;
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.Project);
  
 React.useEffect(() => { 
   dispatch(initData());
}, [visible]);

 const onSave = () => {
  if(strName==''){
    notification('info',"Please put the Name!");
    return;
  }  
  var sendData={}; 
  sendData.strName=strName;  
  sendData.strDescription=strDescription;  
  setNewModalActive(false);
  dispatch(add(sendData));
  
}
const onRowClick=(row)=>{
  props.selectProject(row);
  props.onCancel();
 
}
 return (
   <div>
      <Modal
      visible={visible}
      onClose={props.onCancel}
      // okText="New"
      title={title}  
      footer={null}
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
            <th style={{width:"50%"}} ><span className="listHeaderLabel35">Name</span></th>
            <th><span className="listHeaderLabel35">Description</span></th>
          </tr>
        </thead>

        <tbody>
        {
            projects.length!=0?
            projects.map((row)=>{
                return <tr className="listRow" key={row.key} onClick={()=>{onRowClick(row)}}>
                      <td className="column"><p className="context">{row.strName}</p></td>
                      <td className="column"><p className="context">{row.strDescription}</p></td>
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
      title="REASON TO SET ASSET ONLINE"  
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
            <Label>Description</Label>
            <Textarea
                  label="Description"
                  placeholder=""
                  rows={4}
                  value={strDescription}  
                  onChange={(event)=>setStrDescription(event.target.value)}   
                />
          </Fieldset>
        </Form>
      </Modal>
  </div>
 )
}
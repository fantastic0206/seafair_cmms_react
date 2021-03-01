import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import Select, { SelectOption } from '@iso/components/uielements/select';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
// import { Col, Row } from "antd";
// import ContentHolder from '@iso/components/utility/contentHolder';
// import notification from '@iso/components/Notification';

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
 
const onRowClick=(row)=>{
  props.selectStatus(row);
  props.onCancel();
 
}
 return (
  <div>
    <Modal
    visible={visible}
    onClose={props.onCancel}
    footer={null}
    title={title}  
    onCancel={props.onCancel}
    >
    {/* <div>
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
    </div> */}
    <div style={{marginTop:"3px",height:"170px",overflow:'auto'}}>
      <table  >
        <thead>
          <tr>
            <th style={{width:"50%"}} ><span className="listHeaderLabel35">Built-in filters</span></th>           
          </tr>
        </thead>
        <tbody>
              <tr className="listRow" key={1} onClick={()=>{onRowClick({strName:"All Open Work Orders",intSysCode:"open"})}}>
                  <td className="column"><p className="context">All Open Work Orders</p></td>                      
              </tr>              
          {            
              status.map((row)=>{
                if(row.intSysCode!=7 && row.intSysCode!=9)
                return <tr className="listRow" key={row.key} onClick={()=>{onRowClick(row)}}>
                      <td className="column"><p className="context">{row.strName}</p></td>                     
                    </tr>
              })
          }  
           <tr className="listRow" key={112} onClick={()=>{onRowClick({strName:"All Closed",intSysCode:"closed"})}}>
                  <td className="column"><p className="context">All Closed</p></td>                      
          </tr>
          <tr className="listRow" key={113} onClick={()=>{onRowClick({strName:"Closed Complete",intSysCode:7})}}>
                  <td className="column"><p className="context">Closed Complete</p></td>                      
           </tr>  
           <tr className="listRow" key={114} onClick={()=>{onRowClick({strName:"Closed Incomplete",intSysCode:9})}}>
                  <td className="column"><p className="context">Closed Incomplete</p></td>                      
           </tr>        
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
  </div>
 )
}
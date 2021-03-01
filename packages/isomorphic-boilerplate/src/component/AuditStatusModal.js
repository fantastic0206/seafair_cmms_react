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
  const dispatch = useDispatch();
  const [status, setStatus]=React.useState([]);
  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
  };
 React.useEffect(() => { 
  let status = [
    {
      "key": "1",
      "strName":"inspection",
      "strDescription":"audit inspection"
    },
    {
      "key": "2",
      "strName":"audit",
      "strDescription":"runing audit"
    },
    {
      "key": "3",
      "strName":"NCR",
      "strDescription":"Non conformity report"
    },
    {
      "key": "4",
      "strName":"complete",
      "strDescription":"audit complete"
    },
  ];
  setStatus(status);
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
    // okText="New"
    title={title}  
    onOk={() =>{props.onCancel()}}
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
      
  </div>
 )
}
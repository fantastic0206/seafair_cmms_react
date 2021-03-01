import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import Actions from "../redux/workorder/actions";
import { Col, Row } from "antd";
import './table.css'
// import {
//   ActionBtn,
//   Fieldset,
//   Form,
//   Label, 
// } from './UsersContentModal.styles';
const { initData, deleteData } = Actions;
const priority={
  1:"Hightest",2:"High",3:"Medium",4:"Low",5:"Lowest"
}
const workorderStatus_array={
  2:"Requested",3:"Assigned",4:"Open",
  5:"Work In Progress",
  6:"On Hold",
  7:"Closed, Completed",
  8:"Draft",
  9:"Closed, Incomplete",
  10:"Other"
}
const maintanceType_color_array={
  1:"#2d61ae",
  2:"#cc4140",
  3:"#74bc50",
  4:"#FF9900",
  5:"#6fae9c",
  6:"#d2ca4e",
  7:"#967855",
  8:"#638582",
  9:"#7F7F7F",
  10:"#d36e87",
}
const maintanceType_array={
  1:"Preventive",
  2:"Damage",
  3:"Corrective",
  4:"Safety",
  5:"Upgrade",
  6:"Electrical",
  7:"Project",
  8:"Inspection",
  9:"Meter_Reading",
  10:"Other",
}
export default function (props) {
  const {  visible,title} = props; 
  const dispatch = useDispatch();
  const { workorders, isDelete } = useSelector((state) => state.Workorders);

  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    marginTop:"-20px",
    background: "#e0e7ed",
    height: "38px",
    marginLeft:"2px",
    borderBottom: "1px solid rgb(174,193,208)"
  };
  const [data, setData] = React.useState([]);
  const [newModalActive, setNewModalActive] = React.useState(false);

 React.useEffect(() => {
  'this is modal'   
   dispatch(initData());
}, []);
const onRowClick=(row)=>{
  props.selectedWorkOrder(row);
  props.onCancel();
  console.log(row);
}
 return (
   <div>
      <Modal
      visible={visible}
      onClose={props.onCancel}
      okText="New"
      title={title}  
      width={window.innerWidth-200}
      onOk={() =>{setNewModalActive(true)}}
      onCancel={props.onCancel}
      footer={null}
    >
    <div>
      <Row style={rowStyle} gutter={16} justify="start">
          <Col md={20} sm={20} xs={24} >         
            
          </Col>
          <Col md={4} sm={4} xs={24}>
          <InputSearch
                placeholder="input search text"
                // value={category}
                // onChange={onCategorySearchChange}            
                style={{ width: "100%" }}
              />
          </Col>
      </Row>
    </div>
    <div style={{marginTop:"3px",height:"250px"}}>
      <table style={{overflow:"auto"}} >
        <thead>
          <tr>
            <th  ><span className="listHeaderLabel35">Code</span></th>
            <th style={{width:"20%"}}><span className="listHeaderLabel35">Description</span></th>
            <th><span className="listHeaderLabel35">Priority</span></th>
            <th><span className="listHeaderLabel35">Assets</span></th>
            <th><span className="listHeaderLabel35">Assigned Users</span></th>
            <th><span className="listHeaderLabel35">Status</span></th>
            <th><span className="listHeaderLabel35">Type</span></th>
            <th><span className="listHeaderLabel35">Completed By Users</span></th>
            <th><span className="listHeaderLabel35">Time Estimated Hours</span></th>
            <th><span className="listHeaderLabel35">Time Spent Hours</span></th>
          </tr>
        </thead>
        <tbody>
          {
              workorders.length!=0?
              workorders.map((row)=>{
                  return <tr className="listRow" key={row._id} onClick={()=>{onRowClick(row)}}>
                        <td className="column"><p className="context">{row.strCode}</p></td>
                        <td className="column"><p className="context">{row.strDescription}</p></td>
                        <td className="column"><p className="context">{priority[row.intPriorityID]}</p></td>
                        <td className="column"><p className="context">{row.strAssets}</p></td>
                        <td className="column"><p className="context"></p></td>
                        <td className="column"><p className="context">{workorderStatus_array[row.intWorkOrderStatusID]}</p></td>
                        <td className="column" style={{background:maintanceType_color_array[row.intMaintenanceTypeID]}}><p className="context">{maintanceType_array[row.intMaintenanceTypeID]}</p></td>
                        <td className="column"><p className="context"></p></td>
                        <td className="column"><p className="context"></p></td>
                        <td className="column"><p className="context"></p></td>
                      </tr>
                })
                :<tr ><td style={{textAlign:"center",fontSize:"14px"}} colSpan="2">No Data!</td></tr>
            
            }
        </tbody>
        </table>
      {/* <TableWrapper
              // rowSelection={rowSelection}
              dataSource={workorders}
              columns={columns}
              pagination={false}
              className="isoGroupTable"
            /> */}
      </div>
      </Modal>     
  </div>
 )
}
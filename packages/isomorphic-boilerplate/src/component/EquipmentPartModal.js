import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import assetActions from "../redux/asset/actions";
import { Col, Row } from "antd";

import './table.css'
import { FormattedNumberParts } from 'react-intl';
const { initData, deleteData,createNumber } = assetActions;
export default function (props) {
  const {  visible,title} = props; 
  const { assets, isDelete } = useSelector((state) => state.Assets);  
  const dispatch = useDispatch();
  React.useEffect(() => {
  }, [visible]);
  React.useEffect(() => {
    dispatch(initData());
  }, []);

  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    marginTop:"-20px",
    background: "#e0e7ed",
    height: "38px",
    paddingTop:'2px',
    borderBottom: "1px solid rgb(174,193,208)",
    marginLeft:"2px"
  };
  const [data, setData] = React.useState([]);
  const onRowClick=(row)=>{
    props.onCancel();
    props.selectEquipParentId(row);
   
  }
 return (
  <Modal
  visible={visible}
  onClose={props.onCancel}
  title={title}  
  width={700}
 footer={null}
  onCancel={props.onCancel}
>
 <div>
  <Row style={rowStyle} gutter={16} justify="start">
      <Col md={15} sm={15} xs={24} >         
          <div style={{position:'relative',width:"95%"}}>
          <Input
              label="Set Offline By User"
              placeholder="Filter By Category"
              style={{width:"95%"}}
          />
          <i className="ionicons ion-arrow-down-b"
            style={{ fontSize: "25px", cursor: "pointer" , 
              position: "absolute",
              marginTop:"5px",
              marginLeft: "5px"}}
              ></i>
            </div>       
      </Col>
      <Col md={1} sm={1} xs={24}>
      </Col>
      <Col md={8} sm={8} xs={24}>
      <InputSearch
            placeholder="input search text"
            // value={category}
            // onChange={onCategorySearchChange}            
            style={{ width: "100%" }}
          />
      </Col>
  </Row>
 </div>
 <div style={{marginTop:"3px",overflow:"auto",height:"300px"}}>
  {/* <TableWrapper
          // rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={false}
          className="isoGroupTable"
        /> */}
         <table style={{overflow:"auto"}} >
        <thead>
          <tr>
            <th style={{width:"30%"}} ><span className="listHeaderLabel35">Name</span></th>
            <th><span className="listHeaderLabel35">Code</span></th>
            <th><span className="listHeaderLabel35">Asset Status</span></th>
            <th><span className="listHeaderLabel35">Asset Parent</span></th>         
          </tr>
        </thead>
        <tbody>
        {
            assets.length!=0?
            assets.map((row)=>{
              return  row.intCategoryKind==2?              
                 <tr className="listRow" key={row.key} onClick={()=>{onRowClick(row)}} >                      
                      <td className="column"><p className="context">{row.strName}</p></td>
                      <td className="column"><p className="context">{row.strCode}</p></td>
                      <td className="column"><p className="context">{row.bolIsOnline?"Online":"Offline"}</p></td>
                      <td className="column"><p className="context"></p></td>
                    </tr>:<tr key={row.key} ></tr>
              })
              :<tr ><td style={{textAlign:"center",fontSize:"14px"}} colSpan="4">No Data!</td></tr>
          
          }
        </tbody>
        </table>
  </div>
  </Modal>
 )
}
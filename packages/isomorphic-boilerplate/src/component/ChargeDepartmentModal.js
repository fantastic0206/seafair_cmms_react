import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import notification from '@iso/components/Notification';
import FacilityPartModal from './FacilityPartModal';
import { Col, Row } from "antd";
import './table.css'
import {
  ActionBtn,
  Fieldset,
  Form,
  Label, 
} from './UsersContentModal.styles';
import ChargedepartmentAction from "../redux/chargedepartment/actions";
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
  const { add,initData } = ChargedepartmentAction;
  const dispatch = useDispatch();
  const [newModalActive, setNewModalActive] = React.useState(false);
  const [strCode,setStrCode]=React.useState('');
  const [strDescription,setStrDescription]=React.useState('');
  const { departments } = useSelector((state) => state.Chargedepartment);
  const [facilityPartModalActive, setFacilityPartModalActive] = React.useState(false);
  const [facilityName,setFacilityName]=React.useState('');
  const [intFacilityID,setIntFacilityID]=React.useState('');
  const [strChargedepartment,setStrChargedepartment]=React.useState('');
 const onSave = () => {
  if(strCode==''){
    notification('info',"Please put the code!");
    return;
  }  
  var sendData={}; 
  sendData.strCode=strCode;  
  sendData.strDescription=strDescription;  
  sendData.intFacilityID=intFacilityID;
  console.log(sendData);
  setNewModalActive(false);
  dispatch(add(sendData));
  
}
 
React.useEffect(() => { 
  dispatch(initData());
}, [visible]);



const onRowClick=(row)=>{
  props.selectedChargeDepart(row);
  props.onCancel();
}

const selectedFacilityId=(row)=>{
  console.log(row);
  setFacilityName(row.strName);
  setIntFacilityID(row._id);
  // props.selectIntAssetParentID(row._id);
}
 return (
   <div>
      <Modal
      visible={visible}
      onClose={props.onCancel}
      okText="New"
      title={title}  
      onOk={() =>{setNewModalActive(true);setStrCode('');setStrDescription('')}}
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
    <div style={{marginTop:"3px",height:"200px",overflow:'auto'}}>     
     <table style={{overflow:'auto'}}>
        <thead>
          <tr>
            <th style={{width:"30%"}} ><span className="listHeaderLabel35">Code</span></th>
            <th><span className="listHeaderLabel35">Description</span></th>
            <th><span className="listHeaderLabel35">Facility</span></th>
          </tr>
        </thead>

        <tbody>
        {
            departments.length!=0?
              departments.map((row)=>{
                return <tr className="listRow" key={row._id} onClick={()=>{onRowClick(row)}}>
                      <td className="column"><p className="context">{row.strCode}</p></td>
                      <td className="column"><p className="context">{row.strDescription}</p></td>
              <td className="column"><p className="context">{row.facilties[0]!=undefined?row.facilties[0].strName:''}</p></td>
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
      title="CHARGE DEPARTMENT"
      width={400}
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
          <Fieldset>
            <Label>Facility</Label>
           <div style={{position:"relative"}}>
            <Input
                label="Facility"
                style={{width:"90%"}}
                value={facilityName}
                onChange={()=>setFacilityPartModalActive(true)}
                placeholder=""             
            />
             <i
              className="ionicons ion-arrow-down-b"
              onClick={() => {
                setFacilityPartModalActive(true);
              }}
              style={{ fontSize: "25px", cursor: "pointer" ,marginLeft:"3px"}}
            ></i>
            </div>
          </Fieldset>
        </Form>        
      </Modal>
      <FacilityPartModal
        visible={facilityPartModalActive}
        onCancel={()=>{setFacilityPartModalActive(false)}}
        title="FACILITIES"
        selectedFacilityId={selectedFacilityId}
        // okText={article.key ? 'Update Article' : 'Add Article'}
        // onOk={() => handleRecord('insert', article)}      
      ></FacilityPartModal>
  </div>
 )
}
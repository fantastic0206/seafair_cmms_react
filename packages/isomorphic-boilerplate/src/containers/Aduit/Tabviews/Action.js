import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Select, { SelectOption } from '@iso/components/uielements/select';
import Input, { InputGroup ,Textarea} from "@iso/components/uielements/input";
import { DatePicker } from 'antd';
import moment from "moment";
import {
  Fieldset,
  // Form,
  Label,  
  // GeneralLine
} from '../../Asset/Facility/OnlineContent.styles';
// import addDoubleImg from '../../../../assets/images/new-group-inner-list.png';
import newInnerImg  from '../../../assets/images/new-inner-list.png';
// const FormItem = Form.Item;

const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginBottom:'20px'
};
const tdStyle={
  maxWidth:"110px", 
  width:"170px",
  whiteSpace:"nowrap",
  textAlign:"left",
  textOverflow:"ellipsis",
  overflow:"hidden",
}
const Option = SelectOption;

export default function(props) {   
   const [data, setData] = React.useState([]);  
   const [actionStatus,setActionStatus]=React.useState(2);
   const [assignCompletionDate,setAssignCompletionDate]=React.useState(null);
   const actionChange=(value)=>{
     setActionStatus(value);
   }
   const onDateChange=(value, dateString)=>{
    setAssignCompletionDate(dateString);
  }
  const completeDetail=()=>{
    if(actionStatus==2)
   return <div>
          <Row style={rowStyle} gutter={16} justify="start">
              <Col md={4} sm={4} xs={24} >
              <div style={{position:"relative"}}>
              <div style={{height: "300px",overflow: "auto",borderRadius: "4px", border: "1px solid rgb(205, 209, 215)", padding: "4px", margin: "4px"}}><table cellPadding="0" cellSpacing="0" >
              <tbody>
               <tr>
                     <th>Crew Name</th>
                     <th>Crew Role</th>
                     <th></th>
              </tr>
              <tr>
                <td  >
                  <span><a >user Role</a></span>
                </td>
                <td >
                  <span><a >user name</a></span>
                </td>
                <td style={{paddingLeft:"10px"}}><span><a title="Remove" style={{color:"black"}}>X</a></span></td>
               </tr>   
                               
              </tbody>
            </table></div>
            <div style={{position:"absolute",cursor:"pointer",width:"100%",height:"30px",padding: "0px 5px",}}>
              <img style={{width:"13px",height:"12px",}} src={newInnerImg}></img>
              <span style={{paddingLeft:"5px",fontSize: "11px",fontWeight:"bold"}} >Add another Crew</span>
          </div>
          </div>
              </Col>
              <Col md={20} sm={20} xs={24} >
                <Row style={rowStyle} gutter={16} justify="start">
                  <Col md={4} sm={4} xs={24} >
                     <Form>
                      <Fieldset>
                        <Label>Assign Completion Date</Label>                   
                      <DatePicker  value={assignCompletionDate!=null?moment(assignCompletionDate,'YYYY-MM-DD HH:mm:ss'):""} onChange={onDateChange}  style={{width:"150px"}} />
                      </Fieldset>
                    </Form>
                  </Col>
                  </Row>
                  <Row style={rowStyle} gutter={16} justify="start">                  
                    <Col md={12} sm={12} xs={24}>
                    <Form>
                        <Fieldset>
                          <Label>  Narrative</Label>                      
                          <Textarea placeholder="" 
                            style={{ height: 'auto' }}  
                            rows={2}
                            name="strDescription"
                            // onChange={(event)=>{props.strDescriptionChange(event.target.value)}}                               
                          /> 
                      </Fieldset>
                      </Form>                   
                  </Col>         
                </Row>     
                <Row style={rowStyle} gutter={16} justify="start">                  
                    <Col md={12} sm={12} xs={24}>
                    <Form>
                        <Fieldset>
                          <Label> Narrative of how to improve in the future</Label>                      
                          <Textarea placeholder="" 
                            style={{ height: 'auto' }}  
                            rows={3}
                            name="strDescription"
                            // onChange={(event)=>{props.strDescriptionChange(event.target.value)}}                               
                          /> 
                      </Fieldset>
                      </Form>                   
                  </Col>         
                </Row>  
                   
              </Col>
          </Row>
          </div> 
        else 
          return null;
  }
  return (
    <div className="isoInvoiceTable">
     
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
    
      {/* </Scrollbars> */}
      <InputGroup size="large" style={{ marginBottom: "10px" }}>        
          {/* <Row style={rowStyle} gutter={16} justify="start">
              <Col md={1} sm={1} xs={2} >
                <Form>
                <Fieldset>
                 <Label>Action:</Label>
                </Fieldset>  
                </Form>
              </Col>
              <Col md={14} sm={14} xs={22} >
                  <Select
                      defaultValue={actionStatus}                  
                     onChange={(value)=>{actionChange(value)}}
                    style={{ width: '150px' }}
                    >
                      <Option value={null}>{null}</Option>     
                      <Option value={1}> Approve the Drill</Option>     
                      <Option value={2}>Complete Drill</Option>
                                 
                </Select>
              </Col>
          </Row>     */}
          {completeDetail()}
      </InputGroup>
  </div>
  );
}

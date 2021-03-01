import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form } from "antd";
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Select, { SelectOption } from '@iso/components/uielements/select';
import Actions from "../../../redux/usergroup/actions";
import Input, { InputGroup ,Textarea} from "@iso/components/uielements/input";
import {
  Fieldset,
  Label,  
} from '../User.styles';
// import { stripBasename } from 'history/pathutils';

const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginBottom:'20px'
};
const columns = [
  {
    title: "This user is a member of the following user groups:",
    dataIndex: "strFullName",
    rowKey: "strFullName",
    width: "100%",  
  },
];
const Option = SelectOption;
export default function(props) {   
    const {business}=props;
   const { initData } = Actions;
   const [strAddress,setStrAddress]=React.useState('');   
   const [strCity,setStrCity]=React.useState('');   
   const [strProvince,setStrProvince]=React.useState('');   
   const [strPostalCode,setStrPostalCode]=React.useState('');   
   const [intCountryID,setIntCountryID]=React.useState('');   
   const [strTimezone,setStrTimezone]=React.useState('');

   const { usergroups } = useSelector((state) => state.UserGroup);
   const dispatch = useDispatch();
   React.useEffect(() => {  
    //dispatch(initData());
 }, []);

 React.useEffect(()=>{   
    
  if(Object.keys(business).length!=0){
     
    setStrAddress(business.strAddress);
    setStrCity(business.strCity);
    setStrProvince(business.strProvince);
    setStrPostalCode(business.strPostalCode);
    setIntCountryID(business.intCountryID);
    setStrTimezone(business.strTimezone);
    
   
  }
},[business]);
const locationChange=()=>{
    var inf={};
    inf.strAddress=strAddress;
    inf.strCity=strCity;
    inf.strProvince=strProvince;
    inf.strPostalCode=strPostalCode;
    inf.intCountryID=intCountryID;
    inf.strTimezone=strTimezone;
    props.changeLocationInf(inf);
}
  return (
    <div  className="PageContent">
    <InputGroup size="large" style={{ marginBottom: "15px" }}>
    <Row style={rowStyle} gutter={16} justify="start">                
        <Col md={10} sm={10} xs={24} >
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Address</Label>
                    <Textarea placeholder="Address"
                     value={strAddress}
                     onChange={(event)=>{setStrAddress(event.target.value)}}
                     onKeyUp={()=>{locationChange();}}
                      style={{ height: 'auto' }}  
                      rows={4}                               
                     /> 
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>City</Label>
                    <Input                       
                        placeholder=""
                        value={strCity}
                        onChange={(event)=>{setStrCity(event.target.value)}}
                        onKeyUp={()=>{locationChange();}}
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Province</Label>
                    <Input                       
                        placeholder=""
                        value={strProvince}
                        onChange={(event)=>{setStrProvince(event.target.value)}}
                        onKeyUp={()=>{locationChange();}}                       
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Postal Code</Label>
                    <Input
                       
                        placeholder=""
                        value={strPostalCode}
                        onChange={(event)=>{setStrPostalCode(event.target.value)}}
                        onKeyUp={()=>{locationChange();}}               
                       
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Country</Label>
                    <Input
                      
                        placeholder=""
                        value={intCountryID}
                        onChange={(event)=>{setIntCountryID(event.target.value)}}
                        onKeyUp={()=>{locationChange();}}               
                       
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Time Zone</Label>
                     {/* <Select defaultValue="2" style={{width:"50%"}}>                     
                        <Option value="0">0</Option>
                        <Option value="1">1</Option>                                      
                     </Select> */}
                      <Input
                       
                        placeholder=""
                        value={strTimezone}
                        onChange={(event)=>{setStrTimezone(event.target.value)}}
                        onKeyUp={()=>{locationChange();}}                 
                       
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
          </Col>
        </Row>       
    </InputGroup>
  </div>
  );
}

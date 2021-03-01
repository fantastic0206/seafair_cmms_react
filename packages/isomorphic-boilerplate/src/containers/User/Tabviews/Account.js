import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
import Input, { InputGroup ,Textarea} from "@iso/components/uielements/input";
import {
  Fieldset,
  Label,  
} from '../User.styles';



const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginBottom:'20px'
};
const rowStyle1 = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap", 
};
export default function(props) {   
  const {user,pageState}=props;
  const [strEmailAddress, setStrEmailAddress] = React.useState('');
  const [strTelephone, setStrTelephone] = React.useState('');
  const [strTelephone2, setStrTelephone2] = React.useState('');
  const [strUserName, setStrUserName] = React.useState('');
  const [password, setPassword] = React.useState('******');
  const [passwordconfirm, setPasswordconfirm] = React.useState('******');
  // const [strAddress, setStrAddress] = React.useState('');
  // const [strAddress2, setStrAddress2] = React.useState('');

  const onChangeSend = () => {
      var accountInf={};
      accountInf.strEmailAddress=strEmailAddress;
      accountInf.strTelephone=strTelephone;
      accountInf.strTelephone2=strTelephone2;
      accountInf.strUserName=strUserName;
      accountInf.password=password;
      accountInf.passwordconfirm=passwordconfirm;
      props.accountIf(accountInf);
  };
  React.useEffect(()=>{   
    if(pageState=="edit"){
      setStrEmailAddress(user.strEmailAddress);
      setStrTelephone(user.strTelephone);
      setStrTelephone2(user.strTelephone2);
      setStrUserName(user.strUserName);
      setPassword("******");
      setPasswordconfirm("******");
    }
  },[user]);
  return (
  <div  className="PageContent">
    <InputGroup size="large" style={{ marginBottom: "15px" }}>             
              <Row style={rowStyle} gutter={16} style={{background: "#e8edf0", padding: "5px 0 3px 10px",marginBottom:'15px'}}>
                  <Col md={24} sm={24} xs={24} >
                    <div style={{color: "#738796"}}>Contact Information</div>
                  </Col>
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={8} sm={8} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Email Address</Label>
                      <Input
                        value={strEmailAddress}
                        placeholder=""
                        onChange={(event) => {
                          setStrEmailAddress(event.target.value);
                        }}
                        onKeyUp={()=>{onChangeSend();}}
                        style={{ width: "90%" }}
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={8} sm={8} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Telephone</Label>
                      <Input
                        value={strTelephone}
                        placeholder=""
                        onChange={(event) => {
                          setStrTelephone(event.target.value);
                        }}
                        onKeyUp={()=>{onChangeSend();}}
                        style={{ width: "90%" }}
                      />
                   </Fieldset>
                    </Form> 
                  </Col>     
                  <Col md={8} sm={8} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Telephone 2</Label>
                      <Input
                        value={strTelephone2}
                        placeholder=""
                        onChange={(event) => {
                          setStrTelephone2(event.target.value);
                        }}
                        onKeyUp={()=>{onChangeSend();}}
                        style={{ width: "90%" }}
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                    
                </Row>
                <Row style={rowStyle} gutter={16} style={{background: "#e8edf0", padding: "5px 0 3px 10px",marginBottom:'15px'}}>
                  <Col md={24} sm={24} xs={24} >
                    <div style={{color: "#738796"}}>Security and Access</div>
                  </Col>
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={8} sm={8} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>User Name</Label>
                      <Input
                        value={strUserName}
                        placeholder=""
                        onChange={(event) => {
                          setStrUserName(event.target.value);
                        }}
                        onKeyUp={()=>{onChangeSend();}}
                        style={{ width: "90%" }}
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={8} sm={8} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>PassWord</Label>
                      <Input
                        value={password}
                        placeholder=""
                        type="password"
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                        onKeyUp={()=>{onChangeSend();}}
                        style={{ width: "90%" }}
                      />
                   </Fieldset>
                    </Form> 
                  </Col>      
                  <Col md={8} sm={8} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>passwordconfirm</Label>
                      <Input
                        value={passwordconfirm}
                        type="password"
                        placeholder=""
                        onChange={(event) => {
                          setPasswordconfirm(event.target.value);
                        }}
                        onKeyUp={()=>{onChangeSend();}}
                        style={{ width: "90%" }}
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                   
                </Row>

      </InputGroup>      
	</div>
  );
}

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
  const {business}=props;
  const [strPrimaryContact, setStrPrimaryContact] = React.useState('');
  const [strPhone, setStrPhone] = React.useState('');
  const [strPhone2, setStrPhone2] = React.useState('');
  const [strWebSite, setStrWebsite] = React.useState('');
  const [strBusinessClassification,setStrBusinessClassification]=React.useState('');

  const [strFax, setStrFax] = React.useState('');
  const [strPrimaryEmail,setStrPrimaryEmail]=React.useState('');
  const [strSecondaryEmail,setStrSecondaryEmail]=React.useState('');
  const [strPrimaryCurrency,setStrPrimaryCurrency]=React.useState('');
  const [strNotes,setStrNotes]=React.useState('');
  // const [strSecondaryEmail,setStrSecondaryEmail]=React.useState('');
  // const [strAddress, setStrAddress] = React.useState('');
  // const [strAddress2, setStrAddress2] = React.useState('');

  // const onChangeSend = () => {
  //     var accountInf={};
  //     accountInf.strEmailAddress=strEmailAddress;
  //     accountInf.strTelephone=strTelephone;
  //     accountInf.strTelephone2=strTelephone2;
  //     accountInf.strUserName=strUserName;
  //     accountInf.password=password;
  //     accountInf.passwordconfirm=passwordconfirm;
  //     props.accountIf(accountInf);
  // };
  React.useEffect(()=>{   
    
    if(Object.keys(business).length!=0){
        console.log(business.strPrimaryContact);
      setStrPrimaryContact(business.strPrimaryContact);
      setStrPhone(business.strPhone);
      setStrPhone2(business.strPhone2);
      setStrFax(business.strFax);
      setStrWebsite(business.strWebSite);
      setStrBusinessClassification(business.strBusinessClassification);
      setStrPrimaryEmail(business.strPrimaryEmail);
      setStrSecondaryEmail(business.strSecondaryEmail);
      setStrPrimaryCurrency(business.strPrimaryCurrency);
      setStrNotes(business.strNotes);
     
    }
  },[business]);
  const generalChange=()=>{
    var inf={};
    inf.strPrimaryContact=strPrimaryContact;
    inf.strPhone=strPhone;
    inf.strPhone2=strPhone2;
    inf.strFax=strFax;
    inf.strWebSite=strWebSite;
    inf.strBusinessClassification=strBusinessClassification;
    inf.strPrimaryEmail=strPrimaryEmail;
    inf.strSecondaryEmail=strSecondaryEmail;
    inf.strPrimaryCurrency=strPrimaryCurrency;
    inf.strNotes=strNotes;
     props.changeGeneralInf(inf);
  }  
  return (
  <div  className="PageContent">
    <InputGroup size="large" style={{ marginBottom: "15px" }}>             
    <Row style={rowStyle} gutter={16} justify="start">                
        <Col md={8} sm={8} xs={24} >
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Primary Contact</Label>
                      <Input
                        value={strPrimaryContact}
                        placeholder=""
                        onChange={(event) => {
                          setStrPrimaryContact(event.target.value);
                        }}
                        onKeyUp={()=>{generalChange();}}                  
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Phone</Label>
                      <Input
                        value={strPhone}
                        placeholder=""
                        onChange={(event) => {
                          setStrPhone(event.target.value);
                        }}                    
                        onKeyUp={()=>{generalChange();}}
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Fax</Label>
                      <Input
                       value={strFax}
                        placeholder=""
                        onChange={(event) => {
                          setStrFax(event.target.value);
                        }}
                        onKeyUp={()=>{generalChange();}}
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Primary Email</Label>
                      <Input
                        value={strPrimaryEmail}
                        placeholder=""
                        onChange={(event) => {
                          setStrPrimaryEmail(event.target.value);
                        }}   
                        onKeyUp={()=>{generalChange();}}                    
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Primary Currency</Label>
                      <Input
                        value={strPrimaryCurrency}
                        placeholder=""
                        onChange={(event) => {
                          setStrPrimaryCurrency(event.target.value);
                        }}   
                        onKeyUp={()=>{generalChange();}}                   
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
              </Col>
              <Col md={8} sm={8} xs={24} > {/** RIGHT SECTION */}              
                 <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Phone2</Label>
                      <Input
                        value={strPhone2}
                        placeholder=""
                        onChange={(event) => {
                          setStrPhone2(event.target.value);
                        }}   
                        onKeyUp={()=>{generalChange();}}                     
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Web Site</Label>
                      <Input
                       value={strWebSite}
                        placeholder=""
                        onChange={(event) => {
                          setStrWebsite(event.target.value);
                        }}       
                        onKeyUp={()=>{generalChange();}}                 
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={18} sm={18} xs={22} >
                     <Form>
                     <Fieldset>
                     <Label>Business Classification</Label>
                      <Input
                        value={strBusinessClassification}
                        placeholder=""
                        onChange={(event) => {
                          setStrBusinessClassification(event.target.value);
                        }}       
                        onKeyUp={()=>{generalChange();}}                 
                      />
                   </Fieldset>
                    </Form> 
                  </Col>   
                  {/* <Col md={2} sm={2} xs={2} style={{paddingLeft:"0px"}} >
                     <i className="ionicons ion-arrow-down-b"                    
                    //  onClick={()=>{setAccountsModalActive(true)}}
                     style={{fontSize:'25px',cursor: "pointer",marginTop:"30px"}}></i>
                  </Col>                */}
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                     <Label>Secondary Email</Label>
                      <Input
                         value={strSecondaryEmail}
                        placeholder=""
                        onChange={(event) => {
                          setStrSecondaryEmail(event.target.value);
                        }}   
                        onKeyUp={()=>{generalChange();}}                     
                      />
                   </Fieldset>
                    </Form> 
                  </Col>                  
                </Row>

                <Row style={rowStyle} gutter={16} justify="start">                
                   <Col md={24} sm={24} xs={24} >
                     <Form>
                     <Fieldset>
                    <Label>Notes</Label>
                    <Textarea placeholder="Notes"
                     value={strNotes}
                      onChange={(event)=>{setStrNotes(event.target.value)}}
                     onKeyUp={()=>{generalChange();}}
                      style={{ height: 'auto' }}  
                      rows={6}                               
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

import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
// import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Input, { InputGroup, Textarea } from "@iso/components/uielements/input";
import { DatePicker } from 'antd';
import moment from "moment";
import {
  Fieldset,
  // Form,
  Label, 
} from "../../Asset/Facility/OnlineContent.styles";


const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
};
const colStyle = {
  marginBottom: "16px",
};
const gutter = 16;

export default function(props) {   
  const {data} = props;

  const [strPersonName, setStrPersonName] = React.useState("");
  const [aDate, setADate] = React.useState(null);
  const [strState, setStrState] = React.useState("");
  const [strISMPart, setStrISMPart] = React.useState("");
  const [strSMSPart, setStrSMSPart] = React.useState("");
  const [strCorrectiveAction, setStrCorrectiveAction] = React.useState("");
  const [strImmediateAction, setStrImmediateAction] = React.useState("");
  const [strImmediatePersonName, setStrImmediatePersonName] = React.useState("");
  const [aImmediateCompetionDate, setAImmediateCompetionDate] = React.useState(null);
  const [strFurtherAction, setStrFurtherAction] = React.useState("");
  const [strFurtherPersonName, setStrFurtherPersonName] = React.useState("");
  const [aFurtherCompetionDate, setAFurtherCompetionDate] = React.useState(null);
  const [strVerificationCorrectiveAction, setStrVerificationCorrectiveAction] = React.useState("");
  const [strFollowUpDetail, setStrFollowUpDetail] = React.useState("");
  const [strCorrectiveActionClose, setStrCorrectiveActionClose] = React.useState("");

  const infoChange = () => {
    var NCRInfo = {};
    NCRInfo.strNCRPersonName = strPersonName;
    NCRInfo.aNCRDate = aDate;
    NCRInfo.strNCRState = strState;
    NCRInfo.strNCRISMPart = strISMPart;
    NCRInfo.strNCRSMSPart = strSMSPart;
    NCRInfo.strNCRCorrectiveAction = strCorrectiveAction;
    NCRInfo.strNCRImmediateAction = strImmediateAction;
    NCRInfo.strNCRImmediatePersonName = strImmediatePersonName;
    NCRInfo.aNCRImmediateCompetionDate = aImmediateCompetionDate;
    NCRInfo.strNCRFurtherAction = strFurtherAction;
    NCRInfo.strNCRFurtherPersonName = strFurtherPersonName;
    NCRInfo.aNCRFurtherCompetionDate = aFurtherCompetionDate;
    NCRInfo.strNCRVerificationCorrectiveAction = strVerificationCorrectiveAction;
    NCRInfo.strNCRFollowUpDetail = strFollowUpDetail;
    NCRInfo.strNCRCorrectiveActionClose = strCorrectiveActionClose;
    props.NCRInfo(NCRInfo);
  }

  React.useEffect(() => {
    infoChange();
  }, [strPersonName, aDate, strState, strISMPart, strSMSPart, strCorrectiveAction, strImmediateAction, strImmediatePersonName, aImmediateCompetionDate, strFurtherAction, 
    strFurtherPersonName, aFurtherCompetionDate, strVerificationCorrectiveAction, strFollowUpDetail, strCorrectiveActionClose]);
  React.useEffect(() => {
    if(data != null) {
      setStrPersonName(data.strNCRPersonName);
      setADate(data.aReportDate);
      setStrState(data.strNCState);
      setStrISMPart(data.strISMPart);
      setStrSMSPart(data.strSMSPart);
      setStrCorrectiveAction(data.strCorrectiveAction);
      setStrImmediateAction(data.strImmediateAction);
      setStrImmediatePersonName(data.strImmediatePersonName);
      setAImmediateCompetionDate(data.aImmediateCompetionDate);
      setStrFurtherAction(data.strFurtherAction);
      setStrFurtherPersonName(data.strFurtherPersonName);
      setAFurtherCompetionDate(data.aFurtherCompetionDate);
      setStrVerificationCorrectiveAction(data.strVerificationCorrectiveAction);
      setStrFollowUpDetail(data.strFollowUpDetail);
      setStrCorrectiveActionClose(data.strCorrectiveAction);
    }
  }, [data]);

  return (
    <div className="PageContent">
      <Row style={rowStyle} gutter={gutter} justify="start">
           <Col md={24} sm={24} xs={24} style={colStyle}>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={14} sm={14} xs={20} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Name of Person Reporting the Non-Conformity:</Label>
                      <Input                      
                        placeholder=""
                        value={strPersonName}
                        onChange={(event) => {
                          setStrPersonName(event.target.value);
                        }}
                      />                     
                  </Fieldset>
                </Form>
              </Col>
              <Col md={4} sm={4} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Date of Report</Label>                   
                    <DatePicker  value={aDate!=null?moment(aDate,'YYYY-MM-DD HH:mm:ss'):""}  
                      onChange={(value, dataString) => {setADate(dataString)}}/>
                  </Fieldset>
                </Form>
              </Col>
             
            </Row>
            <div  style={{
              borderBottom: '1px solid #E9E9E9',
              paddingBottom: '5px',
              marginBottom:'10px'
            }}>
            </div>           
            <Row style={rowStyle} gutter={gutter} justify="start">             
              <Col md={18} sm={18} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>State the nature of the non-conformity:</Label>
                    <Textarea placeholder="" 
                      style={{ height: 'auto' }}
                      rows={4}
                      value={strState}
                      onChange={(event)=>{setStrState(event.target.value)}}                               
                    />     
                  </Fieldset>
                </Form>
              </Col>
              <Col md={18} sm={18} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>What part of the ISM does this non-conformity refer to?</Label>
                    <Input                      
                        placeholder=""
                        value={strISMPart}
                        onChange={(event) => {
                          setStrISMPart(event.target.value);
                        }}                       
                      />     
                  </Fieldset>
                </Form>
              </Col>
              <Col md={18} sm={18} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>What part of the SMS does this refer to?</Label>
                    <Input                      
                      placeholder=""
                      value={strSMSPart}
                      onChange={(event) => {
                        setStrSMSPart(event.target.value);
                      }}                       
                    />     
                  </Fieldset>
                </Form>
              </Col>
              </Row>
              <div  style={{
                    borderBottom: '1px solid #E9E9E9',
                    paddingBottom: '5px',
                    marginBottom:'10px'
                  }}>
            </div>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={18} sm={18} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>What is the proposed corrective action(s):</Label>
                    <Input                      
                        placeholder=""
                        value={strCorrectiveAction}
                        onChange={(event) => {
                          setStrCorrectiveAction(event.target.value);
                        }}                       
                      />                    
                  </Fieldset>
                </Form>
              </Col>
              <Col md={18} sm={18} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Immediate Action(s):</Label>
                    <Textarea placeholder="" 
                          style={{ height: 'auto' }}
                          rows={3}
                          value={strImmediateAction}
                          onChange={(event)=>{setStrImmediateAction(event.target.value)}}                               
                        />   
                  </Fieldset>
                </Form>
              </Col>   
              </Row>
              <div  style={{
                    borderBottom: '1px solid #E9E9E9',
                    paddingBottom: '5px',
                    marginBottom:'10px'
                  }}>
            </div>
            <Row style={rowStyle} gutter={gutter} justify="start">             
              <Col md={14} sm={14} xs={20} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Name(s) of Person(s) to Correct the Non-Conformity:</Label>
                    <Input                      
                        placeholder=""
                        value={strImmediatePersonName}
                        onChange={(event) => {
                          setStrImmediatePersonName(event.target.value);
                        }}                       
                      />   
                  </Fieldset>
                </Form>
              </Col>
              <Col md={4} sm={4} xs={4} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Date for Competion:</Label>
                    <DatePicker  
                      value={aImmediateCompetionDate!=null?moment(aImmediateCompetionDate,'YYYY-MM-DD HH:mm:ss'):""}
                      onChange={(value, dataString)=>setAImmediateCompetionDate(dataString)}/> 
                  </Fieldset>
                </Form>
              </Col>              
              </Row>
              <div  style={{
                borderBottom: '1px solid #E9E9E9',
                paddingBottom: '5px',
                marginBottom:'10px'
              }}>
            </div>
            <Row style={rowStyle} gutter={gutter} justify="start">             
              <Col md={18} sm={18} xs={20} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Further Action(s):</Label>
                    <Textarea placeholder="" 
                      style={{ height: 'auto' }}
                      rows={3}
                      value={strFurtherAction}
                      onChange={(event)=>{setStrFurtherAction(event.target.value)}}                               
                    />   
                  </Fieldset>
                </Form>
              </Col>
              </Row>
              <div  style={{
                borderBottom: '1px solid #E9E9E9',
                paddingBottom: '5px',
                marginBottom:'10px'
              }}>
            </div>
              <Row style={rowStyle} gutter={gutter} justify="start">             
              <Col md={14} sm={14} xs={20} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Name of Person to Correct the Non-Conformity:</Label>
                    <Input                      
                      placeholder=""
                      value={strFurtherPersonName}
                      onChange={(event) => {
                        setStrFurtherPersonName(event.target.value);
                      }}
                    />   
                  </Fieldset>
                </Form>
              </Col>
              <Col md={4} sm={4} xs={4} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Date for Competion:</Label>
                    <DatePicker  
                      value={aFurtherCompetionDate!=null?moment(aFurtherCompetionDate,'YYYY-MM-DD HH:mm:ss'):""}
                      onChange={(value, dataString)=>setAFurtherCompetionDate(dataString)}/> 
                  </Fieldset>
                </Form>
              </Col>              
              </Row>
              <div  style={{
                borderBottom: '1px solid #E9E9E9',
                paddingBottom: '5px',
                marginBottom:'10px'
              }}>
            </div>
            <Row style={rowStyle} gutter={gutter} justify="start">             
              <Col md={18} sm={18} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Verification of Corrective Action:</Label>
                    <Input                      
                      placeholder=""
                      value={strVerificationCorrectiveAction}
                      onChange={(event) => {
                        setStrVerificationCorrectiveAction(event.target.value);
                      }}                       
                    />   
                  </Fieldset>
                </Form>
              </Col>
              <Col md={18} sm={18} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Follow Up Details(Explain how the corrective action was verified.):</Label>
                    <Textarea placeholder="" 
                      style={{ height: 'auto' }}
                      rows={3}
                      value={strFollowUpDetail}
                      onChange={(event)=>{setStrFollowUpDetail(event.target.value)}}                               
                    />   
                  </Fieldset>
                </Form>
              </Col>   
              <Col md={18} sm={18} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Corrective Action(s) Closed Out:</Label>
                    <Input                      
                        placeholder=""
                        value={strCorrectiveActionClose}
                        onChange={(event) => {
                          setStrCorrectiveActionClose(event.target.value);
                        }}                       
                      />   
                  </Fieldset>
                </Form>
              </Col>
              </Row>

           </Col>
          </Row>
  </div>
  );
}

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

  const [strAuditPlan, setStrAuditPlan] = React.useState("");
  const [aDate, setADate] = React.useState(null);
  const [aOpenMeetingBegin, setAOpenMeetingBegin] = React.useState(null);
  const [aOpenMeetingClose, setAOpenMeetingClose] = React.useState(null);
  const [aOpenMeetingPresent, setAOpenMeetingPresent] = React.useState(null);
  const [strOpenMeetingDetail, setStrOpenMeetingDetail] = React.useState("");
  const [aConductAuditBegin, setAConductAuditBegin] = React.useState(null);
  const [aConductAuditClose, setAConductAuditClose] = React.useState(null);
  const [strConductAuditDetail, setStrConductAuditDetail] = React.useState("");
  const [aCloseMeetingBegin, setACloseMeetingBegin] = React.useState(null);
  const [aCloseMeetingClose, setACloseMeetingClose] = React.useState(null);
  const [aCloseMeetingPresent, setACloseMeetingPresent] = React.useState(null);
  const [strCloseMeetingDetail, setStrCloseMeetingDetail] = React.useState("");

  const infoChange=() => {
    var planInfo = {};
    planInfo.strPlanAuditPlan=strAuditPlan;
    planInfo.aPlanDate=aDate;
    planInfo.aPlanOpenMeetingBegin=aOpenMeetingBegin;
    planInfo.aPlanOpenMeetingClose=aOpenMeetingClose;
    planInfo.aPlanOpenMeetingPresent=aOpenMeetingPresent;
    planInfo.strPlanOpenMeetingDetail=strOpenMeetingDetail;
    planInfo.aPlanConductAuditBegin=aConductAuditBegin;
    planInfo.aPlanConductAuditClose=aConductAuditClose;
    planInfo.strPlanConductAuditDetail=strConductAuditDetail;
    planInfo.aPlanCloseMeetingBegin=aCloseMeetingBegin;
    planInfo.aPlanCloseMeetingClose=aCloseMeetingClose;
    planInfo.aPlanCloseMeetingPresent=aCloseMeetingPresent;
    planInfo.strPlanCloseMeetingDetail=strCloseMeetingDetail;
    props.planInfo(planInfo);
  };

  React.useEffect(() => {
    infoChange();
  }, [strAuditPlan, aDate, aOpenMeetingBegin, aOpenMeetingClose, aOpenMeetingPresent, strOpenMeetingDetail, aConductAuditBegin, aConductAuditClose, 
    strConductAuditDetail, aCloseMeetingBegin, aCloseMeetingClose, aCloseMeetingPresent, strCloseMeetingDetail]);
  React.useEffect(() => {
    if(data != null) {
      setStrAuditPlan(data.strInternalSmsAuditPlan);
      setADate(data.aDate);
      setAOpenMeetingBegin(data.aOpenMeetingBegin);
      setAOpenMeetingClose(data.aOpenMeetingClose);
      setAOpenMeetingPresent(data.aOpenMeetingPresent);
      setStrOpenMeetingDetail(data.strOpenMeetingDetails);
      setAConductAuditBegin(data.aConductAuditBegin);
      setAConductAuditClose(data.aConductAuditClose);
      setStrConductAuditDetail(data.strConductAuditDetail);
      setACloseMeetingBegin(data.aCloseMeetingBegin);
      setACloseMeetingClose(data.aCloseMeetingClose);
      setACloseMeetingPresent(data.aCloseMeetingPresent);
      setStrCloseMeetingDetail(data.strCloseMeetingDetails);
    }
  }, [data]);
  return (
    <div className="PageContent">
      <Row style={rowStyle} gutter={gutter} justify="start">
           <Col md={24} sm={24} xs={24} style={colStyle}>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={12} sm={12} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Internal SMS Audit Plan</Label>
                    <Input
                      label="Set Offline By User"
                      placeholder=""
                      value={strAuditPlan}
                      onChange={ (event) => {
                        setStrAuditPlan(event.target.value);
                        infoChange();
                      }}
                      
                    />                     
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Date</Label>                   
                    <DatePicker  value={aDate!=null?moment(aDate,'YYYY-MM-DD HH:mm:ss'):""}  onChange={(value, dataString) => setADate(dataString)} />
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
            <Label>Opening meeting</Label>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Begins at:</Label>
                    <DatePicker  value={aOpenMeetingBegin!=null?moment(aOpenMeetingBegin,'YYYY-MM-DD HH:mm:ss'):""} onChange={(value, dataString) => setAOpenMeetingBegin(dataString)}/> 
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Closes at:</Label>
                    <DatePicker  value={aOpenMeetingClose!=null?moment(aOpenMeetingClose,'YYYY-MM-DD HH:mm:ss'):""} onChange={(value, dataString) => setAOpenMeetingClose(dataString)}/> 
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Present:</Label>
                    <DatePicker  value={aOpenMeetingPresent!=null?moment(aOpenMeetingPresent,'YYYY-MM-DD HH:mm:ss'):""} onChange={(value, dataString) => setAOpenMeetingPresent(dataString)}/> 
                  </Fieldset>
                </Form>
              </Col>
              <Col md={18} sm={18} xs={18} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Details:</Label>
                    <Textarea placeholder="" 
                          style={{ height: 'auto' }}  
                          rows={2}
                          value={strOpenMeetingDetail}
                          onChange={(event)=>{
                            setStrOpenMeetingDetail(event.target.value);
                            infoChange();
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
            <Label>Conduct of audit (where more than one element is to be audited, several start and finish times may be given)</Label>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Begins at:</Label>
                    <DatePicker  value={aConductAuditBegin!=null?moment(aConductAuditBegin,'YYYY-MM-DD HH:mm:ss'):""} onChange={(value, dataString) => setAConductAuditBegin(dataString)}/> 
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Closes at:</Label>
                    <DatePicker  value={aConductAuditClose!=null?moment(aConductAuditClose,'YYYY-MM-DD HH:mm:ss'):""} onChange={(value, dataString) => setAConductAuditClose(dataString)}/> 
                  </Fieldset>
                </Form>
              </Col>
            
              <Col md={18} sm={18} xs={18} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Details:</Label>
                    <Textarea placeholder="" 
                      style={{ height: 'auto' }}  
                      rows={2}
                      value={strConductAuditDetail}
                        onChange={(event)=>{
                        setStrConductAuditDetail(event.target.value);
                        infoChange();
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
            <Label>Closing meeting</Label>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Begins at:</Label>
                    <DatePicker  value={aCloseMeetingBegin!=null?moment(aCloseMeetingBegin,'YYYY-MM-DD HH:mm:ss'):""} onChange={(value, dataString) => setACloseMeetingBegin(dataString)}/> 
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Closes at:</Label>
                    <DatePicker  value={aCloseMeetingClose!=null?moment(aCloseMeetingClose,'YYYY-MM-DD HH:mm:ss'):""} onChange={(value, dataString) => setACloseMeetingClose(dataString)}/> 
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Present:</Label>
                    <DatePicker  value={aCloseMeetingPresent!=null?moment(aCloseMeetingPresent,'YYYY-MM-DD HH:mm:ss'):""} onChange={(value, dataString) => setACloseMeetingPresent(dataString)}/> 
                  </Fieldset>
                </Form>
              </Col>
              <Col md={18} sm={18} xs={18} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Details:</Label>
                    <Textarea placeholder="" 
                          style={{ height: 'auto' }}  
                          rows={2}
                          value={strCloseMeetingDetail}
                          onChange={(event)=>{
                            setStrCloseMeetingDetail(event.target.value);
                            infoChange();
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

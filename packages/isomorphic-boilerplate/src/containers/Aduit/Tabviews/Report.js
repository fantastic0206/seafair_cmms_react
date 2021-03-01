import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
// import Scrollbars from "@iso/components/utility/customScrollBar";
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Input, { InputGroup, Textarea } from "@iso/components/uielements/input";
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import {
  Fieldset,
  // Form,
  Label, 
} from "../../Asset/Facility/OnlineContent.styles";
import { DatePicker } from 'antd';
import moment from "moment";
// import addDoubleImg from '../../../../assets/images/new-group-inner-list.png';
// import newAddImg from '../../../assets/images/new-inner-list.png';

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
  const {data}=props;
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginBottom: '20px'
  };

  const [strPassState, setStrPassState]=React.useState("");
  const [strAuditReport, setStrAuditReport]=React.useState("");
  const [aDate, setADate]=React.useState(null);
  const [strNCRCARNo, setStrNCRCARNo]=React.useState("");
  const [strNCStatement, setStrNCStatement]=React.useState("");
  const [strImmediateAction, setStrImmediateAction]=React.useState("");
  const [aImmediateCompletionDate, setAImmediateCompletionDate]=React.useState(null);
  const [strFurtherAction, setStrFurtherAction]=React.useState("");
  const [aFurtherCompletionDate, setAFurtherCompletionDate]=React.useState(null);
  const [strFollowUpDetail, setStrFollowUpDetail]=React.useState("");
  const [strCorrectiveAction, setStrCorrectiveAction]=React.useState("");
  
  const infoChange=()=>{
    var reportInfo = {};
    reportInfo.strReportAuditReport = strAuditReport;
    reportInfo.aReportDate = aDate;
    reportInfo.strReportNCRCARNo = strNCRCARNo;
    reportInfo.strReportNCStatement = strNCStatement;
    reportInfo.strReportImmediateAction = strImmediateAction;
    reportInfo.aReportImmediateCompletionDate = aImmediateCompletionDate;
    reportInfo.strReportFurtherAction = strFurtherAction;
    reportInfo.aReportFurtherCompletionDate = aFurtherCompletionDate;
    reportInfo.strReportFollowUpDetail = strFollowUpDetail;
    reportInfo.strReportCorrectiveAction = strCorrectiveAction;
    props.reportInfo(reportInfo);
  }
  const onChangePassState=(event) => {
    setStrPassState(event.target.value);
    props.changePassState(event.target.value);
  };
  React.useEffect(() => {
    if(data != null) {
      setStrAuditReport(data.strInternalSmsAuditReport);
      setADate(data.aDate);
      setStrNCRCARNo(data.strNCRCARNo);
      setStrNCStatement(data.strNCStatement);
      setStrImmediateAction(data.strImmediateAction);
      setAImmediateCompletionDate(data.aImmediateCompletionDate);
      setStrFurtherAction(data.strFurtherAction);
      setAFurtherCompletionDate(data.aFurtherCompletionDate);
      setStrFollowUpDetail(data.strFollowUpDetail);
      setStrCorrectiveAction(data.strCorrectiveAction);
    }
  }, [data]);
  React.useEffect(() => {
    infoChange();
  }, [strAuditReport, aDate, strNCRCARNo, strNCStatement, strImmediateAction, aImmediateCompletionDate, 
    strFurtherAction, aFurtherCompletionDate, strFollowUpDetail, strCorrectiveAction]);
  
  return (
    <div className="isoInvoiceTable">
      <div className="PageContent">
       
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <RadioGroup onChange={onChangePassState} name="value" value={strPassState}>
              <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col md={12} sm={12} xs={24} > 
                    <Radio style={radioStyle} value={"pass"}>
                        Pass
                    </Radio>
                  </Col>
                  <Col md={12} sm={12} xs={24} > 
                    <Radio style={radioStyle} value={"fail"}>
                        Fail
                    </Radio> 
                  </Col>                  
              </Row>
            </RadioGroup>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Internal SMS Audit Report</Label>
                      <Input
                        label="Set Offline By User"
                        placeholder=""
                        value={strAuditReport}
                        onChange={(event) => {
                          setStrAuditReport(event.target.value);
                        }}
                      />                     
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Date</Label>                   
                    <DatePicker  
                      value={aDate!=null?moment(aDate,'YYYY-MM-DD HH:mm:ss'):""}  
                      onChange={(value, dataString) => {
                        setADate(dataString);
                      }} />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>NCR/CAR NO.</Label>                 
                      <Input                      
                        placeholder=""
                        value={strNCRCARNo}
                        onChange={(event)=>setStrNCRCARNo(event.target.value)}
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
              <Col md={18} sm={18} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Non-conformity Statement</Label>
                    <Textarea placeholder="" 
                      style={{ height: 'auto' }}  
                      rows={2}
                      value={strNCStatement}
                      onChange={(event)=>{setStrNCStatement(event.target.value)}}                               
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
            <Label>Proposed Corrective Action</Label>
            <Row style={rowStyle} gutter={gutter} justify="start">
         
              <Col md={14} sm={14} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Immediate Action(s)</Label>
                    <Input                   
                      placeholder=""
                      value={strImmediateAction}
                      onChange={(event)=>setStrImmediateAction(event.target.value)}                      
                    />   
                  </Fieldset>
                </Form>
              </Col>
              <Col md={4} sm={4} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Date for completion</Label>                   
                    <DatePicker  
                      value={aImmediateCompletionDate!=null?moment(aImmediateCompletionDate,'YYYY-MM-DD HH:mm:ss'):""}  
                      onChange={(value, dataString)=>{
                        setAImmediateCompletionDate(dataString);
                      }} />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={14} sm={14} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Further Action(s)</Label>
                    <Textarea placeholder="" 
                      style={{ height: 'auto' }}  
                      rows={2}
                      value={strFurtherAction}
                      onChange={(event)=>{setStrFurtherAction(event.target.value)}}                               
                    />                   
                  </Fieldset>
                </Form>
              </Col>
              <Col md={4} sm={4} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Date for completion</Label>
                    <DatePicker  
                      value={aFurtherCompletionDate!=null?moment(aFurtherCompletionDate,'YYYY-MM-DD HH:mm:ss'):""}  
                      onChange={(value, dataString)=>{
                        setAFurtherCompletionDate(dataString);
                      }} />
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
            <Label>Verification of Corrective Action</Label>
            <Row style={rowStyle} gutter={gutter} justify="start">         
              <Col md={18} sm={18} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Follow Up Details:</Label>
                    <Textarea placeholder="" 
                      style={{ height: 'auto' }}  
                      rows={2}
                      value={strFollowUpDetail}
                      onChange={(event)=>{setStrFollowUpDetail(event.target.value)}}                               
                    />     
                  </Fieldset>
                </Form>
              </Col>   
              <Col md={18} sm={18} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Corrective Action(s) Closed Out</Label>
                    <Input                   
                      placeholder=""
                      value={strCorrectiveAction}
                      onChange={(event)=>setStrCorrectiveAction(event.target.value)}                      
                    />   
                  </Fieldset>
                </Form>
              </Col>
              </Row>
            </Col>
            </Row> 
          </div>
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > 
        
     </Scrollbars> */}
    
  </div>
  );
}

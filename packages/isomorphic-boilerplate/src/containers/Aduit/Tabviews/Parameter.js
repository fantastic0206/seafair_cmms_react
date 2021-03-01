import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
// import Scrollbars from "@iso/components/utility/customScrollBar";
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Input, { InputGroup, Textarea } from "@iso/components/uielements/input";
// import { DatePicker } from 'antd';
// import moment from "moment";
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

  const [strAuditorRepresentative, setStrAuditorRepresentative] = React.useState("");
  const [strICRLetter, setStrICRLetter] = React.useState("");
  const [strICRNumber, setStrICRNumber] = React.useState("");
  const [strSICRSystem, setStrSICRSystem] = React.useState("");
  const [strSICRSubsystem, setStrSICRSubsystem] = React.useState("");
  const [strSICRAuthorizedInspector, setStrSICRAuthorizedInspector] = React.useState("");
  const [strInspectionFrequency, setStrInspectionFrequency] = React.useState("");
  const [strInspectionCriteria, setStrInspectionCriteria] = React.useState("");
  const [strDeficiencyAction, setStrDeficiencyAction] = React.useState("");

  const infoChange=() => {
    var parameterInfo = {};
    parameterInfo.strParameterAuditorRepresentative=strAuditorRepresentative;
    parameterInfo.strParameterICRLetter=strICRLetter;
    parameterInfo.strParameterICRNumber=strICRNumber;
    parameterInfo.strParameterSICRSystem=strSICRSystem;
    parameterInfo.strParameterSICRSubsystem=strSICRSubsystem;
    parameterInfo.strParameterSICRAuthorizedInspector=strSICRAuthorizedInspector;
    parameterInfo.strParameterInspectionFrequency=strInspectionFrequency;
    parameterInfo.strParameterInspectionCriteria=strInspectionCriteria;
    parameterInfo.strParameterDeficiencyAction=strDeficiencyAction;
    props.parameterInfo(parameterInfo);
  };

  React.useEffect(() => {
    infoChange();
  }, [strAuditorRepresentative, strICRLetter, strICRNumber, 
    strSICRSystem, strSICRSubsystem, strSICRAuthorizedInspector, strInspectionFrequency, strInspectionCriteria, strDeficiencyAction]);
  React.useEffect(() => {
    if(data != null){
      setStrAuditorRepresentative(data.strAuditorRepresentative);
      setStrICRLetter(data.strICRLetter);
      setStrICRNumber(data.strICRNumber);
      setStrSICRSystem(data.strSICRSystem);
      setStrSICRSubsystem(data.strSICRSubsystem);
      setStrSICRAuthorizedInspector(data.strSICRAuthorizedInspector);
      setStrInspectionFrequency(data.strInspectionFrequency);
      setStrInspectionCriteria(data.strInspectionCriteria);
      setStrDeficiencyAction(data.strDeficiencyAction);
    }
  }, [data]);
  return (
    <div className="PageContent">
        <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={24} sm={24} xs={24} style={colStyle}>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={6} sm={6} xs={12} style={colStyle}>
                        <Form>
                            <Fieldset>
                                <Label>Auditor's Designated Representative</Label>
                                <Input
                                label="Auditor Representative"
                                placeholder=""
                                value={strAuditorRepresentative}
                                onChange={ (event) => {
                                    setStrAuditorRepresentative(event.target.value);
                                    infoChange();
                                }}
                                
                                />                     
                            </Fieldset>
                        </Form>
                    </Col>
                    <Col md={6} sm={6} xs={12} style={colStyle}>
                        <Form>
                        <Fieldset>
                            <Label>ICR Letter</Label>                   
                            <Input                       
                                placeholder=""
                                value={strICRLetter}
                                onChange={ (event) => {
                                setStrICRLetter(event.target.value);
                                infoChange();
                                }}
                                style={{ width: "90%" }}
                            />
                        </Fieldset>
                        </Form>
                    </Col>
                    <Col md={6} sm={6} xs={12} style={colStyle}>
                        <Form>
                        <Fieldset>
                            <Label>ICR Number</Label>                 
                            <Input                       
                                placeholder=""
                                value={strICRNumber}
                                onChange={ (event) => {
                                setStrICRNumber(event.target.value);
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
                <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={9} sm={9} xs={12} style={colStyle}>
                    <Form>
                    <Fieldset>
                        <Label>SICR System:</Label>
                        <Input                       
                            placeholder=""
                            value={strSICRSystem}
                            onChange={ (event) => {
                            setStrSICRSystem(event.target.value);
                            infoChange();
                            }}
                        /> 
                    </Fieldset>
                    </Form>
                </Col>
                <Col md={9} sm={9} xs={12} style={colStyle}>
                    <Form>
                    <Fieldset>
                        <Label>SICR Subsystem:</Label>
                        <Input                       
                            placeholder=""
                            value={strSICRSubsystem}
                            onChange={ (event) => {
                            setStrSICRSubsystem(event.target.value);
                            infoChange();
                            }}
                        /> 
                    </Fieldset>
                    </Form>
                </Col>
                <Col md={18} sm={18} xs={18} style={colStyle}>
                    <Form>
                    <Fieldset>
                        <Label>SICR Authorized inspector:</Label>
                        <Textarea placeholder="" 
                            style={{ height: 'auto' }}  
                            rows={2}
                            value={strSICRAuthorizedInspector}
                            onChange={(event)=>{
                                setStrSICRAuthorizedInspector(event.target.value);
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
                <Row>
                    <Col md={18} sm={18} xs={18}>
                        <Form>
                            <Label>Inspection Frequency</Label>
                            <Input                       
                            placeholder=""
                            value={strInspectionFrequency}
                            onChange={ (event) => {
                            setStrInspectionFrequency(event.target.value);
                            infoChange();
                            }}
                        /> 
                        </Form>
                    </Col>
                    <Col md={18} sm={18} xs={18} style={colStyle}>
                    <Form>
                    <Fieldset>
                        <Label>Inspection Criteria:</Label>
                        <Textarea placeholder="" 
                            style={{ height: 'auto' }}  
                            rows={2}
                            value={strInspectionCriteria}
                            onChange={(event)=>{
                                setStrInspectionCriteria(event.target.value);
                                infoChange();
                            }}                               
                            />     
                    </Fieldset>
                    </Form>
                </Col>
                <Col md={18} sm={18} xs={18} style={colStyle}>
                    <Form>
                    <Fieldset>
                        <Label>Deficiency Action:</Label>
                        <Textarea placeholder="" 
                            style={{ height: 'auto' }}  
                            rows={2}
                            value={strDeficiencyAction}
                            onChange={(event)=>{
                                setStrDeficiencyAction(event.target.value);
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

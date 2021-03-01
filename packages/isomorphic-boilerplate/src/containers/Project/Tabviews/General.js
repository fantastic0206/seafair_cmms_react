import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
import Input, { InputGroup ,Textarea} from "@iso/components/uielements/input";
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import Checkbox from '@iso/components/uielements/checkbox';
import DateTimePicker from 'react-datetime-picker';
import {
  Fieldset,
  // Form,
  Label,  
  GeneralLine
} from '../../Asset/Facility/OnlineContent.styles';
// import EquipmentPartModal from '../../../../component/EquipmentPartModal';
// import EquipmentLocatedModal from '../../../../component/EquipmentLocatedModal';
// import AccountsModal from  '../../../../component/AccountsModal';
// import ChargeDepartmentModal from  '../../../../component/ChargeDepartmentModal';

const FormItem = Form.Item;

const formItem1 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 }   
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
  },  
};
const lineBar = {
  textAlign: "left",
  height: "20px",
  whiteSpace: "nowrap",
  verticalAlign: "middle",  
  background: "#e8edf0",
  padding: "5px 0 3px 10px",
  color: "#738796",
  /* font-family: arial; */
  fontSize: "13px"
};
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
   const [strName, setStrName] = React.useState('');
   const [strOld, setStrOld] = React.useState('');
   const [equipmentPartModalActive,setEquipmentPartModalActive]=React.useState(false);
  const[equipmentLocatedModalActive,setEquipmentLocatedModalActive]=React.useState(false);
  const [accountsModalActive,setAccountsModalActive]=React.useState(false);
  const [chargeDepartModalActive,setChargeDepartModalActive]=React.useState(false);
  const [completedDate, setCompletedDate] = React.useState(new Date());

	 const onSend = () => { 
      var send={};
      send.strName=strName;
      send.strOld=strOld;
		// props.onChange(send);
   }
   const handleCancel = () => {
    setEquipmentPartModalActive(false);
    setEquipmentLocatedModalActive(false);
    setAccountsModalActive(false);
    setChargeDepartModalActive(false)
  };
  return (
  <div  className="PageContent">
   
    <InputGroup size="large" style={{ marginBottom: "15px" }}>             
    <div style={lineBar}>
    Projected Dates
    </div>             
                <Row style={rowStyle} gutter={16} justify="start">   
                {/* <Col md={1} sm={1} xs={2} > 
                </Col>      */}
                  <Col md={10} sm={10} xs={22} style={{marginLeft:"30px"}}> 
                       <Row style={rowStyle1} gutter={16} justify="start">
                          <Form>
                          <Fieldset>
                            <Label>Suggested Completion Date</Label>
                            <DateTimePicker
                                onChange={setCompletedDate}
                                value={completedDate}
                              />
                          </Fieldset>
                        </Form>
                       </Row>
                       <Row style={rowStyle1} gutter={16} justify="start">
                          <Form>
                          <Fieldset>
                            <Label>Suggested Completion Date</Label>
                            <DateTimePicker
                                onChange={setCompletedDate}
                                value={completedDate}
                              />
                          </Fieldset>
                        </Form>
                       </Row>
                  </Col>
                </Row>

      </InputGroup>     
	</div>
  );
}

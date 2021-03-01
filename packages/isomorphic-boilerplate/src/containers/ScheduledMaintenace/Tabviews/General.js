import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
import Input, { InputGroup ,Textarea} from "@iso/components/uielements/input";
// import Radio, { RadioGroup } from '@iso/components/uielements/radio';
// import Checkbox from '@iso/components/uielements/checkbox';
import DateTimePicker from 'react-datetime-picker';
import {
  Fieldset,
  // Form,
  Label,  
  // GeneralLine
} from '../../Asset/Facility/OnlineContent.styles';
import UsersContentModal from '../../../component/UsersContentModal';
// import UsersContentModal2 from '../../../component/UsersContentModal';

import AccountsModal from  '../../../component/AccountsModal';
import ChargeDepartmentModal from  '../../../component/ChargeDepartmentModal';

const FormItem = Form.Item;

const isNumeric = (str) => {
  // if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
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
  const {scheduledmaintenance,pageState}=props;
   const [equipmentPartModalActive,setEquipmentPartModalActive]=React.useState(false);
  const[equipmentLocatedModalActive,setEquipmentLocatedModalActive]=React.useState(false);
  const [accountsModalActive,setAccountsModalActive]=React.useState(false);
  const [chargeDepartModalActive,setChargeDepartModalActive]=React.useState(false);
  const [completedDate, setCompletedDate] = React.useState(new Date());
  const [userModalActive,setUserModalActive]=React.useState(false);
   
  const [assingedUser,setAssigneduser]=React.useState('');
  const [completedUser,setCompletedUser]=React.useState('');
  const [strDescription, setStrDescription] = React.useState("");
  const [strAssignedUsers, setStrAssignedUsers] = React.useState("");
  const [intCompletedByUserID, setIntCompletedByUserID] = React.useState("");
  const [strAccount,setStrAccount]=React.useState("");
  const [intAccountID,setIntAccountID]=React.useState(null);
  const [strChargeDepartment,setStrChargeDepartment]=React.useState("");
  const [intChargeDepartment,setIntChargeDepartment]=React.useState(null);
  const [strWorkInstruction,setStrWorkInstruction]=React.useState("");
  const [intAssignedUserId,setIntAssignedUserId]=React.useState(null);
  const [dblTimeEstimatedHours,setDblTimeEstimatedHours]=React.useState("");

   const handleCancel = () => {
    setEquipmentPartModalActive(false);
    setEquipmentLocatedModalActive(false);
    setAccountsModalActive(false);
    setChargeDepartModalActive(false);
    setUserModalActive(false);
    
  };
  const selectAssignedUser=(row)=>{
    //props.selectAssignedUser(row.strFullName);
    setIntAssignedUserId(row._id);
    setStrAssignedUsers(row.bolGroup?"Any member of the '"+row.strFullName+"' grop":row.strFullName);    
    props.selectAssignedUser(row);
}

React.useEffect(() => { 
  if(pageState=="edit"){
    console.log(scheduledmaintenance,'scheduledmaintenance');
    if(Object.keys(scheduledmaintenance).length !=0){
      if(scheduledmaintenance.intChargeDepartmentID!=null){
        setStrChargeDepartment("("+scheduledmaintenance.intChargeDepartmentID.strCode+")"+scheduledmaintenance.intChargeDepartmentID.strDescription);
        setIntChargeDepartment(scheduledmaintenance.intChargeDepartmentID._id);
        props.selectedChargeDepartment(scheduledmaintenance.intChargeDepartmentID);
      }
      if(scheduledmaintenance.intAccountID!=null){
        setStrAccount("("+scheduledmaintenance.intAccountID.strCode+")"+scheduledmaintenance.intAccountID.strDescription)
        setIntAccountID(scheduledmaintenance.intAccountID._id);
        props.selectedAccount(scheduledmaintenance.intAccountID);
      }

      if(scheduledmaintenance.intAssignedToUserID!=null){
        setStrAssignedUsers(scheduledmaintenance.intAssignedToUserID.strFullName)
        setIntAssignedUserId(scheduledmaintenance.intAssignedToUserID._id);
       props.selectAssignedUser(scheduledmaintenance.intAssignedToUserID);
      }

      setStrDescription(scheduledmaintenance.strDescription);
      setStrWorkInstruction(scheduledmaintenance.strWorkInstruction);
      setStrAssignedUsers(scheduledmaintenance.strAssignedUser);
      setDblTimeEstimatedHours(parseFloat(scheduledmaintenance.dblTimeEstimatedHours));
      console.log(isNumeric(scheduledmaintenance.dblTimeEstimatedHours),'this is number',scheduledmaintenance.dblTimeEstimatedHours);
        var inf={}; 
        inf.strDescription=scheduledmaintenance.strDescription;
        inf.strWorkInstruction=scheduledmaintenance.strWorkInstruction;  
        inf.dblTimeEstimatedHours=scheduledmaintenance.dblTimeEstimatedHours;
        props.generalInfChange(inf);
   
    } 
    
  }
},[scheduledmaintenance])
const selectedAccount=(row)=>{
  setStrAccount("("+row.strCode+")"+row.strDescription);
  setIntAccountID(row._id);
 props.selectedAccount(row);
  
}
const selectedChargeDepart =(row)=>{
  setStrChargeDepartment("("+row.strCode+")"+row.strDescription);
  setIntChargeDepartment(row._id); 
  props.selectedChargeDepartment(row);

}
const generalInfChange=()=>{
  var inf={};
  // inf. intAccountID=intAccountID;
  // inf.intChargeDepartment=intChargeDepartment;
  inf.strDescription=strDescription;
  inf.strWorkInstruction=strWorkInstruction;
  // inf.intAssignedUserId=intAssignedUserId;
  inf.dblTimeEstimatedHours=dblTimeEstimatedHours;
  props.generalInfChange(inf);
}
  return (
  <div  className="PageContent">
    <InputGroup size="large" style={{ marginBottom: "15px" }}>             
               <Row style={rowStyle} gutter={16} style={{background: "#e8edf0", padding: "5px 0 3px 10px",marginBottom:'15px'}}>
                  <Col md={24} sm={24} xs={24} >
                    <div style={{color: "#738796"}}>Cost Tracking</div>
                  </Col>
                </Row>

                <Row style={rowStyle} gutter={16} justify="start">
                  <Col md={6} sm={6} xs={12} >
                      <Form>
                          <Fieldset>
                            <Label>Account</Label>
                            <div style={{ position: "relative" }}>
                              <Input
                                value={strAccount}
                                placeholder=""
                                style={{ width: "90%" }}
                                onChange={()=>setAccountsModalActive(true)}
                              />
                              <i
                                className="ionicons ion-arrow-down-b"
                              onClick={()=>{setAccountsModalActive(true)}}
                                style={{
                                  fontSize: "25px",
                                  cursor: "pointer",
                                  position: "absolute",
                                  marginLeft: "5px",
                                }}
                              ></i>
                            </div>
                          </Fieldset>
                      </Form>
                   </Col>
                   <Col md={6} sm={6} xs={12} >
                      <Form>
                          <Fieldset>
                            <Label>Charge Department</Label>
                            <div style={{ position: "relative" }}>
                              <Input
                                value={strChargeDepartment}
                                placeholder=""
                                onChange={()=>setChargeDepartModalActive(true)}
                                style={{ width: "90%" }}
                              />
                              <i
                                className="ionicons ion-arrow-down-b"
                              onClick={()=>{setChargeDepartModalActive(true)}}
                            
                                style={{
                                  fontSize: "25px",
                                  cursor: "pointer",
                                  position: "absolute",
                                  marginLeft: "5px",
                                }}
                              ></i>
                            </div>
                          </Fieldset>
                      </Form>
                   </Col>
                </Row>
                <Row style={rowStyle} gutter={16} style={{background: "#e8edf0", padding: "5px 0 3px 10px",marginBottom:'15px'}}>
                  <Col md={24} sm={24} xs={24} >
                    <div style={{color: "#738796"}}>Maintenance</div>
                  </Col>
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">
                   <Col md={14} sm={14} xs={24} >
                   <Form>
                      <Fieldset>
                        <Label>Summary of Issue</Label>
                        <FormItem
                          validateStatus={strDescription == ""? "error" : "success"}
                          help={strDescription == ""? "this field is require" : ""}
                        >
                          <Textarea placeholder="" 
                            style={{ height: 'auto' }}  
                            rows={3}
                            name="strDescription"
                            value={strDescription}
                            onChange={(event)=>{
                              setStrDescription(event.target.value);
                              props.setStrDescription(event.target.value);
                            }} 
                            onKeyUp={()=>{generalInfChange();}}                  
                          /> 
                        </FormItem>
                    </Fieldset>
                    </Form> 
                   </Col>
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">
                   <Col md={8} sm={8} xs={24} >
                     <Form>
                      <Fieldset>
                        <Label>Work Instructions</Label>
                        <Textarea placeholder="" 
                          style={{ height: 'auto' }}  
                          rows={6}
                          name="strWork"
                          value={strWorkInstruction}
                          onChange={(event)=>{setStrWorkInstruction(event.target.value);}}       
                          onKeyUp={()=>{generalInfChange();}}                        
                        /> 
                    </Fieldset>
                    </Form> 
                  </Col>
                  <Col md={6} sm={6} xs={24} >
                      <Row style={rowStyle1} gutter={16} justify="start">
                        <Form style={{width:"100%"}}>
                          <Fieldset>
                            <Label>Assigned To User</Label>
                            <div style={{position:"relative"}}>   
                              <FormItem
                                hasFeedback
                                validateStatus={strAssignedUsers == ""? "error" : "success"}
                                help={strAssignedUsers == ""? "this field is require" : ""}
                                style={{ width: "90%" }}
                              >              
                              <Input 
                                placeholder="" 
                                value={strAssignedUsers}
                                onChange={()=>setUserModalActive(true)}
                              /> 
                              </FormItem>
                              <i className="ionicons ion-arrow-down-b"
                             onClick={()=>{setUserModalActive(true)}}
                                style={{ 
                                  top: "0",
                                  right: "0",
                                  marginRight: "10px",
                                  fontSize: "25px", 
                                  cursor: "pointer" , 
                                  position: "absolute",
                                  marginLeft:'4px'}}
                               ></i>
                            </div>
                        </Fieldset>
                        </Form>                        
                       </Row>
                       
                       <Row style={rowStyle1} gutter={16} justify="start">
                       <Col md={12} sm={12} xs={12} style={{marginTop:"20px",marginBottom:"16px"}}>
                       <Form>
                          <Fieldset>
                            <Label>Estimated Labor</Label>                                   
                              <div style={{position:"relative"}}>
                              <FormItem
                                hasFeedback
                                validateStatus={(dblTimeEstimatedHours != "" && !isNaN(dblTimeEstimatedHours)) ? "success" : "error"}
                                help={(dblTimeEstimatedHours != "" && !isNaN(dblTimeEstimatedHours)) ? "" : "this field is number" }
                                style={{ width: "80%" }}
                              >
                              <Input 
                                placeholder=""
                                value={dblTimeEstimatedHours}
                                onChange={(event)=>{
                                  setDblTimeEstimatedHours(event.target.value);
                                  props.setEstimatedHour(event.target.value);
                                }}
                                onKeyUp={()=>{generalInfChange();}}
                              /> 
                              </FormItem>
                              <label style={{top: "4px", right: "-20px", position: "absolute"}}>hours</label> 
                              {/* <span style={{left:"60px",position:"absolute",top:"5px"}}>hours</span> */}
                            </div>
                             
                        </Fieldset>
                        </Form>  
                        </Col>                      
                       </Row>
                                             
                  </Col>
                </Row>

      </InputGroup>
      {/* customize modal start */}
       < UsersContentModal
        visible={userModalActive}
        title="Users"
        group="all"
        selectUser={selectAssignedUser}
        onCancel={handleCancel}
      >
      </UsersContentModal>     
          
          <AccountsModal
          visible={accountsModalActive}
          onCancel={handleCancel}
          title="ACCOUNTS"
          selectedAccount={selectedAccount}
          // okText={article.key ? 'Update Article' : 'Add Article'}
          // onOk={() => handleRecord('insert', article)}
          onCancel={handleCancel}
          >
          </AccountsModal>
          <ChargeDepartmentModal
           visible={chargeDepartModalActive}
           onCancel={handleCancel}
           title="CHARGE DEPARTMENTS"
           selectedChargeDepart={selectedChargeDepart}
           // okText={article.key ? 'Update Article' : 'Add Article'}
           // onOk={() => handleRecord('insert', article)}
           onCancel={handleCancel}
          >

          </ChargeDepartmentModal>
          {/* customize modal end */}
	</div>
  );
}

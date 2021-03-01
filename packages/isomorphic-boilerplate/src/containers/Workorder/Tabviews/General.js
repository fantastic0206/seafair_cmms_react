import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
import Input, { InputGroup ,Textarea} from "@iso/components/uielements/input";
// import Radio, { RadioGroup } from '@iso/components/uielements/radio';
// import Checkbox from '@iso/components/uielements/checkbox';
// import DateTimePicker from 'react-datetime-picker';
import { DatePicker, TimePicker } from 'antd';
import moment from "moment";
import {
  Fieldset,
  // Form,
  Label,  
  // GeneralLine
} from '../../Asset/Facility/OnlineContent.styles';
import UsersContentModal from '../../../component/UsersContentModal';
import UsersContentModal2 from '../../../component/UsersContentModal';

const FormItem = Form.Item;

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
const isNumeric = (str) => {
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
export default function(props) {   
  const {workorder,pageState}=props;
  const [equipmentPartModalActive,setEquipmentPartModalActive]=React.useState(false);
  const[equipmentLocatedModalActive,setEquipmentLocatedModalActive]=React.useState(false);
  const [accountsModalActive,setAccountsModalActive]=React.useState(false);
  const [chargeDepartModalActive,setChargeDepartModalActive]=React.useState(false);
  const [completedDate, setCompletedDate] = React.useState(null);
  const [userModalActive,setUserModalActive]=React.useState(false);
  const [userModal2Active,setUserModal2Active]=React.useState(false);  
  const [assingedUser,setAssigneduser]=React.useState('');
  const [completedUser,setCompletedUser]=React.useState('');
  const [strDescription, setStrDescription] = React.useState("");
  const [strAssignedUsers, setStrAssignedUsers] = React.useState("");
  const [strEstimatedHours, setStrEstimatedHours] = React.useState("");
  const [strActualHours, setStrActualHours] = React.useState("");
  const [intCompletedByUserID, setIntCompletedByUserID] = React.useState("");
  const [intAssignedUserId,setIntAssignedUserId]=React.useState(null);
  const [estimatedStartDate, setEstimatedStartDate]=React.useState(null);
  const [estimatedStartTime,setEstimatedStartTime]=React.useState("");


  const handleCancel = () => {
    setEquipmentPartModalActive(false);
    setEquipmentLocatedModalActive(false);
    setAccountsModalActive(false);
    setChargeDepartModalActive(false);
    setUserModalActive(false);
    setUserModal2Active(false)
  };
  const selectAssignedUser=(row)=>{
    props.selectAssignedUser(row);
    setStrAssignedUsers(row.bolGroup?"Any member of the '"+row.strFullName+"' grop":row.strFullName);    
  }
  const selectCompletedUser=(row)=>{
    props.selectCompletedUser(row);
    setCompletedUser(row.bolGroup?"Any member of the '"+row.strFullName+"' grop":row.strFullName);
  }
  const CompletedDateChange=(val,dateString)=>{
     
      setCompletedDate(dateString==""?null:dateString);
      props.selectcompltedDate(dateString==""?null:dateString);
  }
  React.useEffect(() => { 
  
    if(pageState=="edit"){
      if(Object.keys(workorder).length ===0)
        return;

      setStrAssignedUsers(workorder.workorder.strAssignedUsers);   
      setIntAssignedUserId(workorder.workorder.intAssignedUserId);
      setCompletedDate(workorder.workorder.dtmDateCompleted);
      setStrDescription(workorder.workorder.strDescription);
      setStrEstimatedHours(workorder.workorder.intEstimatedHour);
      setStrActualHours(workorder.workorder.intActualHour);
      setEstimatedStartDate(workorder.workorder.dtmEstimatedStartDate);
      setEstimatedStartTime(workorder.workorder.dtmEstimatedStartTime==undefined?"":workorder.workorder.dtmEstimatedStartTime);
      
      console.log(workorder.workorder.dtmEstimatedStartTime);

      props.selectcompltedDate(workorder.workorder.dtmDateCompleted);
      props.strDescriptionChange(workorder.workorder.strDescription)

      if(Object.keys(workorder.completedUser).length !==0){
        setCompletedUser(workorder.completedUser.strFullName);
        props.selectCompletedUser(workorder.completedUser);
      }
      
      if(Object.keys(workorder.assignedUser).length !==0){
        setCompletedUser(workorder.assignedUser.strFullName);
        props.selectAssignedUser(workorder.assignedUser);
      }
      
    }
  },[workorder])
  return (
  <div  className="PageContent">
    <InputGroup size="large" style={{ marginBottom: "10px" }}>             
                {/* <Row style={rowStyle} gutter={16} justify="start">                  
                <Col md={14} sm={14} xs={24}>
                   <Form>
                      <Fieldset>
                        <Label>Summary of Issue</Label>                      
                        <Textarea placeholder="" 
                          style={{ height: 'auto' }}  
                          rows={3}
                          name="strDescription"
                          onChange={(event)=>{props.strDescriptionChange(event.target.value)}}                               
                        /> 
                    </Fieldset>
                    </Form> 
                  
                </Col>         
                </Row>                */}
                <Row style={rowStyle} gutter={16} justify="start">
                  {/* <Col md={8} sm={8} xs={24} >
                     <label>Work Instructions</label>
                     <Textarea placeholder="strDescription" 
                      style={{ height: 'auto' }}  
                      rows={13}                               
                     /> 
                  </Col> */}
                   <Col md={8} sm={8} xs={24} >
                     <Form>
                      <Fieldset>
                        <Label>Summary of Issue</Label>
                        <FormItem
                          validateStatus={strDescription == ""? "error" : "success"}
                          help={strDescription == ""? "this field is require" : ""}
                        >
                        <Textarea placeholder="" 
                          style={{ height: 'auto' }}  
                          rows={6}
                          name="strDescription"
                          value={strDescription}
                          onChange={(event)=>{setStrDescription(event.target.value);props.strDescriptionChange(event.target.value)}}                               
                        /> 
                      </FormItem>
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
                                <Input placeholder=""  style={{marginBottom:'10px'}} 
                                value={strAssignedUsers}
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
                                  marginLeft:'4px'
                                }}
                               ></i>
                            </div>
                        </Fieldset>
                        </Form>                        
                        </Row>
                        <Row style={rowStyle1} gutter={16} justify="start">
                        <Col md={13} sm={13} xs={13} >
                          <Form>
                            <Fieldset style={{paddingBottom: "10px"}}>
                              <Label>Estimated Start Date</Label>
                              <FormItem
                                validateStatus={estimatedStartDate == null? "error" : "success"}
                                help={estimatedStartDate == null? "this field is require" : ""}
                              > 
                                <DatePicker value={estimatedStartDate!=null?moment(estimatedStartDate,'YYYY-MM-DD'):""} 
                                
                                onChange={
                                  (value, dateString) => {
                                    console.log(value,dateString)
                                    // let date = new moment(dateString).toDate();
                                    // date.setHours(8);
                                    setEstimatedStartDate(dateString==""?null:dateString);
                                    props.setEstimatedStartDate(dateString==""?null:moment(dateString));
                                  }}  />
                                
                              </FormItem>
                            </Fieldset>
                          </Form>
                          </Col>
                          <Col md={11} sm={11} xs={11} >
                          <Form>
                            <Fieldset style={{paddingBottom: "10px"}}>
                              <Label>Time</Label>
                              <FormItem>                                
                                  <TimePicker                                
                                  value={estimatedStartTime==""?null:moment(estimatedStartTime, 'HH:mm:ss')}
                                  defaultValue={null}
                                  onChange={value => {
                              
                                    props.setEstimatedStartTime(value==null?"":new moment(value).format("HH:mm:ss"));
                                   setEstimatedStartTime(value==null?"":new moment(value).format("HH:mm:ss"));
                                  }} ></TimePicker>
                              </FormItem>
                            </Fieldset>
                          </Form>
                          </Col>
                        </Row>
                       <Row style={rowStyle1} gutter={16} justify="start">
                        <Form>
                          <Fieldset>
                            <Label>Estimated Labor</Label>
                            <div style={{position:"relative"}}>
                              <FormItem
                                hasFeedback
                                validateStatus={(strEstimatedHours != "" && isNumeric(strEstimatedHours)) ? "success" : "error"}
                                help={(strEstimatedHours != "" && isNumeric(strEstimatedHours)) ? "" : "this field is number" }
                                style={{ width: "80%" }}
                              >
                                <Input 
                                  value={strEstimatedHours}
                                  onChange={(event) => {
                                    props.setStrEstimatedHours(event.target.value);
                                    setStrEstimatedHours(event.target.value);
                                  }}
                                  placeholder=""  
                                  // style={{marginRight:'10px',marginBottom:'10px'}} 
                                /> 
                              </FormItem>
                              <label style={{top: "4px", right: "0", position: "absolute"}}>hours</label> 
                            </div>
                        </Fieldset>
                        </Form>                        
                       </Row>
                       <Row style={rowStyle1} gutter={16} justify="start">
                       <Form style={{width:"100%"}}>
                          <Fieldset>
                            <Label>Completed By User</Label>
                            <div style={{position:"relative"}}>                
                              <Input placeholder=""  style={{marginBottom:'10px'}}
                                value={completedUser}
                                onChange={()=>setUserModal2Active(true)}
                              /> 
                              <i className="ionicons ion-arrow-down-b"
                                 onClick={()=>{setUserModal2Active(true)}}
                                style={{ fontSize: "25px", cursor: "pointer" , 
                                  position: "absolute", marginLeft:'4px' }}
                               ></i>
                            </div>
                        </Fieldset>
                        </Form>                        
                       </Row>
                       <Row style={rowStyle} gutter={16} justify="start">
                        <Form>
                          <Fieldset>
                            <Label>Actual Labor</Label>
                            <div style={{position:"relative"}}>               
                                <Input
                                  value={strActualHours}
                                  onChange={(event) => {
                                    props.setStrActualHours(event.target.value);
                                    setStrActualHours(event.target.value);
                                  }} 
                                  placeholder=""  
                                  style={{width:'100px'}} 
                                /> 
                              <label style={{top: "4px",position: "absolute"}}>hours</label> 
                            </div>
                        </Fieldset>
                        </Form>                        
                       </Row>
                       <Row style={rowStyle1} gutter={16} justify="start">
                        <Form>
                          <Fieldset>
                            <Label>Actual Completion Date</Label>
                              <DatePicker  value={completedDate!=null?moment(completedDate,'YYYY-MM-DD'):""} onChange={CompletedDateChange}  />
                          </Fieldset>
                        </Form>
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
      < UsersContentModal2
        visible={userModal2Active}
        title="Users"
        selectUser={selectCompletedUser}
        onCancel={handleCancel}
      >
      </UsersContentModal2>
          {/* <EquipmentLocatedModal
              visible={equipmentLocatedModalActive}
              onCancel={handleCancel}
              title="FACILITIES"
              // okText={article.key ? 'Update Article' : 'Add Article'}
              // onOk={() => handleRecord('insert', article)}
              onCancel={handleCancel}
          >
          </EquipmentLocatedModal>
          <AccountsModal
          visible={accountsModalActive}
          onCancel={handleCancel}
          title="ACCOUNTS"
          // okText={article.key ? 'Update Article' : 'Add Article'}
          // onOk={() => handleRecord('insert', article)}
          onCancel={handleCancel}
          >
          </AccountsModal>
          <ChargeDepartmentModal
           visible={chargeDepartModalActive}
           onCancel={handleCancel}
           title="CHARGE DEPARTMENTS"
           // okText={article.key ? 'Update Article' : 'Add Article'}
           // onOk={() => handleRecord('insert', article)}
           onCancel={handleCancel}
          >

          </ChargeDepartmentModal> */}
          {/* customize modal end */}
	</div>
  );
}

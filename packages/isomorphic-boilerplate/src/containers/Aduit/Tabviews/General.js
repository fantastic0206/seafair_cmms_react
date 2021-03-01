import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
import Input, { InputGroup ,Textarea} from "@iso/components/uielements/input";
// import Radio, { RadioGroup } from '@iso/components/uielements/radio';
// import Checkbox from '@iso/components/uielements/checkbox';
// import DateTimePicker from 'react-datetime-picker';
import { DatePicker, Space } from 'antd';
import moment from "moment";
import {
  Fieldset,
  // Form,
  Label,  
  // GeneralLine
} from '../../Asset/Facility/OnlineContent.styles';
import CrewContentModal from '../../../component/CrewContentModal';
import CrewContentModal2 from '../../../component/CrewContentModal';
import newInnerImg  from '../../../assets/images/new-inner-list.png';


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
  const {workorder,pageState}=props;

  const [completedDate, setCompletedDate] = React.useState(null);
  const [crewContentModalActive,setCrewContentModalActive]=React.useState(false);
  const [crewContentModal2Active,setCrewContentModal2Active]=React.useState(false);
  const [strAssignedUser,setStrAssignedUser]=React.useState("");
  const [strParticipating,setStrParticipating]=React.useState("");
   const handleCancel = () => {
    setCrewContentModalActive(false);
    setCrewContentModal2Active(false);
  };
  const selectAssignee=(row)=>{
    // props.selectAssignedUser(row);
    setStrAssignedUser(row.strUserTitle);    
}
const selectParticipate=(row)=>{
  setStrParticipating(row.strUserTitle);    
}
// const selectCompletedUser=(row)=>{
//   props.selectCompletedUser(row);
//    setCompletedUser(row.bolGroup?"Any member of the '"+row.strFullName+"' grop":row.strFullName);
// }
const CompletedDateChange=(val,dateString)=>{
    setCompletedDate(dateString);
    // props.selectcompltedDate(dateString);
}
// React.useEffect(() => { 
  
//   if(pageState=="edit"){
//     if(Object.keys(workorder).length ===0)
//       return;

//      setStrAssignedUsers(workorder.workorder.strAssignedUsers);   
//      setIntAssignedUserId(workorder.workorder.intAssignedUserId);
//      setCompletedDate(workorder.workorder.dtmDateCompleted);
//      setStrDescription(workorder.workorder.strDescription);
    
//      props.selectcompltedDate(workorder.workorder.dtmDateCompleted);
//      props.strDescriptionChange(workorder.workorder.strDescription)

//      if(Object.keys(workorder.completedUser).length !==0){
//        setCompletedUser(workorder.completedUser.strFullName);
//        props.selectCompletedUser(workorder.completedUser);
//      }
    
//      if(Object.keys(workorder.assignedUser).length !==0){
//       setCompletedUser(workorder.assignedUser.strFullName);
//       props.selectAssignedUser(workorder.assignedUser);
//     }
    
//   }
// },[workorder])
  return (
  <div  className="PageContent">
    <InputGroup size="large" style={{ marginBottom: "10px" }}>             
               
                <Row style={rowStyle} gutter={16} justify="start">                 
                   <Col md={8} sm={8} xs={24} >
                   <Row style={rowStyle1} gutter={16} justify="start">
                       <Col md={18} sm={18} xs={24} >
                        <Form style={{width:"100%"}}>
                          <Fieldset>
                            <Label>Assignee</Label>
                            <div style={{position:"relative"}}>                
                              <Input placeholder=""  style={{marginBottom:'10px'}} 
                               value={strAssignedUser}
                              /> 
                              <i className="ionicons ion-arrow-down-b"
                                onClick={()=>{setCrewContentModalActive(true)}}
                                style={{ fontSize: "25px", cursor: "pointer" , 
                                  position: "absolute",marginLeft:'4px'}}
                               ></i>
                            </div>
                        </Fieldset>
                        </Form>   
                        </Col>                     
                       </Row>

                   <Row style={rowStyle} gutter={16} justify="start">
                   <Col md={24} sm={24} xs={24} >     
                        <Form>
                          <Fieldset>
                            <Label>Drill Description</Label>
                            <Textarea placeholder="" 
                              style={{ height: 'auto' }}  
                              rows={4}
                              name="strDescription"
                              // value={strDescription}
                              // onChange={(event)=>{setStrDescription(event.target.value);props.strDescriptionChange(event.target.value)}}                               
                            /> 
                        </Fieldset>
                        </Form> 
                    </Col>
                    </Row>
                  </Col>
                  <Col md={5} sm={5} xs={24} >
                  <div style={{position:"relative"}}>
                      <div style={{height: "200px",overflow: "auto",borderRadius: "4px", border: "1px solid rgb(205, 209, 215)", padding: "4px", margin: "4px"}}><table cellPadding="0" cellSpacing="0" >
                      <tbody>
                      <tr>
                            <th>Crew Name</th>
                            <th>Crew Role</th>
                            <th></th>
                      </tr>
                      <tr>
                        <td  >
                          <span><a >user Role</a></span>
                        </td>
                        <td >
                          <span><a >user name</a></span>
                        </td>
                        <td style={{paddingLeft:"10px"}}><span><a title="Remove" style={{color:"black"}}>X</a></span></td>
                      </tr>   
                                      
                      </tbody>
                    </table></div>
                    <div style={{position:"absolute",cursor:"pointer",width:"100%",height:"30px",padding: "0px 5px",}} onClick={()=>setCrewContentModal2Active(true)}>
                      <img style={{width:"13px",height:"12px",}} src={newInnerImg} ></img>
                      <span style={{paddingLeft:"5px",fontSize: "11px",fontWeight:"bold"}} >Add another participating crew</span>
                  </div>
                  </div>
                              
                      
                  </Col>
                </Row> 

      </InputGroup>
      {/* customize modal start */}
      < CrewContentModal
        visible={crewContentModalActive}
        title="CREWS"
        group="user"
        selectUser={selectAssignee }
        onCancel={handleCancel}
      >
      </CrewContentModal>
      < CrewContentModal2
        visible={crewContentModal2Active}
        title="CREWS"
        group="user"
        selectUser={selectParticipate }
        onCancel={handleCancel}
      >
      </CrewContentModal2>
          {/* customize modal end */}
	</div>
  );
}

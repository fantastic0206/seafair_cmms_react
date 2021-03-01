import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Switch from "react-switch";
import Button from "@iso/components/uielements/button";
import Input, { InputGroup ,Textarea} from "@iso/components/uielements/input";
import Tabs, { TabPane } from "@iso/components/uielements/tabs";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import {Fieldset, Label,TableTabsStyle } from "./User.styles";
import UserPageWrapper from "./SingleUser.styles";
import { Account,Groups } from "./Tabviews/Tabviews";
import userActions from '../../redux/user/actions';
import { Col, Row, Form, } from "antd";

const { addUser } = userActions;

const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
};
const colStyle = {
  marginBottom: "16px",
};
const colSwitchStyle = {
  marginTop:"30px"
};
const gutter = 16;
function callback(key) {} 
export default function (props) {
  const dispatch = useDispatch();
  const {   redirectPath } = props;
  const [strFullName, setStrFullName] = React.useState('');
  const [intUserStatusID, setIntUserStatusID] = React.useState(true);
  const [strTelephone2, setStrTelephone2] = React.useState('');
  const [strEmailAddress, setStrEmailAddress] = React.useState('');
  const [strUserTitle, setStrUserTitle] = React.useState('');
  const [strPersonnelCode, setStrPersonnelCode] = React.useState('');
  const [strUserName, setStrUserName] = React.useState('');
  const [strTelephone, setStrTelephone] = React.useState('');
  const [strNotes, setStrNotes] = React.useState('');
  const [strRequestNotes, setStrRequestNotes] = React.useState('');
  const [bolGroup, setBolGroup] = React.useState(false);
  const [bolApiManaged, setBolApiManaged] = React.useState(false);
  const [strPreferences, setStrPreferences] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordconfirm, setPasswordconfirm] = React.useState('');
  const [strGroupIds,setStrGroupIds]=React.useState('');

  const accountIf=(inf)=>{  
    setStrEmailAddress(inf.strEmailAddress);
    setStrTelephone(inf.strTelephone);
    setStrTelephone2(inf.strTelephone2);
    setStrUserName(inf.strUserName);
    setPassword(inf.password);
    setPasswordconfirm(inf.passwordconfirm);
  }
   const onSave = () => {
    var sendData = {     
      'strFullName'    :strFullName,
      'intUserStatusID'    :intUserStatusID,
      'strTelephone2'    :strTelephone2,
      'strEmailAddress'    :strEmailAddress,
      'strUserTitle'    :strUserTitle,
      'strPersonnelCode'    :strPersonnelCode,
      'strUserName'    :strUserName,
      'strTelephone'    :strTelephone,
      'strNotes'    :strNotes,
      'strRequestNotes'    :strRequestNotes,
      'bolGroup'    :bolGroup,
      'bolApiManaged'    :bolApiManaged,
      'strPreferences'    :strPreferences,
      'password':password,
      'passwordconfirm':passwordconfirm,
      'strGroupIds':strGroupIds
    }
    dispatch(addUser(sendData));
  };  
  const selectedGroups=(ids)=>{  
    setStrGroupIds(ids);
  }
  return (
    <LayoutWrapper>
    
          <div className="PageHeader">           
              <Link to="/dashboard/user">             
                <Button color="primary">
                  <span>Back</span>
                </Button>
              </Link>
            <Button type="primary" onClick={onSave} className="saveBtn">
              <span>Save</span>
            </Button>
          </div>
          <TableTabsStyle className="isoLayoutContentAsset">           
          <UserPageWrapper className="editView">
            <div className="PageContent">
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={10} sm={10} xs={24} style={colStyle}>               
                  <Form>
                  <Fieldset>
                    <Label>Full Name</Label>                  
                      <Input
                        value={strFullName}
                        placeholder=""
                        onChange={(event) => {
                          setStrFullName(event.target.value);
                        }}
                        style={{ width: "90%" }}
                      />
                  </Fieldset>
                </Form>                 
                </Col>                
                <Col md={12} sm={12} xs={24} style={colSwitchStyle}>
                  <label style={{ position: "relative" }}>
                    <Switch checked={intUserStatusID} onChange={()=>{setIntUserStatusID(!intUserStatusID)}} />
                    <span
                      style={{
                        position: "absolute",
                        top: "-10px",
                        left: "65px",
                      }}
                    >
                      {intUserStatusID ? "Active" : "Inactive"}
                    </span>
                  </label>
                </Col>                
                <Col md={8} sm={8} xs={24} style={colStyle}>
                  <Form>
                    <Fieldset>
                      <Label>Personal Code</Label>                  
                        <Input
                          value={strPersonnelCode}
                          placeholder=""
                          onChange={(event) => {
                            setStrPersonnelCode(event.target.value);
                          }}
                          style={{ width: "90%" }}
                        />
                    </Fieldset>
                  </Form>      
                </Col>
                <Col md={8} sm={8} xs={24} style={colStyle}>
                  <Form>
                    <Fieldset>
                      <Label>Title</Label>                  
                        <Input
                          value={strUserTitle}
                          placeholder=""
                          onChange={(event) => {
                            setStrUserTitle(event.target.value);
                          }}
                          style={{ width: "90%" }}
                        />
                    </Fieldset>
                  </Form>      
                </Col>  
                </Row>
                </div>
                </UserPageWrapper>      
                <Tabs
          defaultActiveKey="1"
          className="isoTableDisplayTab"
          onChange={callback}
        >
          <TabPane tab="Account" key="1">
                <Account
                accountIf={accountIf}
                pageState={"add"}
                user={{}}
                ></Account>
          </TabPane>   
          <TabPane tab="Groups" key="2">
           <Groups
           selectedGroups={selectedGroups}
           pageState={"add"}
           groupIds={[]}
           ></Groups>
          </TabPane>
          <TabPane tab="Reports To" key="3">
            Content of Tab Pane 4
          </TabPane>
          </Tabs>
          </TableTabsStyle>   
    </LayoutWrapper>
  );
}

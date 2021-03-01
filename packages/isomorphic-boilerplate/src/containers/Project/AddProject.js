import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@iso/components/uielements/button";
import Input, { InputGroup ,Textarea} from "@iso/components/uielements/input";
import DateTimePicker from 'react-datetime-picker';
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import { TableTabsStyle } from "../Asset/Asset.styles";
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import PageWrapper from "./SingleWorkOrder.styles";
// import Checkbox from '@iso/components/uielements/checkbox';
import projectAction from '../../redux/project/actions';
import { Col, Row, Form } from "antd";
import {General} from './Tabviews/Tabviews';
import WorkOrderStatusModal from '../../component/WorkOrderStatusModal';
import MaintenanceTypeModal from '../../component/MaintenanceTypeModal';
import PriorityModal from '../../component/PriorityModal';
import {
  Fieldset,
  // Form,
  Label,  
  GeneralLine
} from '../Asset/Facility/OnlineContent.styles';
const FormItem = Form.Item;

const { add } = projectAction;
function callback(key) {}
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
};
const colStyle = {
  marginBottom: "16px",
};
const gutter = 16;

export default function (props) {
  const dispatch = useDispatch();
  const { redirectPath } = props;
  const [SuggestedDate, setSuggestedDate] = React.useState(new Date());
  const [statusModalActive,setStatusModalActive]=React.useState(false)  

  const [strName, setStrName] = React.useState('');
  const [strDescription, setStrDescription] = React.useState('');
  const onSave = () => {   
    var sendData = {     
     'strName'    :strName,
     'strDescription'    :strDescription,    
     }
    console.log(sendData);
      dispatch(add(sendData));
  };  
  
  const handleCancel = () => {
    setStatusModalActive(false);  
  };
  return (
    <LayoutWrapper>
      <div className="PageHeader">
        <Link to={"/dashboard/project"}>
          <Button color="primary">
            <span>Back</span>
          </Button>
        </Link>

        <Button type="primary" onClick={onSave} className="saveBtn">
          <span>Save</span>
        </Button>
      </div>
      <TableTabsStyle className="isoLayoutContentAsset">
        <h4 style={{ marginBottom: "15px" }}>Project:</h4>
        <PageWrapper className="editView">
          <div className="PageContent">
            <Row style={rowStyle} gutter={gutter} justify="start">             
              <Col md={10} sm={10} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Name</Label>                   
                    <Input
                        label="Name"
                        placeholder="Project Name"    
                        value={strName}
                        onChange={(event)=>{setStrName(event.target.value)}}
                        style={{width:"50%"}}
                    />                   
                  </Fieldset>                 
                </Form>
              </Col>
              <Col md={15} sm={15} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Description</Label>
                    <Textarea placeholder="Description" 
                          style={{ height: 'auto',width:"80%" }}  
                          value={strDescription}
                          onChange={(event)=>{                           
                            setStrDescription(event.target.value);
                          }}
                          rows={4}                               
                       />
                  </Fieldset>
                </Form>
              </Col>
            </Row>            
            
          </div>
        </PageWrapper>
        <Tabs defaultActiveKey="1"  className="isoTableDisplayTab" onChange={callback}>
              <TabPane tab="General" key="1" >
                <General></General>
              </TabPane>
              <TabPane tab="Scheduled Maintenance" key="2" >
                  Scheduled Maintenance 2
              </TabPane>
              <TabPane tab="Work Orders" key="3" >
                 Work Orders
              </TabPane>                           
            </Tabs>
      </TableTabsStyle>
    
     
    </LayoutWrapper>
  );
}

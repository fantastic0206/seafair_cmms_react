import React from 'react';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Button from '@iso/components/uielements/button';
import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import Input, { InputGroup ,Textarea} from "@iso/components/uielements/input";
import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import AssetPageWrapper from "./SingleAsset.styles";
import { TableTabsStyle } from "./Asset.styles";
import { Col, Row, Form } from "antd";

import {General} from './Equipment/Tabviews/Tabviews';
const FormItem = Form.Item;
// const TabPane = Tabs.TabPane;

function callback(key) {}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 }   
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
  
};
const formItemCode = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
    className:"labelLeft"
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
  
};
const formItemCategory = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
    className:"labelLeft"
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
  
};
const formItemDescription={
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 21 },
  },
}
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
};
const endRowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginBottom:"20px"
};
const colStyle = {
  marginBottom: "2px",
};
const gutter = 16;

export default function () {
  const [state, setState] = React.useState({   
    tabPosition: 'top',
    newTabIndex: 0,
  });

  return (
    <LayoutContentWrapper>  
        <div className="PageHeader">            
              {/* <Link >              */}
                <Button color="primary">
                  <span>Back</span>
                </Button>
              {/* </Link>  */}
            <Button type="primary" className="saveBtn">
              <span>Save</span>
            </Button>
        </div> 
      
          <TableTabsStyle className="isoLayoutContent">
          <AssetPageWrapper className="editView">
            <div className="PageContent">
              <InputGroup size="large" style={{ marginBottom: "15px" }}>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="">
                      <Input placeholder="strName" 
                     />
                    </FormItem>
                  </Form>                 
                </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} sm={12} xs={24} style={{marginBottom: "12px"}}>
                  <Form>
                    <FormItem {...formItemDescription} label="">
                    <Textarea placeholder="strDescription" 
                      style={{ height: 'auto' }}                                
                     />                    
                    </FormItem>
                  </Form>                 
                </Col>
                </Row>
                <Row style={endRowStyle} gutter={gutter} justify="start">
                  <Col md={8} sm={8} xs={24} >
                    <Form>
                      <FormItem {...formItemCode}  label="Code">
                      <Input placeholder="Code" 
                     />                  
                      </FormItem>
                    </Form>                 
                  </Col>
                  <Col md={8} sm={8} xs={24} >
                    <Form>
                      <FormItem {...formItemCategory}  label="Category">
                      <Input placeholder="Category" 
                     />                  
                      </FormItem>
                    </Form>                 
                  </Col>
                  <Col md={1} sm={1} xs={1} >
                    <i className="ionicons ion-arrow-down-b"
                       style={{fontSize:'25px',cursor: "pointer"}}></i>
                  </Col>
                </Row>
              </InputGroup>
            </div>
          </AssetPageWrapper> 
            <Tabs defaultActiveKey="1"  className="isoTableDisplayTab" onChange={callback}>
              <TabPane tab="General" key="1" >
                <General></General>
              </TabPane>
              <TabPane tab="Parts/BOM" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Metering/Events" key="3">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="Personel" key="4">
                Content of Tab Pane 4
              </TabPane>
              <TabPane tab="Business" key="5">
                Content of Tab Pane 5
              </TabPane>
              <TabPane tab="Purchasing" key="6">
                Content of Tab Pane 6
              </TabPane>
              <TabPane tab="Files" key="7">
                Content of Tab Pane 7
              </TabPane>
              <TabPane tab="Custom" key="8">
                Content of Tab Pane 8
              </TabPane>
              <TabPane tab="Log" key="9">
                Content of Tab Pane 9
              </TabPane>
            </Tabs>
          </TableTabsStyle>    
         
        </LayoutContentWrapper>
  );
}

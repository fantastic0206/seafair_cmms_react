import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@iso/components/uielements/button";
import Input, { InputGroup, Textarea } from "@iso/components/uielements/input";
import Box from "@iso/components/utility/box";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import Tabs, { TabPane } from "@iso/components/uielements/tabs";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import PageWrapper from "./Single.styles";
import { TableTabsStyle } from "./Asset.styles";
// import Checkbox from '@iso/components/uielements/checkbox';
 import { AssetCategory ,DrillCategory,DrillType} from "./Tabviews/Tabviews";
import usergroupAction from "../../redux/usergroup/actions";
import { Col, Row, Form } from "antd";
const FormItem = Form.Item;

const { add } = usergroupAction;
function callback(key) {}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
};
const colStyle = {
  marginBottom: "16px",
};
const gutter = 16;

export default function AddUserGroup() {
  const dispatch = useDispatch();
  const [strFullName, setStrFullName] = React.useState("");
  const onSave = () => {
    var sendData = {
      strName: strFullName,
    };
    console.log(sendData);
    dispatch(add(sendData));
  };
  React.useEffect(() => {
    console.log("init add user group");
  }, []);
  return (
    <LayoutContentWrapper>
      <div className="PageHeader">
        {/* <Link to="/dashboard/usergroup">
          <Button color="primary">
            <span>Back</span>
          </Button>
        </Link> */}
        <Button type="primary" className="saveBtn" onClick={onSave}>
          <span>Save</span>
        </Button>
      </div>
      <TableTabsStyle className="isoLayoutContentAsset">
        <PageWrapper className="editView">
          <h3>Cmms Settings</h3>
          <div className="PageContent">
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={10} sm={10} xs={24} style={colStyle}>
                
              </Col>
            </Row>
          </div>
        </PageWrapper>
        <Tabs
          defaultActiveKey="1"
          className="isoTableDisplayTab"
          onChange={callback}
        >
          <TabPane tab="System" key="1">
            System 1
          </TabPane>
          <TabPane tab="Asset Categories" key="2">
             <AssetCategory></AssetCategory>
          </TabPane>
          <TabPane tab="Drill Category" key="3">
            <DrillCategory></DrillCategory>
          </TabPane>
          <TabPane tab="Drill Type" key="4">
            <DrillType></DrillType>
          </TabPane>
          <TabPane tab="Purchasing" key="5">
            {/* <MenuPermission></MenuPermission> */}
          </TabPane>
          <TabPane tab="Purchasing Permissions" key="6">
            Purchasing Permissions 3
          </TabPane>
        </Tabs>
      </TableTabsStyle>
    </LayoutContentWrapper>    
  );
}

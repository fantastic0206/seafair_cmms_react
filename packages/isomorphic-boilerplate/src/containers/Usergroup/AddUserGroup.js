import React from "react";
import { Link,  useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from "@iso/components/uielements/button";
import Input, { InputGroup, Textarea } from "@iso/components/uielements/input";
// import Box from "@iso/components/utility/box";
// import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import Tabs, { TabPane } from "@iso/components/uielements/tabs";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import PageWrapper from "./Single.styles";
import { TableTabsStyle } from "./Asset.styles";
// import Checkbox from '@iso/components/uielements/checkbox';
import { Users,AssignedAsset } from "./Tabviews/Tabviews";
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
  let history = useHistory();
  const { isSaved} = useSelector((state) => state.UserGroup);
  const [strFullName, setStrFullName] = React.useState("");
  const onSave = () => {
    var sendData = {
      strName: strFullName,
    };
    console.log(sendData);
    dispatch(add(sendData));
  };
  React.useEffect(() => {
    if (isSaved) {
      history.push('/dashboard/usergroup');
    }
  }, [isSaved]);
  return (
    <LayoutContentWrapper>
      <div className="PageHeader">
        <Link to="/dashboard/usergroup">
          <Button color="primary">
            <span>Back</span>
          </Button>
        </Link>
        <Button type="primary" className="saveBtn" onClick={onSave}>
          <span>Save</span>
        </Button>
      </div>
      <TableTabsStyle className="isoLayoutContentAsset">
        <PageWrapper className="editView">
          <div className="PageContent">
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={10} sm={10} xs={24} style={colStyle}>
                <Form>
                  <FormItem {...formItemLayout} label="Full Name">
                    <Input type="text" placeholder="Full Name" 
                      value={strFullName} onChange={(event)=>{setStrFullName(event.target.value)}}
                    />
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </div>
        </PageWrapper>
        <Tabs
          defaultActiveKey="1"
          className="isoTableDisplayTab"
          onChange={callback}
        >
          <TabPane tab="Users" key="1">
            <Users
              userGroupId={null}
              pageState={"add"}
            ></Users>
          </TabPane>
           <TabPane tab="Assigned Assets" key="2">
           <AssignedAsset
           userGroupId={null}
           pageState={"add"}
           ></AssignedAsset>
          </TabPane>
         {/* <TabPane tab="Menu Permissions" key="3">
            <MenuPermission></MenuPermission>
          </TabPane>
          <TabPane tab="Purchasing Permissions" key="4">
            Purchasing Permissions 3
          </TabPane> */}
        </Tabs>
      </TableTabsStyle>
    </LayoutContentWrapper>
    // <LayoutWrapper>
    //   <Box>
    //     <PageWrapper className="editView">
    //       <div className="PageHeader">

    //           <Link to="/dashboard/usergroup">
    //             <Button color="primary">
    //               <span>Back</span>
    //             </Button>
    //           </Link>

    //         <Button type="primary" onClick={onSave} className="saveBtn">
    //           <span>Save</span>
    //         </Button>
    //       </div>

    //       <div className="PageContent">
    //         {/* <InputGroup size="large" style={{ marginBottom: "15px" }}> */}
    //           <Row style={rowStyle} gutter={gutter} justify="start">
    //             <Col md={10} sm={10} xs={24} style={colStyle}>
    //               <Form>
    //                 <FormItem {...formItemLayout} label="Full Name">
    //                   <Input type="text" placeholder="intPriorityID"

    //                   />
    //                 </FormItem>
    //               </Form>
    //             </Col>

    //             </Row>
    //         {/* </InputGroup> */}
    //       </div>
    //     </PageWrapper>
    //   </Box>
    // </LayoutWrapper>
  );
}

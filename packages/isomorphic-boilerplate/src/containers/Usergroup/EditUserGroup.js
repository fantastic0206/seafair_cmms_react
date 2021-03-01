import React from "react";
import { Link,useHistory,useParams } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import Button from "@iso/components/uielements/button";
import Input, { InputGroup, Textarea } from "@iso/components/uielements/input";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import Tabs, { TabPane } from "@iso/components/uielements/tabs";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import PageWrapper from "./Single.styles";
import { TableTabsStyle } from "./Asset.styles";
// import Checkbox from '@iso/components/uielements/checkbox';
import { MenuPermission ,Users,AssignedAsset} from "./Tabviews/Tabviews";
import usergroupAction from "../../redux/usergroup/actions";
import { Col, Row, Form } from "antd";
const FormItem = Form.Item;

const { updateData,getUserGroupById,deleteData } = usergroupAction;
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
  const { groupId } = useParams();
  const [strFullName, setStrFullName] = React.useState("");
  const { usergroup,isDelete} = useSelector((state) => state.UserGroup);
  const onSave = () => {
    var sendData = {
      strName: strFullName,
    };
    console.log(sendData);
    dispatch(updateData(sendData,groupId));
  };
  React.useEffect(() => {
    dispatch(getUserGroupById(groupId));  
  }, []);
  React.useEffect(() => {
    if(Object.keys(usergroup).length !==0){
      setStrFullName(usergroup.strFullName);     
    }
  }, [usergroup]);
  const onDelete=()=>{
    dispatch(deleteData(groupId));
  }
  React.useEffect(() => { 
    if(isDelete){
      history.push("/dashboard/usergroup");
    }    
  }, [isDelete]);
  return (
    <LayoutContentWrapper>
      <div className="PageHeader">
        <Link to="/dashboard/usergroup">
          <Button color="primary">
            <span>Back</span>
          </Button>
        </Link>
        <Button type="primary" className="saveBtn" onClick={onSave} style={{marginLeft:"10px",marginRight:"10px"}}>
          <span>Save</span>
        </Button>
        <Button type="danger" className="saveBtn" onClick={onDelete} >
              <span>Delete</span>
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
              userGroupId={groupId}
              pageState={"edit"}
            ></Users>
          </TabPane>
          <TabPane tab="Assigned Assets" key="2">
           <AssignedAsset
           userGroupId={groupId}
           pageState={"edit"}
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

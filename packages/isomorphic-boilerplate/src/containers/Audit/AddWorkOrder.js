import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@iso/components/uielements/button";
import Input, { InputGroup, Textarea } from "@iso/components/uielements/input";
// import DateTimePicker from "react-datetime-picker";
import { DatePicker } from 'antd';
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import { TableTabsStyle } from "./Asset.styles";
import Tabs, { TabPane } from "@iso/components/uielements/tabs";
import PageWrapper from "./SingleWorkOrder.styles";
// import Checkbox from '@iso/components/uielements/checkbox';
import workorderAction from "../../redux/workorder/actions";
import { Col, Row, Form } from "antd";
import moment from "moment";
import { General,LaborTask } from "./Tabviews/Tabviews";
import WorkOrderStatusModal from "../../component/WorkOrderStatusModal";
import MaintenanceTypeModal from "../../component/MaintenanceTypeModal";
import PriorityModal from "../../component/PriorityModal";
import ProjectModal from "../../component/ProjectModal";
import AssetModal from "../../component/AssetModal"
import OtherAssetModal from "../../component/AssetModal"
import newInnerImg  from '../../assets/images/new-inner-list.png';

import {
  Fieldset,
  // Form,
  Label, 
} from "../Asset/Facility/OnlineContent.styles";
const FormItem = Form.Item;

const { updateData ,add} = workorderAction;
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
const tdStyle={
  maxWidth:"110px", 
  width:"170px",
  whiteSpace:"nowrap",
  textAlign:"left",
  textOverflow:"ellipsis",
  overflow:"hidden",
}
export default function (props) {
  const dispatch = useDispatch();
  const { redirectPath } = props;
  const { workorderId} = useSelector((state) => state.Workorders);
  const [SuggestedDate, setSuggestedDate] = React.useState(new Date());
  const [statusModalActive, setStatusModalActive] = React.useState(false);
  const [maintainTypeModalActive, setMaintainTypeModalActive] = React.useState(
    false
  );
  const [maintanaceTypeId, setMaintanaceTypeId] = React.useState("");
  const [maintanaceTypeTxt, setMaintanaceTypeTxt] = React.useState("");
  // const [priorityId,setPriorityId]=React.useState('');
  const [priorityTxt, setPriorityTxt] = React.useState("");
  const [priorityModalActive, setPriorityModalActive] = React.useState(false);
  const [projectModalActive, setProjectModalActive] = React.useState(false);

  // const [selectedStatusId,setSelectedStatusId]=React.useState('');
  const [selectedStatusText, setSelectedStatusText] = React.useState("Open");
  const [intPriorityID, setIntPriorityID] = React.useState("");
  const [intWorkOrderStatusID, setIntWorkOrderStatusID] = React.useState(4);
  const [intSiteID, setIntSiteID] = React.useState(1);
  const [intRequestedByUserID, setIntRequestedByUserID] = React.useState("");
  const [strEmailUserGuest, setStrEmailUserGuest] = React.useState("");
  const [dtmDateCreated, setDtmDateCreated] = React.useState("");
  const [dtmDateCompleted, setDtmDateCompleted] = React.useState(new Date());
  const [intCompletedByUserID, setIntCompletedByUserID] = React.useState(null);
  const [strDescription, setStrDescription] = React.useState("");
  const [strNameUserGuest, setStrNameUserGuest] = React.useState("");
  const [
    dtmSuggestedCompletionDate,
    setDtmSuggestedCompletionDate,
  ] = React.useState(null);
  const [strPhoneUserGuest, setStrPhoneUserGuest] = React.useState("");
  const [strCode, setStrCode] = React.useState("");
  const [strCompletionNotes, setStrCompletionNotes] = React.useState("");
  const [intMaintenanceTypeID, setIntMaintenanceTypeID] = React.useState("");
  const [dtmDateLastModified, setDtmDateLastModified] = React.useState("");
  const [strAdminNotes, setStrAdminNotes] = React.useState("");
  const [intRCAActionID, setIntRCAActionID] = React.useState("");
  const [intRCACauseID, setIntRCACauseID] = React.useState("");
  const [intRCAProblemID, setIntRCAProblemID] = React.useState("");
  const [strProjectTxt, setStrProjectTxt] = React.useState("");
  const [intProjectId, setIntProjectId] = React.useState("");
  const [strAssignedUsers, setStrAssignedUsers] = React.useState("");
  const [assetModalActive,setAssetModalActive]=React.useState(false);
  const [assetName,setAssetName]=React.useState("");
  const [strAssetIds,setStrAssetIds]=React.useState("");
  const [intAssignedUserId,setIntAssignedUserId]=React.useState(null);
  const [otherAssetModalActive,setOtherAssetModalActive]=React.useState(false);
  const [strAssets,setStrAssets]=React.useState("");


  const onSave = () => {
    var sendData = {
      intPriorityID: intPriorityID,
      intWorkOrderStatusID: intWorkOrderStatusID,
      intSiteID: intSiteID,
      intRequestedByUserID: localStorage.getItem("user_id"),
      strEmailUserGuest: strEmailUserGuest,
      dtmDateCreated: dtmDateCreated,
      dtmDateCompleted: dtmDateCompleted,
      intCompletedByUserID: intCompletedByUserID,
      strDescription: strDescription,
      strNameUserGuest: strNameUserGuest,
      dtmSuggestedCompletionDate: dtmSuggestedCompletionDate,
      strPhoneUserGuest: strPhoneUserGuest,
      strCode: strCode,
      strCompletionNotes: strCompletionNotes,
      intMaintenanceTypeID: intMaintenanceTypeID,
      dtmDateLastModified: dtmDateLastModified,
      strAdminNotes: strAdminNotes,
      intRCAActionID: intRCAActionID,
      intRCACauseID: intRCACauseID,
      intRCAProblemID: intRCAProblemID,
      strAssignedUsers: strAssignedUsers,
      strAssetIds:strAssetIds,
      intProjectId:intProjectId,
      intAssignedUserId:intAssignedUserId,
      strAssets:strAssets
    };
    console.log(workorderId);
     dispatch(updateData(sendData,workorderId));
  };
  const selectStatus = (sel) => {
    // workOrder status    
    setIntWorkOrderStatusID(sel.intSysCode);
    setSelectedStatusText(sel.strName);
  };
  const selectMaintenanceType = (id, txt) => {
    setMaintanaceTypeTxt(txt);
    setIntMaintenanceTypeID(id);
  };
  const selectedPriority = (id, txt) => {
    setPriorityTxt(txt);
    setIntPriorityID(id);
  };
  const selectProject = (row) => {
    setStrProjectTxt(row.strName);
    setIntProjectId(row._id);
  };
  const handleCancel = () => {
    setStatusModalActive(false);
    setMaintainTypeModalActive(false);
    setPriorityModalActive(false);
    setProjectModalActive(false);
    setAssetModalActive(false);
    setOtherAssetModalActive(false);
  };
  const strDescriptionChange = (txt) => {   
    setStrDescription(txt);
  };
  const selectAssignedUser = (row) => {
    setStrAssignedUsers(row.strFullName);
    setIntAssignedUserId(row._id);
  };
  const selectCompletedUser = (row) => {
    setIntCompletedByUserID(row._id);
  };
  const selectcompltedDate = (val) => {   
    setDtmDateCompleted(val);
  };
  const selectedAsset=(row)=>{
    setAssetName(row.strName);
    setStrAssets(row.strName+"("+row.strCode+")");
    setStrAssetIds(row._id.toString()) ;
  }
 
  const selectedOtherAsset=(row)=>{
    if(strAssetIds!=""){
      var curAssetIds=strAssetIds.toString();
      var strAsset_tmp=strAssets;      
      var idsArray= curAssetIds.split(",");  
      if(idsArray.indexOf(row._id.toString())==-1){
        curAssetIds=curAssetIds+","+row._id;
        strAsset_tmp=strAsset_tmp+","+row.strName+"("+row.strCode+")";
      }
      console.log(curAssetIds);
      setStrAssetIds(curAssetIds);
      setStrAssets(strAsset_tmp);   
     
    }   
  }
  const removeOtherAsset=(id,asset,index)=>{
   
    var ids_temp=strAssetIds.split(",");
    var assets_temp=strAssets.split(",");
    ids_temp.splice(index,1);
    assets_temp.splice(index,1);
    
    if(ids_temp.length==1){
      setAssetName(assets_temp[0]);      
    }
    setStrAssetIds(ids_temp.join(","));
    setStrAssets(assets_temp.join(","));    
  }
  const onChange=(value, dateString)=> {
    setDtmSuggestedCompletionDate(dateString);
  }
  React.useEffect(() => {     
    var sendData={};
    sendData.intRequestedByUserID=localStorage.getItem("user_id");
    sendData.intWorkOrderStatusID=intWorkOrderStatusID;
    sendData.intSiteID=intSiteID;
    dispatch(add(sendData));
}, []);
const multiAssets=()=>{
  if(strAssetIds!=null && strAssetIds!=""){
    var assetList=null;
    var strAssetIds_tmp=strAssetIds.toString();
    var ids_array=strAssetIds_tmp.split(",");
    var assets_array=strAssets.split(",");
    if(ids_array.length>1){
      var assetList=<div style={{height:"200px",overflow:"auto"}}><table cellPadding="0" cellSpacing="0" >
              <tbody>
                {
                  ids_array.map((row,index)=>{
                   return <tr key={row}>
                      <td style={tdStyle} >
                       <span><a title={assets_array[index]}>{assets_array[index]}</a></span>
                      </td>
                      <td style={{paddingLeft:"10px"}}><span><a onClick={()=>removeOtherAsset(row,assets_array[index],index)} title="Remove" style={{color:"black"}}>X</a></span></td>
                    </tr>
                  })                  
                }                 
                
              </tbody>
            </table></div>
    }
    
  return <div style={{height:"100%",position:"relative"}}>
  <div style={{padding:"5px",paddingTop:"15px"}}>
    {assetList}
  </div>
  <div style={{position:"absolute",cursor:"pointer",width:"100%",height:"30px",bottom:'10px',padding: "0px 5px",}}>
      <img style={{width:"13px",height:"12px",}} src={newInnerImg}></img>
      <span style={{paddingLeft:"5px",fontSize: "11px",fontWeight:"bold"}} onClick={()=>setOtherAssetModalActive(true)}>Add another asset</span>
  </div>
</div>
  }
}
  return (
    <LayoutWrapper>
      <div className="PageHeader">
        <Link to={redirectPath}>
          <Button color="primary">
            <span>Back</span>
          </Button>
        </Link>

        <Button type="primary" onClick={onSave} className="saveBtn">
          <span>Save</span>
        </Button>
      </div>
      <TableTabsStyle className="isoLayoutContentAsset">
        <h4 style={{ marginBottom: "15px" }}>Work Order Administration:</h4>
        <PageWrapper className="editView">
          <div className="PageContent">
          <Row style={rowStyle} gutter={gutter} justify="start">
           <Col md={4} sm={4} xs={24} style={colStyle}>
              {
                multiAssets()
              }
           </Col>
           <Col md={20} sm={20} xs={24} style={colStyle}>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Work Order Status</Label>
                    <div style={{ position: "relative" }}>
                      <Input
                        label="Set Offline By User"
                        placeholder=""
                        value={selectedStatusText}
                        onChange={() => {
                          setStatusModalActive(true);
                        }}
                        style={{ width: "90%" }}
                      />
                      <i
                        className="ionicons ion-arrow-down-b"
                        onClick={() => {
                          setStatusModalActive(true);
                        }}
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
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Asset</Label>
                    <div style={{ position: "relative" }}>
                      <Input
                        value={assetName}
                        placeholder=""
                        style={{ width: "90%" }}
                      />
                      <i
                        className="ionicons ion-arrow-down-b"
                       onClick={()=>{setAssetModalActive(true)}}
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
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Maintenance Type</Label>
                    <div style={{ position: "relative" }}>
                      <Input
                        label="Maintenance Type"
                        placeholder=""
                        value={maintanaceTypeTxt}
                        style={{ width: "90%" }}
                      />
                      <i
                        className="ionicons ion-arrow-down-b"
                        onClick={() => {
                          setMaintainTypeModalActive(true);
                        }}
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
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Project</Label>
                    <div style={{ position: "relative" }}>
                      <Input
                        label="Set Offline By User"
                        placeholder=""
                        value={strProjectTxt}
                        style={{ width: "90%" }}
                      />
                      <i
                        className="ionicons ion-arrow-down-b"
                        onClick={() => {
                          setProjectModalActive(true);
                        }}
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
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Priority</Label>
                    <div style={{ position: "relative" }}>
                      <Input
                        label="Priority"
                        placeholder=""
                        value={priorityTxt}
                        style={{ width: "90%" }}
                      />
                      <i
                        className="ionicons ion-arrow-down-b"
                        onClick={() => {
                          setPriorityModalActive(true);
                        }}
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
              <Col md={8} sm={8} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Suggested Completion Date</Label>
                    {/* <DateTimePicker
                      onChange={(val)=>{setDtmSuggestedCompletionDate(val);}}
                      value={dtmSuggestedCompletionDate}
                    /> */}
                   <DatePicker showTime value={dtmSuggestedCompletionDate!=null?moment(dtmSuggestedCompletionDate,'YYYY-MM-DD HH:mm:ss'):""} onChange={onChange} style={{width:'70%'}}  />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
            </Col>
            </Row>
          </div>
        </PageWrapper>
        <Tabs
          defaultActiveKey="1"
          className="isoTableDisplayTab"
          onChange={callback}
        >
          <TabPane tab="General" key="1">
            <General
              strDescriptionChange={strDescriptionChange}
              selectAssignedUser={selectAssignedUser}
              selectCompletedUser={selectCompletedUser}
              selectcompltedDate={selectcompltedDate}
              workorder={{}}
              pageState={"add"}
            ></General>
          </TabPane>
          <TabPane tab="Completion" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Labor Tasks" key="3">
              <LaborTask
              assetName={assetName}
              assetId={strAssetIds}
              strAssetIds={strAssetIds.split(",")}
              strAssets={strAssets.split(",")}
              workorderId={workorderId}
              pageState={"add"}
              ></LaborTask>
          </TabPane>
          <TabPane tab="Parts" key="4">
            Content of Tab Pane 3
          </TabPane>
          {/* <TabPane tab="Meter Reading" key="4" >
                 Content of Tab Pane 3
              </TabPane> */}
          {/* <TabPane tab="Parts/BOM" key="2">
               <PartsBom></PartsBom>
              </TabPane>
              <TabPane tab="Metering/Events" key="3">
               <Metering></Metering>
              </TabPane>
              <TabPane tab="Personel" key="4">
              <Personal></Personal>
              </TabPane>
              <TabPane tab="Files" key="5">
                Content of Tab Pane 5
              </TabPane>             */}
          {/* <TabPane tab="Custom" key="8">
                Content of Tab Pane 8
              </TabPane> */}
        </Tabs>
      </TableTabsStyle>
      {/* customize modal start */}
      <WorkOrderStatusModal
        visible={statusModalActive}
        selectStatus={selectStatus}
        title="WORK ORDER STATUS"
        onCancel={handleCancel}
      ></WorkOrderStatusModal>

      <AssetModal
       visible={assetModalActive}      
       title="ASSETS"
       selectedAsset={selectedAsset}
       onCancel={handleCancel}
      ></AssetModal>


      <OtherAssetModal
       visible={otherAssetModalActive}      
       title="WORK ORDER ASSETS"
       selectedAsset={selectedOtherAsset}
       onCancel={handleCancel}
      ></OtherAssetModal>

      <MaintenanceTypeModal
        visible={maintainTypeModalActive}
        selectMaintenanceType={selectMaintenanceType}
        title="MAINTENACE TYPES"
        onCancel={handleCancel}
      ></MaintenanceTypeModal>

      <PriorityModal
        visible={priorityModalActive}
        selectedPriority={selectedPriority}
        title="PRIORITIES"
        onCancel={handleCancel}
      ></PriorityModal>
      <ProjectModal
        visible={projectModalActive}
        selectProject={selectProject}
        title="PROJECTES"
        onCancel={handleCancel}
      ></ProjectModal>
      {/*  customize modal end*/}
    </LayoutWrapper>
  );
}

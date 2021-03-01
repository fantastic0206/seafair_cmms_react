import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Input from '@iso/components/uielements/input';
import Switch from 'react-switch';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import { TableTabsStyle } from './Asset.styles';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import { direction } from '@iso/lib/helpers/rtl';
import notification from '@iso/components/Notification';
import PageWrapper from './SingleWorkOrder.styles';
// import Checkbox from '@iso/components/uielements/checkbox';
import SMAction from '../../redux/scheduledmaintenance/actions';
import workorderAction from '../../redux/workorder/actions';
import { Col, Row, Form } from 'antd';
import { General, Scheduling, LaborTask } from './Tabviews/Tabviews';
import WorkOrderStatusModal from '../../component/WorkOrderStatusModal';
import MaintenanceTypeModal from '../../component/MaintenanceTypeModal';
import PriorityModal from '../../component/PriorityModal';
import ProjectModal from '../../component/ProjectModal';
import AssetModal from '../../component/AssetModal';
import OtherAssetModal from '../../component/AssetModal';
import newInnerImg from '../../assets/images/new-inner-list.png';
import {
  Fieldset,
  // Form,
  Label,
} from '../Asset/Facility/OnlineContent.styles';
// import { updateSMData } from "../../redux/scheduledmaintenance/ac";
const FormItem = Form.Item;

const { updateSMData, getAssetById, deleteData } = SMAction;
const { addWorkOrder } = workorderAction;

function callback(key) {}

const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '16px',
};
const gutter = 16;
const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};

const priority = {
  1: 'Hightest',
  2: 'High',
  3: 'Medium',
  4: 'Low',
  5: 'Lowest',
};
const workorderStatus_array = {
  2: 'Requested',
  3: 'Assigned',
  4: 'Open',
  5: 'Work In Progress',
  6: 'On Hold',
  7: 'Closed, Completed',
  8: 'Draft',
  9: 'Closed, Incomplete',
  10: 'Other',
};
const maintanceType_array = {
  1: 'Preventive',
  2: 'Damage',
  3: 'Corrective',
  4: 'Safety',
  5: 'Upgrade',
  6: 'Electrical',
  7: 'Project',
  8: 'Inspection',
  9: 'Meter_Reading',
  10: 'Other',
};
const tdStyle = {
  maxWidth: '110px',
  width: '170px',
  whiteSpace: 'nowrap',
  textAlign: 'left',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};
export default function (props) {
  const dispatch = useDispatch();
  // const { redirectPath } = props;
  const { id } = useParams();
  let history = useHistory();
  const { scheduledmaintenance, isDelete } = useSelector(
    (state) => state.ScheduledMaintenance
  );
  const [statusModalActive, setStatusModalActive] = React.useState(false);
  // const smID=
  const [maintainTypeModalActive, setMaintainTypeModalActive] = React.useState(
    false
  );
  // const [maintanaceTypeId, setMaintanaceTypeId] = React.useState("");
  const [maintanaceTypeTxt, setMaintanaceTypeTxt] = React.useState('');
  // const [priorityId,setPriorityId]=React.useState('');
  const [priorityTxt, setPriorityTxt] = React.useState('');
  const [priorityModalActive, setPriorityModalActive] = React.useState(false);
  const [projectModalActive, setProjectModalActive] = React.useState(false);
  // const [selectedStatusId,setSelectedStatusId]=React.useState('');
  const [selectedStatusText, setSelectedStatusText] = React.useState('Open');
  const [intPriorityID, setIntPriorityID] = React.useState('');
  const [assetName, setAssetName] = React.useState('');
  const [intSiteID, setIntSiteID] = React.useState(''); // assset Id
  const [
    intStartAsWorkOrderStatusID,
    setIntStartAsWorkOrderStatusID,
  ] = React.useState(4);
  const [intSuggestedCompletion, setIntSuggestedCompletion] = React.useState(
    null
  );

  // const [dtmDateCreated, setDtmDateCreated] = React.useState("");
  // const [dtmDateCompleted, setDtmDateCompleted] = React.useState(new Date());
  // const [intCompletedByUserID, setIntCompletedByUserID] = React.useState(null);
  const [strDescription, setStrDescription] = React.useState('');

  const [strCode, setStrCode] = React.useState('');
  const [strCompletionNotes, setStrCompletionNotes] = React.useState('');
  const [intMaintenanceTypeID, setIntMaintenanceTypeID] = React.useState('');
  // const [strAdminNotes, setStrAdminNotes] = React.useState("");
  const [strProjectTxt, setStrProjectTxt] = React.useState('');
  const [intProjectId, setIntProjectId] = React.useState('');
  const [strAssignedUsers, setStrAssignedUsers] = React.useState("");
  const [intAssignedToUserID, setIntAssignedToUserID] = React.useState(null);
  const [assetModalActive, setAssetModalActive] = React.useState(false);
  //
  const [
    intScheduledMaintenanceStatusID,
    setIntScheduledMaintenanceStatusID,
  ] = React.useState(0);
  const [intAccountID, setIntAccountID] = React.useState(null);
  const [intChargeDepartmentID, setIntChargeDepartmentID] = React.useState(
    null
  );
  const [dblTimeEstimatedHours, setDblTimeEstimatedHours] = React.useState(
    null
  );
  const [strWorkInstruction, setStrWorkInstruction] = React.useState('');

  const [otherAssetModalActive, setOtherAssetModalActive] = React.useState(
    false
  );
  const [strAssets, setStrAssets] = React.useState('');
  const [strAssetIds, setStrAssetIds] = React.useState('');
  const [strEstimatedHour, setStrEstimatedHour]=React.useState("");

  const validate = () => {
    let res = true;
    if(assetName == "")
      res = false;
    if(strDescription == "")
      res = false;
    if(strAssignedUsers == "")
      res = false;
    if(strEstimatedHour == "")
      res = false;
    if(!res)
      notification('error',"Please input all required fields!");
    return res;
  }
  const onSave = () => {
    if(!validate())
      return;
    var sendData = {
      intPriorityID: intPriorityID,
      intSiteID: intSiteID,
      intStartAsWorkOrderStatusID: intStartAsWorkOrderStatusID,
      intScheduledMaintenanceStatusID: intScheduledMaintenanceStatusID,
      intSuggestedCompletion: intSuggestedCompletion,
      strCode: strCode,
      intProjectID: intProjectId,
      strCompletionNotes: strCompletionNotes,
      intMaintenanceTypeID: intMaintenanceTypeID,
      //intRequestorUserID:localStorage.getItem("user_id"),
      strDescription: strDescription,
      strWorkInstruction: strWorkInstruction,
      dblTimeEstimatedHours: dblTimeEstimatedHours,
      intAccountID: intAccountID,
      intChargeDepartmentID: intChargeDepartmentID,
      intAssignedToUserID: intAssignedToUserID,
      strAssets: strAssets,
      strAssetIds: strAssetIds,
      strAssignedUser: strAssignedUsers,
      intEstimatedHour: strEstimatedHour,
    };
    dispatch(updateSMData(sendData, id));
  };
  const selectStatus = (sel) => {
    // workOrder status
    setIntStartAsWorkOrderStatusID(sel.intSysCode);
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

  const selectAssignedUser = (row) => {
    setIntAssignedToUserID(row._id);
    setStrAssignedUsers(row.strFullName)
  };

  const selectedAsset = (row) => {
    setAssetName(row.strName);
    // setIntSiteID(row._id) ;

    setStrAssets(row.strName + '(' + row.strCode + ')');
    setStrAssetIds(row._id.toString());
  };
  const selectedAccount = (row) => {
    setIntAccountID(row._id);
  };
  const selectedChargeDepartment = (row) => {
    setIntChargeDepartmentID(row._id);
  };
  // new function
  function handleChange(checked) {
    setIntScheduledMaintenanceStatusID(checked ? 1 : 0);
  }
  React.useEffect(() => {
    // console.log(id,'idddd');
    dispatch(getAssetById(id));
  }, []);
  React.useEffect(() => {
    if (Object.keys(scheduledmaintenance).length === 0) return;
    setIntPriorityID(scheduledmaintenance.intPriorityID);
    setIntSiteID(scheduledmaintenance.intSiteID);
    setIntStartAsWorkOrderStatusID(
      scheduledmaintenance.intStartAsWorkOrderStatusID
    );
    setIntScheduledMaintenanceStatusID(
      scheduledmaintenance.intScheduledMaintenanceStatusID
    );
    setIntSuggestedCompletion(scheduledmaintenance.intSuggestedCompletion);
    setStrCode(scheduledmaintenance.strCode);
    setIntProjectId(scheduledmaintenance.intProjectId);
    setStrCompletionNotes(scheduledmaintenance.strCompletionNotes);
    setIntMaintenanceTypeID(scheduledmaintenance.intMaintenanceTypeID);
    setStrDescription(scheduledmaintenance.strDescription);
    setAssetName(scheduledmaintenance.strAssets);
    setStrAssetIds(scheduledmaintenance.strAssetIds);
    setStrAssets(scheduledmaintenance.strAssets);
    setStrEstimatedHour(scheduledmaintenance.intEstimatedHour);
    setStrAssignedUsers(scheduledmaintenance.strAssignedUser);
    console.log(scheduledmaintenance);
    // setEstimatedHour(scheduledmaintenance.)

    // if(scheduledmaintenance.intSiteID !=null && scheduledmaintenance.intSiteID!=undefined){
    //   setAssetName(scheduledmaintenance.intSiteID.strName);
    // }
    if (
      scheduledmaintenance.intProjectID != null &&
      scheduledmaintenance.intProjectID != undefined
    ) {
      setStrProjectTxt(scheduledmaintenance.intProjectID.strName);
    }

    if (
      scheduledmaintenance.intMaintenanceTypeID != undefined &&
      scheduledmaintenance.intMaintenanceTypeID != null
    ) {
      setMaintanaceTypeTxt(
        maintanceType_array[scheduledmaintenance.intMaintenanceTypeID]
      );
    }
    if (
      scheduledmaintenance.intPriorityID != undefined &&
      scheduledmaintenance.intScheduledMaintenanceStatusID != null
    ) {
      setPriorityTxt(priority[scheduledmaintenance.intPriorityID]);
    }
    if (
      scheduledmaintenance.intStartAsWorkOrderStatusID != undefined &&
      scheduledmaintenance.intStartAsWorkOrderStatusID != null
    ) {
      setSelectedStatusText(
        workorderStatus_array[scheduledmaintenance.intStartAsWorkOrderStatusID]
      );
    }
    // strDescription:strDescription,maintanceType_array
  }, [scheduledmaintenance]);
  const onDelete = () => {
    dispatch(deleteData(id));
  };
  const generalInfChange = (inf) => {
    setStrDescription(inf.strDescription);
    setStrWorkInstruction(inf.strWorkInstruction);
    setDblTimeEstimatedHours(inf.dblTimeEstimatedHours);
  };
  const selectedOtherAsset = (row) => {
    if (strAssetIds != '') {
      var curAssetIds = strAssetIds.toString();
      var strAsset_tmp = strAssets;
      var idsArray = curAssetIds.split(',');
      if (idsArray.indexOf(row._id.toString()) == -1) {
        curAssetIds = curAssetIds + ',' + row._id;
        strAsset_tmp =
          strAsset_tmp + ',' + row.strName + '(' + row.strCode + ')';
      }
      setStrAssetIds(curAssetIds);
      setStrAssets(strAsset_tmp);
    }
  };
  const removeOtherAsset = (id, asset, index) => {
    var ids_temp = strAssetIds.split(',');
    var assets_temp = strAssets.split(',');
    ids_temp.splice(index, 1);
    assets_temp.splice(index, 1);

    if (ids_temp.length == 1) {
      setAssetName(assets_temp[0]);
    }
    setStrAssetIds(ids_temp.join(','));
    setStrAssets(assets_temp.join(','));
  };
  React.useEffect(() => {
    if (isDelete) {
      history.push('/dashboard/scheduledmaintenance');
    }
  }, [isDelete]);
  const onCreateWorkOrder = () => {
    var sendData = {
      intPriorityID: intPriorityID,
      intWorkOrderStatusID:
        intStartAsWorkOrderStatusID == null ? 4 : intStartAsWorkOrderStatusID,
      intSiteID: 1,
      intRequestedByUserID: localStorage.getItem('user_id'),
      // strEmailUserGuest: strEmailUserGuest,
      // dtmDateCreated: dtmDateCreated,
      // dtmDateCompleted: dtmDateCompleted,
      // intCompletedByUserID: intCompletedByUserID,
      strDescription: strDescription,
      // strNameUserGuest: strNameUserGuest,
      // dtmSuggestedCompletionDate: dtmSuggestedCompletionDate,
      // strPhoneUserGuest: strPhoneUserGuest,
      strCode: strCode,
      strCompletionNotes: strCompletionNotes,
      intMaintenanceTypeID: intMaintenanceTypeID,
      // dtmDateLastModified: dtmDateLastModified,
      // strAdminNotes: strAdminNotes,
      // intRCAActionID: intRCAActionID,
      // intRCACauseID: intRCACauseID,
      // intRCAProblemID: intRCAProblemID,
      // strAssignedUsers: strAssignedUsers,
      strAssetIds: strAssetIds,
      intProjectId: intProjectId,
      // intAssignedUserId:intAssignedUserId,
      strAssets: strAssets,
    };

    console.log(sendData);
    dispatch(addWorkOrder(sendData));
  };
  const multiAssets = () => {
    if (strAssetIds != null && strAssetIds != '') {
      var assetList = null;
      var strAssetIds_tmp = strAssetIds.toString();
      var ids_array = strAssetIds_tmp.split(',');
      var assets_array = strAssets.split(',');
      if (ids_array.length > 1) {
        var assetList = (
          <div style={{ height: '200px', overflow: 'auto' }}>
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                {ids_array.map((row, index) => {
                  return (
                    <tr key={row}>
                      <td style={tdStyle}>
                        <span>
                          <a title={assets_array[index]}>
                            {assets_array[index]}
                          </a>
                        </span>
                      </td>
                      <td style={{ paddingLeft: '10px' }}>
                        <span>
                          <a
                            onClick={() =>
                              removeOtherAsset(row, assets_array[index], index)
                            }
                            title="Remove"
                            style={{ color: 'black' }}
                          >
                            X
                          </a>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }

      return (
        <div style={{ height: '100%', position: 'relative' }}>
          <div style={{ padding: '5px', paddingTop: '15px' }}>{assetList}</div>
          <div
            style={{
              position: 'absolute',
              cursor: 'pointer',
              width: '100%',
              height: '30px',
              bottom: '10px',
              padding: '0px 5px',
            }}
          >
            <img
              style={{ width: '13px', height: '12px' }}
              src={newInnerImg}
            ></img>
            <span
              style={{
                paddingLeft: '5px',
                fontSize: '11px',
                fontWeight: 'bold',
              }}
              onClick={() => setOtherAssetModalActive(true)}
            >
              Add another asset
            </span>
          </div>
        </div>
      );
    }
  };
  return (
    <LayoutWrapper>
      <div className="PageHeader">
        <Link to="/dashboard/ScheduledMaintenance">
          <Button color="primary" style={margin}>
            <span>Back</span>
          </Button>
        </Link>

        <Button
          type="primary"
          onClick={onSave}
          className="saveBtn"
          style={margin}
        >
          <span>Save</span>
        </Button>

        <Button type="danger" className="saveBtn" onClick={onDelete} style={margin}>
          <span>Delete</span>
        </Button>

        <Button
          type="info"
          onClick={onCreateWorkOrder}
          className="saveBtn"
          style={margin}
        >
          <span>CREATE WORK ORDER</span>
        </Button>
      </div>
      <TableTabsStyle className="isoLayoutContentAsset">
        <h4 style={{ marginBottom: '15px' }}>Scheduled Maintenance Details:</h4>
        <PageWrapper className="editView">
          <div className="PageContent">
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={4} sm={4} xs={24} style={colStyle}>
                {multiAssets()}
              </Col>
              <Col md={20} sm={20} xs={24} style={colStyle}>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col md={20} sm={20} xs={20} style={colStyle}>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                      <Col md={8} sm={8} xs={24} style={colStyle}>
                        <Form>
                          <Fieldset>
                            <Label>Code</Label>
                            <FormItem
                              hasFeedback
                              validateStatus={strCode == ""? "error" : "success"}
                              help={strCode == ""? "this field is require" : ""}
                            >
                              <Input
                                label="Code"
                                placeholder=""
                                value={strCode}
                                onChange={(event) => {
                                  setStrCode(event.target.value);
                                }}
                              />
                              </FormItem>
                          </Fieldset>
                        </Form>
                      </Col>
                      <Col md={8} sm={8} xs={24} style={colStyle}>
                        <Form>
                          <Fieldset>
                            <Label>Asset</Label>
                            {strAssetIds.includes(',') ? null : (
                              <div style={{ position: 'relative' }}>
                                <FormItem
                                hasFeedback
                                validateStatus={assetName == ""? "error" : "success"}
                                help={assetName == ""? "this field is require" : ""}
                                style={{ width: "90%" }}
                              >
                                <Input
                                  value={assetName}
                                  placeholder=""
                                  onChange={() => {
                                    setAssetModalActive(true);
                                  }}
                                />
                              </FormItem>
                                <i
                                  className="ionicons ion-arrow-down-b"
                                  onClick={() => {
                                    setAssetModalActive(true);
                                  }}
                                  style={{
                                    top: "0",
                                    right: "0",
                                    marginRight: "10px",
                                    fontSize: '25px',
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    marginLeft: '5px',
                                  }}
                                ></i>
                              </div>
                            )}
                          </Fieldset>
                        </Form>
                      </Col>
                      <Col md={6} sm={6} xs={24} style={colStyle}>
                        <div
                          style={{
                            position: 'relative',
                            paddingTop: '25px',
                            paddingLeft: '20px',
                          }}
                        >
                          <Switch
                            checked={
                              intScheduledMaintenanceStatusID ? true : false
                            }
                            onChange={handleChange}
                          />
                          <span
                            style={{
                              position: 'absolute',
                              top: '27px',
                              left: '85px',
                            }}
                          >
                            {intScheduledMaintenanceStatusID
                              ? 'Running'
                              : 'Paused'}
                          </span>
                        </div>
                      </Col>
                      <Col md={8} sm={8} xs={24} style={colStyle}>
                        <Form>
                          <Fieldset>
                            <Label>Start As Work Order Status</Label>
                            <div style={{ position: 'relative' }}>
                              <Input
                                label="Set Offline By User"
                                placeholder=""
                                value={selectedStatusText}
                                onChange={() => {
                                  setStatusModalActive(true);
                                }}
                                style={{ width: '90%' }}
                              />
                              <i
                                className="ionicons ion-arrow-down-b"
                                onClick={() => {
                                  setStatusModalActive(true);
                                }}
                                style={{
                                  fontSize: '25px',
                                  cursor: 'pointer',
                                  position: 'absolute',
                                  marginLeft: '5px',
                                }}
                              ></i>
                            </div>
                          </Fieldset>
                        </Form>
                      </Col>
                      <Col md={8} sm={8} xs={24} style={colStyle}>
                        <Form>
                          <Fieldset>
                            <Label>Maintenance Type</Label>
                            <div style={{ position: 'relative' }}>
                              <Input
                                label="Maintenance Type"
                                placeholder=""
                                value={maintanaceTypeTxt}
                                onChange={() => {
                                  setMaintainTypeModalActive(true);
                                }}
                                style={{ width: '90%' }}
                              />
                              <i
                                className="ionicons ion-arrow-down-b"
                                onClick={() => {
                                  setMaintainTypeModalActive(true);
                                }}
                                style={{
                                  fontSize: '25px',
                                  cursor: 'pointer',
                                  position: 'absolute',
                                  marginLeft: '5px',
                                }}
                              ></i>
                            </div>
                          </Fieldset>
                        </Form>
                      </Col>
                      <Col md={8} sm={8} xs={24} style={colStyle}>
                        <Form>
                          <Fieldset>
                            <Label>Estimated completion</Label>
                            <div style={{ position: 'relative' }}>
                              <Input
                                label="days"
                                placeholder=""
                                value={intSuggestedCompletion}
                                onChange={(event) => {
                                  setIntSuggestedCompletion(event.target.value);
                                }}
                                style={{ width: '40px' }}
                              />
                              <span
                                style={{
                                  position: 'absolute',
                                  top: '5px',
                                  left: '45px',
                                }}
                              >
                                days after WO created
                              </span>
                            </div>
                          </Fieldset>
                        </Form>
                      </Col>
                      <Col md={8} sm={8} xs={24} style={colStyle}>
                        <Form>
                          <Fieldset>
                            <Label>Project</Label>
                            <div style={{ position: 'relative' }}>
                              <Input
                                label="Set Offline By User"
                                placeholder=""
                                value={strProjectTxt}
                                onChange={() => setProjectModalActive(true)}
                                style={{ width: '90%' }}
                              />
                              <i
                                className="ionicons ion-arrow-down-b"
                                onClick={() => {
                                  setProjectModalActive(true);
                                }}
                                style={{
                                  fontSize: '25px',
                                  cursor: 'pointer',
                                  position: 'absolute',
                                  marginLeft: '5px',
                                }}
                              ></i>
                            </div>
                          </Fieldset>
                        </Form>
                      </Col>
                      <Col md={8} sm={8} xs={24} style={colStyle}>
                        <Form>
                          <Fieldset>
                            <Label>Priority</Label>
                            <div style={{ position: 'relative' }}>
                              <Input
                                label="Priority"
                                placeholder=""
                                value={priorityTxt}
                                onChange={() => setPriorityModalActive(true)}
                                style={{ width: '90%' }}
                              />
                              <i
                                className="ionicons ion-arrow-down-b"
                                onClick={() => {
                                  setPriorityModalActive(true);
                                }}
                                style={{
                                  fontSize: '25px',
                                  cursor: 'pointer',
                                  position: 'absolute',
                                  marginLeft: '5px',
                                }}
                              ></i>
                            </div>
                          </Fieldset>
                        </Form>
                      </Col>
                    </Row>
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
              selectAssignedUser={selectAssignedUser}
              selectedAccount={selectedAccount}
              selectedChargeDepartment={selectedChargeDepartment}
              generalInfChange={generalInfChange}
              scheduledmaintenance={scheduledmaintenance}
              setEstimatedHour={setStrEstimatedHour}
              setStrDescription={setStrDescription}
              pageState={'edit'}
            ></General>
          </TabPane>
          <TabPane tab="Scheduling" key="2">
            <Scheduling
              smId={id}
              pageState={'edit'}
              strCode={strCode}
              intScheduledMaintenanceStatusID={intScheduledMaintenanceStatusID}
            ></Scheduling>
          </TabPane>
          <TabPane tab="Parts" key="3">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Labor Tasks" key="4">
            <LaborTask
              assetName={assetName}
              assetId={strAssetIds}
              strAssetIds={strAssetIds.split(',')}
              strAssets={strAssets.split(',')}
              workorderId={6}
              scheduledMaintenaceId={id}
              pageState={'edit'}
            ></LaborTask>
          </TabPane>
          <TabPane tab="Parts" key="5">
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

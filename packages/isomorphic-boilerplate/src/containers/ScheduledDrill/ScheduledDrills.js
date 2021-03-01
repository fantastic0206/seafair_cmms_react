import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch,useHistory } from "react-router-dom";
// import notification from '@iso/components/Notification';
import Input, { InputSearch } from '@iso/components/uielements/input';
// import HelperText from "@iso/components/utility/helper-text";
// import Select, { SelectOption } from '@iso/components/uielements/select';
import {  Tooltip } from 'antd';
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageHeader from "@iso/components/utility/pageHeader";
import IntlMessages from "@iso/components/utility/intlMessages";
// import Scrollbars from "@iso/components/utility/customScrollBar";
import Button from "@iso/components/uielements/button";
import { Col, Row } from "antd";
import Actions from "../../redux/scheduleddrill/actions";
import userAction from "../../redux/user/actions";
import CardWrapper, { Box } from "./Asset.styles";
import TableWrapper from "../../component/AntTables.styles";

const { initData } = Actions;
const {getAllUserData}=userAction;
// const priority={
//   1:"Hightest",2:"High",3:"Medium",4:"Low",5:"Lowest"
// }
// const workorderStatus_array={
//   2:"Requested",3:"Assigned",4:"Open",
//   5:"Work In Progress",
//   6:"On Hold",
//   7:"Closed, Completed",
//   8:"Draft",
//   9:"Closed, Incomplete",
//   10:"Other"
// }
// const maintanceType_array={
//   1:"Preventive",
//   2:"Damage",
//   3:"Corrective",
//   4:"Safety",
//   5:"Upgrade",
//   6:"Electrical",
//   7:"Project",
//   8:"Inspection",
//   9:"Meter_Reading",
//   10:"Other",
// }
const maintanceType_color_array={
  1:"#2d61ae",
  2:"#cc4140",
  3:"#74bc50",
  4:"#FF9900",
  5:"#6fae9c",
  6:"#d2ca4e",
  7:"#967855",
  8:"#638582",
  9:"#7F7F7F",
  10:"#d36e87",
}
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  paddingBottom:'10px'
  // borderBottom: "1px solid rgb(174,193,208)"
};
// const Option = SelectOption;

export default function Drills() {
  const [filtered, setFiltered] = React.useState([]);
  let history = useHistory();
  const { scheduleddrills, isDelete } = useSelector((state) => state.ScheduledDrill);
  const {  users } = useSelector(state => state.Users);
  const dispatch = useDispatch();
  const match = useRouteMatch();


  const columns = [
    {
      title: "Code",
      dataIndex: "strCode",
      key: "strCode",
      width: "10%",  
      render: (text,row) => {      
        return <a onClick={()=>{goDetail(row._id)}}>{text}</a>}
    },
    {
      title: "Description",
      dataIndex: "strGeneralDescription",
      key: "strGeneralDescription",
      ellipsis: {
        showTitle: false,
      },
      width: "25%",
      render: (text,row) => {
        return <a onClick={()=>{goDetail(row._id)}}>{text}</a>}
    },
    {
      title: "Title",
      dataIndex: "strTitle",
      key: "strTitle",
      width: "20%",
      render: (text,row) => {
        return <a onClick={()=>{goDetail(row._id)}}><Tooltip placement="topLeft" title={text}>{text}</Tooltip></a>
      },
    }, 
    {
      title: "Category",
      dataIndex: "strCategory",
      key: "strCategory",
      width: "10%",
      render: (text,row) => {      
        return <a onClick={()=>{goDetail(row._id)}}>{text}</a>}
    },     
    {
      title: "Type",
      dataIndex: "strType",
      key: "strType",
      width: "15%",
      ellipsis: {
        showTitle: false,
      },
      render: (text,row) => {        
        return <a onClick={()=>{goDetail(row._id)}}><Tooltip placement="topLeft" title={text}>{text}</Tooltip></a>}      
    },
    {
      title: "Estimated Time",
      dataIndex: "intEstimatedTime",
      key: "intEstimatedTime",
      width: "15%",
      render: (text,row) => {
        return <div style={{width:'100%',color:maintanceType_color_array[row.intMaintenanceTypeID]}}>{text}</div>}      
    },
    {
      title: "Status",
      dataIndex: "strStatus",
      key: "strStatus",
      width: "10%",
      render: (text,row) => {
        return <div style={{width:'100%',color:maintanceType_color_array[row.intMaintenanceTypeID]}}>{text}</div>}
    },     
      
  ];

  const goDetail=(id)=>{
    history.push(`/dashboard/scheduleddrill/${id}`);
  }
  
  React.useEffect(() => {
    dispatch(initData());
  }, []);
  React.useEffect(() => {
    if(isDelete){
      dispatch(initData());
    }  
  }, [isDelete]);
  React.useEffect(() => {
    let tmp = scheduleddrills;
    tmp.map((row)=>{
      if(row.bStatus)
        row.strStatus = "Running";
      else
        row.strStatus = "Paused";
      return row;
    })
    setFiltered(tmp);
  }, [scheduleddrills]);
   
  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.ScheduledDrill" />
      </PageHeader>
      <Box>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={12} >     
            
          </Col>
          <Col md={12} sm={12} xs={24} >   
          </Col>
          <Col md={4} sm={4} xs={12}>
              <Link to={`${match.path}/add`}>
            <Button type="primary" className="mateAddInvoiceBtn">
              New
            </Button>
          </Link>             
          </Col>
        </Row>
        <TableWrapper
          // rowSelection={rowSelection}
          dataSource={filtered}
          // columns={clone(sortColumns)}
          columns={columns}
          pagination={false}
          // onChange={onChange}
          className="isoSortingTable"
        />
      </Box>
    </LayoutWrapper>
  );
}

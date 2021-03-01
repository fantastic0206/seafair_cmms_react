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
import clone from 'clone';
import Actions from "../../redux/scheduledaudit/actions";
import userAction from "../../redux/user/actions";
import CardWrapper, { Box } from "./Asset.styles";
import TableWrapper from "../../component/AntTables.styles";
import sortFunction from './data';
const dataList = new sortFunction();

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

export default function Audits() {
  const [filtered, setFiltered] = React.useState([]);
  let history = useHistory();
  const { scheduledaudits, isDelete } = useSelector((state) => state.ScheduledAudit);
  const {  users } = useSelector(state => state.Users);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  React.useEffect(() => {
    dispatch(initData());
  }, []);
  React.useEffect(() => {
    if(isDelete){
      dispatch(initData());
    }  
  }, [isDelete]);
  React.useEffect(() => {
    console.log(scheduledaudits);
    let tmp = scheduledaudits.map((item,index) => {
      let res = item.aSmsAuditPlan;
      res._id = item._id;
      res.key=index;
      res.strCode = item.strCode;
      if(item.bolScheduledAuditStatus)
        res.strStatus = "Running";
      else
        res.strStatus = "Paused";
      res.strDepartmentVessel = item.strDepartmentVessel;
      res.strAuditor = item.strAuditor;
      res.strAuditee = item.strAuditee;
      res.strTitle = item.strTitle;
      return res;
    });
    setFiltered(tmp);
  }, [scheduledaudits]);

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
      title: "Title",
      dataIndex: "strTitle",
      key: "strTitle",
      ellipsis: {
        showTitle: false,
      },
      width: "25%",
      render: (text,row) => {
        return <a onClick={()=>{goDetail(row._id)}}>{text}</a>}
      },    
    {
      title: "Auditor",
      dataIndex: "strAuditor",
      key: "strAuditor",
      width: "15%",
      ellipsis: {
        showTitle: false,
      },
      render: (text,row) => {        
        return <a onClick={()=>{goDetail(row._id)}}><Tooltip placement="topLeft" title={text}>{text}</Tooltip></a>}      
      },
    {
      title: "Auditee",
      dataIndex: "strAuditee",
      key: "strAuditee",
      width: "15%",
      render: (text,row) => {
        return <a onClick={()=>{goDetail(row._id)}}><Tooltip placement="topLeft" title={text}>{text}</Tooltip></a>}      
      },
    {
      title: "Status",
      dataIndex: "strStatus",
      key: "strStatus",
      width: "10%",
      render: (text,row) => {
        return <div style={{width:'100%',color:maintanceType_color_array[row.intMaintenanceTypeID]}}>{text}</div>}
      },     
    {
      title: "Vessel",
      dataIndex: "strDepartmentVessel",
      key: "strDepartmentVessel",
      width: "25%",
      render: (text,row) => <div style={{width:'100%',color:maintanceType_color_array[row.intMaintenanceTypeID]}}>{text}</div>,
    }   
  ];
  const sortColumns = [
    { ...columns[0], sorter: true },
    { ...columns[1], sorter: true },
    { ...columns[2], sorter: true },
    { ...columns[3], sorter: true },
    { ...columns[4], sorter: true },
    { ...columns[5], sorter: true },
  ];
  const goDetail=(id)=>{
    history.push(`/dashboard/scheduledaudit/${id}`);
  }
  
  const  onChange=(pagination, filters, sorter)=> { 
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataList.getSortAsc(sorter.columnKey,filtered);
      } else {
        dataList.getSortDesc(sorter.columnKey,filtered);
      }
      setFiltered(filtered);
    }
  }
  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.ScheduledAduit" />
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
          dataSource={filtered}
          columns={clone(sortColumns)}
          pagination={false}
          // onChange={onChange}
          className="isoSortingTable"
        />
      </Box>
    </LayoutWrapper>
  );
}

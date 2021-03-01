import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
// import notification from '@iso/components/Notification';
// import HelperText from "@iso/components/utility/helper-text";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageHeader from "@iso/components/utility/pageHeader";
import IntlMessages from "@iso/components/utility/intlMessages";
import Scrollbars from "@iso/components/utility/customScrollBar";
import Button from "@iso/components/uielements/button";
import {  Tooltip } from 'antd';
import Actions from "../../redux/scheduledmaintenance/actions";
import CardWrapper, { Box} from "./Asset.styles";
import TableWrapper from "../../component/AntTables.styles";
import onlineImg from '../../assets/images/running-small.png'
import offlineImg from '../../assets/images/paused-small.png'

const { initSMData } = Actions;
const priority={
  1:"Hightest",2:"High",3:"Medium",4:"Low",5:"Lowest"
}
// const workorderStatus_array={
//   2:"Requested",3:"Assigned",4:"Open",
//   5:"Work In Progress",
//   6:"On Hold",
//   7:"Closed, Completed",
//   8:"Draft",
//   9:"Closed, Incomplete",
//   10:"Other"
// }
const maintanceType_array={
  1:"Preventive",
  2:"Damage",
  3:"Corrective",
  4:"Safety",
  5:"Upgrade",
  6:"Electrical",
  7:"Project",
  8:"Inspection",
  9:"Meter_Reading",
  10:"Other",
}
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

export default function ScheduledMaintenace() {
  const [selected, setSelected] = React.useState([]);
  const {  isDelete,scheduledmaintenances } = useSelector((state) => state.ScheduledMaintenance);

  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {
     dispatch(initSMData());
  }, []);
 
  React.useEffect(() => {
    if(isDelete){
      dispatch(initSMData());
    }  
  }, [isDelete]);

  // React.useEffect(() => {
  // console.log(scheduledmaintenances,'scheduledmaintenances');
  // }, [scheduledmaintenances]);

  
  const columns = [
    {
      title: "SM Status",
      dataIndex: "intScheduledMaintenanceStatusID",
      rowKey: "intScheduledMaintenanceStatusID",
      width:"10%",
     
    render: (text,row) => {      
      let statueImg;
      if (text === 1) {
        statueImg = onlineImg;
      } else {
        statueImg = offlineImg;
      }
      return (
        <img style={{width:"16px",height:"10px",}} src={statueImg}></img>
      );
       },
    },
    {
      title: "Code",
      dataIndex: "strCode",
      rowKey: "strCode",    
      width:"10%",
    render: (text,row) => {      
      return <a href={`/dashboard/scheduledmaintenance/${row._id}`}>{text}</a>}
    },

    {
      title: "Priority",
      dataIndex: "intPriorityID",
      rowKey: "intPriorityID",
      width: "12%",
      render: (text,row) => {
        return <a href={`/dashboard/scheduledmaintenance/${row._id}`}>{priority[text]}</a>}
      },     
    {
      title: "Assets",
      dataIndex: "strAssets",
      rowKey: "strAssets",
      ellipsis: {
        showTitle: false,
      },
      width:"25%",
      render: (text,row) => {        
        return <a href={`/dashboard/scheduledmaintenance/${row._id}`}><Tooltip placement="topLeft" title={text}>{text}</Tooltip></a>}
      },
    {
      title: "Assigned Users",
      dataIndex: "intAssignedToUserID",
      rowKey: "intAssignedToUserID",
      width: "15%",
      render: (text,row) => {
        let fullName="";
        if(row.intAssignedToUserID!=undefined && row.intAssignedToUserID!=null){
          fullName=row.intAssignedToUserID.strFullName;
        }
        return <a href={`/dashboard/scheduledmaintenance/${row._id}`}>{fullName}</a>}
      },
      {
        title: "Time Estimated Hours",
        dataIndex: "dblTimeEstimatedHours",
        rowKey: "dblTimeEstimatedHours",
        width: "15%",
        render: (text,row) => {
          return <a href={`/dashboard/scheduledmaintenance/${row._id}`}>{text}</a>}
        },     
    {
      title: "Type",
      dataIndex: "intMaintenanceTypeID",
      rowKey: "intMaintenanceTypeID",
      width: "10%",
      render: (text) => <div style={{width:'100%',color:maintanceType_color_array[text]}}>{maintanceType_array[text]}</div>,
    },
    {
      title: "Description",
      dataIndex: "strDescription",
      rowKey: "strDescription",
      width: "15%",
      ellipsis: {
        showTitle: false,
      },
      render: (text,row) => {
       
        return <a href={`/dashboard/scheduledmaintenance/${row._id}`}><Tooltip placement="topLeft" title={text}>{text}</Tooltip></a>}     
    },
    
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="header.ScheduledMaintenanceList" />       
      </PageHeader>
      <Box>
        <div className="isoInvoiceTableBtn">
          <Link to={`${match.path}/add`}>
            <Button type="primary" className="mateAddInvoiceBtn">
              New
            </Button>
          </Link>
        </div>

        <CardWrapper title="Assets">
        
              <Scrollbars
                style={{ width: "100%", height: "calc(80vh - 70px)" }}
              >
                <TableWrapper
                  // rowSelection={rowSelection}
                  dataSource={scheduledmaintenances}
                  columns={columns}
                  pagination={false}
                  pagination={{ pageSize: 10 }}
                  className="invoiceListTable"
                />
              </Scrollbars>
          
        </CardWrapper>
      </Box>
    </LayoutWrapper>
  );
}

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
import Actions from "../../redux/workorder/actions";
import userAction from "../../redux/user/actions";
import CardWrapper, { Box } from "./Asset.styles";
import TableWrapper from "./AntTables.styles";
import WorkOrderFilterModal from "../../component/WorkOrderFilterModal";
 import fakeData from './data';

 const dataList = new fakeData(10);

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
  // marginTop:"-20px",
  // background: "#e0e7ed",
  //height: "38px",
  // marginLeft:"2px",
  paddingBottom:'10px'
  // borderBottom: "1px solid rgb(174,193,208)"
};
// const Option = SelectOption;

export default function Workorders() {
  const [filtered, setFiltered] = React.useState([]);
  let history = useHistory();
  const { workorders, isDelete } = useSelector((state) => state.Workorders);
  const {  users } = useSelector(state => state.Users);
  const [workOrderFilterModalActive,setWorkOrderFilterModalActive]=React.useState(false);
  const [filterTxt,setFilterTxt]=React.useState('(Built in Filter) All Work Orders');
  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {   
     dispatch(initData());
     dispatch(getAllUserData());
  }, []);
 
  React.useEffect(() => {
    if(isDelete){
      dispatch(initData());
    }  
  }, [isDelete]);
  React.useEffect(() => {
    setFiltered(workorders);
   
  }, [workorders]);

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
      dataIndex: "strDescription",
      key: "strDescription",
      ellipsis: {
        showTitle: false,
      },
      width: "25%",
      render: (text,row) => {
        return <a onClick={()=>{goDetail(row._id)}}><Tooltip placement="topLeft" title={text}>{text}</Tooltip></a>}
      },
    {
      title: "Priority",
      dataIndex: "priorityName",
      key: "priorityName",
      width: "10%",
      render: (text,row) => {      
        return <a onClick={()=>{goDetail(row._id)}}>{text}</a>}
      },     
    {
      title: "Assets",
      dataIndex: "strAssets",
      key: "strAssets",
      width: "25%",
      ellipsis: {
        showTitle: false,
      },
      render: (text,row) => {        
        return <a onClick={()=>{goDetail(row._id)}}><Tooltip placement="topLeft" title={text}>{text}</Tooltip></a>}      
      },
    {
      title: "Assigned Users",
      dataIndex: "assignedUser",
      key: "assignedUser",
      width: "15%",
      render: (text,row) => {
        return <a onClick={()=>{goDetail(row._id)}}>{text}</a>}      
      },
    {
      title: "Status",
      dataIndex: "workOrderStatus",
      key: "workOrderStatus",
      width: "10%",
      render: (text,row) => {
        return <a onClick={()=>{goDetail(row._id)}}>{text}</a>}
      },     
    {
      title: "Type",
      dataIndex: "maintenanceTypeName",
      key: "maintenanceTypeName",
      width: "10%",
      render: (text,row) => <div style={{width:'100%',color:maintanceType_color_array[row.intMaintenanceTypeID]}}>{text}</div>,
    },
    {
      title: "Completed By User",
      dataIndex: "completedByUser",
      key: "completedByUser",
      width: "15%",
      render: (text,row) => {       
        return <a onClick={()=>{goDetail(row._id)}}>{text}</a>} 
    },    
  ];
  const sortColumns = [
    { ...columns[0], sorter: true },
    { ...columns[1], sorter: true },
    { ...columns[2], sorter: true },
    { ...columns[3], sorter: true },
    { ...columns[4], sorter: true },
    { ...columns[5], sorter: true },
    { ...columns[6], sorter: true },
    { ...columns[7], sorter: true },
  ];
  const goDetail=(id)=>{
    history.push(`/dashboard/workorder/${id}`);
  }
  const searchChange=(event)=>{
   // console.log(event.target.value);
   var searchTxt=event.target.value;
   var temp=[];
    if(searchTxt!=""){
      workorders.forEach((item) => {     
         let description=item.strDescription;
         let assetName=item.strAssetIds!=null?item.strAssetIds.strName:"";
         let completedUser=item.intCompletedByUserID!=null?item.intCompletedByUserID.strFullName:"";
         let strCode=item.strCode;
         if(strCode.includes(searchTxt) || description.includes(searchTxt) || assetName.includes(searchTxt) || item.strAssignedUsers.includes(searchTxt) || completedUser.includes(searchTxt)){          
           temp.push(item);
         }
        })
        setFiltered(temp);
    }
    else{
      setFiltered(workorders);
    }      
  }
  const selectedFilter=(row)=>{
    var temp=[];
    let full_name="";
    if(Object.keys(row).length ===0){
      setFiltered(workorders);
      setFilterTxt('(Built in Filter) All Work Orders')
      return;
    }
    if(row._id==localStorage.getItem("user_id")){
      full_name="My Work Order";
       workorders.forEach((item) => {    
         var rowId=item.intAssignedUserId!=null?item.intAssignedUserId._id:"";
        if(rowId==row._id){
          temp.push(item);
        }
      })
    }
    else if(row.bolGroup){
      let groupId=row._id;
      var temp_array=[];
      for(var i=0;i<users.length;i++){
        if(users[i].strGroupIds!=undefined){
          var temp_a=users[i].strGroupIds;
          temp_a=temp_a.split(",");
          if(temp_a.indexOf(groupId)!==-1){
            temp_array.push(users[i]._id);
          }        
        }
      }
      temp_array.push(row._id);    
      workorders.forEach((item) => {    
        //console.log(item.intAssignedUserId._id,'item.intAssignedUserId')
        if(temp_array.indexOf(item.intAssignedUserId!=null?item.intAssignedUserId._id:"")!=-1){
          temp.push(item);
        }
      })
      setFiltered(temp);
      full_name="Group: "+row.strFullName;
    }
    else{
      full_name="User: "+row.strFullName;
          workorders.forEach((item) => {    
        var rowId=item.intAssignedUserId!=null?item.intAssignedUserId._id:"";
        if(rowId==row._id){
          temp.push(item);
        }
      })
    }
    setFiltered(temp);
    setFilterTxt('(Built in Filter) '+full_name)
  }
  const handleCancel=()=>{
    setWorkOrderFilterModalActive(false);
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
        <IntlMessages id="sidebar.WorkOrder" />
      </PageHeader>
      <Box>
        {/* <div className="isoInvoiceTableBtn">
          <Link to={`${match.path}/add`}>
            <Button type="primary" className="mateAddInvoiceBtn">
              New
            </Button>
          </Link>
        </div> */}

        <Row style={rowStyle} gutter={16} justify="start">
              <Col md={8} sm={8} xs={12} >     
                <div style={{ position: "relative" }}>
                              <Input
                                value={filterTxt}
                                placeholder=""
                                style={{ width: "300px" }}
                                onChange={()=>setWorkOrderFilterModalActive(true)}
                              />
                              <i
                                className="ionicons ion-arrow-down-b"
                                onClick={()=>{setWorkOrderFilterModalActive(true)}}
                                style={{
                                  fontSize: "25px",
                                  cursor: "pointer",
                                  position: "absolute",
                                  marginLeft: "5px",
                                  marginTop:"4px"
                                }}
                              ></i>
                 </div>    
             
                {/* <Select
                       defaultValue={""}
                      // onChange={(event)=>{setIntControlID(event)}}
                     style={{ width: '300px' }}                    >
                        <Option value="">(Builtin filter) All Work Orders</Option> 
                        {
                            users.map((row)=>{

                            return <Option key={row._id} value="102">{row.strFullName}</Option>
                            })
                        }                        
                      
                    </Select> */}
              </Col>
              <Col md={12} sm={12} xs={24} >   
              </Col>
              <Col md={4} sm={4} xs={12}>
                 <Link to={`${match.path}/add`}>
                <Button type="primary" className="mateAddInvoiceBtn">
                  New
                </Button>
              </Link>
              {/* <InputSearch
                    placeholder="Input search text"                   
                    onChange={(event)=>{searchChange(event);}}            
                    style={{ width: "100%" }}
                  /> */}
              </Col>
          </Row>

        {/* <CardWrapper title="Assets"> */}
{/*             
            <div className="isoInvoiceTable">
              <Scrollbars
                style={{ width: "100%", height: "calc(80vh - 70px)" }}
              > */}
                <TableWrapper
                  // rowSelection={rowSelection}
                  dataSource={filtered}
                  columns={clone(sortColumns)}
                  //columns={columns}
                  pagination={false}
                  onChange={onChange}
                  className="isoSortingTable"
                />
              {/* </Scrollbars>
            </div> */}
       
        {/* </CardWrapper> */}
      </Box>
      <WorkOrderFilterModal
        visible={workOrderFilterModalActive}
        title="WORK ORDER FILTER"       
        selectUser={selectedFilter}
        onCancel={handleCancel}
      >
      </WorkOrderFilterModal>
    </LayoutWrapper>
  );
}

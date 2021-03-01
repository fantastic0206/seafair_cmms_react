import React from "react";
import TableWrapper from '../AntTables.styles';
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form } from "antd";
// import Scrollbars from "@iso/components/utility/customScrollBar";
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import addDoubleImg from '../../../assets/images/new-group-inner-list.png';
import {  Tooltip } from 'antd';
import Select, { SelectOption } from "@iso/components/uielements/select";
import clone from 'clone';
import newAddImg from "../../../assets/images/new-inner-list.png";
import AuditInspectionModal from "../../../component/AuditInspectionModal";
import { Label } from "../../Asset/Facility/OnlineContent.styles";
const Option = SelectOption;
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  // marginTop:"-20px",
  background: "#e0e7ed",
  // marginLeft:'2px'
  padding: "5px",
};
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
export default function (props) {
  const { data } = props;

  const [auditInspectionModalActive, setAuditInspectionModalActive] = React.useState(false);
  const [aInspectionData, setAInspectionData] = React.useState([]);
  const [aInspectionModalData, setAInspectionModalData] = React.useState(null);
  const [strInspectionModalState, setStrInspectionModalState] = React.useState("");
  const columns = [
    {
      title: "ICRNumber",
      dataIndex: "strICRNumber",
      key: "strICRNumber",
      width: "10%",  
      render: (text,row) => {      
        return <a onClick={()=>{goDetail(row)}}>{text}</a>}
      },
    {
      title: "System",
      dataIndex: "strSystem",
      key: "strSystem",
      ellipsis: {
        showTitle: false,
      },
      width: "25%",
      render: (text,row) => {
        return <a onClick={()=>{goDetail(row)}}>{text}</a>}
      },    
    {
      title: "SubSystem",
      dataIndex: "strSubSystem",
      key: "strSubSystem",
      width: "15%",
      ellipsis: {
        showTitle: false,
      },
      render: (text,row) => {        
        return <a onClick={()=>{goDetail(row)}}><Tooltip placement="topLeft" title={text}>{text}</Tooltip></a>}      
      },
    {
      title: "Authorized Inspection",
      dataIndex: "strAuthorizedInspection",
      key: "strAuthorizedInspection",
      width: "15%",
      render: (text,row) => {
        return <a onClick={()=>{goDetail(row)}}><Tooltip placement="topLeft" title={text}>{text}</Tooltip></a>}      
      },
    {
      title: "Reference",
      dataIndex: "strReference",
      key: "strReference",
      width: "10%",
      render: (text,row) => {
        return <div style={{width:'100%'}}>{text}</div>}
      },     
    {
      title: "Inspection Frequency",
      dataIndex: "strInspectionFrequency",
      key: "strInspectionFrequency",
      width: "25%",
      render: (text,row) => <div style={{width:'100%'}}>{text}</div>,
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
  const handleCancel = () => {
    setAuditInspectionModalActive(false);
  };
  const goDetail = (row) => {
    setAInspectionModalData(row);
    setStrInspectionModalState("edit");
    setAuditInspectionModalActive(true);
  };
  const onChangeInfo = (info, isDelete) => {
    console.log(info);
    let tmp = clone(aInspectionData);
    if(strInspectionModalState == "add") { // create
      info.id = tmp.length + 1;
      tmp.push(info);
    }
    else if(strInspectionModalState == "edit") {
      if (isDelete) { // delete
        let id = -1;
        tmp.forEach((row, key )=> {
          if(row.id == info.id) {
            id = key;
          }
        });
        if (id != -1)
          tmp.splice(id, 1);
      }
      else {  // update
        tmp.forEach((row, key )=> {
          if(row.id == info.id) {
            tmp[key] = info;
          }
        });
      }
    }
    setAInspectionData(tmp);
    props.inspectionInfo(tmp);
  };

  // React.useEffect(() => {
  //   console.log(aInspectionData);
  // }, [aInspectionData]);
  React.useEffect(() => {
    if(data != null) {
      console.log(data);
      console.log('inspection init');
      setAInspectionData(data);
    }
  }, [data]);

  return (
    <div className="isoInvoiceTable">
      <TableWrapper
        dataSource={aInspectionData}
        columns={clone(sortColumns)}
        pagination={false}
      />
      {/* </Scrollbars> */}
      <div
        style={{
          color: "rgb(102, 115, 136)",
          fontSize: "10pt",
          background: "#f7f7f7",
          border: "1px solid rgb(241, 243, 246)",
          height: "25px",
        }}
      >
        <span
          style={{
            float: "left",
            marginLeft: "4px",
            marginRight: "4px",
            cursor: "pointer",
          }}
        >
          <img
            src={newAddImg}
            onClick={() =>  {
              setAInspectionModalData(null);
              setStrInspectionModalState("add");
              setAuditInspectionModalActive(true);
            }}
          ></img>
        </span>
      </div>
      <AuditInspectionModal
        onCancel={handleCancel}
        onChangeInfo={onChangeInfo}
        visible={auditInspectionModalActive}
        data={aInspectionModalData}
        title={"INSPECTION"}
        pageState={strInspectionModalState}
      ></AuditInspectionModal>
    </div>
  );
}

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form } from "antd";
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Actions from "../../../redux/usergroup/actions";

const columns = [
  {
    title: "This user is a member of the following user groups:",
    dataIndex: "strFullName",
    rowKey: "strFullName",
    width: "100%",  
  },
];
export default function(props) {   
    const {groupIds,pageState}=props;
   const { initData } = Actions;
   const [strGroupIds,setStrGroupIds]=React.useState([]);
   const { usergroups } = useSelector((state) => state.UserGroup);
   const dispatch = useDispatch();
   React.useEffect(() => {  
    dispatch(initData());
 }, []);
 const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    setStrGroupIds(selectedRowKeys);
    props.selectedGroups(`${selectedRowKeys}`);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(selectedRows);
  }, 
};
React.useEffect(()=>{   
  setStrGroupIds(groupIds)
},[]);
  return (
    <div className="isoInvoiceTable">     
        <TableWrapper 
          dataSource={usergroups}
          columns={columns}
          pagination={false}          
          rowSelection={{ ...rowSelection, selectedRowKeys:strGroupIds }}
          className="isoGroupTable"          
        />
     
  </div>
  );
}

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Scrollbars from "@iso/components/utility/customScrollBar";
import userActions from '../../../redux/user/actions';
const { initUserData } = userActions;
const columns = [
  {
    title: "This user group has the following members:",
    dataIndex: "strFullName",
    rowKey: "strFullName",
    width: "50%",  
  },      
];
export default function(props) {   
   const [data, setData] = React.useState([]);  
   const {pageState,userGroupId}=props;
   const {  users } = useSelector(state => state.Users);
   const [usersIngroup,setUsersIngroup]=React.useState([]);
   const dispatch = useDispatch();
  React.useEffect(() => {  
   if(pageState=="edit"){
    dispatch(initUserData());
   }
   
 }, []); 
 React.useEffect(()=>{
   var temp_array=[];
  for(var i=0;i<users.length;i++){
    if(users[i].strGroupIds!=undefined){
      var temp=users[i].strGroupIds;
      temp=temp.split(",");
      if(temp.indexOf(userGroupId)!==-1){
        temp_array.push(users[i]);
      }        
    }
  }
  setUsersIngroup(temp_array);
 },[users])
  return (
    <div className="isoInvoiceTable">
     
      <Scrollbars
        style={{ width: "100%", height: "calc(50vh - 70px)" }}
      >
        <TableWrapper
          // rowSelection={rowSelection}
          dataSource={usersIngroup}
          columns={columns}
          pagination={true}
          pagination={{ pageSize: 10 }}
          className="isoGroupTable"
        />
      </Scrollbars>
     
  </div>
  );
}

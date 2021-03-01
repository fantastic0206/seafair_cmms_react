import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
// import notification from '@iso/components/Notification';
import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import Scrollbars from '@iso/components/utility/customScrollBar';
import Button from '@iso/components/uielements/button';
// import invoiceActions from '@iso/redux/invoice/actions';
import userActions from '../../redux/user/actions';
import userGroupActions from "../../redux/usergroup/actions";
import CardWrapper, { Box, } from './User.styles';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
const { initUserData } = userActions;
const {initData}=userGroupActions;
export default function Users() {
  // const [selected, setSelected] = React.useState([]);
  const {  users,isDeleteUser } = useSelector(state => state.Users);
  const { usergroups } = useSelector((state) => state.UserGroup);
  const {groupName,setGroupName}=React.useState([]);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {       
      dispatch(initUserData());
      dispatch(initData());

   }, []); 
//    React.useEffect(() => {     
//     if(Object.keys(usergroups).length !==0){
//       var temp_array=[];
//       for(let i = 0; i < usergroups.length; i++){ 
       
//       }
//     }
//  }, [usergroups]);  

  const columns = [    
    {
      title: 'Email Address',
      dataIndex: 'strEmailAddress',
      rowKey: 'strEmailAddress',
      width: '15%',
      render: (text,row) => {
        return <a href={`/dashboard/user/edit/${row._id}`}>{text}</a>}
    },
    {
      title: 'Full Name',
      dataIndex: 'strFullName',
      rowKey: 'strFullName',
      width: '15%',
      render: (text,row) => {
        return <a href={`/dashboard/user/edit/${row._id}`}>{text}</a>}
    },    
    {
      title: 'TelePhone',
      dataIndex: 'strTelephone',
      rowKey: 'strTelephone',
      width: '15%',
      render: (text,row) => {
        return <a href={`/dashboard/user/edit/${row._id}`}>{text}</a>}
    },
    {
      title: 'User Name',
      dataIndex: 'strUserName',
      rowKey: 'strUserName',
      width: '15%',
      render: (text,row) => {
        return <a href={`/dashboard/user/edit/${row._id}`}>{text}</a>}
    },
    {
      title: 'Groups',
      dataIndex: 'strUserName',
      rowKey: 'strUserName',
      width: '15%',
      render: (text,row) => {
        var group_str="";
        if(row.strGroupIds!=undefined ){
         var temp_array=  row.strGroupIds.split(",");         
          for(var i=0;i<temp_array.length;i++){
              for(var k=0;k<usergroups.length;k++){
                if(temp_array[i]==usergroups[k].key){
                  group_str+=usergroups[k].strFullName+",";
                }
              }
          }
        }
        return <a href={`/dashboard/user/edit/${row._id}`}>{group_str}</a>}
      },    
    
  ];
  
  
  return (
    <LayoutWrapper>
      {/* <PageHeader>
        <IntlMessages id="sidebar.Users" />
      </PageHeader> */}
      <Box>
        <div className="isoInvoiceTableBtn">
          <Link to={`${match.path}/add`}>       
            <Button type="primary" className="mateAddInvoiceBtn">
              Add User
            </Button>
          </Link>
        </div>

        <CardWrapper title="Users">
          {users.length === 0 ? (
            <HelperText text="No Users" />
          ) : (
            <div className="isoInvoiceTable">
              <Scrollbars
                style={{ width: '100%', height: 'calc(100vh - 70px)' }}
              >
                <TableWrapper
                  // rowSelection={rowSelection}
                  dataSource={users}
                  columns={columns}
                  pagination={true}
                  pagination={{ pageSize: 10 }}
                  className="invoiceListTable"
                />
              </Scrollbars>
            </div>
          )}
        </CardWrapper>
      </Box>
    </LayoutWrapper>
  );
}

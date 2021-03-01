import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@iso/components/uielements/button';
import Input from "@iso/components/uielements/input";
// import { stringToPosetiveInt } from '@iso/lib/helpers/utility';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Table from './TableStyle';
import userAction from "../../redux/user/actions";
const { getAllUserData } = userAction;
const Option = SelectOption;

const CrewTable = ({ editableData, editCrew, updateValues }) => {
  // const { invoiceList } = editableData;
  const { users } = useSelector((state) => state.Users);
  const [userList,setUserList]=React.useState([]);
  const dispatch = useDispatch();
  const editColumns = [
    // {
    //   title: '#',
    //   dataIndex: 'key',
    //   rowKey: 'key',
    //   width: '10%',
    //   render: (text, row) => <span>{row.key}</span>,
    // },
    {
      title: 'NAME OF SEAMAN',
      dataIndex: 'strNameSeaman',
      rowKey: 'strNameSeaman',
      width: '20%',
      render: (text, row) => (
        <Select  style={{width:"100%",textAlign:"left"}} 
                value={row.strNameSeaman}
                // onChange={(value)=>{setIntTaskType(value);}}
                   onChange={value => {
                    editableData[row.key - 1].strNameSeaman = value;              
                     editCrew(editableData);
                  }}            
               >
                  {
                      userList.map((row)=>{                        
                      return <Option key={row._id} value={row.strFullName}>{row.strFullName}</Option> 
                      })
                    }                  
        </Select>   
        
      ),
    },
    {
      title: 'LICENSED',
      dataIndex: 'strLicensed',
      rowKey: 'strLicensed',
      width: '10%',
      render: (text, row) => (
        <Select  style={{width:"100%",textAlign:"left"}} 
        value={row.strLicensed}        
           onChange={value => {
            editableData[row.key - 1].strLicensed = value;              
             editCrew(editableData);
          }}            
       >
         <Option  value={"YES"}>YES</Option>            
         <Option  value={"NO"}>NO</Option>            
        </Select>   
        // <Input
        //   placeholder=""
        //   value={row.strLicensed}
        //   onChange={event => {
        //     editableData[row.key - 1].strLicensed =
        //       event.target.value;              
        //      editCrew(editableData);
        //   }}
        // />
      ),
    },
    {
      title: 'MMD#',
      dataIndex: 'strMMD',
      rowKey: 'strMMD',
      width: '15%',
      render: (text, row) => (
        <Input
        placeholder=""
        value={row.strMMD}
        onChange={event => {
          editableData[row.key - 1].strMMD =
            event.target.value;              
           editCrew(editableData);
        }}
      />
      ),
    },
    {
      title: 'CAPACITY ENGAGED',
      dataIndex: 'strCapacityEngaged',
      rowKey: 'strCapacityEngaged',
      width: '15%',
      render: (text, row) => (
        <Select  style={{width:"100%",textAlign:"left"}} 
        value={row.strCapacityEngaged}        
           onChange={value => {
            editableData[row.key - 1].strCapacityEngaged = value;              
             editCrew(editableData);
          }}            
       >
          {
              userList.map((row)=>{                        
              return <Option key={row._id} value={row.strUserTitle}>{row.strUserTitle}</Option> 
              })
            }                  
        </Select>   
     
      // />
      ),
    },
    {
      title: 'CONDUCT',
      dataIndex: 'strConduct',
      rowKey: 'strConduct',
      width: '10%',
      render: (text, row) => (
        <Input
        placeholder=""
        value={row.strConduct}
        onChange={event => {
          editableData[row.key - 1].strConduct =
            event.target.value;              
           editCrew(editableData);
        }}
      />
      ),
    },
    {
      title: 'ABILITY',
      dataIndex: 'strAbility',
      rowKey: 'strAbility',
      width: '10%',
      render: (text, row) => (
        <Input
        placeholder=""
        value={row.strAbility}
        onChange={event => {
          editableData[row.key - 1].strAbility =
            event.target.value;              
           editCrew(editableData);
        }}
      />
      ),
    },
    {
      title: 'SEE PAGE',
      dataIndex: 'strSeaPage',
      rowKey: 'strSeaPage',
      width: '10%',
      render: (text, row) => (
        <Input
        placeholder=""
        value={row.strSeaPage}
        onChange={event => {
          editableData[row.key - 1].strSeaPage =
            event.target.value;              
           editCrew(editableData);
        }}
      />
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      rowKey: 'delete',
      width: '*',
      render: (text, row) =>
      row.length === 1 ? (
          ''
        ) : (
          <Button
            onClick={() => {
              const newCrewList = [];
              editableData.forEach((item, i) => {
                if (i !== row.key - 1) {
                  newCrewList.push(item);
                }
              });
              editableData = newCrewList;
              editCrew(editableData);
            }}
          >
            Delete
          </Button>
        ),
    },
  ];
  React.useEffect(() => { 
     dispatch(getAllUserData());
   }, []);
   React.useEffect(() => { 
    let temp=[];
    users.map((row)=>{
      if(!row.bolGroup){
        temp.push(row);
      }
    })
    setUserList(temp);
  }, [users]);
  return (
    <Table columns={editColumns} dataSource={editableData} pagination={false} />
  );
};
export {  CrewTable };

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@iso/components/uielements/button';
import Input from "@iso/components/uielements/input";
// import { stringToPosetiveInt } from '@iso/lib/helpers/utility';
import moment from 'moment';
import Select, { SelectOption } from '@iso/components/uielements/select';
import DatePicker from '@iso/components/uielements/datePicker';
import { TimePicker } from 'antd';
import Table from './TableStyle';
import userAction from "../../redux/user/actions";
const { getAllUserData } = userAction;
const Option = SelectOption;

const DrillTable = ({ editableData, editCrew, updateValues }) => {
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
      title: 'DATE [MM/DD/YY]',
      dataIndex: 'strDate',
      rowKey: 'strDate',
      width: '15%',
      render: (text, row) => (
        <DatePicker
        //allowClear={false}
        value={row.strDate!=null?moment(row.strDate):null}
        onChange={val => {
          
             editableData[row.key - 1].strDate =val;              
             editCrew(editableData);
          // setOrderDate(val.toDate().getTime())
         // console.log(val.toDate().getTime())
          // editableInvoice.orderDate = val.toDate().getTime();
          // dispatch(editInvoice(editableInvoice));
        }}
        format="MM/DD/YYYY"
        animateYearScrolling={true}
      />
        
      ),
    },
    {
      title: 'TIME (LOCAL)',
      dataIndex: 'strTime',
      rowKey: 'strTime',
      width: '15%',
      render: (text, row) => (        
        <TimePicker                                
          value={row.strTime==null?null:moment(row.strTime)}
          defaultValue={null}
          onChange={value => {            
             editableData[row.key - 1].strTime =value;                    
             editCrew(editableData);
          }} 
          format={'HH:mm'}
          ></TimePicker>
        // <Input
        //   placeholder=""
        //   // value={row.strLicensed}
        //   // onChange={event => {
        //   //   editableData[row.key - 1].strLicensed =
        //   //     event.target.value;              
        //   //    editCrew(editableData);
        //   // }}
        // />
      ),
    },
    {
      title: 'LOCATION',
      dataIndex: 'strLocation',
      rowKey: 'strLocation',
      width: '15%',
      render: (text, row) => (
        <Input
        placeholder=""
        value={row.strLocation}
        onChange={event => {
          editableData[row.key - 1].strLocation =
            event.target.value;              
           editCrew(editableData);
        }}
      />
      ),
    },
    {
      title: 'TYPE OF DRILL OR INSPECTION. CONDITION OF EQUPMENT WITH DEFECTS AND CORRECTIVE ACTIONS NOTED. ',
      dataIndex: 'strDescription',
      rowKey: 'strDescription',
      width: '30%',
      render: (text, row) => (
        <Input
        placeholder=""
        value={row.strDescription}
        onChange={event => {
          editableData[row.key - 1].strDescription =
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
  // React.useEffect(() => { 
  //    dispatch(getAllUserData());
  //  }, []);
  //  React.useEffect(() => { 
  //   let temp=[];
  //   users.map((row)=>{
  //     if(!row.bolGroup){
  //       temp.push(row);
  //     }
  //   })
  //   setUserList(temp);
  // }, [users]);
  return (
    <Table columns={editColumns} dataSource={editableData} pagination={false} />
  );
};
export {  DrillTable };

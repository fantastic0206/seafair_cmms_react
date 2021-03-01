import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link,useHistory,useParams } from "react-router-dom";
import moment from 'moment';
// import { EditTable } from '@iso/components/Invoice/InvoiceTable';
import OrderStatus from '@iso/components/Invoice/OrderStatus';
import { CrewTable } from '../../component/CrewTable/CrewTable';
import notification from '@iso/components/Notification';
import Button from '@iso/components/uielements/button';
import Input, { Textarea } from '@iso/components/uielements/input';
import DatePicker from '@iso/components/uielements/datePicker';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageWrapper from './SinglePage.styles';
import { stringToPosetiveInt } from '@iso/lib/helpers/utility';

// import { orderStatusOptions } from './config';
import EntriesCrewAction from '../../redux/EntriesCrew/actions';

const { deleteData,editCrewData,updateData,getById } = EntriesCrewAction;
const StatusOptions = ['Draft', 'Completed', 'Approved','Printed'];
export default function(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();
  // const { editableInvoice, isNewInvoice, redirectPath, toggleView } = props;
  const { crewLists,crewList, isNewCrew,isDelete } = useSelector((state) => state.EntriesCrew);
  const [orderDate,setOrderDate]=React.useState(new Date());
  const [orderStatus,setOrderStatus]=React.useState("Draft");
  const onSave = () => { 
    var sendData={};
    sendData.orderDate=orderDate;
    sendData.orderStatus=orderStatus;
    sendData.crewList=JSON.stringify(crewLists);
    dispatch(updateData(sendData,id));  
  };
  const onDelete=()=>{
    dispatch(deleteData(id));
  }
  React.useEffect(() => {      
      dispatch(getById(id));     
  },[]);
  React.useEffect(() => {
    if(Object.keys(crewList).length !==0){
     setOrderStatus(crewList.orderStatus);
     setOrderDate(crewList.orderDate);
    }
  },[crewList]);

  React.useEffect(() => { 
    if(isDelete){
      history.push("/dashboard/entries_crew");
    }    
  }, [isDelete]);

  function handleChange(value) {   
    setOrderStatus(value);   
  }
  const goPrint=(id)=>{
    history.push(`/dashboard/entries_crew/edit/${id}`);
  }
  return (
    <LayoutWrapper>
      <Box>
        <PageWrapper className="editView">          
          <div className="PageContent">
          <div className="PageHeader">     
              <Link to={"/dashboard/entries_crew"}>
                <Button color="primary">
                  <span>Cancel</span>
                </Button>
              </Link>      
            <Button type="primary" onClick={onSave} className="saveBtn">
              <span>Save</span>
            </Button>
            <Link to={`/dashboard/entries_crew/print/${id}`}>
              <Button type="primary" className="saveBtn">
                <span>PDF</span>
              </Button>
              </Link>             
            <Button type="danger" onClick={onDelete} className="saveBtn">
              <span>Delete</span>
            </Button>
          </div>
          <div className="RightSideContent">
                <div className="RightSideStatus">
                  <span className="RightSideStatusSpan"> Status: </span>
                  <OrderStatus
                    value={orderStatus}
                    name="orderStatus"
                    onChange={handleChange}
                    orderStatusOptions={StatusOptions}
                    className="RightStatusDropdown"
                  />                  
                </div>
                <div className="RightSideDate" style={{marginTop:"20px",marginBottom:"20px"}}>
                 {'Revision # : '}
                  <DatePicker
                    allowClear={false}
                    value={moment(orderDate)}
                    onChange={val => {
                      setOrderDate(val.toDate().getTime())
                     // console.log(val.toDate().getTime())
                      // editableInvoice.orderDate = val.toDate().getTime();
                      // dispatch(editInvoice(editableInvoice));
                    }}
                    format="MMMM Do YYYY"
                    animateYearScrolling={true}
                  />
                </div>
            </div>
            <div className="InvoiceTable editInvoiceTable">
              <CrewTable
                editableData={crewLists}
                editCrew={e => dispatch(editCrewData(e))}
                // updateValues={updateValues}
              />
              <div className="InvoiceTableBtn">
              <Button
                  onClick={() => {
                    crewLists.push({
                      key: crewLists.length + 1,
                      strNameSeaman: '',
                      strLicensed: '',
                      strMMD: '',
                      strCapacityEngaged: '',
                      strConduct: '',
                      strAbility: '',
                    });
                    dispatch(editCrewData(crewLists));
                  }}
                  type="primary"
                >
                  Add Item
                </Button>
              </div>             
            </div>
            <div className="ButtonWrapper" />
          </div>
        </PageWrapper>
      </Box>
    </LayoutWrapper>
  );
}

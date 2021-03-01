import React from 'react';
import { Link,  useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
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

const { initNewData,editCrewData,saveData } = EntriesCrewAction;
const StatusOptions = ['Draft', 'Completed', 'Approved','Printed'];
export default function(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const { isSaved } = useSelector((state) => state.EntriesCrew);

  // const { editableInvoice, isNewInvoice, redirectPath, toggleView } = props;
  const { crewLists, isNewCrew } = useSelector((state) => state.EntriesCrew);
  const [orderDate,setOrderDate]=React.useState(new Date());
  const [orderStatus,setOrderStatus]=React.useState("Draft");
  const onSave = () => {
    var sendData={};
    sendData.orderDate=orderDate;
    sendData.orderStatus=orderStatus;
    sendData.crewList=JSON.stringify(crewLists);
    console.log(sendData,'this is senddata');
    dispatch(saveData(sendData));
    // const error = checkInvoice(editableInvoice);
    // if (error) {
    //   notification('error', error);
    // } else {
    //   const successMessage = isNewInvoice
    //     ? 'A new Invoice added'
    //     : 'Invoice Updated';
    //   notification('success', successMessage);
    //   dispatch(updateInvoice(editableInvoice));
    // }
  };
  React.useEffect(() => {
    if (isNewCrew) {
      dispatch(initNewData());
    }    
  },[]);
  React.useEffect(() => {
    // console.log('crewLists',crewLists)  
  },[crewLists]);

  function handleChange(value) {   
    setOrderStatus(value);   
  }
  React.useEffect(() => {
    if (isSaved) {
      history.push('/dashboard/entries_crew');
    }
  }, [isSaved]);
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
            {/* <Button type="danger" className="saveBtn">
              <span>Print</span>
            </Button> */}
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
               {' Revision #: '}
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

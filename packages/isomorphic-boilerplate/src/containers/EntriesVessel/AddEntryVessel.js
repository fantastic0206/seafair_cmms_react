import React from 'react';
import { Link,  useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
// import { EditTable } from '@iso/components/Invoice/InvoiceTable';
import OrderStatus from '@iso/components/Invoice/OrderStatus';
import { CrewComplimentTable,LogEntriesTable } from '../../component/CrewTable/CrewComplimentTable';
import notification from '@iso/components/Notification';
import Button from '@iso/components/uielements/button';
import Input, { Textarea } from '@iso/components/uielements/input';
import DatePicker from '@iso/components/uielements/datePicker';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageWrapper from './SinglePage.styles';
import { stringToPosetiveInt } from '@iso/lib/helpers/utility';

// import { orderStatusOptions } from './config';
import EntriesVesselAction from '../../redux/EntriesVessel/actions';
import {
  Fieldset,
  Form,
  Label,  
  // GeneralLine
} from '../Asset/Facility/OnlineContent.styles';

const { initNewData,editCrewData,saveData,editLogData } = EntriesVesselAction;
const StatusOptions = ['Draft', 'Completed', 'Approved','Printed'];
const FormItem = Form.Item;
export default function(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  // const { editableInvoice, isNewInvoice, redirectPath, toggleView } = props;
  const { crewComplimentLists, isNewCrew ,logEntryLists,isSaved} = useSelector((state) => state.EntriesVessel);
  const [orderDate,setOrderDate]=React.useState(new Date());
  const [orderStatus,setOrderStatus]=React.useState("Draft");
  const [strWeather,setStrWeather]=React.useState("");
  const onSave = () => {
   
    var sendData={};
    sendData.orderDate=orderDate;
    sendData.orderStatus=orderStatus;
    sendData.crewComplement=JSON.stringify(crewComplimentLists);
    sendData.logEntries=JSON.stringify(logEntryLists);
    sendData.weather=strWeather

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
    if (isSaved) {
      history.push('/dashboard/entries_vessel');
    }
  }, [isSaved]);

  function handleChange(value) {   
    setOrderStatus(value);   
  }
  return (
    <LayoutWrapper>
      <Box>
        <PageWrapper className="editView">          
          <div className="PageContent">
          <div className="PageHeader">     
              <Link to={"/dashboard/entries_vessel"}>
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
                  Order date:{' '}
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
              <CrewComplimentTable
                editableData={crewComplimentLists}
                editTable={e => dispatch(editCrewData(e))}
                // updateValues={updateValues}
              />
              <div className="InvoiceTableBtn">
              <Button
                  onClick={() => {
                    crewComplimentLists.push({
                      key: crewComplimentLists.length + 1,
                      strCrewPosition: '',
                      strName:'',
                      strHoursOnDuty:'',
                      strHoursTotal:''                    
                    });
                    dispatch(editCrewData(crewComplimentLists));
                  }}
                  type="primary"
                >
                  Add Item
                </Button>
              </div>             
            </div>
            <div className="ButtonWrapper" />
            <div style={{width:"100%",marginBottom:"40px"}}>
                <Form>
                      <Fieldset>
                        <Label>Weather</Label>
                       
                        <Textarea placeholder="" 
                          style={{ height: 'auto',width:"100%" }}  
                          rows={3}
                          name="strDescription"
                         value={strWeather}
                          onChange={(event)=>{setStrWeather(event.target.value);}}                               
                        /> 
                    
                    </Fieldset>
                    </Form> 
            </div>
            <div className="InvoiceTable editInvoiceTable">
              <LogEntriesTable
                editableData={logEntryLists}
                editTable={e => dispatch(editLogData(e))}
                // updateValues={updateValues}
              />
              <div className="InvoiceTableBtn">
              <Button
                  onClick={() => {
                    logEntryLists.push({
                      key: logEntryLists.length + 1,
                      strTime: '',
                      strCode:'',
                      strItem:'',
                      strExplanation:''                 
                    });
                    dispatch(editLogData(logEntryLists));
                  }}
                  type="primary"
                >
                  Add Item
                </Button>
              </div>             
            </div>
          </div>
        </PageWrapper>
      </Box>
    </LayoutWrapper>
  );
}

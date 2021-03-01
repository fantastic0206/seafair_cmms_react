import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Select, { SelectOption } from '@iso/components/uielements/select';
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import DatePicker from '@iso/components/uielements/datePicker';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import { Col, Row,Form } from "antd";
import notification from '@iso/components/Notification';
import moment from 'moment';
import Tooltip from '@iso/components/uielements/tooltip';
import AssetEventTypesModal from './EventTypeModal';
import './table.css'
import {
  // ActionBtn,
  Fieldset, 
  Label, 
} from './UsersContentModal.styles';
import MeterReadingAction from "../redux/meterreading/actions";
import ScheduledMaintenanceTriggerAction from "../redux/scheduledmaintenancetrigger/actions";
// import { set } from 'nprogress';

// import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';
const FormItem = Form.Item;
const Option = SelectOption;
export default function (props) {
  const {  visible,title,smId,pageState,sheduledTrigger,intScheduledMaintenanceStatusID} = props; 
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  const formItemCode = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
      className:"labelLeft"
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },    
  };
  const formItemMonth = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      className:"labelLeft"
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },    
  };
 
  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
  
  };
  const rowStyle1={
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    marginTop:"10px"
  }
  const rowTitleStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
   
    background:"#F3F3F3",
    padding:"2px 2px 2px 4px"
  };
  const {initData} = MeterReadingAction;
  const {addSMTrigger,updateData}=ScheduledMaintenanceTriggerAction;
  const dispatch = useDispatch();
  const { meterreadingunits } = useSelector((state) => state.MeterReading);
  // const { scheduledtrigger } = useSelector((state) => state.ScheduledMaintenanceTrigger);
  // const [newModalActive, setNewModalActive] = React.useState(false);
  // const [radioTriggerMethod,setRadioTriggerMethod]=React.useState(1);
  const [strType,setStrType]=React.useState('t');// Type of the Schedule Trigger.
  // const [strName, setStrName]=React.useState('');
  // const [strDescription, setStrDescription]=React.useState('');
  // const [intEveryVal,setIntEveryVal]=React.useState(1);
  const [bolTSWMonday,setBolTSWMonday]=React.useState(false);
  const [bolTSWSunday,setBolTSWSunday]=React.useState(false);
  const [bolTSWTuesday,setBolTSWTuesday]=React.useState(false);
  const [bolTSWWednesday,setBolTSWWednesday]=React.useState(false);
  const [bolTSWThursday,setBolTSWThursday]=React.useState(false);
  const [bolTSWFriday,setBolTSWFriday]=React.useState(false);
  const [bolTSWSaturday,setBolTSWSaturday]=React.useState(false);
  // const [bolDatLogicHourly,setBolDatLogicHourly]=React.useState(false);
  // const [bolDatLogicDaily,setBolDatLogicDaily]=React.useState(false);
  // const [bolDatLogicWeekly,setBolDatLogicWeekly]=React.useState(false);
  // const [bolDatLogicMonthly,setBolDatLogicMonthly]=React.useState(false);
  // const [bolDatLogicYearly,setBolDatLogicYearly]=React.useState(false);
  // const [intHowOften,setIntHowOften]=React.useState(1);
const [strTSType,setStrTSType]=React.useState('m');
const arrayHowOften={1:"Hours",2:"Days",3:"Weeks On",4:"Of Every ",5:"year(s), on"}
const intTSYMonthOfYear_array={0:"January",1:"February",2:"March",3:"April",4:"May",5:"Jun",6:"July",7:"August",8:"September",9:"October",10:"November",7:"December"};
const [intTSHEveryHours,setIntTSHEveryHours]=React.useState(1);
const [intTSDEveryDays,setIntTSDEveryDays]=React.useState(1);
const [intTSWEveryWeeks,setIntTSWEveryWeeks]=React.useState(1);
const [intTSYDayOfMonth,setIntTSYDayOfMonth]=React.useState(1);
const [intTSYEveryYears,setIntTSYEveryYears]=React.useState(1);
const [intTSMEveryMonths,setIntTSMEveryMonths]=React.useState(1);
// const [intTSYEveryYears,setIntTSYEveryYears]=React.useState(1);
// const [intTSWEveryWeeks,setIntTSWEveryWeeks]=React.useState(1);
const [strDatLogicHourly,setStrDatLogicHourly]  =React.useState("x");
const [strDatLogicDaily,setStrDatLogicDaily]=React.useState("x");
const [strDatLogicMonthly,setStrDatLogicMonthly]=React.useState('x');
const [strDatLogicYearly,setStrDatLogicYearly]=React.useState('x');
const [bolCreateWorkOrderOnStartDate,setBolCreateWorkOrderOnStartDate]=React.useState(true);
const [bolNoEndDate,setBolNoEndDate]=React.useState(true); // customize parameter
const [bolEndBy,setBolEndBy]=React.useState(false);   //customize parameter
const [strMrLogic,setStrMrLogic]=React.useState('x'); //x, t
const [bolMrByWOClosed,setBolMrByWOClosed]=React.useState(false);
const [strROType,setStrROType]=React.useState('l');// l, g
const [strRType,setStrRType]=React.useState('e')//e ,o
const [bolMTevery, setBolMTevery]=React.useState(true); // in meteriding triger every
const [bolMTwhen, setBolMTwhen]=React.useState(false); // customized parameter
const [strRRType,setStrRRType]=React.useState('n');//n, b
const [intTSYMonthOfYear,setIntTSYMonthOfYear]=React.useState(0);
const [datTRStart,setDatTRStart]=React.useState(moment(new Date(), 'MMM DD YYYY')); //YYYY-MM-DD
const [datTREndBy ,setDatTREndBy]=React.useState(moment(new Date(), 'MMM DD YYYY'));
const [dblROMeterReading,setDblROMeterReading]=React.useState('0.0');
const [dblLastMeterReading,setDblLastMeterReading]=React.useState(0); // unknown
const [dblRMeterReading,setDblRMeterReading]=React.useState('10.0'); 
const [dblRREndBy,setDblRREndBy]=React.useState('0.0');
const [dblRRStart,setDblRRStart]=React.useState('0.0');
const [dtmLastTriggered,setdtmLastTriggered]=React.useState(new Date());// unknown
const [intAssetEventTypeID,setIntAssetEventTypeID]=React.useState(null); //unknown
const [intRMeterReadingUnitID,setIntRMeterReadingUnitID]=React.useState(3);
const [intROMeterReadingUnitID,setIntROMeterReadingUnitID]=React.useState(3);
const [intRREndAfter,setIntRREndAfter]=React.useState(null); //unknown
const [intScheduledMaintenanceID,setIntScheduledMaintenanceID]=React.useState(null);
const [intTREndAfter,setIntTREndAfter]=React.useState(null);// unknown
const [intTSMDayOfMonth,setIntTSMDayOfMonth]=React.useState(1);
const [strTRType,setStrTRType]=React.useState('n'); //n:b
const [intAssetID,setIntAssetID]=React.useState(null);
const [strScheduleDescription,setStrScheduleDescription]=React.useState(''); //unknown
const [intTRTriggerTime,setintTRTriggerTime]=React.useState(0); //0~23 unknown.
const [assetEventModalActive,setAssetEventModalActive]=React.useState(false);
const [strAssetEventTypeName,setStrAssetEventTypeName]=React.useState('');
// const [meterreadingunitName,setMeterreadingunitName]=React.useState('');
const [scheduledTriggerId,setScheduledTriggerId]=React.useState(null);
//  React.useEffect(() => {   
//    dispatch(initData());   
// }, [visible]);

 const onSaveSMTrigger = () => {  
  var sendData={}; 
    sendData.bolTSWMonday=bolTSWMonday;
    sendData.bolTSWSaturday=bolTSWSaturday;
    sendData.bolTSWFriday=bolTSWFriday;
    sendData.bolTSWSunday=bolTSWSunday;
    sendData.bolTSWThursday=bolTSWThursday;
    sendData.bolTSWTuesday=bolTSWTuesday;
    sendData.bolTSWWednesday=bolTSWWednesday;
    sendData.strDatLogicHourly=strDatLogicHourly;
    sendData.strDatLogicDaily=strDatLogicDaily;
    sendData.strDatLogicMonthly=strDatLogicMonthly;
    sendData.strDatLogicYearly=strDatLogicYearly;
    sendData.datTREndBy=datTREndBy.format();
    sendData.datTRStart=datTRStart.format();
    // sendData.dblLastMeterReading=dblLastMeterReading //unknown
    sendData.dblRMeterReading=dblRMeterReading;
    sendData.dblROMeterReading=dblROMeterReading;
    sendData.dblRRStart=dblRRStart;
    sendData.dblRREndBy=dblRREndBy;//????????
    // sendData.dtmLastTriggered=dtmLastTriggered;// unknown
    sendData.intRMeterReadingUnitID=intRMeterReadingUnitID;
    sendData.intROMeterReadingUnitID=intROMeterReadingUnitID;
    // sendData.intRREndAfter=intRREndAfter;// unknown
    sendData.intScheduledMaintenanceID=smId;
    sendData.intTSDEveryDays=intTSDEveryDays;
    sendData.intTSHEveryHours=intTSHEveryHours;
    sendData.intTSMDayOfMonth=intTSMDayOfMonth;
    sendData.intTSMEveryMonths=intTSMEveryMonths;
    sendData.intTSWEveryWeeks=intTSWEveryWeeks;
    sendData.intTSYDayOfMonth=intTSYDayOfMonth;
    sendData.intTSYEveryYears=intTSYEveryYears;
    sendData.intTSYMonthOfYear=intTSYMonthOfYear;

    sendData.strROType=strROType;
    sendData.strRRType=bolNoEndDate?"n":"b";//strRRType;   bolNoEndDate: setBolEndBy n:b
    sendData.strRType=bolMTevery?"e":"o"; // bolMTwhen:bolMTevery  //every:other
    sendData.strTRType=strTRType;
    sendData.strTSType=strTSType;

    sendData.strType=strType;
    sendData.strMrLogic=strMrLogic;
    sendData.bolMrByWOClosed=bolMrByWOClosed;
    sendData.bolCreateWorkOrderOnStartDate=bolCreateWorkOrderOnStartDate;
    sendData.intAssetID=intAssetID;
    sendData.intAssetEventTypeID=intAssetEventTypeID;
    sendData.intScheduledMaintenanceStatusID=intScheduledMaintenanceStatusID;

    var temp_str="";
    
    if(strType=='t'){
       temp_str="Every ";
        if(strTSType=='h'){ //hourly          
            temp_str=temp_str+intTSHEveryHours.toString()+" Hour"+(intTSHEveryHours>1?"(s)":"");           
        }
        else if(strTSType=='d'){
           temp_str=temp_str+intTSDEveryDays+" Day"+(intTSDEveryDays>1?"s":"");
        }
        else if(strTSType=='w'){
          temp_str=temp_str+intTSWEveryWeeks+" Week"+(intTSWEveryWeeks>1?"s":"");
          if(bolTSWMonday || bolTSWTuesday || bolTSWWednesday || bolTSWThursday || bolTSWFriday || bolTSWSaturday || bolTSWSunday){
            temp_str=temp_str+" On"+(bolTSWSunday?" Sunday,":"")+(bolTSWMonday?" Monday,":"")+(bolTSWTuesday?" Thusday,":"");
            temp_str=temp_str+(bolTSWWednesday?" Wednesday,":"")+(bolTSWThursday?" Thursday, ":"")+(bolTSWFriday?" Friday,":"")+(bolTSWSaturday?" Saturday,":"");
          }
       }
       else if (strTSType=='m'){
          if(intTSMEveryMonths>1){
            temp_str="Every "+intTSMEveryMonths+" months on the "+intTSMDayOfMonth+"th";
          }
          else {
            temp_str="The "+intTSMDayOfMonth+"th day of every month";
          }       
       }
       else if(strTSType=='y'){
          if(intTSYEveryYears>1){
            temp_str="Every "+intTSYEveryYears+" years, on "+intTSYMonthOfYear_array[intTSYMonthOfYear]+" "+intTSYDayOfMonth+"th";
          }
          else{
            temp_str="Every "+"year, on "+intTSYMonthOfYear_array[intTSYMonthOfYear]+" "+intTSYDayOfMonth+"th";
          }
       }

     
    }
    else if (strType=='r'){      

          var meterReadingName="";
         
          if(bolMTevery){
            meterreadingunits.map((row)=>{
              if(intRMeterReadingUnitID==row._id){
                meterReadingName=row.strName+"("+row.strSymbol+")";
                  }
            })
              temp_str="Every "+dblRMeterReading+" "+meterReadingName;
          }      
          else {// bolMTwhen:     
            meterreadingunits.map((row)=>{
              if(intROMeterReadingUnitID==row._id){
                meterReadingName=row.strName+"("+row.strSymbol+")";
                  }
            })                   
            temp_str=meterReadingName+"  is  "+(strROType=="g"?"greater than ":"less than ")+dblROMeterReading;
          }

    }
    else { //e
      if(strAssetEventTypeName==''){
        notification('info',"Please select an event.");
        return;
      }
      var temp_str='Every "'+strAssetEventTypeName+'"'+ " Event";

    }

  setStrScheduleDescription(temp_str);
  sendData.strScheduleDescription=temp_str;

  // 
  var currentDate=new Date();
  var start;
  var end;
  if(strType=="t"){
      var startDt=new Date(datTRStart);    
      if(currentDate.getDate()<=startDt.getDate() && currentDate.getMonth()<=startDt.getMonth()){
        start=startDt;
      }
      else{
        start=currentDate;
      }
     
      if(!bolNoEndDate) // if end data is defined.
      {
        var endDt=new Date(datTREndBy);
        // if(endDt.getDate()<=currentDate.getDate() && endDt.getMonth()<=currentDate.getMonth()){          
      if(endDt<=currentDate){          
          end=currentDate;
        }
        else{
          end=endDt;
        }       
      }

        var slices = [];
        var count = 0;     
        if( strTSType=="h"){
          if(bolNoEndDate){ // if No end data   
            var endDt=  new Date();
             endDt.setDate(endDt.getDate() + 60);
             end=endDt;
           }

          while (end >= start) {
            start = new Date(start.getTime() + (intTSHEveryHours*60 * 60 * 1000)); //ms
            slices[count] = start.toDateString()+" "+ start.toLocaleTimeString();
            count++;
          }
        }
        else if(strTSType=="d"){
          if(bolNoEndDate){ // if No end data   
            var endDt=  new Date();
             endDt.setDate(endDt.getDate() + 180);
             end=endDt;
           }
          while (end >= start) {
            start = new Date(start.getTime() + (intTSDEveryDays*24*60 * 60 * 1000));
            slices[count] = start.toDateString()+" 12:00:00 AM";
            count++;            
          }
         slices.splice(slices.length-1,1);
        }     
        else if(strTSType=='w'){
          if(bolNoEndDate){ // if No end data   
            var endDt=  new Date();
             endDt.setMonth(endDt.getMonth() + 2);
             end=endDt;
           }
           console.log(end,'this is end');
          while (end.getTime() >= start.getTime()) {
            //start = new Date(start.getTime() + (24*60 * 60 * 1000));
          
              if(bolTSWMonday && start.getDay()==1){
                slices.push( start.toDateString()+" 12:00:00 AM");
              }
              else if(bolTSWTuesday && start.getDay()==2)
              {
                slices.push( start.toDateString()+" 12:00:00 AM");
              }
              else if(bolTSWWednesday && start.getDay()==3)
              {
                slices.push( start.toDateString()+" 12:00:00 AM");
              }
              else if(bolTSWThursday && start.getDay()==4)
              {
                slices.push( start.toDateString()+" 12:00:00 AM");
              }
              else if(bolTSWFriday && start.getDay()==5)
              {
                slices.push( start.toDateString()+" 12:00:00 AM");
              }
              else if(bolTSWSaturday && start.getDay()==6)
              {
                slices.push( start.toDateString()+" 12:00:00 AM");
              }
              else if(bolTSWSunday && start.getDay()==0)
              {
                slices.push( start.toDateString()+" 12:00:00 AM");
              }
              // console.log(start.getDay(),intTSWEveryWeeks)
              // if(start.getDay()==0 && intTSWEveryWeeks!=1)
              //  start = new Date(start.getTime() + (intTSWEveryWeeks*7*24*60 * 60 * 1000));        
              // else
               start = new Date(start.getTime() + (24*60 * 60 * 1000));        


          }
        } 
        else if(strTSType=='m'){
          if(bolNoEndDate){ // if No end data   
            var endDt=  new Date();
             endDt.setMonth(endDt.getMonth() + 24);
             end=endDt;
           }
          while (end.getTime() >= start.getTime()) {
            start = new Date(start.getTime() + (24*60 * 60 * 1000));
               
            if(start.getDate()==parseInt(intTSMDayOfMonth)){
               slices.push( start.toDateString()+" 12:00:00 AM");
                console.log(start);
              start = new Date(start.setMonth(start.getMonth()+parseInt(intTSMEveryMonths)-1));
            }
          }
        }
        else if(strTSType=='y'){
          if(bolNoEndDate){ // if No end data   
            var endDt=  new Date();
             endDt.setFullYear(endDt.getFullYear() + 3);
             end=endDt;
           }
            while (end.getTime() >= start.getTime()) {
              start = new Date(start.getTime() + (24*60 * 60 * 1000));                
              if(start.getDate()==intTSYDayOfMonth && start.getMonth()==intTSYMonthOfYear){
                slices.push(start.toDateString()+" 12:00:00 AM");
                start = new Date(start.setFullYear(start.getFullYear()+parseInt(intTSYEveryYears)-1));
              }
            }
        }
        sendData.strthreshold=slices.join(",");
        sendData.strCurrentTime=currentDate.toDateString()+" "+ currentDate.toLocaleTimeString();;
  }
  // 
  props.onCancel();
  return;
 if(pageState=='edit'){
  dispatch(updateData(sendData,scheduledTriggerId));
 }
 else{
  dispatch(addSMTrigger(sendData));
 }

  props.onCancel();
  
}
const onChange=(event)=>{
  setStrType(event.target.value);
 }
 const onChangeHowOften=(event)=>{
  setStrTSType(event.target.value); // hourly, daily, monthly
 }
 const onChangeLogicHourly=(event)=>{
   setStrDatLogicHourly(event.target.value);
 }
 const onChangeLogicDaily=(event)=>{
   setStrDatLogicDaily(event.target.value);
 }
 const onChangebolTSWMonday=(event)=>{
   setBolTSWMonday(event.target.checked);
 }
 const onChangebolTSWSunday=(event)=>{
   setBolTSWSunday(event.target.checked);
 }
 const onChangebolTSWTuesday=(event)=>{
   setBolTSWTuesday(event.target.checked);
 }
 const onChangebolTSWWednesday=(event)=>{
   setBolTSWWednesday(event.target.checked)
 }
 const onChangebolTSWThursdayy=(event)=>{
   setBolTSWThursday(event.target.checked);
 }
 const onChangebolTSWFriday=(event)=>{
   setBolTSWFriday(event.target.checked);
 }
 const onChangebolTSWSaturday=(event)=>{
   setBolTSWSaturday(event.target.checked);
 }
 const onChangeDatLogicMonthly=(event)=>{
   setStrDatLogicMonthly(event.target.value);
 }
 const onChangeStrMrLogic=(event)=>{
   setStrMrLogic(event.target.value);
 }
 const handleCancel=()=>{
  setAssetEventModalActive(false);
 }
 const selectedAssetEventType=(row)=>{
   setIntAssetEventTypeID(row._id);
   setStrAssetEventTypeName(row.strEventCode+"-"+row.strEventName);
 }
 const howOftenBody=()=>{
   if(strTSType=='h')
   return <div  style={{borderRadius: "4px",border:"1px solid rgb(205, 209, 215)",padding:"8px", margin:"4px"}} >
   <Row style={rowStyle} gutter={16} justify="start">
      <Col md={10} sm={10} xs={20} > 
          <Form>
            <FormItem {...formItemCode}  label="Every ">
            <Input placeholder=""
              value={intTSHEveryHours}
              onChange={(event)=>setIntTSHEveryHours(event.target.value)}
          />                                 
            </FormItem>
          </Form>    
      </Col>
      <Col md={10} sm={10} xs={22} style={{position:"relative"}} >
        <span style={{position:"absolute",top:"7px"}}>Hours</span>                     
      </Col>
    </Row>
    <Row style={rowStyle} gutter={16} justify="start">
       <Col md={6} sm={6} xs={24} > 
          <RadioGroup onChange={onChangeLogicHourly} name="value" value={strDatLogicHourly}>
            <Radio style={radioStyle} value={"x"}>
                Fixed
            </Radio>
            <Radio style={radioStyle} value={"t"}>
                Floating
            </Radio>                   
          </RadioGroup>
      </Col>
      <Col md={18} sm={18} xs={24} > 
          <div  style={{borderRadius: "4px",border:"1px solid rgb(205, 209, 215)",padding:"8px", margin:"4px"}} >
            {
              strDatLogicHourly=='x'?<span>By setting a fixed date trigger, you are indicating you wish the next trigger date to always occur on the date triggers you have set.</span>
              :<span>By setting a floating date trigger, you are indicating you wish the next trigger date to be determined based on the trigger period and the close date of the created Work Order.</span>
            }
           
         </div>
      </Col>
    </Row>                 
</div>
else if(strTSType=='d')
return <div  style={{borderRadius: "4px",border:"1px solid rgb(205, 209, 215)",padding:"8px", margin:"4px"}} >
<Row style={rowStyle} gutter={16} justify="start">
   <Col md={10} sm={10} xs={20} > 
       <Form>
         <FormItem {...formItemCode}  label="Every ">
         <Input placeholder=""
           value={intTSDEveryDays}
           onChange={(event)=>setIntTSDEveryDays(event.target.value)}
       />                                 
         </FormItem>
       </Form>    
   </Col>
   <Col md={10} sm={10} xs={22} style={{position:"relative"}} >
     <span style={{position:"absolute",top:"7px"}}>Days</span>                     
   </Col>
 </Row>
 <Row style={rowStyle} gutter={16} justify="start">
    <Col md={6} sm={6} xs={24} > 
    <RadioGroup onChange={onChangeLogicDaily} name="value" value={strDatLogicDaily}>
       <Radio style={radioStyle} value={"x"}>
           Fixed
       </Radio>
       <Radio style={radioStyle} value={"t"}>
           Floating
       </Radio>                   
  </RadioGroup>
   </Col>
   <Col md={18} sm={18} xs={24} > 
          <div  style={{borderRadius: "4px",border:"1px solid rgb(205, 209, 215)",padding:"8px", margin:"4px"}} >
            {
              strDatLogicDaily=='x'?<span>By setting a fixed date trigger, you are indicating you wish the next trigger date to always occur on the date triggers you have set.</span>
              :<span>By setting a floating date trigger, you are indicating you wish the next trigger date to be determined based on the trigger period and the close date of the created Work Order.</span>
            }
           
         </div>
   </Col>
 </Row>                 
</div>
else if(strTSType=='w')
return <div  style={{borderRadius: "4px",border:"1px solid rgb(205, 209, 215)",padding:"8px", margin:"4px"}} >
<Row style={rowStyle} gutter={16} justify="start">
   <Col md={10} sm={10} xs={20} > 
       <Form>
         <FormItem {...formItemCode}  label="Every">
         <Input placeholder=""
           value={intTSWEveryWeeks}
           onChange={(event)=>setIntTSWEveryWeeks(event.target.value)}
       />                                 
         </FormItem>
       </Form>    
   </Col>
   <Col md={10} sm={10} xs={22} style={{position:"relative"}} >
     <span style={{position:"absolute",top:"7px"}}>{arrayHowOften[strTSType]}</span>                     
   </Col>
 </Row>
 <Row style={rowStyle} gutter={16} justify="start">
    <Col md={24} sm={24} xs={24} > 
      {/* <ContentHolder> */}
              <Checkbox checked={bolTSWSunday} onChange={onChangebolTSWSunday}>Sunday</Checkbox>
              <Checkbox checked={bolTSWMonday} onChange={onChangebolTSWMonday}>Monday</Checkbox>
              <Checkbox checked={bolTSWTuesday} onChange={onChangebolTSWTuesday}>Tuesday</Checkbox>
              <Checkbox checked={bolTSWWednesday} onChange={onChangebolTSWWednesday}>Wednesday</Checkbox>
              <Checkbox checked={bolTSWThursday} onChange={onChangebolTSWThursdayy}>Thursday</Checkbox>
              <Checkbox checked={bolTSWFriday} onChange={onChangebolTSWFriday}>Friday</Checkbox>
              <Checkbox checked={bolTSWSaturday} onChange={onChangebolTSWSaturday}>Saturday</Checkbox>
       {/* </ContentHolder> */}
   </Col>
 </Row>                 
</div>
else if(strTSType=='m')
return <div  style={{borderRadius: "4px",border:"1px solid rgb(205, 209, 215)",padding:"8px", margin:"4px"}} >
<Row style={rowStyle} gutter={16} justify="start">
   <Col md={6} sm={6} xs={12} > 
       <Form>
         <FormItem {...formItemMonth}  label="Day">
         <Input placeholder=""
           value={intTSMDayOfMonth}
           onChange={(event)=>setIntTSMDayOfMonth(event.target.value)}
       />                                 
         </FormItem>
       </Form>    
   </Col>   
   <Col md={10} sm={10} xs={12} > 
       <Form>
         <FormItem {...formItemMonth}  label=" Of Every">
         <Input placeholder=""
           value={intTSMEveryMonths}
           onChange={(event)=>setIntTSMEveryMonths(event.target.value)}
       />                                 
         </FormItem>
       </Form>    
   </Col>
   <Col md={4} sm={4} xs={22} style={{position:"relative"}} >
     <span style={{position:"absolute",top:"7px"}}>Months </span>                     
   </Col>
 </Row>
 {/* <Row style={rowStyle} gutter={16} justify="start">
    <Col md={24} sm={24} xs={22} >
      <div style={{fontStyle: "italic"}}> Day will automatically adjust to date of closed work order if floating</div>
    </Col>
 </Row>
 <Row style={rowStyle} gutter={16} justify="start">
    <Col md={6} sm={6} xs={24} > 
    <RadioGroup onChange={onChangeDatLogicMonthly} name="value" value={strDatLogicMonthly}>
       <Radio style={radioStyle} value={'x'}>
           Fixed
       </Radio>
       <Radio style={radioStyle} value={'t'}>
           Floating
       </Radio>                   
  </RadioGroup>
   </Col>
   <Col md={18} sm={18} xs={24} > 
          <div  style={{borderRadius: "4px",border:"1px solid rgb(205, 209, 215)",padding:"8px", margin:"4px"}} >
            {
              strDatLogicMonthly=='x'?<span>By setting a fixed date trigger, you are indicating you wish the next trigger date to always occur on the date triggers you have set.</span>
              :<span>By setting a floating date trigger, you are indicating you wish the next trigger date to be determined based on the trigger period and the close date of the created Work Order.</span>
            }
           
         </div>
   </Col>
 </Row>                  */}
</div>
else if(strTSType=='q')

return <div  style={{borderRadius: "4px",border:"1px solid rgb(205, 209, 215)",padding:"8px", margin:"4px"}} >
<Row style={rowStyle} gutter={16} justify="start">
   <Col md={6} sm={6} xs={12} > 
       <Form>
         <FormItem {...formItemMonth}  label="Every">
         <Input placeholder=""
           value={intTSYEveryYears}
           onChange={(event)=>setIntTSYEveryYears(event.target.value)}
       />                                 
         </FormItem>
       </Form>    
   </Col>   
   <Col md={4} sm={4} xs={22} style={{position:"relative"}} >
     <span style={{position:"absolute",top:"7px"}}> year(s), on</span> 
   </Col>
   <Col md={6} sm={6} xs={12} > 
            {/* select option */}
            <Select
                  defaultValue={0}                  
                 onChange={(value)=>{setIntTSYMonthOfYear(value)}}
                  style={{ width: '100px' }}
                >
                  <Option value={0}>January</Option>
                  <Option value={1}>February</Option>                
                  <Option value={2}>March</Option>
                  <Option value={3}>April</Option>
                  <Option value={4}>May</Option>
                  <Option value={5}>Jun</Option>
                  <Option value={6}>July</Option>
                  <Option value={7}>August</Option>
                  <Option value={8}>September</Option>
                  <Option value={9}>October</Option>
                  <Option value={10}>November</Option>
                  <Option value={11}>December</Option>
            </Select>
   </Col>
   <Col md={6} sm={6} xs={12} > 
       <Form>
         <FormItem {...formItemMonth}  label="">
         <Input placeholder=""
           value={intTSYDayOfMonth}
           onChange={(event)=>setIntTSYDayOfMonth(event.target.value)}
       />                                 
         </FormItem>
       </Form>    
   </Col>
   
 </Row>
 
</div>
else if(strTSType=='y')
return <div  style={{borderRadius: "4px",border:"1px solid rgb(205, 209, 215)",padding:"8px", margin:"4px"}} >
<Row style={rowStyle} gutter={16} justify="start">
   <Col md={6} sm={6} xs={12} > 
       <Form>
         <FormItem {...formItemMonth}  label="Every">
         <Input placeholder=""
           value={intTSYEveryYears}
           onChange={(event)=>setIntTSYEveryYears(event.target.value)}
       />                                 
         </FormItem>
       </Form>    
   </Col>   
   <Col md={4} sm={4} xs={22} style={{position:"relative"}} >
     <span style={{position:"absolute",top:"7px"}}> year(s), on</span> 
   </Col>
   <Col md={6} sm={6} xs={12} > 
            {/* select option */}
            <Select
                  defaultValue={0}                  
                 onChange={(value)=>{setIntTSYMonthOfYear(value)}}
                  style={{ width: '100px' }}
                >
                  <Option value={0}>January</Option>
                  <Option value={1}>February</Option>                
                  <Option value={2}>March</Option>
                  <Option value={3}>April</Option>
                  <Option value={4}>May</Option>
                  <Option value={5}>Jun</Option>
                  <Option value={6}>July</Option>
                  <Option value={7}>August</Option>
                  <Option value={8}>September</Option>
                  <Option value={9}>October</Option>
                  <Option value={10}>November</Option>
                  <Option value={11}>December</Option>
            </Select>
   </Col>
   <Col md={6} sm={6} xs={12} > 
       <Form>
         <FormItem {...formItemMonth}  label="">
         <Input placeholder=""
           value={intTSYDayOfMonth}
           onChange={(event)=>setIntTSYDayOfMonth(event.target.value)}
       />                                 
         </FormItem>
       </Form>    
   </Col>
   
 </Row>
 {/* <Row style={rowStyle} gutter={16} justify="start">
    <Col md={24} sm={24} xs={22} >
      <div style={{fontStyle: "italic"}}>  Day and month on work order will automatically adjust if floating
</div>
    </Col>
 </Row>
 <Row style={rowStyle} gutter={16} justify="start">
    <Col md={6} sm={6} xs={24} > 
    <RadioGroup onChange={(event)=>setStrDatLogicYearly(event.target.value)} name="value" value={strDatLogicYearly}>
       <Radio style={radioStyle} value={'x'}>
           Fixed
       </Radio>
       <Radio style={radioStyle} value={'t'}>
           Floating
       </Radio>                   
  </RadioGroup>
   </Col>
   <Col md={18} sm={18} xs={24} > 
          <div  style={{borderRadius: "4px",border:"1px solid rgb(205, 209, 215)",padding:"8px", margin:"4px"}} >
            {
              strDatLogicMonthly=='x'?<span>By setting a fixed date trigger, you are indicating you wish the next trigger date to always occur on the date triggers you have set.</span>
              :<span>By setting a floating date trigger, you are indicating you wish the next trigger date to be determined based on the trigger period and the close date of the created Work Order.</span>
            }
           
         </div>
   </Col>
 </Row>                  */}
</div>

 }
const sectionPart=()=>{
 
  return  <div style={{paddingLeft:"20px",paddingRight:"20px"}}>
        
  <Row style={rowTitleStyle} gutter={16} justify="start">
      <Col md={24} sm={24} xs={24} > 
          How Often
      </Col>
  </Row>
  <Row style={rowStyle} gutter={16} justify="start">
    <Col md={7} sm={7} xs={24} > 
    <div  style={{borderRadius: "4px",border:"1px solid rgb(205, 209, 215)",padding:"4px", margin:"4px"}} >
        <RadioGroup onChange={onChangeHowOften} name="value" value={strTSType}>
              {/* <Radio style={radioStyle} value={'h'}>
                Hourly
              </Radio>
              <Radio style={radioStyle} value={'d'}>
                Daily
              </Radio>*/}
              <Radio style={radioStyle} value={'w'}>
                Weekly
              </Radio>              
              <Radio style={radioStyle} value={'m'}>
                Monthly
              </Radio>
              <Radio style={radioStyle} value={'bm'}>
                 Bimonthly
              </Radio>
              <Radio style={radioStyle} value={'tm'}>
                 Trimonthly
              </Radio>               
              <Radio style={radioStyle} value={'q'}>
                Quarterly
              </Radio>
              <Radio style={radioStyle} value={'b'}>
               Biannual
              </Radio>
              <Radio style={radioStyle} value={'y'}>
                Yearly
              </Radio>
              <Radio style={radioStyle} value={'y'}>
                Random
              </Radio>
        </RadioGroup>
    </div>

    </Col>
    <Col md={17} sm={17} xs={24} > 
        {howOftenBody()}
    </Col>
    </Row>
    <Row style={rowTitleStyle} gutter={16} justify="start">
      <Col md={24} sm={24} xs={24} > 
        From When And For How Long
      </Col>
   </Row>
   <div  style={{borderRadius: "4px",border:"1px solid rgb(205, 209, 215)",padding:"4px", margin:"4px"}} >
   <Row style={rowStyle} gutter={16} justify="start">
      <Col md={12} sm={12} xs={24} > 
         Start On <DatePicker onChange={(event,e)=>{setDatTRStart(event)}}   value={datTRStart}/>
      </Col>
      <Col md={12} sm={12} xs={24} > 
           <Radio  style={radioStyle} checked={bolNoEndDate} onClick={(event)=>{setBolNoEndDate(!bolNoEndDate);setBolEndBy(bolNoEndDate)}} name="endData">
                                  No End Date
           </Radio>
      </Col>
   </Row>
   <Row style={rowStyle} gutter={16} justify="start">
      <Col md={12} sm={12} xs={24} style={{marginTop:"5px"}}> 
         <Checkbox checked={bolCreateWorkOrderOnStartDate} onChange={(event)=>{setBolCreateWorkOrderOnStartDate(event.target.checked)}} >Create Work Order On Start Date</Checkbox>
      </Col>
      <Col md={4} sm={4} xs={24} > 
              <Radio style={radioStyle} checked={bolEndBy} onClick={(event)=>{setBolNoEndDate(bolEndBy);setBolEndBy(!bolEndBy)}} name="endData">
                   End By
              </Radio>                   
      </Col>
      <Col md={6} sm={6} xs={24} >                    
              <DatePicker onChange={(event,e)=>{setDatTREndBy(event)}}  value={datTREndBy}/>
              
      </Col>
   </Row>
   </div>
</div>


}
 return (
   <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        // okText="New"
        title={title}     
        width={800}
        onOk={onSaveSMTrigger}
        onCancel={props.onCancel}
      >
      {/* <div>
        <Row style={rowStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24} >  
              <RadioGroup onChange={onChange} name="value" value={strType}>
                      <Radio style={radioStyle} value={'t'}>
                          Generate Work Order By Time Schedule
                      </Radio>                    
                </RadioGroup>
            </Col>
        </Row>
      </div> */}
      {
        sectionPart()
      }
      </Modal>
      <AssetEventTypesModal
        visible={assetEventModalActive}
        onCancel={handleCancel}
         title={"ASSET EVENT TYPES"}
         selectedAssetEventType={selectedAssetEventType}
        //  selectedMeterReadingUnit={selectedMeterReadingUnit}
      >
      </AssetEventTypesModal>
  </div>
 )
}
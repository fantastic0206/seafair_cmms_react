import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from "@iso/components/utility/customScrollBar";
import Modal from '@iso/components/Feedback/Modal';
import Button from '@iso/components/uielements/button';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import addDoubleImg from '../../../../assets/images/new-group-inner-list.png';
import newAddImg from '../../../../assets/images/new-inner-list.png';
import '../../../../component/table.css'
import MeterReadingModal from "../../../../component/MeterReadingModal";
import AssetEventModal from "../../../../component/AssetEventModal";
import MeterReadingAction from "../../../../redux/meterreading/actions";
import AssetEventAction from "../../../../redux/assetevent/actions";
import {
  ActionBtn,
  Fieldset,
  Form,
  Label, 
} from '../OnlineContent.styles';

export default function(props) {   
  const {assetId,assetName}=props;
  const dispatch = useDispatch();
   const [meterReadingModalActive, setMeterReadingModalActive] = React.useState(false);
   const [assetEventModalActive,setAssetEventModalActive]=React.useState(false);
   const [detailModalActive,setDetailModalActive]=React.useState(false);
   const [detailMeterReadingModalActive,setDetailMeterReadingModalActive]=React.useState(false);
   const { getMeterings,deleteMeterReadingData } = MeterReadingAction;
   const {getAssetEvents,deleteData}=AssetEventAction;
   const { meterings } = useSelector((state) => state.MeterReading);
   const { assetEvents } = useSelector((state) => state.AssetEvent);
   
   const [submittedByUser,setSubmittedByUser]=React.useState("");
   const [submittedDate,setSubmittedDate]=React.useState("");
  const [assetTypeEvent,setAssetTypeEvent]=React.useState("");
  const [additionalDescription,setAdditionalDescription]=React.useState("");
  const [selectedAssetEventId,setSelectedAssetEventId]=React.useState("");
  const [meterReadingTxt,setMeterReadingTxt]=React.useState("");
  const [meterReadingUnit,setMeterReadingUnit]=React.useState("");
  const [selectedMeteringId,setSelectedMeteringId]=React.useState("");
 

   const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
  };
  const handleCancel = () => {
    setMeterReadingModalActive(false);
    setAssetEventModalActive(false);
    
  };
  React.useEffect(() => { 
    dispatch(getMeterings(assetId,localStorage.getItem('user_id')));
    dispatch(getAssetEvents(assetId));
  }, []);
  React.useEffect(() => { 
    console.log(assetEvents,'assetEvents')
  }, [assetEvents]);
  
  const onRowClick=(row)=>{  

    setDetailMeterReadingModalActive(true);
    row.intSubmittedByUserID!=null?setSubmittedByUser(row.intSubmittedByUserID.strFullName):setSubmittedByUser('');
    setSubmittedDate(row.dtmDateSubmitted);
    setMeterReadingTxt(row.dblMeterReading);
    row.intMeterReadingUnitsID!=null? setMeterReadingUnit(row.intMeterReadingUnitsID.strSymbol):setMeterReadingUnit(null);
    setSelectedMeteringId(row._id);
  }

  const onRowClickAssetEvent=(row)=>{
    setDetailModalActive(true);  
    row.intSubmittedByUserID!=null?setSubmittedByUser(row.intSubmittedByUserID.strFullName):setSubmittedByUser('');
    setSubmittedDate(row.dtmDateSubmitted);
    row.intAssetEventTypeID!=null?setAssetTypeEvent(row.intAssetEventTypeID.strEventCode+"-"+row.intAssetEventTypeID.strEventName):setAssetTypeEvent('');
    setAdditionalDescription(row.strAdditionalDescription);
    setSelectedAssetEventId(row._id);
  }
  const onDelete=()=>{
    dispatch(deleteData(selectedAssetEventId,assetId));
    setDetailModalActive(false);
  }
  const onDeleteMeterReading=()=>{
    setDetailMeterReadingModalActive(false);
    dispatch(deleteMeterReadingData(selectedMeteringId,assetId));
  }
  return (
    <div className="isoInvoiceTable">
     <Row style={rowStyle} gutter={16} style={{background: "#e8edf0", padding: "5px 0 3px 0px",marginBottom:'5px'}}>
         <Col md={24} sm={24} xs={24} >
           <div style={{color: "#738796",marginLeft:"10px"}}>Most Recent Meter Readings</div>
          </Col>
    </Row>
      <Scrollbars
        style={{ width: "100%", height: "calc(35vh - 70px)" }}
      >
        {/* <TableWrapper
          // rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={false}
          className="isoGroupTable"
        /> */}
         <table  style={{overflow:'auto'}}>
        <thead>
          <tr>
            <th style={{width:"20%"}} ><span className="listHeaderLabel35">Last Reading</span></th>
            <th style={{width:"20%"}}><span className="listHeaderLabel35">Unit</span></th>
            <th><span className="listHeaderLabel35">Date Submitted</span></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
       
        {
            meterings.length!=0?
            meterings.map((row)=>{
                return <tr className="listRow" key={row.key} onClick={()=>{onRowClick(row)}}>                    
                      <td className="column"><p className="context">{row.dblMeterReading}</p></td>
                      <td className="column"><p className="context">{row.intMeterReadingUnitsID.strSymbol}</p></td>
                      <td className="column"><p className="context">{row.dtmDateSubmitted}</p></td>
                    </tr>
              })
              :<tr ><td style={{textAlign:"center",fontSize:"14px"}} colSpan="3">No Data!</td></tr>
          
          }
        </tbody>
        
        </table>
      </Scrollbars>
      <div style={{color: "rgb(102, 115, 136)",   
          fontSize: "10pt",
          background: "#f7f7f7",
          border:"1px solid rgb(241, 243, 246)",
          height: "25px"}}>
       <span style={{float: "left",
                      marginLeft:"4px", 
                    marginRight:"4px",
                    cursor:"pointer",
                  }}>
         <img src={newAddImg} onClick={()=>setMeterReadingModalActive(true)}></img>
         </span>         
      </div>
      <MeterReadingModal
         visible={meterReadingModalActive}
         assetName={assetName}
         assetId={assetId}
         onCancel={handleCancel}
         title={"METER READING"}
      >
      </MeterReadingModal>
      <Row style={rowStyle} gutter={16} style={{background: "#e8edf0", padding: "5px 0 3px 0px",marginBottom:'5px',marginTop:"10px"}}>
         <Col md={24} sm={24} xs={24} >
           <div style={{color: "#738796",marginLeft:"10px"}}>Most Recent Asset Events</div>
          </Col>
    </Row>
    <Scrollbars
        style={{ width: "100%", height: "calc(35vh - 70px)" }}
      >
        {/* <TableWrapper
          // rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={false}
          className="isoGroupTable"
        /> */}
         <table  style={{overflow:'auto',width:"70%"}}>
        <thead>
          <tr>
            <th style={{width:"30%"}} ><span className="listHeaderLabel35">Event</span></th>
            <th ><span className="listHeaderLabel35">Date Submitted</span></th>          
           
          </tr>
        </thead>
        <tbody>
       
        {
            assetEvents.length!=0?
            assetEvents.map((row)=>{
                return <tr className="listRow" key={row.key} onClick={()=>{onRowClickAssetEvent(row)}}>                    
                      <td className="column"><p className="context">{row.intAssetEventTypeID.strEventCode+"-"+row.intAssetEventTypeID.strEventName}</p></td>
                      <td className="column"><p className="context">{row.dtmDateSubmitted}</p></td>
                    </tr>
              })
              :<tr ><td style={{textAlign:"center",fontSize:"14px"}} colSpan="3">No Data!</td></tr>
          
          }
        </tbody>
        
        </table>
      </Scrollbars>
      <div style={{color: "rgb(102, 115, 136)",   
          fontSize: "10pt",
          background: "#f7f7f7",
          border:"1px solid rgb(241, 243, 246)",
          height: "25px"}}>
       <span style={{float: "left",
                      marginLeft:"4px", 
                    marginRight:"4px",
                    cursor:"pointer",
                  }}>
         <img src={newAddImg} onClick={()=>setAssetEventModalActive(true)}></img>
         </span>         
      </div>
      <AssetEventModal
       visible={assetEventModalActive}
       assetName={assetName}
       assetId={assetId}
       onCancel={handleCancel}
       title={"ASSET EVENT"}
      >
      </AssetEventModal>
      {/*  Metering Modal */}
      <Modal
      visible={detailMeterReadingModalActive}
      width={280}
      onClose={()=>setDetailMeterReadingModalActive(false)}     
      title={"METER READING"}  
      footer={null}
      // onOk={onSave}
       onCancel={()=>setDetailMeterReadingModalActive(false)}
    >
       <Form>
            <Fieldset>
             <Label>Asset</Label>
             <span>{assetName}</span>
            </Fieldset>
            <Fieldset>
             <Label>Submitted By User</Label>
             <span>{submittedByUser}</span>
            </Fieldset>
            <Fieldset>
             <Label>Date Submitted</Label>
             <span>{submittedDate}</span>
            </Fieldset>
            <Fieldset>
             <Label>Meter Reading</Label>
             <span>{meterReadingTxt}</span>
            </Fieldset>
            <Fieldset>
             <Label>Meter Reading Units</Label>
             <span>{meterReadingUnit}</span>
            </Fieldset>
           
            <Button type="danger" className="saveBtn" onClick={onDeleteMeterReading} >
              <span>Delete</span>
            </Button>            
          </Form>         
      </Modal>
      {/* Metering Modal end */}

     {/*  Asset Event Modal */}
      <Modal
      visible={detailModalActive}
      width={280}
      onCancel={()=>setDetailModalActive(false)}     
      onClose={()=>setDetailModalActive(false)}     
      title={"ASSET EVENT"}  
      footer={null}
      // onOk={onSave}
      // onCancel={props.onCancel}
    >
       <Form>
            <Fieldset>
             <Label>Asset</Label>
             <span>{assetName}</span>
            </Fieldset>
            <Fieldset>
             <Label>Submitted By User</Label>
             <span>{submittedByUser}</span>
            </Fieldset>
            <Fieldset>
             <Label>Date Submitted</Label>
             <span>{submittedDate}</span>
            </Fieldset>
            <Fieldset>
             <Label>Asset Event Type</Label>
             <span>{assetTypeEvent}</span>
            </Fieldset>
            <Fieldset>
             <Label>Additional Description</Label>
             <span>{additionalDescription}</span>
            </Fieldset>
           
            <Button type="danger" className="saveBtn" onClick={onDelete} >
              <span>Delete</span>
            </Button>            
          </Form>         
      </Modal>
      {/* Asset Evemt Modal end */}
  </div>
  );
}

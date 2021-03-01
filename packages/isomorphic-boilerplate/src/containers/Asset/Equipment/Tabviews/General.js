import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
import Input, { InputGroup ,Textarea} from "@iso/components/uielements/input";
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import Checkbox from '@iso/components/uielements/checkbox';
import EquipmentPartModal from '../../../../component/EquipmentPartModal';
import EquipmentLocatedModal from '../../../../component/EquipmentLocatedModal';
import AccountsModal from  '../../../../component/AccountsModal';
import ChargeDepartmentModal from  '../../../../component/ChargeDepartmentModal';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 }   
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },  
};
const formItemEquipment = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 0 }   
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24},
  },  
};

const formItemAccount = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }   
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },  
};
const formItemCharge = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10}   
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },  
};

const formItemAddress = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 }   
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 21 },
  },  
};

const formItemCheckbox = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 1 }   
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 23 },
  },  
};
const formItem1 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 }   
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
  },  
};
const colStyle = {
  marginBottom: "2px",
};
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
};
export default function(props) {   
  const {asset,pageState}=props;
   const [equipmentPartModalActive,setEquipmentPartModalActive]=React.useState(false);
  const[equipmentLocatedModalActive,setEquipmentLocatedModalActive]=React.useState(false);
  const [accountsModalActive,setAccountsModalActive]=React.useState(false);
  const [chargeDepartModalActive,setChargeDepartModalActive]=React.useState(false);
  const [locatedFlag,setLocatedFlag]=React.useState(true);
  const [partFlag,setPartFlag]=React.useState(false);
  const [equipmentPartTxt,setEquipmentPartTxt]=React.useState('');
  const [equipmentLocatedTxt,setEquipmentLocatedTxt]=React.useState('');
  const [strAccount,setStrAccount]=React.useState('');
  const [intAccountID	, setIntAccountID	] = React.useState('');
  const [strChargeDepartment,setStrChargeDepartment]= React.useState('');

  const [strAisle, setStrAisle] = React.useState('');
  const [strRow, setStrRow] = React.useState('');
  const [strBinNumber, setStrBinNumber] = React.useState(''); 
  const [strMake, setStrMake] = React.useState('');
  const [strModel, setStrModel] = React.useState('');
  const [strSerialNumber, setStrSerialNumber] = React.useState('');
  const [strBarcode,setStrBarcode]=React.useState('');
  const [strUnspcCode, setStrUnspcCode] = React.useState('');
  const [strNotes, setStrNotes] = React.useState('');


   const handleCancel = () => {
    setEquipmentPartModalActive(false);
    setEquipmentLocatedModalActive(false);
    setAccountsModalActive(false);
    setChargeDepartModalActive(false)
  };
  const selectEquipParentId=(row)=>{
    
    setEquipmentPartTxt(row.strName);
    setEquipmentLocatedTxt('');
    props.selectIntAssetParentID(row._id);
    setPartFlag(true);
    setLocatedFlag(false);
  }
  const selectEquipLocatedId=(row)=>{
    setEquipmentPartTxt('');
    setEquipmentLocatedTxt(row.strName);
    setPartFlag(false);
    setLocatedFlag(true);
    props.selectIntAssetLocationId(row._id);
  }
  const selectedAccount=(row)=>{  
    setStrAccount("("+row.strCode+")"+row.strDescription)
    setIntAccountID(row._id);
    props.selectedAccount(row);
  }
  const selectedChargeDepart=(row)=>{
    props.selectedChargeDepartment(row);
    setStrChargeDepartment("("+row.strCode+")"+row.strDescription);
  }
  const locationChange=()=>{
    var generalInf={};
    generalInf.strAisle=strAisle;
    generalInf.strRow=strRow;
    generalInf.strBinNumber=strBinNumber;
    generalInf.strMake=strMake;
    generalInf.strModel=strModel;
    generalInf.strSerialNumber=strSerialNumber;
    generalInf.strBarcode=strBarcode;
    generalInf.strUnspcCode=strUnspcCode;
    generalInf.strNotes=strNotes;    
       props.generalInf(generalInf);
  }
  React.useEffect(() => { 
    console.log(pageState,asset,'this is general tab');
    if(pageState=="edit"){
      if(Object.keys(asset).length ===0)
        return
       setStrAisle(asset.asset.strAisle);
       setStrRow(asset.asset.strRow);
       setStrBinNumber(asset.asset.strBinNumber);
       setStrNotes(asset.asset.strNotes);
       setStrMake(asset.asset.strMake);
       setStrModel(asset.asset.strModel);
       setStrSerialNumber(asset.asset.strSerialNumber);
       setStrBarcode(asset.asset.strBarcode);
       setStrUnspcCode(asset.asset.strUnspcCode);        
   
        if(Object.keys(asset.account).length !==0)       
        setStrAccount("("+asset.account.strCode+")"+asset.account.strDescription);
        if(Object.keys(asset.chargeDepartment).length !==0)       
        setStrChargeDepartment("("+asset.chargeDepartment.strCode+")"+asset.chargeDepartment.strDescription);
        
        if(Object.keys(asset.parentAsset).length !==0) {
          if(asset.asset.intAssetLocationID==null){
            setEquipmentPartTxt(asset.parentAsset.strName)
            setLocatedFlag(false);
            setPartFlag(true);
          }         
          else{
            setEquipmentLocatedTxt(asset.parentAsset.strName);
            setLocatedFlag(true);
            setPartFlag(false);
          }
        }
    }
  }, [asset]);
  return (
  <div  className="PageContent">
    <InputGroup size="large" style={{ marginBottom: "15px" }}>
              <Row style={rowStyle} gutter={16} justify="start">
                <Col md={4} sm={4} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="">
                      <Radio name="value"  checked={partFlag} onClick={(event)=>{setPartFlag(locatedFlag?true:false);setLocatedFlag(false)}}> This Equipment is part of :</Radio>                                  
                    </FormItem>
                  </Form>                 
                </Col>
                
                <Col md={7} sm={7} xs={23} style={colStyle}>
                  <Form>
                    <FormItem {...formItemEquipment} label="">
                    <Input placeholder="" style={{height:"35px",fontSize : "15px"}}
                        value={equipmentPartTxt}    onChange={()=>setEquipmentPartModalActive(true)}            
                     />                                 
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={1} sm={1} xs={1} >
                    <i className="ionicons ion-arrow-down-b" onClick={()=>{setEquipmentPartModalActive(true)}}
                       style={{fontSize:'25px',cursor: "pointer"}}></i>
                  </Col>
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">
                  <Col md={4} sm={4} xs={24} style={colStyle}>
                    <Form>
                      <FormItem {...formItemLayout} label="">
                        <Radio  name="value"  checked={locatedFlag} onClick={(event)=>{setLocatedFlag(partFlag?true:false);setPartFlag(false);}}  > This Equipment is located at :</Radio>                                  
                      </FormItem>
                    </Form>                 
                  </Col>
                  <Col md={7} sm={7} xs={24} style={colStyle}>
                    <Form>
                      <FormItem {...formItemEquipment} label="">
                      <Input placeholder="" style={{height:"35px",fontSize : "15px"}}
                        value={equipmentLocatedTxt} onChange={()=>setEquipmentLocatedModalActive(true)}
                      />                                 
                      </FormItem>
                    </Form>                 
                  </Col>
                  <Col md={1} sm={1} xs={1} >
                    <i className="ionicons ion-arrow-down-b" 
                    onClick={()=>{setEquipmentLocatedModalActive(true)}}
                       style={{fontSize:'25px',cursor: "pointer"}}></i>
                  </Col>
                  <Col md={3} sm={3} xs={6} style={colStyle}>
                    <Form>
                      <FormItem {...formItem1} label="Aisle">
                      <Input placeholder="" 
                            value={strAisle}
                            onChange={(event)=>{setStrAisle(event.target.value);}}
                            onKeyUp={()=>{locationChange();}}
                      style={{height:"30px",fontSize : "14px"}}
                      />                                 
                      </FormItem>
                    </Form>                 
                  </Col>
                  <Col md={3} sm={3} xs={6} style={colStyle}>
                    <Form>
                      <FormItem {...formItem1} label="Row">
                      <Input placeholder="" style={{height:"30px",fontSize : "14px"}}
                       value={strRow}
                       onChange={(event)=>{setStrRow(event.target.value);}}
                       onKeyUp={()=>{locationChange();}}
                      />                                 
                      </FormItem>
                    </Form>                 
                  </Col>
                  <Col md={3} sm={3} xs={6} style={colStyle}>
                    <Form>
                      <FormItem {...formItem1} label="Bin">
                      <Input placeholder=""  
                      value={strBinNumber}
                      onChange={(event)=>{setStrBinNumber(event.target.value);}}
                      onKeyUp={()=>{locationChange();}}
                      style={{height:"30px",fontSize : "14px"}}
                      />                                 
                      </FormItem>
                    </Form>                 
                  </Col>
                  {/* <Col md={4} sm={4} xs={24}>
                  <Form>
                    <FormItem {...formItemCheckbox} label="">
                      <Checkbox  > Use Inherited Location (Uncheck to Override)</Checkbox>
                    </FormItem>
                  </Form>
                </Col> 
                <Col md={18} sm={18} xs={24}>
                  <Form>
                    <FormItem {...formItemAddress} label="">
                    <Input placeholder="Address" style={{height:"24px",fontSize : "12px"}}></Input>
                    </FormItem>
                  </Form>
                </Col>         
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">
                <Col md={4} sm={4} xs={24} style={colStyle}>                                
                </Col>
                <Col md={4} sm={4} xs={24} style={colStyle}>
                     <span>Lookup location using:</span>            
                </Col>
                <Col md={4} sm={4} xs={24} style={colStyle}>
                    <input type="radio" name="address"></input><label htmlFor="address">Address (for lookup only)</label>
                </Col>
                <Col md={3} sm={3} xs={24} style={colStyle}>
                    <input type="radio" name="address"></input><label htmlFor="address">Latitude/Longitude</label>
                </Col>
                <Col md={3} sm={3} xs={24} style={colStyle}>
                  <Input placeholder="Latitude" style={{height:"24px",fontSize : "12px"}}></Input>               
                </Col>
                <Col md={3} sm={3} xs={24} style={colStyle}>
                  <Input placeholder="Longitude" style={{height:"24px",fontSize : "12px"}}></Input>               
                </Col> */}
                </Row>
                <Row style={rowStyle} gutter={16} style={{background: "#e8edf0", padding: "5px 0 3px 10px",marginBottom:'15px'}}>
                  <Col md={24} sm={24} xs={24} >
                    <div style={{color: "#738796"}}>General Information</div>
                  </Col>
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">
                  <Col md={6} sm={6} xs={24} >
                     <Form>
                      <FormItem {...formItemAccount}  label="Account">
                      <Input placeholder="Account" 
                        value={strAccount}
                        onChange={()=>{setAccountsModalActive(true);}}
                     />                                        
                      </FormItem>
                    </Form>
                  </Col>
                  <Col md={1} sm={1} xs={1} style={{paddingLeft:"0px"}} >
                     <i className="ionicons ion-arrow-down-b"                    
                     onClick={()=>{setAccountsModalActive(true)}}
                     style={{fontSize:'25px',cursor: "pointer"}}></i>
                  </Col>
                  </Row>
                  <Row style={rowStyle} gutter={16} justify="start">
                  <Col md={8} sm={8} xs={24} >
                     <Form>
                      <FormItem {...formItemCharge}  label="Charge Department">
                      <Input placeholder="Charge Department" 
                        value={strChargeDepartment}
                        onChange={()=>{setChargeDepartModalActive(true)}}
                      />                                        
                      </FormItem>
                    </Form>
                  </Col>
                  <Col md={1} sm={1} xs={1} style={{paddingLeft:"0px"}} >
                     <i className="ionicons ion-arrow-down-b"
                     onClick={()=>{setChargeDepartModalActive(true)}}
                     style={{fontSize:'25px',cursor: "pointer"}}></i>
                  </Col>
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">
                  <Col md={8} sm={8} xs={24} >
                     <label>Notes</label>
                     <Textarea placeholder="Notes" 
                     value={strNotes}
                     onChange={(event)=>{setStrNotes(event.target.value)}}
                     onKeyUp={()=>{locationChange();}}
                      style={{ height: 'auto' }}  
                      rows={13}                               
                     /> 
                  </Col>
                  <Col md={8} sm={8} xs={24} >
                    <div>
                        <label>Make</label>
                        <Input placeholder=""  
                          value={strMake}
                          onChange={(event)=>{setStrMake(event.target.value)}}
                          onKeyUp={()=>{locationChange();}}
                          style={{marginBottom:'15px'}} />  
                     </div>
                     <div >
                        <label>Model</label>
                        <Input placeholder=""  
                          value={strModel}
                          onChange={(event)=>{setStrModel(event.target.value)}}
                          onKeyUp={()=>{locationChange();}}
                        style={{marginBottom:'15px'}} />  
                     </div>
                     <div >
                        <label>Serial Number</label>
                        <Input placeholder="" 
                          value={strSerialNumber}
                          onChange={(event)=>{setStrSerialNumber(event.target.value)}}
                          onKeyUp={()=>{locationChange();}}
                        style={{marginBottom:'15px'}} />  
                     </div>
                     <div >
                        <label>Barcode</label>
                        <Input placeholder=""  
                          value={strBarcode}
                          onChange={(event)=>{setStrBarcode(event.target.value)}}
                          onKeyUp={()=>{locationChange();}}
                        style={{marginBottom:'15px'}} />  
                     </div>
                     <div >
                        <label>Unspc Code</label>
                        <Input placeholder="" 
                          value={strUnspcCode}
                          onChange={(event)=>{setStrUnspcCode(event.target.value)}}
                          onKeyUp={()=>{locationChange();}}
                         style={{marginBottom:'15px'}} />  
                     </div>
                  </Col>
                </Row>

      </InputGroup>
      {/* customize modal start */}
      <EquipmentPartModal 
           visible={equipmentPartModalActive}
           onCancel={handleCancel}
           title="EQUIPMENT"
          selectEquipParentId={selectEquipParentId}
           onCancel={handleCancel}
          >
          </EquipmentPartModal>
          <EquipmentLocatedModal
              visible={equipmentLocatedModalActive}
              onCancel={handleCancel}
              title="FACILITIES"
              selectEquipLocatedId={selectEquipLocatedId}
              onCancel={handleCancel}
          >
          </EquipmentLocatedModal>
          <AccountsModal
          visible={accountsModalActive}
          onCancel={handleCancel}
          title="ACCOUNTS"
          selectedAccount={selectedAccount}
          onCancel={handleCancel}
          >
          </AccountsModal>
          <ChargeDepartmentModal 
           visible={chargeDepartModalActive}
           onCancel={handleCancel}
           title="CHARGE DEPARTMENTS"
           selectedChargeDepart={selectedChargeDepart}
           // okText={article.key ? 'Update Article' : 'Add Article'}
           // onOk={() => handleRecord('insert', article)}
           onCancel={handleCancel}
          >

          </ChargeDepartmentModal>
          {/* customize modal end */}
	</div>
  );
}

import React from "react";
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
import Input, { InputGroup, Textarea } from "@iso/components/uielements/input";
import Radio, { RadioGroup } from "@iso/components/uielements/radio";
import Checkbox from "@iso/components/uielements/checkbox";
//import FacilityPartModal from "../../../../component/FacilityPartModal";
import FacilityPartModal from '../../../../component/EquipmentLocatedModal';
import AccountsModal from "../../../../component/AccountsModal";
import ChargeDepartmentModal from "../../../../component/ChargeDepartmentModal";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};
const formItemEquipment = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 0 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const formItemAccount = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};
const formItemCharge = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const formItemAddress = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};
const formItemCity = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
};

const formItemCheckbox = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 1 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 23 },
  },
};

const formItemLayout2 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const formItem1 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
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
export default function (props) {
  const [facilityPartModalActive, setFacilityPartModalActive] = React.useState(
    false
  );
  const {asset,pageState}=props;
  const [accountsModalActive, setAccountsModalActive] = React.useState(false);
  const [chargeDepartModalActive, setChargeDepartModalActive] = React.useState(
    false
  );
  const [locatedFlag,setLocatedFlag]=React.useState(true);
  const [partFlag,setPartFlag]=React.useState(false);
  const [facilityPart,setFacilityPart]=React.useState('');

  const [strAddress, setStrAddress] = React.useState('');
  const [strProvince, setStrProvince] = React.useState('');
  const [strCity, setStrCity] = React.useState('');
  const [strPostalCode, setStrPostalCode] = React.useState('');
  const [strCountryName,setStrCountryName]=React.useState('');
  const [intAccountID	, setIntAccountID	] = React.useState('');
  const [strAccount,setStrAccount]=React.useState('');
  const [strBarcode,setStrBarcode]=React.useState('');
  const [strNotes, setStrNotes] = React.useState('');
  const [strChargeDepartment,setStrChargeDepartment]= React.useState('');


  const handleCancel = () => {
    setFacilityPartModalActive(false);
    setAccountsModalActive(false);
    setChargeDepartModalActive(false);
  };
  const selectEquipLocatedId=(row)=>{
    // setEquipmentPartTxt('');
    // setEquipmentLocatedTxt(row.strName);
    setPartFlag(true);
    setLocatedFlag(false);
    setFacilityPart(row.strName);
    props.selectIntAssetParentID(row._id);
  }
  const locationChange=()=>{
    var locationInf={};
    locationInf.strAddress=strAddress;
    locationInf.strCity=strCity;
    locationInf.strPostalCode=strPostalCode;
    locationInf.strProvince=strProvince;
    locationInf.strCountryName=strCountryName;
    locationInf.strBarcode=strBarcode;
    locationInf.strNotes=strNotes;    
    props.locationInf(locationInf);
  }
  const selectedAccount=(row)=>{
    console.log(row,'account id');
    setStrAccount("("+row.strCode+")"+row.strDescription)
    setIntAccountID(row._id);
    props.selectedAccount(row);
  }
  const selectedChargeDepart=(row)=>{
    props.selectedChargeDepartment(row);
    setStrChargeDepartment("("+row.strCode+")"+row.strDescription);

  }
  React.useEffect(() => {   
    if(pageState=="edit"){
      if(Object.keys(asset).length ===0)
        return
        setStrAddress(asset.asset.strAddress);
        setStrCity(asset.asset.strCity);
        setStrProvince(asset.asset.strProvince);
        setStrPostalCode(asset.asset.strPostalCode);
        setStrCountryName(asset.asset.strCountryName);
        setStrBarcode(asset.asset.strBarcode);
        setStrNotes(asset.asset.strNotes);
        setLocatedFlag(asset.asset.intAssetParentID!=0?false:true);
        setPartFlag(asset.asset.intAssetParentID!=0?true:false);
        if(Object.keys(asset.account).length ===0)
        return 
        setStrAccount("("+asset.account.strCode+")"+asset.account.strDescription);
        if(Object.keys(asset.chargeDepartment).length ===0)
        return
        setStrChargeDepartment("("+asset.chargeDepartment.strCode+")"+asset.chargeDepartment.strDescription);
        if(Object.keys(asset.parentAsset).length ===0)
        return
        setFacilityPart(asset.parentAsset.strName)

    }
  }, [asset]);
  return (
    <div className="PageContent">
      <InputGroup size="large" style={{ marginBottom: "15px" }}>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={4} sm={4} xs={24} style={colStyle}>
            <Form>
              <FormItem {...formItemLayout} label="">
                <Radio
                  name="value"
                  checked={partFlag}
                  onClick={(event)=>{setPartFlag(locatedFlag?true:false);setLocatedFlag(false);props.locationFlag(false);}}
                >
                  {" "}
                  This facility is part of :
                </Radio>
              </FormItem>
            </Form>
          </Col>

          <Col md={7} sm={7} xs={23} style={colStyle}>
            <Form>
              <FormItem {...formItemEquipment} label="">
                <Input
                  placeholder=""
                  value={facilityPart}
                  onChange={()=>setFacilityPartModalActive(true)}
                  style={{ height: "35px", fontSize: "15px" }}
                />
              </FormItem>
            </Form>
          </Col>
          <Col md={1} sm={1} xs={1}>
            <i
              className="ionicons ion-arrow-down-b"
              onClick={() => {
                setFacilityPartModalActive(true);
              }}
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <Form>
              <FormItem {...formItemCheckbox} label="">
                {/* <Checkbox> Use This Address (Uncheck to Override)</Checkbox> */}
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={4} sm={4} xs={24} style={colStyle}>
                    <Form>
                      <FormItem {...formItemLayout} label="">
                        <Radio  name="value"  checked={locatedFlag} 
                        onClick={(event)=>{setLocatedFlag(partFlag?true:false);
                          setPartFlag(false);setFacilityPart('');props.locationFlag(true)}}  >  This facility is not part of another location, and is located at :</Radio>                                  
                      </FormItem>
                    </Form>                 
                  </Col>
                  <Col md={7} sm={7} xs={24} style={colStyle}>                          
                  </Col>
          <Col md={24} sm={24} xs={24}>
            <Form>
              <FormItem {...formItemCity} label="Address">
                <Textarea
                  placeholder="Address"
                  value={strAddress}
                  onChange={(event)=>{
                    setStrAddress(event.target.value);
                   }}
                   onKeyUp={()=>{locationChange();}}
                  row={4}
                  style={{ height: "auto" }}
                ></Textarea>
              </FormItem>
            </Form>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <Form>
              <FormItem {...formItemCity} label="City">
                <Input placeholder=""
                    value={strCity}
                  onChange={(event)=>{setStrCity(event.target.value);
                 }}
                 onKeyUp={()=>{locationChange();}}
                ></Input>
              </FormItem>
            </Form>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <Form>
              <FormItem {...formItemCity} label="Province">
                <Input placeholder=""
                   value={strProvince}
                  onChange={(event)=>{setStrProvince(event.target.value);}}
                  onKeyUp={()=>{locationChange();}}
                ></Input>
              </FormItem>
            </Form>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <Form>
              <FormItem {...formItemCity} label="Postal Code">
                <Input placeholder=""
                 value={strPostalCode}
                 onChange={(event)=>{setStrPostalCode(event.target.value);}}
                 onKeyUp={()=>{locationChange();}}
                ></Input>
              </FormItem>
            </Form>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <Form>
              <FormItem {...formItemCity} label="Country">
                <Input placeholder=""
                   value={strCountryName}
                   onChange={(event)=>{setStrCountryName(event.target.value);}}
                   onKeyUp={()=>{locationChange();}}
                ></Input>
              </FormItem>
            </Form>
          </Col>
        </Row>

        <Row
          style={rowStyle}
          gutter={16}
          style={{
            background: "#e8edf0",
            padding: "5px 0 3px 10px",
            marginBottom: "15px",
          }}
        >
          <Col md={24} sm={24} xs={24}>
            <div style={{ color: "#738796" }}>General Information</div>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={6} sm={6} xs={24}>
            <Form>
              <FormItem {...formItemAccount} label="Account">
                <Input placeholder="Account" 
                  value={strAccount}
                  onChange={()=>{setAccountsModalActive(true);}}
                  />
              </FormItem>
            </Form>
          </Col>
          <Col md={1} sm={1} xs={1} style={{ paddingLeft: "0px" }}>
            <i
              className="ionicons ion-arrow-down-b"
              onClick={() => {
               setAccountsModalActive(true);
              }}
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
          </Col>
          <Col md={8} sm={8} xs={24}>
            <Form>
              <FormItem {...formItemCharge} label="Barcode">
                <Input placeholder="Barcode" 
                  value={strBarcode}
                  onChange={(event)=>{setStrBarcode(event.target.value)}}
                  onKeyUp={()=>{locationChange();}}
                />
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={24}>
            <Form>
              <FormItem {...formItemLayout2} label="Charge Department">
                <Input placeholder="Charge Department"
                 value={strChargeDepartment}
                 onChange={()=>setChargeDepartModalActive(true)}                 
                 />
              </FormItem>
            </Form>
          </Col>
          <Col md={1} sm={1} xs={1} style={{ paddingLeft: "0px" }}>
            <i
              className="ionicons ion-arrow-down-b"
              onClick={() => {
                setChargeDepartModalActive(true)
              }}
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={24}>
            <label>Notes</label>
            <Textarea
              placeholder="strDescription"
              value={strNotes}
              onChange={(event)=>{setStrNotes(event.target.value)}}
              onKeyUp={()=>{locationChange();}}
              style={{ height: "auto" }}
              rows={13}
            />
          </Col>
          <Col md={8} sm={8} xs={24}></Col>
        </Row>
      </InputGroup>
      {/* cusomize modal start */}
      <FacilityPartModal
        visible={facilityPartModalActive}
        onCancel={handleCancel}
        title="FACILITIES"
        selectEquipLocatedId={selectEquipLocatedId}
        // okText={article.key ? 'Update Article' : 'Add Article'}
        // onOk={() => handleRecord('insert', article)}
        onCancel={handleCancel}
      ></FacilityPartModal>
      <AccountsModal
        visible={accountsModalActive}
        onCancel={handleCancel}
        title="ACCOUNTS"
        selectedAccount={selectedAccount}
        onCancel={handleCancel}
      ></AccountsModal>
      <ChargeDepartmentModal
        visible={chargeDepartModalActive}
        onCancel={handleCancel}
        title="CHARGE DEPARTMENTS"
        selectedChargeDepart={selectedChargeDepart}
        // okText={article.key ? 'Update Article' : 'Add Article'}
        // onOk={() => handleRecord('insert', article)}
        onCancel={handleCancel}
      ></ChargeDepartmentModal>
      {/* customize modal end  */}
    </div>
  );
}

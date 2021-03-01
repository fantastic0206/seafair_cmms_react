import React from 'react';
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Link,useHistory } from "react-router-dom";
import Switch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
// import Select, { SelectOption } from '@iso/components/uielements/select';
import Button from '@iso/components/uielements/button';
import Input, { InputGroup ,Textarea,  InputSearch,} from "@iso/components/uielements/input";
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
// import IntlMessages from '@iso/components/utility/intlMessages';
import AssetCategoryModal from '../../../component/AssetCategoryModal';
import AssetPageWrapper from "../SingleAsset.styles";
import { TableTabsStyle } from "./Asset.styles";
import { Col, Row, Form } from "antd";
import {General,PartsBom,Metering,Personal} from './Tabviews/Tabviews';
import OnlineCotentModal from './OnlineContent';
import assetAction from '../../../redux/asset/actions';
const FormItem = Form.Item;
const { updateData ,addAsset} = assetAction;
// const TabPane = Tabs.TabPane;

// const treeData = [
//   {
//     title: 'Locations and Facilities',
//     key: '0-0',
//     children: [
//       {
//         title: 'Buildings',
//         key: '0-0-0',      
//       },
//       {
//         title: 'Inventory Storage',
//         key: '0-0-1',        
//       },
//     ],
//   },
// ];
function callback(key) {}

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
const formItemCode = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
    className:"labelLeft"
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
  
};
const formItemCategory = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
    className:"labelLeft"
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
  
};
const formItemDescription={
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 21 },
  },
}
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
};
const endRowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginBottom:"20px"
};
const colStyle = {
  marginBottom: "2px",
};
const gutter = 16;

export default function () {
  const [state, setState] = React.useState({   
    tabPosition: 'top',
    newTabIndex: 0,
  });
  let history = useHistory();
  const dispatch = useDispatch();
  const [online, setOnline] = React.useState(true);
  const [onlineModalActive,setOnlineModalActive]=React.useState(false);
  const [modalCategoryVisible,setModalCategoryVisible]=React.useState(false);
  // const [categoryList,setCategoryList]=React.useState(treeData);
  const [category,setCategory]=React.useState('');
  const { assetName,assetId,isSaved } = useSelector((state) => state.Assets);

  const [intCategoryID,setIntCategoryID]=React.useState(10);
  const [categoryName,setCategoryName]=React.useState('');
  const [strName,setStrName]=React.useState('New Facility #A');
  const [strCode,setStrCode]=React.useState('A');

  // 
  const [strDescription, setStrDescription] = React.useState('');
  const [strMake, setStrMake] = React.useState('');
  const [strModel, setStrModel] = React.useState('');
  const [qtyMinStockCount, setQtyMinStockCount] = React.useState('');
  const [strCity, setStrCity] = React.useState('');
  const [strShippingTerms, setStrShippingTerms] = React.useState('');
  const [strAddress, setStrAddress] = React.useState('');
  const [strNotes, setStrNotes] = React.useState('');
  const [strProvince, setStrProvince] = React.useState('');
  const [intCountryID, setIntCountryID] = React.useState('');
  const [strCountryName,setStrCountryName]=React.useState('');
  const [strInventoryCode, setStrInventoryCode] = React.useState('');
  const [qtyStockCount, setQtyStockCount] = React.useState('');
  const [intSiteID, setIntSiteID] = React.useState('');
  const [strRow, setStrRow] = React.useState('');
  const [strMASourceProduct, setStrMASourceProduct] = React.useState('');
  const [strAisle, setStrAisle] = React.useState('');
  const [strBinNumber, setStrBinNumber] = React.useState(''); 
  const [strPostalCode, setStrPostalCode] = React.useState('');
  const [strSerialNumber, setStrSerialNumber] = React.useState('');
  const [dblLatitude, setDblLatitude] = React.useState('');
  const [dblLongitude, setDblLongitude] = React.useState('');
  const [strUnspcCode, setStrUnspcCode] = React.useState('');
  const [dblLastPrice, setDblLastPrice] = React.useState('');
  const [bolIsBillToFacility, setBolIsBillToFacility] = React.useState(false);
  const [intAssetLocationID, setIntAssetLocationID] = React.useState('');
  const [bolIsOnline, setBolIsOnline] = React.useState(true);
  const [bolIsShippingOrReceivingFacility	, setBolIsShippingOrReceivingFacility	] = React.useState(false);
  const [strQuotingTerms	, setStrQuotingTerms	] = React.useState('');
  const [intAssetParentID	, setIntAssetParentID	] = React.useState(0);
  const [intAccountID	, setIntAccountID	] = React.useState('');
  const [intChargeDepartmentID	, setIntChargeDepartmentID	] = React.useState('');
  const [intSuperCategorySysCode	, setIntSuperCategorySysCode	] = React.useState('');
  const [strBarcode,setStrBarcode]=React.useState('');
  const [locatedFlag,setLocatedFlag]=React.useState(false);
  
  // 

  function handleChange(checked){
    setOnlineModalActive(true);
    //setOnline(checked);
  }
  const handleCancel = () => {
    setModalCategoryVisible(false);
    setOnlineModalActive(false);
  };
  const selectedParent=(selectedId)=>{
    setCategoryName(selectedId.title);
    setIntCategoryID(selectedId._id);
    setModalCategoryVisible(false);
    console.log(selectedId,'selectedId');
  };
  React.useEffect(() => {     
      var sendData={};
      sendData.intCategoryKind=1;
      sendData.intCategoryID=intCategoryID;
    dispatch(addAsset(sendData));
  }, []);
  React.useEffect(() => { 
    console.log(assetName,'asetName')    ;
    if(assetName!=""){
      setStrName(assetName);  
      setStrCode("A "+assetId);
    }
    
  }, [assetName,assetId]);
  const onSave = () => {
    var sendData = {     
        'strName'    :strName,
        'strDescription'    :strDescription,
        'strMake'    :strMake,
        'strModel'    :strModel,
        'qtyMinStockCount'    :qtyMinStockCount,
        'strCity'    :strCity,
        'strShippingTerms'    :strShippingTerms,
        'strAddress'    :strAddress,
        'strNotes'    :strNotes,
        'strProvince'    :strProvince,
        'intCountryID'    :intCountryID,
        'strInventoryCode'    :strInventoryCode,
        'qtyStockCount'    :qtyStockCount,
        'intSiteID'    :intSiteID,
        'strRow'    :strRow,
        'strMASourceProduct'    :strMASourceProduct,
        'strAisle'    :strAisle,
        'strBinNumber'    :strBinNumber,
        'intCategoryID'    :intCategoryID,
        'strPostalCode'    :strPostalCode,
        'strSerialNumber'    :strSerialNumber,
        'strCode'    :strCode,
        'dblLatitude'    :dblLatitude,
        'dblLongitude'    :dblLongitude,
        'strUnspcCode'    :strUnspcCode,
        'dblLastPrice'    :dblLastPrice,
        'bolIsBillToFacility'    :bolIsBillToFacility,
        'intAssetLocationID'    :intAssetLocationID,
        'bolIsOnline'    :bolIsOnline,
        'bolIsShippingOrReceivingFacility'    :bolIsShippingOrReceivingFacility,    
        'strQuotingTerms'    :strQuotingTerms,
        'intAssetParentID'    :locatedFlag?0:intAssetParentID,
        'intAccountID'    :intAccountID,
        'intChargeDepartmentID'    :intChargeDepartmentID,
        'intSuperCategorySysCode'    :intSuperCategorySysCode,
        'intCategoryKind':1,
         'strBarcode'    :strBarcode,
         'strCountryName':strCountryName
        }    
        console.log(sendData);
        dispatch(updateData(sendData,assetId));
     };  
     const selectIntAssetParentID=(selId)=>{
      console.log(selId,'this is assetparentId');
      setIntAssetParentID(selId);
    }
    const locationInf=(inf)=>{
     
      setStrAddress(inf.strAddress);
      setStrCity(inf.strCity);
      setStrPostalCode(inf.strPostalCode);
      setStrProvince(inf.strProvince);
      setStrCountryName(inf.strCountryName);
      setStrBarcode(inf.strBarcode);
      setStrNotes(inf.strNotes);     
    }
    const selectedAccount=(row)=>{
      setIntAccountID(row._id)
    }
    const selectedChargeDepartment=(row)=>{     
      setIntChargeDepartmentID(row._id)
    }
    const locationFlag=(flag)=>{
      setLocatedFlag(flag);
    }
    const selectedOnlineState=(flag)=>{     
      setBolIsOnline(flag?false:true);
      setOnline(flag?false:true);
    }
    React.useEffect(() => {
      if (isSaved) {
        history.push('/dashboard/asset');
      }
    }, [isSaved]);
   
  return (
    <LayoutContentWrapper>  
        <div className="PageHeader">            
             <Link to={"/dashboard/asset"}>      
                <Button color="primary">
                  <span>Back</span>
                </Button>
              </Link> 
            <Button type="primary" className="saveBtn" onClick={onSave}>
              <span>Save</span>
            </Button>
        </div> 
      
          <TableTabsStyle className="isoLayoutContentAsset">
          <h4 style={{marginBottom:"15px"}}>Facility:</h4>
          <AssetPageWrapper className="editView">
            <div className="PageContent">
              <InputGroup size="large" style={{ marginBottom: "15px" }}>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="">
                      <Input placeholder="strName" 
                        onChange={(event)=>{setStrName(event.target.value)}}
                      value={strName}
                     />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <label style={{ position: "relative" }}>
                    <Switch checked={online} onChange={handleChange} />
                    <span
                      style={{
                        position: "absolute",
                        top: "-10px",
                        left: "65px",
                      }}
                    >
                      {online ? "Online" : "Offline"}
                    </span>
                  </label>
                </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} sm={12} xs={24} style={{marginBottom: "12px"}}>
                  <Form>
                    <FormItem {...formItemDescription} label="">
                    <Textarea placeholder="strDescription" 
                        onChange={(event)=>{setStrDescription(event.target.value)}}
                      style={{ height: 'auto' }}                                
                     />                    
                    </FormItem>
                  </Form>                 
                </Col>
                </Row>
                <Row style={endRowStyle} gutter={gutter} justify="start">
                  <Col md={8} sm={8} xs={24} >
                    <Form>
                      <FormItem {...formItemCode}  label="Code">
                      <Input placeholder="strCode"  value={strCode}
                       onChange={(event)=>{setStrCode(event.target.value)}}
                     />                  
                      </FormItem>
                    </Form>                 
                  </Col>
                  <Col md={8} sm={8} xs={24} >
                    <Form>
                      <FormItem {...formItemCategory}  label="Category">
                      <Input placeholder="Category" value={categoryName}
                        onChange={()=>{setModalCategoryVisible(true);}}
                     />                  
                      </FormItem>
                    </Form>                 
                  </Col>
                  <Col md={1} sm={1} xs={1} >
                    <i className="ionicons ion-arrow-down-b"
                     onClick={() => {
                      setModalCategoryVisible(true);
                    }}
                       style={{fontSize:'25px',cursor: "pointer"}}></i>
                  </Col>
                </Row>
              </InputGroup>
            </div>
          </AssetPageWrapper> 
            <Tabs defaultActiveKey="1"  className="isoTableDisplayTab" onChange={callback}>
              <TabPane tab="General" key="1" >
                <General
                 selectIntAssetParentID={selectIntAssetParentID}
                 locationInf={locationInf}
                 selectedAccount={selectedAccount}
                 locationFlag={locationFlag}
                 selectedChargeDepartment={selectedChargeDepartment}
                 pageState={"add"}
                 asset={{}}
                ></General>
              </TabPane>
              <TabPane tab="Parts/BOM" key="2">
               <PartsBom></PartsBom>
              </TabPane>
              <TabPane tab="Metering/Events" key="3">
               <Metering
               assetId={assetId}
               assetName={assetName}
               pageState={"add"}

              //  onSave={onSave}
               ></Metering>
              </TabPane>
              <TabPane tab="Personel" key="4">
                <Personal
                assetId={assetId}
                assetName={strName}
                  pageState={"add"}  
                ></Personal>
              </TabPane>
              <TabPane tab="Files" key="5">
                Content of Tab Pane 5
              </TabPane>            
              {/* <TabPane tab="Custom" key="8">
                Content of Tab Pane 8
              </TabPane> */}
              <TabPane tab="Log" key="9">
                Content of Tab Pane 9
              </TabPane>
            </Tabs>
          </TableTabsStyle>    
         {/* customize modal start */}
            
         <AssetCategoryModal
          visible={modalCategoryVisible}
          selectedCategory={selectedParent}
          parentKind={"Locations And Facilities"}
          onCancel={handleCancel}
          title={'ASSET CATEGORIES'}
          onCancel={handleCancel}
        ></AssetCategoryModal>
            {/* <Modal
              title="ASSET CATEGORIES"
              visible={modalCategoryVisible}
              // onOk={handleOk}
              onCancel={handleCancel}            
            //  footer={null}
              footer={[]}
              style={{width:'850px !important'}}
            >
              <div className="AssetCategorySelectContainer">
                <InputSearch
                  placeholder="input search text"
                  value={category}                       
                  style={{ width: "100%" }}
                />
                <div style={{
                      height: "24px",             
                      marginTop: "10px",
                      marginBottom: "5px",
                      fontWeight: "bold",
                      color: "rgb(16, 103, 171)"
                }}

                >Asset Category</div>         
                <Tree
                  showLine={false}
                  showIcon={false}
                  // expandedKeys={expandedKeys}
                  defaultExpandedKeys={["0-0-0", "0-0-1"]}
                  treeData={categoryList}
                />
              </div>              
            </Modal>    */}

            <OnlineCotentModal
            visible={onlineModalActive}
            onCancel={handleCancel}
            title={online ? 'SET OFFLINE' : 'SET ONLINE'}
            stateFlag={online}
            selectedOnlineState={selectedOnlineState}
            onCancel={handleCancel}
          >          
          </OnlineCotentModal>
         {/* customize modal end */}
        </LayoutContentWrapper>
  );
}

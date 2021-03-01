import React from 'react';
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import Switch from "react-switch";
import { Link,useHistory,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Button from '@iso/components/uielements/button';
import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import Input, { InputGroup ,Textarea,  InputSearch,} from "@iso/components/uielements/input";
import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import { Tree } from 'antd';
import AssetPageWrapper from "../SingleAsset.styles";
import { TableTabsStyle } from "./Asset.styles";
import OnlineCotentModal from './OnlineContent';
import { Col, Row, Form } from "antd";
import Modals from '@iso/components/Feedback/Modal';
import ModalStyle, { ModalContent } from '../Styles/ModalCategory.styles';
import WithDirection from '@iso/lib/helpers/rtl';
// import TreeTable from '../../../component/TreeTable'
import {General,PartsBom,Metering,Personal,Warranty,Business} from './Tabviews/Tabviews';
import assetAction from '../../../redux/asset/actions';
import AssetCategoryModal from '../../../component/AssetCategoryModal';
// import { sortData } from './data';
const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const FormItem = Form.Item;
const { getAssetById,updateData,deleteData } = assetAction;
const treeData = [
  {
    title: 'Equipment',
    key: '0-0',
    children: [
      {
        title: 'Asset Category #3',
        key: '0-0-0',      
      },
      {
        title: 'Rotating Spares',
        key: '0-0-1',        
      },
    ],
  },
];
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
  // const [state, setState] = React.useState({   
  //   tabPosition: 'top',
  //   online:false
  // });
  const dispatch = useDispatch();
  const { assetId } = useParams();
  let history = useHistory();
  const [online, setOnline] = React.useState(true);
  const [modalCategoryVisible,setModalCategoryVisible]=React.useState(false);
  const [category,setCategory]=React.useState('');
  const[categoryId,setCategoryId]=React.useState('');
  const [onlineModalActive,setOnlineModalActive]=React.useState(false);
  const [categoryList,setCategoryList]=React.useState(treeData);
  const [equipmentPartModalActive,setEquipmentPartModalActive]=React.useState(false);
  const { assetNumber ,asset,isDelete } = useSelector((state) => state.Assets);  
  const [strName,setStrName]=React.useState('New Equipment #A');
  const [strCode,setStrCode]=React.useState('A');
  const gData = [];
  const [intCategoryID,setIntCategoryID]=React.useState(0);

  const [categoryName,setCategoryName]=React.useState('');
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
  const [locatedFlag,setLocatedFlag]=React.useState(false);
  const [strBarcode,setStrBarcode]=React.useState('');

  function handleChange(checked){  
    setOnlineModalActive(true)
    //setOnline(checked);
  }
  const handleCancel = () => {
    setModalCategoryVisible(false);
    setOnlineModalActive(false);
  };
  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };
  const onCategorySearchChange = (e) => {
    const { value } = e.target;
    const expandedKeys = treeData
    .map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    })
    .filter((item, i, self) => item && self.indexOf(item) === i);
    console.log(expandedKeys)
    //setCategoryList(expandedKeys);
    setCategory(e.target.value);
  }
  React.useEffect(() => {     
    dispatch(getAssetById(assetId));  
    }, []);
    React.useEffect(() => {  
      if(Object.keys(asset).length ===0)
      return
      
  setStrName(asset.asset.strName);
  setStrDescription(asset.asset.strDescription);
  setStrMake(asset.asset.strMake);
  setStrModel(asset.asset.strModel);
  setQtyMinStockCount(asset.asset.qtyMinStockCount);
  setStrCity(asset.asset.strCity);
  setStrShippingTerms(asset.asset.strShippingTerms);
  setStrAddress(asset.asset.strAddress);
  setStrNotes(asset.asset.strNotes);
  setStrProvince(asset.asset.strProvince);
  setIntCountryID(asset.asset.intCountryID);
  setStrInventoryCode(asset.asset.strInventoryCode);
  setQtyStockCount(asset.asset.qtyStockCount);
  setIntSiteID(asset.asset.intSiteID);
  setStrRow(asset.asset.strRow);
  setStrMASourceProduct(asset.asset.strMASourceProduct);
  setStrAisle(asset.asset.strAisle);
  setStrBinNumber(asset.asset.strBinNumber);
  setIntCategoryID(asset.asset.intCategoryID);
  setStrPostalCode(asset.asset.strPostalCode);
  setStrSerialNumber(asset.asset.strSerialNumber);
  setStrCode(asset.asset.strCode);
  setDblLatitude(asset.asset.dblLatitude);
  setDblLongitude(asset.asset.dblLongitude);
  setStrUnspcCode(asset.asset.strUnspcCode);
  setDblLastPrice(asset.asset.dblLastPrice);
  setBolIsBillToFacility(asset.asset.bolIsBillToFacility);
  setIntAssetLocationID(asset.asset.intAssetLocationID);
  setBolIsOnline(asset.asset.bolIsOnline);
  setBolIsShippingOrReceivingFacility(asset.asset.bolIsShippingOrReceivingFacility);
  setStrQuotingTerms(asset.asset.strQuotingTerms);
  setIntAssetParentID(asset.asset.intAssetParentID);
  setIntAccountID(asset.asset.intAccountID);
  setIntChargeDepartmentID(asset.asset.intChargeDepartmentID);
  setIntSuperCategorySysCode(asset.asset.intSuperCategorySysCode);
  setStrBarcode(asset.asset.strBarcode);
  setOnline(asset.asset.bolIsOnline);
  if(Object.keys(asset.assetCategory).length ===0)
    return;
  setCategoryName(asset.assetCategory.strName);
  // }
  }, [asset]);
  React.useEffect(() => {  
    if(assetNumber!=null){
      //history.push("/dashboard/asset");
      setStrName(strName+assetNumber);
      setStrCode(strCode+assetNumber);
    }   
    
  }, [assetNumber]);
 
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
        'intAssetParentID'    :intAssetParentID,
        'intAccountID'    :intAccountID,
        'intChargeDepartmentID'    :intChargeDepartmentID,
        'intSuperCategorySysCode'    :intSuperCategorySysCode,
        'intCategoryKind':2,
        'strBarcode'    :strBarcode
        }    
       
       dispatch(updateData(sendData,assetId));
     };
     const selectedParent=(selectedId)=>{
       setCategoryName(selectedId.title);
      setIntCategoryID(selectedId._id);
       setModalCategoryVisible(false);
      console.log(selectedId,'selectedId');
    };
    const selectIntAssetParentID=(selId)=>{     
      setIntAssetParentID(selId);
      setIntAssetLocationID('');
    }
    const selectIntAssetLocationId=(selId)=>{
      setIntAssetParentID(selId);
      setIntAssetLocationID(selId);
    }
    const selectedAccount=(row)=>{
      setIntAccountID(row._id)
    }
    const selectedChargeDepartment=(row)=>{     
      setIntChargeDepartmentID(row._id)
    }
    const selectedOnlineState=(flag)=>{     
      setBolIsOnline(flag?false:true);
      setOnline(flag?false:true);
    }
    const locationFlag=(flag)=>{
      setLocatedFlag(flag);
    }
    React.useEffect(() => { 
      if(isDelete){
        history.push("/dashboard/asset");
      }    
    }, [isDelete]);
    const generalInf=(inf)=>{    
     
      setStrAisle(inf.strAisle);
      setStrRow(inf.strRow);
      setStrBinNumber(inf.strBinNumber);
      setStrSerialNumber(inf.strSerialNumber);
      setStrMake(inf.strMake);
      setStrModel(inf.strModel);
      setStrBarcode(inf.strBarcode);
      setStrUnspcCode(inf.strUnspcCode);       
      setStrNotes(inf.strNotes);     
    }
    const onDelete=()=>{     
      dispatch(deleteData(assetId));
    }
  return (
    <LayoutContentWrapper>
      <div className="PageHeader">
         <Link to={"/dashboard/asset"}>      
                <Button color="primary">
                  <span>Back</span>
                </Button>
              </Link> 
            <Button type="primary" className="saveBtn" onClick={onSave} style={{marginLeft:"10px",marginRight:"10px"}}>
              <span>Save</span>
            </Button>
            <Button type="danger" className="saveBtn" onClick={onDelete} >
              <span>Delete</span>
            </Button>
      </div>

      {/* modal start -category*/}
      <AssetCategoryModal
          visible={modalCategoryVisible}
          selectedCategory={selectedParent}
          parentKind={"Tools"}         
          title={'ASSET CATEGORIES'}
          onCancel={handleCancel}
        ></AssetCategoryModal>
      {/* modal end-category */}

      <TableTabsStyle className="isoLayoutContentAsset">
  <h4 style={{ marginBottom: "15px" }}>Edit Tool:{strCode}</h4>
        <AssetPageWrapper className="editView">
          <div className="PageContent">
            <InputGroup size="large" style={{ marginBottom: "15px" }}>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="">
                      <Input placeholder="strName"  value={strName}
                       onChange={(event)=>{setStrName(event.target.value)}}
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
                <Col md={12} sm={12} xs={24} style={{ marginBottom: "12px" }}>
                  <Form>
                    <FormItem {...formItemDescription} label="">
                      <Textarea
                        placeholder="strDescription"
                        value={strDescription}
                        onChange={(event)=>{setStrDescription(event.target.value)}}
                        style={{ height: "auto" }}
                      />
                    </FormItem>
                  </Form>
                </Col>
              </Row>
              <Row style={endRowStyle} gutter={gutter} justify="start">
                <Col md={8} sm={8} xs={24}>
                  <Form>
                    <FormItem {...formItemCode} label="Code">
                      <Input placeholder="Code"  value={strCode}                       
                        onChange={(event)=>{setStrCode(event.target.value)}}
                      />
                    </FormItem>
                  </Form>
                </Col>
                <Col md={8} sm={8} xs={24}>
                  <Form>
                    <FormItem {...formItemCategory} label="Category">
                      <Input
                        placeholder="Category"
                        value={categoryName}
                        onChange={(event) => {
                          setCategory(event.target.value);
                          setModalCategoryVisible(true);
                        }}
                      />
                    </FormItem>
                  </Form>
                </Col>
                <Col md={1} sm={1} xs={1}>
                  <i
                    className="ionicons ion-arrow-down-b"
                    onClick={() => {
                      setModalCategoryVisible(true);
                    }}
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  ></i>
                </Col>
              </Row>
            </InputGroup>
          </div>
        </AssetPageWrapper>
        <Tabs
          defaultActiveKey="1"
          className="isoTableDisplayTab"
          onChange={callback}
        >
          <TabPane tab="General" key="1">         
             <General
                 selectIntAssetParentID={selectIntAssetParentID}
                 selectIntAssetLocationId={selectIntAssetLocationId}
                 generalInf={generalInf}
                 selectedAccount={selectedAccount}
                 locationFlag={locationFlag}
                 selectedChargeDepartment={selectedChargeDepartment}
                 pageState={"edit"}
                 asset={asset}
                ></General>
          </TabPane>
          <TabPane tab="Parts/BOM" key="2">
            <PartsBom></PartsBom>
          </TabPane>
          <TabPane tab="Metering/Events" key="3">
              <Metering
                  assetId={assetId}
                 assetName={strName}
                  pageState={"edit"}             
               ></Metering>
          </TabPane>
          <TabPane tab="Personel" key="4">
              <Personal
                assetId={assetId}
                assetName={strName}
                  pageState={"add"}  
                ></Personal>
          </TabPane>
          <TabPane tab="Warranties" key="5">
            <Warranty></Warranty>
          </TabPane>
          <TabPane tab="Business" key="6">
            <Business></Business>
          </TabPane>
          <TabPane tab="Purchasing" key="7">
            Content of Tab Pane 6
          </TabPane>
          <TabPane tab="Files" key="8">
            Content of Tab Pane 7
          </TabPane>
          {/* <TabPane tab="Custom" key="9">
                Content of Tab Pane 8
              </TabPane> */}
          <TabPane tab="Log" key="10">
            Content of Tab Pane 9
          </TabPane>
        </Tabs>
      </TableTabsStyle>
      {/* modal category start */}
         <OnlineCotentModal
            visible={onlineModalActive}
            onCancel={handleCancel}
            title={online ? 'SET OFFLINE' : 'SET ONLINE'}
            stateFlag={online}
            selectedOnlineState={selectedOnlineState}
            onCancel={handleCancel}
          >          
          </OnlineCotentModal>
      
      {/* modal category end */}
    </LayoutContentWrapper>
  );
}

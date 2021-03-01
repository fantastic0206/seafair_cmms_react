import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import moment from "moment";
import Button from "@iso/components/uielements/button";
import Input, { Textarea, InputGroup } from "@iso/components/uielements/input";
import Box from "@iso/components/utility/box";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import UserPageWrapper from "./SingleAsset.styles";
import Checkbox from '@iso/components/uielements/checkbox';
import assetAction from '../../redux/asset/actions';
import { Col, Row, Form } from "antd";
const FormItem = Form.Item;
const { getAssetById,updateData } = assetAction;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
};
const colStyle = {
  marginBottom: "16px",
};
const gutter = 16;

export default function (props) {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { assetId,  redirectPath,assets,asset } = props; 
  const [strName, setStrName] = React.useState('');
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
  const [intCategoryID, setIntCategoryID] = React.useState('');
  const [strPostalCode, setStrPostalCode] = React.useState('');
  const [strSerialNumber, setStrSerialNumber] = React.useState('');
  const [strCode, setStrCode] = React.useState('');
  const [dblLatitude, setDblLatitude] = React.useState('');
  const [dblLongitude, setDblLongitude] = React.useState('');
  const [strUnspcCode, setStrUnspcCode] = React.useState('');
  const [dblLastPrice, setDblLastPrice] = React.useState('');
  const [bolIsBillToFacility, setBolIsBillToFacility] = React.useState(false);
  const [intAssetLocationID, setIntAssetLocationID] = React.useState('');
  const [bolIsOnline, setBolIsOnline] = React.useState(false);
  const [bolIsShippingOrReceivingFacility	, setBolIsShippingOrReceivingFacility	] = React.useState(false);
  const [strQuotingTerms	, setStrQuotingTerms	] = React.useState('');
  const [intAssetParentID	, setIntAssetParentID	] = React.useState('');
  const [intAccountID	, setIntAccountID	] = React.useState('');
  const [intChargeDepartmentID	, setIntChargeDepartmentID	] = React.useState('');
  const [intSuperCategorySysCode	, setIntSuperCategorySysCode	] = React.useState('');
  const [strBarcode	, setStrBarcode	] = React.useState('');

   const onUpdate = () => {   
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
      'strBarcode'    :strBarcode
      }
     dispatch(updateData(sendData,assetId));
  };  
  // React.useEffect(() => {    
  //   dispatch(getUserById(userId));    
  // }, []);
  React.useEffect(() => {    
    console.log(assetId);
  dispatch(getAssetById(assetId)); 
   //console.log(assets,'this is assets');
  }, [dispatch]);
  React.useEffect(() => { 
        console.log("chage aset",asset);
    setStrName(asset.strName);
    setStrDescription(asset.strDescription);
    setStrMake(asset.strMake);
    setStrModel(asset.strModel);
    setQtyMinStockCount(asset.qtyMinStockCount);
    setStrCity(asset.strCity);
    setStrShippingTerms(asset.strShippingTerms);
    setStrAddress(asset.strAddress);
    setStrNotes(asset.strNotes);
    setStrProvince(asset.strProvince);
    setIntCountryID(asset.intCountryID);
    setStrInventoryCode(asset.strInventoryCode);
    setQtyStockCount(asset.qtyStockCount);
    setIntSiteID(asset.intSiteID);
    setStrRow(asset.strRow);
    setStrMASourceProduct(asset.strMASourceProduct);
    setStrAisle(asset.strAisle);
    setStrBinNumber(asset.strBinNumber);
    setIntCategoryID(asset.intCategoryID);
    setStrPostalCode(asset.strPostalCode);
    setStrSerialNumber(asset.strSerialNumber);
    setStrCode(asset.strCode);
    setDblLatitude(asset.dblLatitude);
    setDblLongitude(asset.dblLongitude);
    setStrUnspcCode(asset.strUnspcCode);
    setDblLastPrice(asset.dblLastPrice);
    setBolIsBillToFacility(asset.bolIsBillToFacility);
    setIntAssetLocationID(asset.intAssetLocationID);
    setBolIsOnline(asset.bolIsOnline);
    setBolIsShippingOrReceivingFacility(asset.bolIsShippingOrReceivingFacility);
    setStrQuotingTerms(asset.strQuotingTerms);
    setIntAssetParentID(asset.intAssetParentID);
    setIntAccountID(asset.intAccountID);
    setIntChargeDepartmentID(asset.intChargeDepartmentID);
    setIntSuperCategorySysCode(asset.intSuperCategorySysCode);
    setStrBarcode(asset.strBarcode);

   // }
   
  }, [asset]);

  return (
    <LayoutWrapper>
      <Box>
        <UserPageWrapper className="editView">
          <div className="PageHeader">
           
              <Link to={redirectPath}>             
                <Button color="primary">
                  <span>Back</span>
                </Button>
              </Link>       

            <Button type="primary" onClick={onUpdate} className="saveBtn">
              <span>Update</span>
            </Button>
          </div>

          <div className="PageContent">
          <InputGroup size="large" style={{ marginBottom: "15px" }}>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strName">
                      <Input placeholder="strName" id="strName" value={strName} 
                       onChange={(event) => {                       
                        setStrName(event.target.value);
                        }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strDescription">
                      <Textarea placeholder="strDescription" id="strDescription" 
                      style={{ height: 'auto' }}
                      value={strDescription}
                      onChange={(event) => {                       
                        setStrDescription(event.target.value);
                        }}
                     />
                    </FormItem>
                  </Form>
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strMake">
                      <Input placeholder="strMake"   value={strMake}
                      onChange={(event) => {                       
                        setStrMake(event.target.value);
                        }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strModel">
                      <Input placeholder="strModel"  value={strModel}
                      onChange={(event) => {                       
                        setStrModel(event.target.value);
                        }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="qtyMinStockCount">
                      <Input type="number" placeholder="qtyMinStockCount" 
                      value={qtyMinStockCount}
                      onChange={(event) => {                       
                        setQtyMinStockCount(event.target.value);
                        }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strCity">
                      <Input placeholder="strCity"  
                      value={strCity}
                      onChange={(event) => {                       
                        setStrCity(event.target.value);
                        }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strShippingTerms">
                      <Textarea placeholder="strShippingTerms"
                       value={strShippingTerms}
                       onChange={(event) => {                       
                        setStrShippingTerms(event.target.value);
                         }} 
                      style={{ height: 'auto' }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strAddress">
                      <Input placeholder="strAddress"  
                       value={strAddress}
                       onChange={(event) => {                       
                        setStrAddress(event.target.value);
                         }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strNotes">
                      <Textarea placeholder="strNotes"
                       value={strNotes}
                       onChange={(event) => {                       
                        setStrNotes(event.target.value);
                         }} 
                      style={{ height: 'auto' }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strProvince">
                      <Input placeholder="strProvince" 
                      value={strProvince}
                      onChange={(event) => {                       
                        setStrProvince(event.target.value);
                        }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="intCountryID">
                      <Input type="number" placeholder="intCountryID" 
                      value={intCountryID}
                      onChange={(event) => {                       
                        setIntCountryID(event.target.value);
                        }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strInventoryCode">
                      <Input placeholder="strInventoryCode" 
                       value={strInventoryCode}
                       onChange={(event) => {                       
                        setStrInventoryCode(event.target.value);
                         }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="qtyStockCount">
                      <Input type="number" placeholder="qtyStockCount" 
                       value={qtyStockCount}
                       onChange={(event) => {                       
                        setQtyStockCount(event.target.value);
                         }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="intSiteID">
                      <Input type="number" placeholder="intSiteID" 
                       value={intSiteID}
                       onChange={(event) => {                       
                        setIntSiteID(event.target.value);
                         }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strRow">
                      <Input  placeholder="strRow"  
                      value={strRow}
                       onChange={(event) => {                       
                        setStrRow(event.target.value);
                         }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strMASourceProduct">
                      <Input  placeholder="strMASourceProduct" 
                      value={strMASourceProduct}
                      onChange={(event) => {                       
                        setStrMASourceProduct(event.target.value);
                        }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strAisle">
                      <Input  placeholder="strAisle" 
                      value={strAisle}
                      onChange={(event) => {                       
                        setStrAisle(event.target.value);
                        }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strBinNumber">
                      <Input  placeholder="strBinNumber" 
                       value={strBinNumber}
                       onChange={(event) => {                       
                        setStrBinNumber(event.target.value);
                         }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="intCategoryID">
                      <Input type="number" placeholder="intCategoryID" 
                      value={intCategoryID}
                      onChange={(event) => {                       
                        setIntCategoryID(event.target.value);
                        }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strPostalCode">
                      <Input  placeholder="strPostalCode" 
                       value={strPostalCode}
                       onChange={(event) => {                       
                        setStrPostalCode(event.target.value);
                         }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strSerialNumber">
                      <Input  placeholder="strSerialNumber" 
                      value={strSerialNumber}
                      onChange={(event) => {                       
                        setStrSerialNumber(event.target.value);
                        }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strCode">
                      <Input  placeholder="strCode" 
                       value={strCode}
                       onChange={(event) => {                       
                        setStrCode(event.target.value);
                         }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="dblLatitude">
                      <Input type="number"  placeholder="dblLatitude" 
                       value={dblLatitude}
                       onChange={(event) => {                       
                        setDblLatitude(event.target.value);
                         }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="dblLongitude">
                      <Input type="number"  placeholder="dblLongitude"
                      value={dblLongitude}
                      onChange={(event) => {                       
                        setDblLongitude(event.target.value);
                        }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strUnspcCode">
                      <Input  placeholder="strUnspcCode" value={strUnspcCode}
                      onChange={(event) => {                       
                        setStrUnspcCode(event.target.value);
                        }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="dblLastPrice">
                      <Input type="number" placeholder="dblLastPrice"
                      value={dblLastPrice}
                      onChange={(event) => {                       
                        setDblLastPrice(event.target.value);
                        }}  />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="bolIsBillToFacility">
                    <Checkbox   checked={bolIsBillToFacility}
                       onChange={(event) => {                       
                        setBolIsBillToFacility(event.target.checked);
                         }}></Checkbox>                      
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="intAssetLocationID">
                      <Input type="number" placeholder="intAssetLocationID"
                      value={intAssetLocationID}
                       onChange={(event) => {                       
                        setIntAssetLocationID(event.target.value);
                         }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="bolIsOnline">
                      <Checkbox   checked={bolIsOnline}
                       onChange={(event) => {                       
                        setBolIsOnline(event.target.checked);
                         }}></Checkbox>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="">
                      <Checkbox  checked={bolIsShippingOrReceivingFacility}
                       onChange={(event) => {                       
                        setBolIsShippingOrReceivingFacility(event.target.checked);
                         }} >bolIsShippingOrReceivingFacility</Checkbox>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strQuotingTerms">
                      <Input  placeholder="strQuotingTerms"
                       value={strQuotingTerms}
                       onChange={(event) => {                       
                        setStrQuotingTerms(event.target.value);
                         }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="intAssetParentID">
                      <Input type="number" placeholder="intAssetParentID"
                       value={intAssetParentID}
                       onChange={(event) => {                       
                        setIntAssetParentID(event.target.value);
                         }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="intAccountID">
                      <Input type="number" placeholder="intAccountID" 
                      value={intAccountID}
                      onChange={(event) => {                       
                        setIntAccountID(event.target.value);
                        }}  />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="intChargeDepartmentID">
                      <Input type="number" placeholder="intChargeDepartmentID" 
                      value={intChargeDepartmentID}
                      onChange={(event) => {                       
                        setIntChargeDepartmentID(event.target.value);
                        }} />
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="intSuperCategorySysCode">
                      <Input type="number" placeholder="intSuperCategorySysCode" 
                       value={intSuperCategorySysCode}
                       onChange={(event) => {                       
                        setIntSuperCategorySysCode(event.target.value);
                         }}/>
                    </FormItem>
                  </Form>                 
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Form>
                    <FormItem {...formItemLayout} label="strBarcode">
                      <Input type="number" placeholder="strBarcode"
                      value={strBarcode}
                      onChange={(event) => {                       
                        setStrBarcode(event.target.value);
                        }} />
                    </FormItem>
                  </Form>                 
                </Col>

                </Row>
            </InputGroup>
          </div>
        </UserPageWrapper>
      </Box>
    </LayoutWrapper>
  );
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch,useHistory } from "react-router-dom";
// import notification from '@iso/components/Notification';
import HelperText from "@iso/components/utility/helper-text";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageHeader from "@iso/components/utility/pageHeader";
import IntlMessages from "@iso/components/utility/intlMessages";
import Scrollbars from "@iso/components/utility/customScrollBar";
import Button from "@iso/components/uielements/button";
// import { Tree } from "antd";
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import clone from 'clone';
import assetActions from "../../redux/asset/actions";
import CardWrapper, { Box, StatusTag } from "./Asset.styles";
import TableWrapper from "../../component/AntTables.styles";
import Modals from '@iso/components/Feedback/Modal';
import AssetCategoryModal from '../../component/AssetCategoryModal';
import ModalStyle, { ModalContent } from './Styles/Modal.styles';
import WithDirection from '@iso/lib/helpers/rtl';
import treeViewImg from '../../assets/images/hierarchy-view.png';
import flatViewImg from '../../assets/images/flat-view-on.png';
import facilityImg from '../../assets/images/facilities-48.png'
import equipmentImg from '../../assets/images/equipment-48.png'
import toolImg from '../../assets/images/tools-48.png'
import onlineImg from '../../assets/images/running-small.png'
import offlineImg from '../../assets/images/paused-small.png'
import sortFunction from './data';
const dataList = new sortFunction();
// import 'antd/dist/antd.css';
// import { Table, Switch, Space } from 'antd';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const { initData,getAssetByFilter } = assetActions;
export default function Assets() {
  let history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { assets,rawAssets, isDelete } = useSelector((state) => state.Assets);  
  const [modalVisible,setModalVisible]=React.useState(false);
  // const [category,setCategory]=React.useState('');
  const [viewOption,setViewOption]=React.useState(1);
  const [assetsTree,setAssetsTree]=React.useState([]);
  const [assetCategoryActive,setAssetCategoryActive]=React.useState(false);
  const [filterName,setFilterName]=React.useState('filter by Category : Assets');
  // const [expandedKeys, setExpandedKeys] = React.useState(["0"]);
  // const [checkedKeys, setCheckedKeys] =React.useState(["0-0-0", "0-0-1"]);
  // const [selectedKeys, setSelectedKeys] = React.useState([]);
  // const [autoExpandParent, setAutoExpandParent] = React.useState(true);
  const columns1 = [
    {
      title: "Location",
      dataIndex: "strName",
      key: "strName",
      width: "30%",
    render: (text,row) => {      
        let treeImg
        let assetKind="";
      if(row.intCategoryKind===1){
        treeImg=facilityImg;
        assetKind="facility";
      }    
      else if(row.intCategoryKind===2){
        treeImg=equipmentImg;
        assetKind="equipment";
      }     
      else{
        treeImg=toolImg;
        assetKind="tool";
      }
      
      return <span> <img style={{width:"16px",height:"17px",marginRight:"5px"}} src={treeImg}></img><a onClick={()=>goDetail(assetKind,row._id)}>{text}</a></span>},
    },
    {
      title: "Name",
      dataIndex: "strName",
      key: "strName",
      width: "20%",
      render: (text,row) => {
        let treeImg
        let assetKind="";
      if(row.intCategoryKind===1){
        treeImg=facilityImg;
        assetKind="facility";
      }    
      else if(row.intCategoryKind===2){
        treeImg=equipmentImg;
        assetKind="equipment";
      }     
      else{
        treeImg=toolImg;
        assetKind="tool";
      }
      return <a onClick={()=>goDetail(assetKind,row._id)}>{text}</a>}     
    },
    {
      title: "Code",
      dataIndex: "strCode",
      key: "strCode",
      width: "10%",
      render: (text,row) => {
        let assetKind="";
        if(row.intCategoryKind===1){        
          assetKind="facility";
        }    
        else if(row.intCategoryKind===2){          
          assetKind="equipment";
        }     
        else{          
          assetKind="tool";
        }
      return <a onClick={()=>goDetail(assetKind,row._id)}>{text}</a>
     }
    },
    {
      title: "Asset Status",
      dataIndex: "bolIsOnline",
      key: "bolIsOnline",
      width: "10%",
      render: (text, row) => {
    
        let statueImg;
        if (text === true) {
          statueImg = onlineImg;
        } else {
          statueImg = offlineImg;
        }
        return (      
          <img style={{width:"16px",height:"10px",}} src={statueImg}></img>
        );
      },
    },    
    
    {
      title: "Vendors",
      dataIndex: "dblLastPrice",
      key: "dblLastPrice",
      width: "10%",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Department",
      dataIndex: "strDescriptiond",
      key: "strDescriptiond",
      width: "*",
      render: (text) => <span>{text}</span>,
    },    
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "strName",
      key: "strName",
      width: "25%",
      render: (text,row) => {     
        let treeImg
        let assetKind="";
      if(row.intCategoryKind===1){
        treeImg=facilityImg;
        assetKind="facility";
      }    
      else if(row.intCategoryKind===2){
        treeImg=equipmentImg;
        assetKind="equipment";
      }     
      else{
        treeImg=toolImg;
        assetKind="tool";
      }
      
      return <span> <img style={{width:"16px",height:"17px",marginRight:"5px"}} src={treeImg}></img><a onClick={()=>goDetail(assetKind,row._id)}>{text}</a></span>},
    },
    {
      title: "Code",
      dataIndex: "strCode",
      rowKey: "strCode",
      width: "15%",
      render: (text,row) => {
        let assetKind="";
        if(row.intCategoryKind===1){        
          assetKind="facility";
        }    
        else if(row.intCategoryKind===2){          
          assetKind="equipment";
        }     
        else{          
          assetKind="tool";
        }
      return <a onClick={()=>goDetail(assetKind,row._id)}>{text}</a>
     }
    },
    {
      title: "Asset Status",
      dataIndex: "bolIsOnline",
      rowKey: "bolIsOnline",
      width: "15%",
      render: (text, intUserStatusID) => {
        let statueImg;
        if (text === true) {
          statueImg = onlineImg;
        } else {
          statueImg = offlineImg;
        }
        return (
        <img style={{width:"16px",height:"10px",}} src={statueImg}></img>
     
        );
      },
    },    
    
    {
      title: "Vendors",
      dataIndex: "dblLastPrice",
      rowKey: "dblLastPrice",
      width: "15%",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Department",
      dataIndex: "strDescriptiond",
      rowKey: "strDescriptiond",
      width: "*",
      render: (text) => <span>{text}</span>,
    },
  ];

  const sortColumns1 = [
    { ...columns1[0], sorter: true },
    { ...columns1[1], sorter: true },
    { ...columns1[2], sorter: true },
    { ...columns1[3], sorter: true },   
  ];
  const sortColumns = [
    { ...columns1[0], sorter: true },
    { ...columns1[1], sorter: true },
    { ...columns1[2], sorter: true },
    { ...columns1[3], sorter: true },   
    { ...columns1[4], sorter: true },   
  ];

  React.useEffect(() => {   
    dispatch(initData());
  }, []);
  React.useEffect(() => { 
    if(viewOption===1){
      var tree = makeTree(assets);
      setAssetsTree(tree);   
    }    
  }, [assets]);

  React.useEffect(() => {   
    dispatch(initData());
  }, [viewOption]);
  React.useEffect(() => {  
    if(isDelete){
      dispatch(initData());
    }  
  }, [isDelete]);

  
  const handleCancel = () => {
    setModalVisible(false);
    setAssetCategoryActive(false);
  };
  const goDetail=(kind,id)=>{
    history.push(`/dashboard/asset/${kind}/${id}`);
  }
  const goAssets = (id) => {
    if(id==1){ // facility
      //dispatch(createNumber());
      history.push("/dashboard/asset/add/facility");
    }
    else if(id==2){ //equipment
      //dispatch(createNumber());
      history.push("/dashboard/asset/add/equipment");
    }
    else{// tools
      //dispatch(createNumber());
      history.push("/dashboard/asset/add/tools");
    }
    //setModalVisible(false);
  };  
  const  makeTree=(arr)=> {
    var tree = [],
        mappedArr = {},
        arrElem,
        mappedElem;
    // First map the nodes of the array to an object -> create a hash table.
    for(var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];     
      mappedArr[arrElem.key] = arrElem;
      mappedArr[arrElem.key]['children'] = [];
    }

    for (var id in mappedArr) {
   
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parentid) {
          //if(mappedArr[mappedElem['parentid']]['children']==undefined)
          if(mappedArr[mappedElem['parentid']]!=undefined)
            mappedArr[mappedElem['parentid']]['children'].push(mappedElem);        
          else
          tree.push(mappedElem);
         //delete mappedElem.children; //remove blank children 
        }
        // If the element is at the root level, add it to first level elements array.
        else {   
          tree.push(mappedElem);
        }
      }
    }  
      return tree;   
  }

  const  onChange1=(pagination, filters, sorter)=> { 
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataList.getSortAsc(sorter.columnKey,assetsTree);
      } else {
        dataList.getSortDesc(sorter.columnKey,assetsTree);
      }
      setAssetsTree(assetsTree);
    }
  }
  
  const  onChange=(pagination, filters, sorter)=> { 
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataList.getSortAsc(sorter.columnKey,rawAssets);
      } else {
        dataList.getSortDesc(sorter.columnKey,rawAssets);
      }
      setAssetsTree(rawAssets);
    }
  }
  const selectedCategory=(selectNode)=>{    
    setFilterName("filter by Category : "+selectNode.strName);
    var parentIds=[];
     parentIds.push(selectNode._id);
    for (var i=0;i<selectNode.children.length;i++){
      parentIds.push(selectNode.children[i]._id);
      for(var k=0;k<selectNode.children[i].children.length;k++){
        parentIds.push(selectNode.children[i].children[k]._id);
        for (var z=0;z<selectNode.children[i].children[k].children.length;z++){
          parentIds.push(selectNode.children[i].children[k].children[z]._id);
        }
      }
    }

    if(selectNode.intSysCode==0){
      dispatch(initData());
      setViewOption(1);
    }      
    else{
      // setViewOption(2);
      dispatch(getAssetByFilter(parentIds.join(",")));
    }
    
    //setFilterIds(parentIds);
    setAssetCategoryActive(false);
  
  };
  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.Assets" />
      </PageHeader>
      <Box>
         {/* modal start */}
         <Modal
                 title="CREATE NEW ASSET"
                visible={modalVisible}               
                // onOk={handleOk}
                onCancel={handleCancel}    
                footer={[]}            
              >
                 <div className="AssetTypeSelectContainer">
                    <div className="AssetItemContainer" onClick={()=>{     
                        goAssets(1)  ;              
                       }}>
                      <div className="LocationsFacilities"></div>
                      <p>Locations<br/>or Facilities</p>
                    </div>
                    <div className="AssetItemContainer" onClick={()=>{
                        goAssets(2)  ;   
                      }}>
                       <div className="Equipment"></div>
                       <p>Equipment<br/>or Machines</p>
                    </div>
                    <div className="AssetItemContainer" onClick={()=>{
                        goAssets(3)  ;   
                      }}>
                       <div className="Tools"></div>
                       <p>Tools</p>
                    </div>
                </div>
                
              </Modal>
          {/* modal end */}
        <div className="isoInvoiceTableBtn">
      
            <Button onClick={()=>{
              setModalVisible(true)
            }} type="primary" className="mateAddInvoiceBtn">
              New Asset
            </Button>

        
          <div style={{float:"left",marginLeft:"10px",paddingTop:"10px"}}>
              <div style={{float: "left",cursor:"pointer"}} onClick={()=>{setViewOption(1);setFilterName('filter by Category : Assets')}}>
                  <img src={treeViewImg}></img>
              </div>
              <div style={{float: "left",cursor:"pointer"}} onClick={()=>{setViewOption(2);setFilterName('filter by Category : Assets')}}>
                <img src={flatViewImg}></img>
              </div>
          </div>  
              
                <div style={{ position: "relative",marginLeft:"15px" }}>
                              <Input
                                 value={filterName}
                                placeholder=""
                                style={{ width: "280px" }}
                                // onChange={()=>setWorkOrderFilterModalActive(true)}
                              />
                              <i
                                className="ionicons ion-arrow-down-b"
                                onClick={()=>{setAssetCategoryActive(true)}}
                                style={{
                                  fontSize: "25px",
                                  cursor: "pointer",
                                  position: "absolute",
                                  marginLeft: "5px",
                                  marginTop:"4px"
                                }}
                              ></i>
                 </div>        
        </div>

        <CardWrapper title="Assets">
        
            <div className="isoInvoiceTable">
              <Scrollbars style={{ width: "100%", height: "calc(80vh - 80px)" }}>
            {viewOption===1?
              (              
                <TableWrapper
                  // rowSelection={rowSelection}
                  dataSource={assetsTree}                   
                  columns={clone(sortColumns1)}   
                  onChange={onChange1}
                  pagination={{ pageSize: 10 }}
                  className="invoiceListTable"
                />
              ):( <TableWrapper
                  // rowSelection={rowSelection}
                  dataSource={rawAssets}
                  columns={clone(sortColumns)}                 
                  pagination={true}
                  onChange={onChange}
                  pagination={{ pageSize: 10 }}
                
                />)
              }
              </Scrollbars>
            </div>
          
        </CardWrapper>
      </Box>
      <AssetCategoryModal
      visible={assetCategoryActive}
      selectedCategory={selectedCategory}
      parentKind={"Assets"}
      onCancel={handleCancel}
      title={'ASSET CATEGORIES'}     
    ></AssetCategoryModal>
    </LayoutWrapper>
  );
}

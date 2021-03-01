import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import assetActions from "../redux/asset/actions";
import { Col, Row } from "antd";
import './table.css'
// import treeViewImg from '../assets/images/hierarchy-view.png';
// import flatViewImg from '../assets/images/flat-view-on.png';
import facilityImg from '../assets/images/facilities-48.png'
import equipmentImg from '../assets/images/equipment-48.png'
import toolImg from '../assets/images/tools-48.png'
import onlineImg from '../assets/images/running-small.png'
import offlineImg from '../assets/images/paused-small.png'


const { initData } = assetActions;
const columns = [
  {
    title: "Location",
    dataIndex: "strName",
    rowKey: "strName",
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
    
    return <span> <img style={{width:"16px",height:"17px",marginRight:"5px"}} src={treeImg}></img>{text}</span>},
  },
  {
    title: "Name",
    dataIndex: "strName",
    rowKey: "strName",
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
    return <span >{text}</span>}
    ,
  },
  {
    title: "Code",
    dataIndex: "strCode",
    rowKey: "strCode",
    width: "15%",
    render: (text) => <span>{text}</span>,
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
export default function (props) {
  const {  visible,title} = props; 
  const dispatch = useDispatch();
  const { assets,rawAssets} = useSelector((state) => state.Assets);  
  const [assetsTree,setAssetsTree]=React.useState([]);
  const [assetFiltered,setAssetFiltered]=React.useState([]);
  const [strSearchVal,setStrSearchVal]=React.useState("");
  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    marginTop:"-20px",
    background: "#e0e7ed",
    height: "38px",
    marginLeft:"2px",
    borderBottom: "1px solid rgb(174,193,208)"
  };
  // const [newModalActive, setNewModalActive] = React.useState(false);

 React.useEffect(() => {
   dispatch(initData());
}, [visible]);
React.useEffect(() => {
   if(strSearchVal==""){
      var tree = makeTree(assets);
      setAssetsTree(tree);   
    }
    else{
      setAssetsTree(rawAssets);
      setAssetFiltered(rawAssets);
    }
}, [visible]);


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
        mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {       
        tree.push(mappedElem);
      }
    }
  }  
    return tree;   
}
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {    
   props.selectedAsset(record);
   props.onCancel();
  }, 
};
const goSearch=(event)=>{
  var temp_asset=[];
  for (var i=0;i<rawAssets.length;i++){
   // console.log(rawAssets[i]);
    if(rawAssets[i].strName.includes(event.target.value)){
      temp_asset.push(rawAssets[i]);
    }
  }
 setAssetFiltered(temp_asset);
  setStrSearchVal(event.target.value);
}
 return (
   <div>
      <Modal
      visible={visible}
      onClose={props.onCancel}
      // okText="New"
      title={title}  
      width={window.innerWidth-200}
      // onOk={() =>{setNewModalActive(true)}}
      onCancel={props.onCancel}
      footer={null}
    >
    <div>
      <Row style={rowStyle} gutter={16} justify="start">
          <Col md={20} sm={20} xs={24} >           
          </Col>
          <Col md={4} sm={4} xs={24}>
          <InputSearch
              value={strSearchVal}
              onChange={(event)=>goSearch(event)}
                placeholder="input search text"                      
                style={{ width: "100%" }}
              />
          </Col>
      </Row>
    </div>
      <div style={{marginTop:"3px",height: "430px"}}>    
          
              <Scrollbars style={{ width: "100%", height: "430px" }}>                       
                {/* <TableWrapper                
                  dataSource={assetsTree}
                  columns={columns}           
                  rowSelection={{ ...rowSelection, type:"radio" }}
                  pagination={{ pageSize:5 }}
                  className="invoiceListTable"
                />    */}
                {strSearchVal==""?
              (              
                <TableWrapper
                  // rowSelection={rowSelection}
                  dataSource={assetsTree}                   
                  columns={columns}       
                  rowSelection={{ ...rowSelection, type:"radio" }}
                  pagination={{ pageSize: 5 }}
                  className="invoiceListTable"
                />
              ):( <TableWrapper
                rowSelection={{ ...rowSelection, type:"radio" }}
                  dataSource={assetFiltered}
                  columns={columns}                       
                  pagination={{ pageSize:5 }}
                  pagination={true}
                />)
              }
              </Scrollbars>
        
      </div>
      </Modal>     
  </div>
 )
}
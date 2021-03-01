import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import Scrollbars from "@iso/components/utility/customScrollBar";
import Actions from "../redux/assetcategory/actions";
import { Col, Row } from "antd";
// import { Tree } from "antd";


// import {
//   ActionBtn,
//   Fieldset,
//   Form,
//   Label, 
// } from './UsersContentModal.styles';
const { initData } = Actions;

const treeData1 = [
  {
    title: "Assets",
    key: 0,   
    _id:0
  },
];

function unflatten(arr,parentKind) {
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
  if(parentKind=="Locations And Facilities"){
    
    var temp_tree=[]
    tree.map((row)=>{
      row.children.map((child)=>{
        if(child.strName==parentKind){
          temp_tree.push(child);
        }
      })
    })
    return temp_tree;
  }
  if(parentKind=="Equipment"){

    var temp_tree=[]
    tree.map((row)=>{
      row.children.map((child)=>{
        if(child.strName==parentKind){
          temp_tree.push(child);
        }
      })
    })
    return temp_tree;
  }
  if(parentKind=="Tools"){
   
    var temp_tree=[]
    tree.map((row)=>{
      row.children.map((child)=>{
        if(child.strName==parentKind){
          temp_tree.push(child);
        }
      })
    })
    return temp_tree;
  }
  else{
    return tree;
  }
  
}

export default function (props) {
  const {  visible,title,parentKind} = props;
  const { assetcategories, isDelete } = useSelector((state) => state.AssetCategory); 
  const [expandedKeys, setExpandedKeys] = useState(["0"]);
  const [checkedKeys, setCheckedKeys] = useState(["0-0-0", "0-0-1"]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData,setTreedata]=useState([])
  const dispatch = useDispatch();
  React.useEffect(() => {
  }, [visible]);
  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    marginTop:"-20px",
    background: "#e0e7ed",
    borderBottom: "1px solid rgb(174,193,208)"
  };
  const [data, setData] = React.useState([]);
  React.useEffect(() => { 
    dispatch(initData());
 }, []);

 React.useEffect(() => { 
  var tree = unflatten(assetcategories,parentKind);
  setTreedata(tree.length==0?treeData1:tree);  
}, [assetcategories]);

 const onSelect = (selectedKeys, info) => {
  setSelectedKeys(selectedKeys);
  props.selectedCategory(info.node);
};
const onExpand = (expandedKeys) => {
  // or, you can remove all expanded children keys.
  setExpandedKeys(expandedKeys);
  setAutoExpandParent(false);
};
const columns = [
  {
    title: "Asset Category",
    dataIndex: "strName",
    rowKey: "strName",
    width: "85%",
    render: (text) => <span>{text}</span>,
  }
 ]
 const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
  },
  onSelect: (record, selected, selectedRows) => {
    props.selectedCategory(record);
  }, 
};
 return (
   <div>
      <Modal
      visible={visible}
      onClose={props.onCancel}
      footer={null}
      width={550}
      title={title}  
      onOk={props.onCancel}
      onCancel={props.onCancel}

    >
    <div>
      <Row style={rowStyle} gutter={16} justify="start">
          <Col md={12} sm={12} xs={24} >         
            
          </Col>
          <Col md={12} sm={12} xs={24}>
          <InputSearch
                placeholder="input search text"
                // value={category}
                // onChange={onCategorySearchChange}            
                style={{ width: "100%" }}
              />
          </Col>
      </Row>

    </div>
    <div style={{marginTop:"3px",height:"430px"}}>
    <Scrollbars style={{ width: "100%", height: "430px" }}>  
            <TableWrapper
                  // rowSelection={rowSelection}
                  dataSource={treeData}
                  bordered={undefined}
                  columns={columns}          
                  showLine={false}   
                  pagination={true}
                  rowSelection={{ ...rowSelection, type:"radio" }}
                  pagination={{ pageSize: 5 }}
                
                />
        </Scrollbars>
    
    </div>
      </Modal>    
  </div>
 )
}
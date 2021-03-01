import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tree } from "antd";
import Actions from "../../../redux/assetcategory/actions";
import newAddImg from "../../../assets/images/new-inner-list.png";
import CreateAssetCategoryModal from '../../../component/CreateAssetCategoryModal';
import EditAssetCategoryModal from '../../../component/EditAssetCategoryModal';
const { initData } = Actions;

const treeData1 = [
  {
    title: "Assets",
    key: 0,   
    _id:0   
  },
];

function unflatten(arr) {
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


const ControlledTree = () => {
  const { assetcategories, isDelete } = useSelector((state) => state.AssetCategory);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState(["0-0-0", "0-0-1"]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [createCategoryActive,setCreateCategoryActive]=useState(false);
  const [editCategoryActive,setEditCategoryActive]=useState(false);
  const [treeData,setTreedata]=useState([]);

  const [assetName,setAssetName]=useState('');
  const [assetId,setAssetId]=useState('');
  const [parentId,setParentId]=useState(0);
  const [intSysCode, setIntSysCode]=React.useState('');

  const dispatch = useDispatch();
  const onExpand = (expandedKeys) => {
    console.log("onExpand", expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  React.useEffect(() => { 
     dispatch(initData());
  }, []);

  React.useEffect(() => { 
    var tree = unflatten(assetcategories);
    console.log(tree,'tree');
    setTreedata(tree.length==0?treeData1:tree);
    // setExpandedKeys([7]);
 }, [assetcategories]);

  const onSelect = (selectedKeys, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeys);
    setAssetName(info.node.strName);
    setParentId(info.node.intParentID);
    setAssetId(info.node._id);
    setIntSysCode(info.node.intSysCode)
    setEditCategoryActive(true);
  };
  const handleCancel = () => {
    setCreateCategoryActive(false);
    setEditCategoryActive(false);
  
  };

  return (
    <div style={{height:"400px",position:'relative'}}>
      <Tree
        // checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        // onCheck={onCheck}
        // checkedKeys={checkedKeys}
        showLine={false}
        onSelect={onSelect}
        // selectedKeys={selectedKeys}
        treeData={treeData}
      />
      <div
        style={{
          color: "rgb(102, 115, 136)",
          fontSize: "10pt",
          background: "#f7f7f7",
          border: "1px solid rgb(241, 243, 246)",
          height: "25px",
          position: "absolute",
          bottom: "0px",
          width: "100%"
        }}
      >
        <span
          style={{
            float: "left",
            marginLeft: "4px",
            marginRight: "4px",
            cursor: "pointer",
          }}
        >
          <img src={newAddImg}
            onClick={()=>{
              setCreateCategoryActive(true);
            }}
          ></img>
        </span>
      </div>
      {/* customize category start */}
      <CreateAssetCategoryModal
            visible={createCategoryActive}
            onCancel={handleCancel}
            title={'ASSET CATEGORY'}
            // okText={article.key ? 'Update Article' : 'Add Article'}
            // onOk={() => handleRecord('insert', article)}
            onCancel={handleCancel}
          >          
       </CreateAssetCategoryModal>

       <EditAssetCategoryModal
            visible={editCategoryActive}
            onCancel={handleCancel}
            title={'EDIT ASSET CATEGORY'}
            assetId={assetId}
            assetName={assetName}
            selectedParentId={parentId}
            intSysCode={intSysCode}
            // okText={article.key ? 'Update Article' : 'Add Article'}
            // onOk={() => handleRecord('insert', article)}
            onCancel={handleCancel}
          >          
       </EditAssetCategoryModal>
      {/* customize category end */}
    </div>
  );
};
export default ControlledTree;

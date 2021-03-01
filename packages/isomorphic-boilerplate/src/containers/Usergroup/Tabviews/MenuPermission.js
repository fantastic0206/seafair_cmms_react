import React, { useState } from 'react';
import { Tree } from 'antd';

const treeData = [
  {
    title: "Can See 'Settings' Top Menu",
    key: '0-0',
    children: [
      {
        title: "Can See 'Users' Menu Item",
        key: '0-0-0',
        checked:true      
      },
      {
        title: "Can See 'User Groups' Menu Item",
        key: '0-0-1',
        checked:true 
      },
      {
        title: "Can See 'Business' Menu Item",
        key: '0-0-2',
      },
    ],
  },
  {
    title: "Can See 'Help' Top Menu",
    key: '0-1',
    checked:true
  },
  {
    title: "Can See 'Log Off' Top Menu",
    key: '0-2',
    checked:true
  },
  {
    title: "Can See 'Dashboard' Top Menu",
    key: '0-3',
    children: [
      {
        title: " Can See 'Dashboard' Menu Item",
        key: '0-3-0',
        checked:true      
      },
      {
        title: "Can See 'Calendar' Menu Item",
        key: '0-3-1',
        checked:true 
      },
      {
        title: "Can See 'Assigned Assets' Menu Item",
        key: '0-3-2',
      },
    ],
  },
];

const ControlledTree = () => {
  const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1','0-3']);
  const [checkedKeys, setCheckedKeys] = useState(['0-0-0','0-0-1']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeys);
  };

  return (
    <Tree
      checkable
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}
    />
  );
};
export default ControlledTree;

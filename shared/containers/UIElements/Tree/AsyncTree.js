import React, { useState } from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;
const initTreeDate = [
  {
    title: 'Expand to load',
    key: '0',
  },
  {
    title: 'Expand to load',
    key: '1',
  },
  {
    title: 'Tree Node',
    key: '2',
    isLeaf: true,
  },
]; // It's just a simple demo. You can use tree map to optimize update perf.

function updateTreeData(list, key, children) {
  return list.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }

    return node;
  });
}

const AsyncTree = () => {
  const [treeData, setTreeData] = useState(initTreeDate);

  function onLoadData({ key, children }) {
    return new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }

      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, key, [
            {
              title: 'Child Node',
              key: `${key}-0`,
            },
            {
              title: 'Child Node',
              key: `${key}-1`,
            },
          ])
        );
        resolve();
      }, 1000);
    });
  }

  return <Tree loadData={onLoadData} treeData={treeData} />;
};

export default AsyncTree;

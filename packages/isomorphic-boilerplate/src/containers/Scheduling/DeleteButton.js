import React from 'react';
import Popconfirm from '@iso/components/Feedback/Popconfirm';
import { Button } from 'antd';
import { notification } from '@iso/components';
import { CloseOutlined } from '@ant-design/icons';
export default function ({ handleDelete }) {
  return (
    <Popconfirm
      title="Sure to delete the event?"
      okText="DELETE"
      cancelText="No"
      onConfirm={() => {
        notification('error', 'Deleted', '');
        handleDelete();
      }}
    >
      <Button
        icon={<CloseOutlined />}
        type="default"
        className="isoDeleteBtn"
      />
    </Popconfirm>
  );
}

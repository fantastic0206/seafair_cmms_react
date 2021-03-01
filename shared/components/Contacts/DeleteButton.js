import React from 'react';
import Popconfirm from '../Feedback/Popconfirm';
// import Button from '../uielements/button';
import { Button } from 'antd';
import notification from '../Notification';
import { CloseOutlined } from '@ant-design/icons';
export default function ({ contact, deleteContact }) {
  let name = '';
  if (contact.firstName) {
    name = `${contact.firstName} `;
  }
  if (contact.lastName) {
    name = `${name}${contact.lastName}`;
  }
  if (!name) {
    name = 'No Name';
  }
  return (
    <Popconfirm
      title={`Sure to delete ${name}?`}
      okText="DELETE"
      cancelText="No"
      onConfirm={() => {
        notification('error', `${name} Deleted`, '');
        deleteContact(contact.id);
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

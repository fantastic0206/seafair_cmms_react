import React, { Fragment } from 'react';
import {
  CalendarOutlined,
  DeleteOutlined,
  MehOutlined,
  PaperClipOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Avatar, Badge, Popconfirm } from 'antd';
import { CardBodyContent, HrBar, CardFooter, CardBody } from './style';

const TaskCard = ({ task, showDrawer, onDelete }) => (
  <Card
    style={{ width: '100%' }}
    bodyStyle={{ padding: 0 }}
    headStyle={{ borderBottom: 'none' }}
    title={task.title}
    extra={
      <Popconfirm
        title="Are you sure delete this task?"
        okText="Yes"
        cancelText="No"
        onConfirm={onDelete}
      >
        <DeleteOutlined style={{ cursor: 'pointer' }} />
      </Popconfirm>
    }
  >
    <CardBody onClick={showDrawer}>
      {task.labels.map((label) => (
        <Badge key={label} status={label} />
      ))}
      <CardBodyContent>
        <div>
          <CalendarOutlined /> {task.created_at} - {task.due_date}
        </div>
        <small>
          {(Date.parse(task.due_date) - Date.parse(task.created_at)) /
            (60 * 60 * 1000)}{' '}
          Hrs
        </small>
      </CardBodyContent>
    </CardBody>
    <HrBar />
    <CardFooter>
      <span>
        <PaperClipOutlined /> 0
        <MehOutlined style={{ marginLeft: 16 }} /> 0
      </span>
      <span>
        {task.assignees.map((assignee) => (
          <Fragment key={assignee}>
            <Avatar icon={<UserOutlined />} />
          </Fragment>
        ))}
      </span>
    </CardFooter>
  </Card>
);

export default TaskCard;

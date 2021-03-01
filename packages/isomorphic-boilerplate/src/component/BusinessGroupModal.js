import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row } from 'antd';
import userActions from '../redux/user/actions';
import './table.css';

const { getAllUserData, initUserData } = userActions;

const groupData = [
  {
    id: '0',
    strGroupName: 'Supplier',
    strType: 'Vendor',
  },
  {
    id: '1',
    strGroupName: 'Manufacturer',
    strType: 'Vendor',
  },
  {
    id: '2',
    strGroupName: 'Service Provider',
    strType: 'Vendor',
  },
  {
    id: '3',
    strGroupName: 'Owner',
    strType: 'Customer',
  },
  {
    id: '4',
    strGroupName: 'Customer',
    strType: 'Customer',
  },
];
export default function (props) {
  const { users } = useSelector((state) => state.Users);
  const { visible, title, group } = props;
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (group == 'user') {
      dispatch(initUserData());
    } else {
      dispatch(getAllUserData());
    }
  }, []);
  const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    marginTop: '-20px',
  };
  const [data, setData] = React.useState([]);

  const onRowClick = (row) => {
    props.onCancel();
    props.selectGroup(row);
  };
  return (
    <Modal
      visible={visible}
      onClose={props.onCancel}
      title={title}
      width={700}
      onCancel={props.onCancel}
    >
      <div>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={12} sm={12} xs={24}>
            <div style={{ position: 'relative', width: '95%' }}>
              <Input
                label="Set Offline By User"
                placeholder="Enter Title"
                style={{ width: '95%' }}
              />
              <i
                className="ionicons ion-arrow-down-b"
                style={{
                  fontSize: '25px',
                  cursor: 'pointer',
                  position: 'absolute',
                  marginTop: '5px',
                  marginLeft: '5px',
                }}
              ></i>
            </div>
          </Col>
          <Col md={12} sm={12} xs={24}>
            <InputSearch
              placeholder="input search text"
              // value={category}
              // onChange={onCategorySearchChange}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: '3px', height: '170px', overflow: 'auto' }}>
        {/* <TableWrapper
          // rowSelection={rowSelection}
          dataSource={users}
          columns={columns}
          pagination={true}
          className="isoGroupTable"
        /> */}
        <table style={{ overflow: 'auto' }}>
          <thead>
            <tr>
              <th>
                <span className="listHeaderLabel35">Group Name</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Relationship Type</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {groupData.length != 0 ? (
              groupData.map((row) => {
                return (
                  <tr
                    className="listRow"
                    key={row.key}
                    onClick={() => {
                      onRowClick(row);
                    }}
                  >
                    <td className="column">
                      <p className="context">{row.strGroupName}</p>
                    </td>
                    <td className="column">
                      <p className="context">{row.strType}</p>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  style={{ textAlign: 'center', fontSize: '14px' }}
                  colSpan="2"
                >
                  No Data!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

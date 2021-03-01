import React, { useEffect } from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import Scrollbars from '@iso/components/utility/customScrollBar';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import addDoubleImg from '../../../assets/images/new-group-inner-list.png';
import newAddImg from '../../../assets/images/new-inner-list.png';

import AddWorkOrderBusinessModal from '../../../component/AddWorkOrderBusinessModal';

const FormItem = Form.Item;

export default function (props) {
  const [data, setData] = React.useState([]);

  const [addBusinessModalActive, setAddBusinessModalActive] = React.useState(
    false
  );
  const [pageState, setPageState] = React.useState('add');

  const handleCancel = () => {
    setAddBusinessModalActive(false);
  };

  const columns = [
    // {
    //   title: "Business Type",
    //   dataIndex: "strEmailUserGuest",
    //   rowKey: "strEmailUserGuest",
    //   width: "10%",
    // },
    {
      title: 'Business',
      dataIndex: 'business',
      rowKey: 'business',
      width: '25%',
      render: (text) => <span>{text}</span>,
    },
    // {
    //   title: "Business Asset Number",
    //   dataIndex: "intWorkOrderStatusID",
    //   rowKey: "intWorkOrderStatusID",
    //   width: "15%",
    //   render: (text) => <span>{text}</span>,
    // },
    {
      title: 'Business Group',
      dataIndex: 'businessGroup',
      rowKey: 'businessGroup',
      width: '40%',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Asset',
      dataIndex: 'asset',
      rowKey: 'asset',
      width: '35%',
      render: (text) => <span>{text}</span>,
    },
    // {
    //   title: "Catalog",
    //   dataIndex: "intWorkOrderStatusID",
    //   rowKey: "intWorkOrderStatusID",
    //   width: "15%",
    //   render: (text) => <span>{text}</span>,
    // },
    // {
    //   title: "Vendor Price",
    //   dataIndex: "intWorkOrderStatusID",
    //   rowKey: "intWorkOrderStatusID",
    //   width: "15%",
    //   render: (text) => <span>{text}</span>,
    // },
    {
      title: '',
      dataIndex: 'intWorkOrderStatusID',
      rowKey: 'intWorkOrderStatusID',
      width: '*',
      render: (text) => <span>{text}</span>,
    },
  ];
  return (
    <div className="isoInvoiceTable">
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
      <TableWrapper
        // rowSelection={rowSelection}
        dataSource={data}
        columns={columns}
        pagination={false}
        className="isoGroupTable"
      />
      {/* </Scrollbars> */}
      <div
        style={{
          color: 'rgb(102, 115, 136)',
          fontSize: '10pt',
          background: '#f7f7f7',
          border: '1px solid rgb(241, 243, 246)',
          height: '25px',
        }}
      >
        <span
          style={{
            float: 'left',
            marginLeft: '4px',
            marginRight: '4px',
            cursor: 'pointer',
          }}
        >
          <img
            src={newAddImg}
            onClick={() => {
              setAddBusinessModalActive(true);
              setPageState('add');
            }}
          ></img>
        </span>
      </div>
      <AddWorkOrderBusinessModal
        workorderId={props.workorderId}
        visible={addBusinessModalActive}
        onCancel={handleCancel}
        title={'ADD Business'}
        pageState={pageState}
        assetName={props.assetName}
      ></AddWorkOrderBusinessModal>
    </div>
  );
}

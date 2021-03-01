import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
// import notification from '@iso/components/Notification';
// import Input, { InputSearch } from '@iso/components/uielements/input';
// import HelperText from "@iso/components/utility/helper-text";
// import Select, { SelectOption } from '@iso/components/uielements/select';
import { Tooltip } from 'antd';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
// import Scrollbars from "@iso/components/utility/customScrollBar";
import Button from '@iso/components/uielements/button';
import { Col, Row } from 'antd';
import clone from 'clone';
import charterAction from '../../redux/charter/actions';
import userAction from '../../redux/user/actions';
import CardWrapper, { Box } from './Asset.styles';
import TableWrapper from '../../component/AntTables.styles';
// import sortFunction from './data';
// const dataList = new sortFunction();

const { getChartersData } = charterAction;
const { getAllUserData } = userAction;

const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  paddingBottom: '10px',
  // borderBottom: "1px solid rgb(174,193,208)"
};
// const Option = SelectOption;

export default function Charter() {
  const [filtered, setFiltered] = React.useState([]);
  let history = useHistory();
  const { charters } = useSelector((state) => state.Charter);
  const { users } = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  React.useEffect(() => {
    dispatch(getChartersData());
  }, []);
  React.useEffect(() => {
    console.log(charters);
  }, [charters]);

  const goDetail = (id) => {
    history.push(`/dashboard/charter/edit/${id}`);
  };

  const columns = [
    {
      title: 'Start Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: '18%',
      render: (text, row) => {
        return (
          <a onClick={() => goDetail(row._id)}>
            {moment(text).format('YYYY-MM-DD HH:mm:ss')}
          </a>
        );
      },
    },
    {
      title: 'Finish Date',
      dataIndex: 'finishDate',
      key: 'finishDate',
      width: '18%',
      render: (text, row) => {
        return (
          <a onClick={() => goDetail(row._id)}>
            {moment(text).format('YYYY-MM-DD HH:mm:ss')}
          </a>
        );
      },
    },
    {
      title: 'Client Status',
      dataIndex: 'clientStatus',
      key: 'clientStatus',
      width: '15%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row._id)}>{text}</a>;
      },
    },
    {
      title: 'Owner Status',
      dataIndex: 'ownerStatus',
      key: 'ownerStatus',
      width: '13%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row._id)}>{text}</a>;
      },
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row._id)}>{text}</a>;
      },
    },
    {
      title: 'Charter/Trips',
      dataIndex: 'charter',
      key: 'charter',
      width: '15%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row._id)}>{text}</a>;
      },
    },
    {
      title: 'Number Of Days',
      dataIndex: 'numberOfDays',
      key: 'numberOfDays',
      width: '13%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row._id)}>{text}</a>;
      },
    },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.charter" />
      </PageHeader>
      <Box>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={12}></Col>
          <Col md={12} sm={12} xs={24}></Col>
          <Col md={4} sm={4} xs={12}>
            <Link to={`${match.path}/add`}>
              <Button type="primary" className="mateAddInvoiceBtn">
                New
              </Button>
            </Link>
          </Col>
        </Row>
        <TableWrapper
          dataSource={charters}
          // columns={clone(sortColumns)}
          columns={columns}
          pagination={false}
          // onChange={onChange}
          className="isoSortingTable"
        />
      </Box>
    </LayoutWrapper>
  );
}

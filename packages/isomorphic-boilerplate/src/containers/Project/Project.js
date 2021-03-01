import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
// import notification from '@iso/components/Notification';
import HelperText from "@iso/components/utility/helper-text";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageHeader from "@iso/components/utility/pageHeader";
import IntlMessages from "@iso/components/utility/intlMessages";
import Scrollbars from "@iso/components/utility/customScrollBar";
import Button from "@iso/components/uielements/button";
import Actions from "../../redux/project/actions";
import CardWrapper, { Box, StatusTag } from "../Asset/Asset.styles";
import TableWrapper from "../../component/AntTables.styles";
const { initData, deleteData } = Actions;
export default function Workorders() {
  const [selected, setSelected] = React.useState([]);
  const { projects, isDelete } = useSelector((state) => state.Project);

  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {
    console.log("init data ass");
     dispatch(initData());
  }, []);
 
  React.useEffect(() => {    
    if(isDelete){
      dispatch(initData());
    }  
  }, [isDelete]);

  const columns = [
    {
      title: "Name",
      dataIndex: "strName",
      rowKey: "strName",
      width: "20%",  
      render: (text,row) => {
        return <a href={`/dashboard/project/edit/${row._id}`}>{text}</a>} 
    },
    {
      title: "Description",
      dataIndex: "strDescription",
      rowKey: "strDescription",
      width: "55%",
      render: (text,row) => {
        return <a href={`/dashboard/project/edit/${row._id}`}>{text}</a>} 
    },   
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.Project" />
      </PageHeader>
      <Box>
        <div className="isoInvoiceTableBtn">
          <Link to={`${match.path}/add`}>
            <Button type="primary" className="mateAddInvoiceBtn">
              New
            </Button>
          </Link>
        </div>

        <CardWrapper title="Assets">
          {projects.length === 0 ? (
            <HelperText text="No Assets" />
          ) : (
            <div className="isoInvoiceTable">
              <Scrollbars
                style={{ width: "100%", height: "calc(100vh - 70px)" }}
              >
                <TableWrapper
                  // rowSelection={rowSelection}
                  dataSource={projects}
                  columns={columns}
                  pagination={false}
                  className="invoiceListTable"
                />
              </Scrollbars>
            </div>
          )}
        </CardWrapper>
      </Box>
    </LayoutWrapper>
  );
}

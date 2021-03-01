import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import addDoubleImg from '../../../../assets/images/new-group-inner-list.png';
import newAddImg from '../../../../assets/images/new-inner-list.png';
const FormItem = Form.Item;

export default function(props) {   
   const [data, setData] = React.useState([]);

   const columns = [
    {
      title: "User",
      dataIndex: "strEmailUserGuest",
      rowKey: "strEmailUserGuest",
      width: "20%",  
    },
    
    {
      title: "",
      dataIndex: "intWorkOrderStatusID",
      rowKey: "intWorkOrderStatusID",
      width: "*",
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
      <div style={{color: "rgb(102, 115, 136)",   
          fontSize: "10pt",
          background: "#f7f7f7",
          border:"1px solid rgb(241, 243, 246)",
          height: "25px"}}>
       <span style={{float: "left",
                      marginLeft:"4px", 
                    marginRight:"4px",
                    cursor:"pointer",
                    }}>
         <img src={newAddImg}></img>
         </span>
         
      </div>
  </div>
  );
}

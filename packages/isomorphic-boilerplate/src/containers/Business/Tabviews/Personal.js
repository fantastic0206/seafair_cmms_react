import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import addDoubleImg from '../../../../assets/images/new-group-inner-list.png';
import { Button } from 'antd';
import newAddImg from '../../../assets/images/new-inner-list.png';
import '../../../component/table.css'
import BusinessContactModal from "../../../component/BusinessContactModal";
import BusinessUserAction from "../../../redux/businessuser/actions";
export default function(props) {   
  const {businessId}=props;
  const dispatch = useDispatch();
   const [personalModalActive, setPersonalModalActive] = React.useState(false);
   const { getBusinessUsers,deleteData } = BusinessUserAction;
   const { businessusers,isDelete } = useSelector((state) => state.BusinessUser);
  const [pageState,setPageState]=React.useState("add");
  const [businessUserInf,setBusinessUserInf]=React.useState({});

  const handleCancel = () => {
    setPersonalModalActive(false);
    
  };
  React.useEffect(() => { 
    dispatch(getBusinessUsers(businessId));
  }, []);
  const onRowClick=(row)=>{  
    setPersonalModalActive(true);
    setBusinessUserInf(row);
    setPageState("edit");
  }
  const deleteRow=(id,intAssetID)=>{
    dispatch(deleteData(id,intAssetID));  
    setPersonalModalActive(false);  
    setPageState("add") ;
  }
  return (
    <div className="isoInvoiceTable">   
      <Scrollbars
        style={{ width: "100%", height: "calc(35vh - 70px)" }}
      >       
         <table  style={{overflow:'auto',width:"80%"}}>
        <thead>
          <tr>
            <th  ><span className="listHeaderLabel35">User</span></th>
            {/* <th ><span className="listHeaderLabel35"></span></th>            */}
            <th style={{width:"10%"}} ><span className="listHeaderLabel35"></span></th>           
          </tr>
        </thead>
        <tbody>
       
        {
            businessusers.length!=0?
            businessusers.map((row)=>{
                return <tr className="listRow" key={row._id} >                    
                      <td className="column" onClick={()=>{onRowClick(row)}}><p className="context">{row.intUserID.strFullName}</p></td>
                      {/* <td className="column" onClick={()=>{onRowClick(row)}}><p className="context"></p></td>                      */}
                      <td className="column" style={{textAlign:"center"}}> <Button
            className="DltBtn"
            // icon="delete"
            onClick={() => {                        
              deleteRow(row._id,row.intBusinessID);

            }}
          >
            <i className="ion-android-delete" />
          </Button></td>                     
                   
                    </tr>
              })
              :<tr ><td style={{textAlign:"center",fontSize:"14px"}} colSpan="2">No Data!</td></tr>
          
          }
        </tbody>
        
        </table>
      </Scrollbars>
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
         <img src={newAddImg} onClick={()=>{setPersonalModalActive(true); setPageState("add") ;}}></img>
         </span>         
      </div>
      <BusinessContactModal
         visible={personalModalActive}         
         businessId={businessId}
         onCancel={handleCancel}
         pageState={pageState}
         businessUserInf={businessUserInf}
         title={"BUSINESS CONTACT"}
      >
      </BusinessContactModal>
  </div>
  );
}

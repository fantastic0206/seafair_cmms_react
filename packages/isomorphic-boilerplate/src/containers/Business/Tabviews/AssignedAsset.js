import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Scrollbars from "@iso/components/utility/customScrollBar";
import { Button } from 'antd';
import AssetBusinessAction from "../../../redux/assetbusiness/actions";
import '../../../component/table.css'
import newAddImg from '../../../assets/images/new-inner-list.png';
import AssetBusinessModal from  '../../../component/AssetBusinessModal';

const businessTypes={1:"Supplier",2:"Manufacture",3:"Service Provider",4:"Owner",5:"Customer"};
export default function(props) {   
  const {businessId,businessName}=props;
  let history = useHistory();
  const dispatch = useDispatch();
   const {getData,deleteData } = AssetBusinessAction;
   const { assetBusinesses,isDelete } = useSelector((state) => state.AssetBusiness);
   const [businessAssetModalActive, setBusinessAssetModalActive] = React.useState(false);
   const [assetBusiness,setAssetBusiness]=React.useState({});
   const [pageState,setPageState]=React.useState("");

   React.useEffect(() => {    
      dispatch(getData(businessId));   
  }, [businessId]);
  React.useEffect(() => {    
    if(isDelete==true){
      dispatch(getData(businessId));        
    }   
}, [isDelete]);
  
  const onRowClick=(row)=>{
    if(row.intAssetID.intCategoryKind==1){
      history.push("/dashboard/asset/facility/"+row.intAssetID._id);
    }
    else  if(row.intAssetID.intCategoryKind==2){
      history.push("/dashboard/asset/equipment/"+row.intAssetID._id);
    }
    else  if(row.intAssetID.intCategoryKind==3){
      history.push("/dashboard/asset/tool/"+row.intAssetID._id);
    }
   
  }
  const onRowView=(row)=>{
    setBusinessAssetModalActive(true);
    setAssetBusiness(row);
    setPageState("edit");
  }
  const handleCancel=()=>{
    setBusinessAssetModalActive(false);
  }
  const deleteRow=(rowId)=>{
    dispatch(deleteData(rowId));
  }
  return (
    <div className="isoInvoiceTable">
     <Scrollbars
        style={{ width: "100%", height: "calc(45vh - 70px)" }}
      >
         <table  style={{overflow:'auto',width:"70%"}}>
        <thead>
          <tr>
            <th style={{width:"30%"}} ><span className="listHeaderLabel35">Asset</span></th>
            <th ><span className="listHeaderLabel35">Business Class</span></th>
            <th ><span className="listHeaderLabel35">Business Asset Number</span></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
            assetBusinesses.length!=0?
            assetBusinesses.map((row)=>{
                return <tr className="listRow" key={row._id} >  
                       <td className="column" onClick={()=>{onRowClick(row)}}><p className="context" style={{color:'blue'}}>{row.intAssetID.strName}</p></td>                     
                       <td className="column" onClick={()=>{onRowView(row)}}><p className="context">{businessTypes[row.intBusinessRoleTypeID]}</p></td>                     
                       <td className="column" ><p className="context">{row.strBusinessAssetNumber}</p></td>                     
                       <td className="column"> 
                              <Button
                              className="DltBtn"                              
                              onClick={() => {                        
                                deleteRow(row._id);
                              }}
                            >
                              <i className="ion-android-delete" />
                            </Button></td>    
                      </tr>
          
          })
          :<tr ><td style={{textAlign:"center",fontSize:"14px"}} colSpan="4">No Data!</td></tr>
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
         <img src={newAddImg} onClick={()=>{setBusinessAssetModalActive(true);setPageState("add")}}></img>
         </span>         
      </div>
      <AssetBusinessModal
      visible={businessAssetModalActive}
      title="ASSET BUSINESS"
      businessId={businessId}
      businessName={businessName}
      onCancel={handleCancel}
      pageState={pageState}
      assetBusiness={assetBusiness}
      >
      </AssetBusinessModal>
  </div>
  );
}

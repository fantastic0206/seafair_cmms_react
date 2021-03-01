import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useHistory,useParams } from "react-router-dom";
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import AssetUserAction from "../../../redux/assetuser/actions";
import '../../../component/table.css'


export default function(props) {   
  const {userGroupId,pageState}=props;
  let history = useHistory();
  const dispatch = useDispatch();
   const {getAssetUsersByGroupId } = AssetUserAction;
   const { assetusers } = useSelector((state) => state.AssetUser);

   React.useEffect(() => { 
    if(pageState=="edit"){
      dispatch(getAssetUsersByGroupId(userGroupId));
    }
   
  }, [userGroupId]);

  
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
  return (
    <div className="isoInvoiceTable">
     <Scrollbars
        style={{ width: "100%", height: "calc(45vh - 70px)" }}
      >
         <table  style={{overflow:'auto',width:"70%"}}>
        <thead>
          <tr>
            <th style={{width:"30%"}} ><span className="listHeaderLabel35">Code</span></th>
            <th ><span className="listHeaderLabel35">Name</span></th>
          </tr>
        </thead>
        <tbody>
        {
            assetusers.length!=0?
            assetusers.map((row)=>{
                return <tr className="listRow" key={row._id} onClick={()=>{onRowClick(row)}}>                    
                      <td className="column" ><p className="context">{row.intAssetID.strCode}</p></td>
                       <td className="column" ><p className="context">{row.intAssetID.strName}</p></td>                     
                      </tr>
          
          })
          :<tr ><td style={{textAlign:"center",fontSize:"14px"}} colSpan="2">No Data!</td></tr>
        }

        </tbody>
        </table>
       
      </Scrollbars>
     
  </div>
  );
}

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from '@iso/components/Feedback/Modal';

import './table.css'
import Actions from "../redux/drilltype/actions";
const { initData} = Actions;
export default function (props) {
  const {  visible,title} = props;
  const dispatch = useDispatch();
  // const typeList=["Fire Drill","Man Overboard Drill","Abandon Ship Drill","Security Drill"];
  const { drillTypes } = useSelector((state) => state.DrillType);
const onRowClick=(id,str)=>{
  props.selectedType(id,str);
  props.onCancel(); 
}
React.useEffect(() => { 
  dispatch(initData());
}, []);
 return (
   <div>
     <Modal
       visible={visible}
       onClose={props.onCancel}
      //  okText="New"
       title={title}
       footer={null}      
       onCancel={props.onCancel}
     >
       <div>
        
       </div>
       <div style={{ marginTop: "3px", height: "200px",overflow:"auto" }}>
         <table>
           <thead>
             <tr>
               <th style={{ width: "70%" }}>
                 <span className="listHeaderLabel35">Name</span>
               </th>
               <th style={{ width: "*" }}>
                 <span className="listHeaderLabel35"></span>
               </th>              
             </tr>
           </thead>

           <tbody>
           {          
              drillTypes.map((row)=>{
                return  <tr
                  className="listRow"
                  key={row._id}
                  onClick={() => {
                    onRowClick(row._id,row.strDrillType);
                  }}
                >
                  <td className="column">
                   <p className="context">{row.strDrillType}</p>
                  </td>
                  <td className="column">
                    <p className="context"></p>
                  </td>               
                </tr>    
              })
            } 
           </tbody>
         </table>
       </div>
     </Modal>     
   </div>
 );
}
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link,useHistory,useParams } from "react-router-dom";
import siteConfig from '@iso/config/site.config';
import moment from 'moment';
// import { EditTable } from '@iso/components/Invoice/InvoiceTable';
// import OrderStatus from '@iso/components/Invoice/OrderStatus';
// import { CrewTable } from '../../component/CrewTable/CrewTable';
// import notification from '@iso/components/Notification';
import Button from '@iso/components/uielements/button';
// import Input, { Textarea } from '@iso/components/uielements/input';
// import DatePicker from '@iso/components/uielements/datePicker';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageWrapper from './SinglePage.styles';
// import { stringToPosetiveInt } from '@iso/lib/helpers/utility';
import Pdf from "react-to-pdf";
// import { orderStatusOptions } from './config';

import EntriesDrillAction from '../../redux/EntriesDrill/actions';


const ref = React.createRef();
const { getById } = EntriesDrillAction;

export default function(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();
  // const { editableInvoice, isNewInvoice, redirectPath, toggleView } = props;
  const { drillLists,drillList, isNewCrew,isDelete } = useSelector((state) => state.EntriesDrill);
  const [orderDate,setOrderDate]=React.useState("");
  // const [orderStatus,setOrderStatus]=React.useState("Draft");
  
  React.useEffect(() => {      
      dispatch(getById(id));     
  },[]);
  React.useEffect(() => {
    if (Object.keys(drillList).length !== 0) {
      setOrderDate(
        moment(drillList.orderDate).format("MM/DD/YYYY") + "    "
      );
    }
  },[drillList]);

  const trList=()=> {   
      let tr_array=[];
      for (let i=drillLists.length+1;i<15;i++){
         tr_array.push(
          <tr style={{height:"0.5in"}} key={i}>
           <td width="120px" style={{width:"1.25in",border:"solid windowtext 1.0pt",borderTop:"none",padding:"0in 5.4pt 0in 5.4pt",height:"0.5in"}}>
           <p style={{marginTop:"0in",marginRight:"0in",marginBottom:"0in",marginLeft:"12.5pt",lineHeight:"normal"}}><span style={{fontSize:"12.0pt",fontFamily:"Times New Roman"}}></span></p>
           </td>
           <td width="114" style={{width:"85.5pt",borderTop:"none",borderLeft:"none", borderBottom:"solid windowtext 1.0pt",borderRight:"solid windowtext 1.0pt",padding:"0in 5.4pt 0in 5.4pt",height:"0.5in"}}>
           <p  align="center" style={{marginBottom:"0in",textAlign:"center",lineHeight:"normal"}}><span style={{fontSize:"12.0pt",fontFamily:"Times New Roman"}}></span></p>
           </td>
           <td width="168px" style={{width:"1.75in",borderTop:"none",borderLeft:"none",borderBottom:"solid windowtext 1.0pt",borderRight:"solid windowtext 1.0pt", padding:"0in 5.4pt 0in 5.4pt",height:"0.5in"}}>
           <p  align="center" style={{marginBottom:"0in",textAlign:"center",lineHeight:"normal"}}><span style={{fontSize:"12.0pt",fontFamily:"Times New Roman"}}></span></p>
           </td>
           <td width="318px" style={{width:"238.5pt",borderTop:"none",borderLeft:"none",borderBottom:"solid windowtext 1.0pt",borderRight:"solid windowtext 1.0pt",padding:"0in 5.4pt 0in 5.4pt",height:"0.5in"}}>
           <p align="center" style={{marginBottom:"0in",textAlign:"center",
           lineHeight:"normal"}}><span style={{fontSize:"12.0pt",fontFamily:"Times New Roman"}}></span></p>
         
           </td>
           <td style={{height:"0.5in",border:"none"}} width="0px" height="48px"></td>
          </tr>);

    }
    return tr_array;
  }
  return (
    <div>
    <LayoutWrapper>
      <Box>
        <PageWrapper className="editView"> 
           <Link to={`/dashboard/entries_drill/edit/${id}`}>
                <Button color="primary" >
                  <span>Cancel</span>
                </Button>
              </Link>             
            <Pdf targetRef={ref} filename="ENTRIES RELATING TO DRILLS AND INSPECTIONS.pdf">
            {({ toPdf }) => <Button  type="primary"  className="saveBtn" style={{marginLeft:"20px"}} onClick={toPdf}><span>Download</span></Button>}
          </Pdf>
        </PageWrapper>
        <div style={{ fontFamily: "sans-serif",textAlign: "center"}}>
      
        <div
        style={{
          width: "795px",
          height: "100%",
          // border: "1px solid red",
          textAlign: "center",
          paddingBottom:"20px",
		     paddingTop:"35px" }}
        align="center"
        ref={ref}
      >
         <p style={{ textAlign: "center" }}>
          <img
            style={{ width: "75px", height: "75px" }}
            src={ `${siteConfig.apiUrl}/image001.png`}
          ></img>
        </p>
        <p>&nbsp;</p>
        <p style={{ textAlign: "center" }}>
          <span
            style={{
              fontSize: "24.0pt",
              lineHeight: "107%",
              fontWeight: "bold",
              fontFamily: "BankGothic Md BT",
            }}
          >
           M/V GRAND LUXE
          </span>
        </p>
        <p>&nbsp;</p>
        <p style={{ marginBottom: "12.0pt", textAlign: "center" }}>
          <b>
            <span style={{ fontFamily: "Times New Roman" }}>
            ENTRIES RELATING TO DRILLS AND INSPECTIONS
            </span>
          </b>
        </p>
       
        <table  border="1" cellSpacing="0" cellPadding="0" width="720px"
 style={{width:"7.5in",marginLeft:"-0.25pt",borderCollapse:"collapse",border:"none",  margin: "0 auto"}}>
   <tbody>
 <tr style={{height:"13.8pt"}}>
  <td width="120px" rowSpan="2" style={{width:"1.25in",border:"solid windowtext 1.0pt",padding:"0in 5.4pt 0in 5.4pt",height:"13.8pt"}}>
  <p  align="center" style={{marginBottom:"0in",textAlign:"center",
  lineHeight:"normal"}}><span style={{fontFamily:"Times New Roman"}}>DATE</span></p>
  <p  align="center" style={{marginBottom:"0in",textAlign:"center",lineHeight:"normal"}}><span style={{fontFamily:"Times New Roman"}}>[MM/DD/YY]</span></p>
  </td>
  <td width="114px" rowSpan="2" style={{width:"85.5pt",border:"solid windowtext 1.0pt",borderLeft:"none",padding:"0in 5.4pt 0in 5.4pt",height:"13.8pt"}}>
  <p  align="center" style={{marginBottom:"0in",textAlign:"center",lineHeight:"normal"}}><span style={{fontFamily:"Times New Roman"}}>TIME</span></p>
  <p  align="center" style={{marginBottom:"0in",textAlign:"center",lineHeight:"normal"}}><span style={{fontFamily:"Times New Roman"}}>(LOCAL)</span></p>
  </td>
  <td width="168px" rowSpan="2" style={{width:"1.75in",border:"solid windowtext 1.0pt", borderLeft:"none",padding:"0in 5.4pt 0in 5.4pt",height:"13.8pt"}}>
  <p  align="center" style={{marginBottom:"0in",textAlign:"center",
  lineHeight:"normal"}}><span style={{fontFamily:"Times New Roman"}}>LOCATION</span></p>
  </td>
  <td width="318px" rowSpan="2" style={{width:"238.5pt",border:"solid windowtext 1.0pt",borderLeft:"none",padding:"0in 5.4pt 0in 5.4pt",height:"13.8pt"}}>
  <p  style={{marginBottom:"0in",textAlign:"justify",lineHeight:"normal"}}><span style={{fontFamily:"Times New Roman"}}>TYPE OF DRILL OR
  INSPECTION. CONDITION OF EQUPMENT WITH DEFECTS AND CORRECTIVE ACTIONS NOTED. </span></p>
  </td>
  <td style={{height:"13.8pt",border:"none", width:"0", height:"18px"}}></td>
 </tr>

 <tr style={{height:"13.8pt"}}>
  <td style={{height:"13.8pt",border:"none"}} width="0" height="18"></td>
 </tr>
{
  drillLists.map((row, index) => {

    return <tr style={{height:"0.5in"}} key={index}>
    <td width="120px" style={{width:"1.25in",border:"solid windowtext 1.0pt",borderTop:"none",padding:"0in 5.4pt 0in 5.4pt",height:"0.5in"}}>
    <p style={{marginTop:"0in",marginRight:"0in",marginBottom:"0in",marginLeft:"12.5pt",lineHeight:"normal"}}><span style={{fontSize:"12.0pt",fontFamily:"Times New Roman"}}>{row.strDate!=""?moment(row.strDate).format("MM/DD/YYYY"):""}</span></p>
    </td>
    <td width="114" style={{width:"85.5pt",borderTop:"none",borderLeft:"none", borderBottom:"solid windowtext 1.0pt",borderRight:"solid windowtext 1.0pt",padding:"0in 5.4pt 0in 5.4pt",height:"0.5in"}}>
    <p  align="center" style={{marginBottom:"0in",textAlign:"center",lineHeight:"normal"}}><span style={{fontSize:"12.0pt",fontFamily:"Times New Roman"}}>{row.strTime!=""?moment(row.strTime).format("HH:mm"):""}</span></p>
    </td>
    <td width="168px" style={{width:"1.75in",borderTop:"none",borderLeft:"none",borderBottom:"solid windowtext 1.0pt",borderRight:"solid windowtext 1.0pt", padding:"0in 5.4pt 0in 5.4pt",height:"0.5in"}}>
    <p  align="center" style={{marginBottom:"0in",textAlign:"center",lineHeight:"normal"}}><span style={{fontSize:"12.0pt",fontFamily:"Times New Roman"}}>{row.strLocation}</span></p>
    </td>
    <td width="318px" style={{width:"238.5pt",borderTop:"none",borderLeft:"none",borderBottom:"solid windowtext 1.0pt",borderRight:"solid windowtext 1.0pt",padding:"0in 5.4pt 0in 5.4pt",height:"0.5in"}}>
    <p align="center" style={{marginBottom:"0in",textAlign:"center",
    lineHeight:"normal"}}><span style={{fontSize:"12.0pt",fontFamily:"Times New Roman"}}>{row.strDescription}</span></p>
  
    </td>
    <td style={{height:"0.5in",border:"none"}} width="0px" height="48px"></td>
   </tr>
  })
}

 {
   trList()
 }

 </tbody>
 </table>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
<p><span style={{fontFamily:"Times New Roman",fontSize:"11.0pt"}}>Revision
#:  </span><span style={{ textDecoration: "underline" }}>
                    {orderDate}
                </span> <span>               Revision Date: _____________                Master’s
Signature: ________________  </span></p>

      

      

      </div>
      
    </div>
     </Box>
    </LayoutWrapper>
 
    </div>
  );
}

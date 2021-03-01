import React from 'react';
import {  useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import AddWorkOrder from './AddScheduledMaintenace';
import EditWorkOrder from './EditWorkOrder';
// const { initData, selectCurrentInvoice, toggleView } = invoiceActions;
export default function SingleWorkOrder() {
  const workorders = useSelector(state => state.Workorders);
  // const dispatch = useDispatch();
  // const match = useRouteMatch();
  const { id } = useParams();
  // const { initialUsers, currentInvoice } = users;

   const redirectPath = "/dashboard/workorder";
   if(id){
    return (
      <EditWorkOrder         
        {...workorders}
        selectedId={id}
        redirectPath={redirectPath}
      />
    );
   }
  return (
        <AddWorkOrder         
          {...workorders}
          redirectPath={redirectPath}
        />
      );

}

// import clone from 'clone';
import actions from './actions';
const initState = {  
  workorders:[],
  workorder:{},
  isDelete:false,
  events:[],
  view:null,
  workorderId:null,
  isSaved:false

};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_WORKORDER_SUCCESS:      
      return {
        ...state,             
        workorders: [], 
        workorderId:action.data.id,
        isDelete:false,       
        isSaved:true

      };   
    case actions.GET_WORKORDER_CALENDAR_REDUCER: {
      return {
        ...state,
        events:action.data   ,
        isSaved:false     
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,      
        workorders: [],
        isDelete:false,
      };    
    default:
      return state;
  }
}

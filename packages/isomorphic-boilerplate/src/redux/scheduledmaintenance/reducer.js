// import clone from 'clone';
import actions from "./actions";
const initState = {
  scheduledmaintenances:[],  
  scheduledmaintenance:{},
  codeName:"",
  smID:null,
  isDelete: false,
  isSaved:false
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_SM_SUCCESS:
      return {
        ...state,      
        codeName:action.data.strCode,
        smID:action.data.id,   
        isSaved:true  
      };
  
    case actions.GET_SM_REDUCER: {
    
      return {
        ...state,
        scheduledmaintenances:action.data,  
        scheduledmaintenance:{},
        isDelete: false,        
        isSaved:false
      };
    }
    case actions.GET_SM_BYID_REDUCER: {
      return {
        ...state,
        scheduledmaintenance: action.data,
        isDelete: false,
        isSaved:false
      };
    }    
    case actions.DELETE_SM_SUCCESS:
      return {
        ...state,     
        isDelete: true,
        isSaved:false
      };
  
    default:
      return state;
  }
}

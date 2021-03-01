// import clone from 'clone';
import actions from './actions';
const initState = {  
  scheduledaudits:[],
  scheduledaudit:{},
  isDelete:false,
  isSaved:false
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_SCHEDULED_AUDIT_SUCCESS:
      return {
        ...state,             
        scheduledaudits: [],    
        isSaved:true    
      };
    case actions.ADD_FAILED:
      return {
        ...state,        
        scheduledaudits: [],     
        isSaved:false        
      };
    case actions.GET_SCHEDULED_AUDIT_REDUCER: {
      return {
        ...state,
        scheduledaudits: action.scheduledaudits,      
        isDelete:false,
        isSaved:false
      };
    }
    case actions.GET_SCHEDULED_AUDIT_BY_ID_REDUCER: {
      return {
        ...state,
        scheduledaudit: action.scheduledaudit,   
        isSaved:false     
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,      
        scheduledaudits: [],
        isSaved:false
        //isUpdateUser:true
      };
     case actions.DELETE_FAILED:
        return {
          ...state,    
          isDelete:false
        };
        case actions.DELETE_SUCCESS:
          return {
            ...state, 
           // assets:[],         
            isDelete:true
          };  
    default:
      return state;
  }
}

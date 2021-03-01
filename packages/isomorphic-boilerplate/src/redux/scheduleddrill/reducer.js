// import clone from 'clone';
import actions from './actions';
const initState = {  
  scheduleddrills:[],
  scheduleddrill:{},
  isDelete:false,
  isSaved:false
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_SCHEDULED_DRILL_SUCCESS:
      return {
        ...state,             
        scheduleddrills: [],    
        isSaved:true    
      };
    case actions.ADD_FAILED:
      return {
        ...state,        
        scheduleddrills: [],  
        isSaved:false             
      };
    case actions.GET_SCHEDULED_DRILL_REDUCER: {
      return {
        ...state,
        scheduleddrills: action.scheduleddrills,      
        isDelete:false,
        isSaved:false  
      };
    }
    case actions.GET_SCHEDULED_DRILL_BY_ID_REDUCER: {
      return {
        ...state,
        scheduleddrill: action.scheduleddrill,   
        isSaved:false       
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,      
        scheduleddrills: [],
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

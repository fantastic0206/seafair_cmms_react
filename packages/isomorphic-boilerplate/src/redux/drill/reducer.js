// import clone from 'clone';
import actions from './actions';
const initState = {  
  drills:[],
  drill:{},
  isDelete:false,
  isSaved:false
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_DRILL_SUCCESS:
      return {
        ...state,             
        drills: [],    
        isSaved:true    
      };
    case actions.ADD_FAILED:
      return {
        ...state,        
        drills: [], 
        isSaved:false            
      };
    case actions.GET_DRILL_REDUCER: {
      return {
        ...state,
        drills: action.drills,      
        isDelete:false,
        isSaved:false
      };
    }
    case actions.GET_DRILL_BY_ID_REDUCER: {
      return {
        ...state,
        drill: action.drill,       
        isSaved:false 
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,      
        drills: [],
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

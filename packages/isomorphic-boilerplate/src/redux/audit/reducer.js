// import clone from 'clone';
import actions from './actions';
const initState = {  
  audits:[],
  audit:{},
  isDelete:false,
  isSaved:false
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_ADUIT_SUCCESS:
      return {
        ...state,             
        audits: [],     
        isSaved:true   
      };
    case actions.ADD_FAILED:
      return {
        ...state,        
        audits: [],    
        isSaved:false         
      };
    case actions.GET_AUDIT_REDUCER: {
      return {
        ...state,
        audits: action.audits,      
        isDelete:false,
        isSaved:false
      };
    }
    case actions.GET_AUDIT_BY_ID_REDUCER: {
      return {
        ...state,
        audit: action.audit,       
        isSaved:false 
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,      
        audits: [],
        isSaved:false
      };
     case actions.DELETE_FAILED:
        return {
          ...state,    
          isDelete:false,
          isSaved:false
        };
        case actions.DELETE_SUCCESS:
          return {
            ...state, 
           // assets:[],         
            isDelete:true,
            isSaved:false
          };  
    default:
      return state;
  }
}

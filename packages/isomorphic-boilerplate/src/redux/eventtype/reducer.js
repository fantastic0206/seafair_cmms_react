// import clone from 'clone';
import actions from './actions';
const initState = {  
  eventTypes:[],
  eventType:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_SUCCESS:
      return {
        ...state,             
        eventTypes: [],        
      };
    case actions.ADD_FAILED:
      return {
        ...state,        
        eventTypes: [],             
      };
    case actions.GET_EVENT_TYPE_REDUCER: {
      return {
        ...state,
        eventTypes: action.eventTypes,      
        isDelete:false
      };
    }
    case actions.GET_BY_ID_REDUCER: {
      return {
        ...state,
        account: action.account,        
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,      
        eventTypes: [],
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

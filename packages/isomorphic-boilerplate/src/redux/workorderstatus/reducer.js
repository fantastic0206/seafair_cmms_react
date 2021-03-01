// import clone from 'clone';
import actions from './actions';
const initState = {  
  status:[],
  assetcategory:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_SUCCESS:
      return {
        ...state,             
        status: [],        
      };
    case actions.ADD_FAILED:
      return {
        ...state,        
        status: [],             
      };
    case actions.GET_WORKORDER_STATUS_REDUCER: {
      return {
        ...state,
        status: action.status,      
        isDelete:false
      };
    }
    case actions.GET_BY_ID_REDUCER: {
      return {
        ...state,
        workorder: action.workorder,        
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,      
        assetcategories: [],
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

// import clone from 'clone';
import actions from './actions';
const initState = {  
  assetEvents:[],
  assetEvent:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    // case actions.ADD_SUCCESS:
    //   return {
    //     ...state,             
    //     assetEvents: [],        
    //   };
    // case actions.ADD_FAILED:
    //   return {
    //     ...state,        
    //     assetEvents: [],             
    //   };
    case actions.GET_ASSET_EVENT_REDUCER: {
      return {
        ...state,
        assetEvents: action.data,      
        isDelete:false
      };
    }
    case actions.GET_BY_ID_REDUCER: {
      return {
        ...state,
        assetEvent: action.data,        
      };
    }
    // case actions.UPDATE_SUCCESS:
    //   return {
    //     ...state,      
    //     assetEvents: [],
    //     //isUpdateUser:true
    //   };
    //  case actions.DELETE_FAILED:
    //     return {
    //       ...state,    
    //       isDelete:false
    //     };
    //     case actions.DELETE_SUCCESS:
    //       return {
    //         ...state, 
    //        // assets:[],         
    //         isDelete:true
    //       };  
    default:
      return state;
  }
}

// import clone from 'clone';
import actions from './actions';
const initState = {  
  businessusers:[],
  businessuser:{},
  assetusers:[],
  assetuser:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {

    case actions.GET_ASSET_USERS_REDUCER: {
      return {
        ...state,
        businessusers: action.data,      
        isDelete:false
      };
    }
    // case actions.GET_BY_ID_REDUCER: {
    //   return {
    //     ...state,
    //     workorder: action.workorder,        
    //   };
    // }
    // case actions.UPDATE_SUCCESS:
    //   return {
    //     ...state,      
    //     assetcategories: [],
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

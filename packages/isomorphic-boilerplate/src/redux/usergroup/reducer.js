// import clone from 'clone';
import actions from './actions';
const initState = {  
  usergroups:[],
  usergroup:{},
  isDelete:false,
  isSaved:false
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_USERGROUP_SUCCESS:
      return {
        ...state,             
        usergroups: [],    
        isDelete:false,
        isSaved:true  
      };
    // case actions.ADD_FAILED:
    //   return {
    //     ...state,        
    //     workorder: [],             
    //   };
    case actions.GET_USERGROUP_REDUCER: {
      return {
        ...state,
        usergroups: action.usergroups,      
        isDelete:false,
        isSaved:false
      };
    }
    case actions.GET_GROUP_BY_ID_REDUCER: {
      return {
        ...state,
        usergroup: action.data,  
        isDelete:false,
        isSaved:false 
      };
    }
    // case actions.UPDATE_SUCCESS:
    //   return {
    //     ...state,      
    //     workorders: [],
    //     //isUpdateUser:true
    //   };
    //  case actions.DELETE_FAILED:
    //     return {
    //       ...state,    
    //       isDelete:false
    //     };
        case actions.DELETE_USER_GROUP_SUCCESS:
          return {
            ...state, 
           // assets:[],         
            isDelete:true
          };  
    default:
      return state;
  }
}

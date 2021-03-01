// import clone from 'clone';
import actions from './actions';
const initState = {  
  accounts:[],
  account:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_SUCCESS:
      return {
        ...state,             
        accounts: [],        
      };
    case actions.ADD_FAILED:
      return {
        ...state,        
        accounts: [],             
      };
    case actions.GET_ACCOUNT_REDUCER: {
      return {
        ...state,
        accounts: action.accounts,      
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
        accounts: [],
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

// import clone from 'clone';
import actions from './actions';
const initState = {  
  departments:[],
  department:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_SUCCESS:
      return {
        ...state,             
        departments: [],        
      };
    case actions.ADD_FAILED:
      return {
        ...state,        
        departments: [],             
      };
    case actions.GET_CHARGE_DEPARTMENT_REDUCER: {
      return {
        ...state,
        departments: action.departments,      
        isDelete:false
      };
    }
    case actions.GET_BY_ID_REDUCER: {
      return {
        ...state,
        department: action.department,        
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,      
        departments: [],
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

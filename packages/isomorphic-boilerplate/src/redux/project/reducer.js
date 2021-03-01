// import clone from 'clone';
import actions from './actions';
const initState = {  
  projects:[],
  project:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_SUCCESS:
      return {
        ...state,             
        projects: [],        
      };
    case actions.ADD_FAILED:
      return {
        ...state,        
        projects: [],             
      };
    case actions.GET_PROJECT_REDUCER: {
      return {
        ...state,
        projects: action.projects,      
        isDelete:false
      };
    }
    case actions.GET_PROJECT_BY_ID_REDUCER: {
      return {
        ...state,
        project: action.project,        
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,      
        projects: [],
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

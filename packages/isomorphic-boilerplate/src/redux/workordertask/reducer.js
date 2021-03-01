// import clone from 'clone';
import actions from './actions';
const initState = {  
  workordertasks:[],
  workordertask:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {   
    case actions.GET_WORKORDER_TASKS_REDUCER: {
      return {
        ...state,
        workordertasks: action.data,
        isDelete:false
      };
    }
    case actions.GET_WORKORDER_TASK_BY_ID_REDUCER: {
      return {
        ...state,
        workordertask: action.data,   
        isDelete:false     
      };
    }   
    case actions.DELETE_WORKORDER_TASK_SUCCESS:
          return {
            ...state,              
            isDelete:true
    };  
    default:
      return state;
  }
}

// import clone from 'clone';
import actions from './actions';
const initState = {  
  scheduledtasks:[],
  scheduledtask:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {   
    case actions.GET_SCHEDULED_TASKS_REDUCER: {
      return {
        ...state,
        scheduledtasks: action.data,
        isDelete:false
      };
    }
    case actions.GET_SCHEDULED_TASK_BY_ID_REDUCER: {
      return {
        ...state,
        scheduledtask: action.data,   
        isDelete:false     
      };
    }   
    case actions.DELETE_SCHEDULED_TASK_SUCCESS:
          return {
            ...state,              
            isDelete:true
    };  
    default:
      return state;
  }
}

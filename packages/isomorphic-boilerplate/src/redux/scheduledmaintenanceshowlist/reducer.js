// import clone from 'clone';
import actions from './actions';
const initState = {
  scheduledtriggers: [],
  scheduledtrigger: {},
  // scheduledmaintenance:{},
  // codeName:"",
  // smID:null
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    // case actions.ADD_SM_SUCCESS:
    //   return {
    //     ...state,
    //     codeName:action.data.strCode,
    //     smID:action.data.id,
    //   };

    case actions.GET_SM_TRIGGER_REDUCER: {
      return {
        ...state,
        scheduledtriggers: action.data,
        scheduledtrigger: {},
        isDelete: false,
      };
    }
    case actions.GET_SM_TRIGGER_BYID_REDUCER: {
      return {
        ...state,
        scheduledtrigger: action.data,
        isDelete: false,
      };
    }
    case actions.DELETE_SM_TRIGGER_SUCCESS:
      return {
        ...state,
        isDelete: true,
      };

    default:
      return state;
  }
}

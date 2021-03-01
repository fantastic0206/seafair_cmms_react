// import clone from 'clone';
import actions from './actions';
const initState = {
  charters: [],
  charterById: {},
  isDelete: false,
  events: [],
  view: null,
  workorderId: null,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_CHARTER_SUCCESS:
      return {
        ...state,
        charters: [],
        charterId: action.data.id,
        isDelete: false,
      };
    case actions.ADD_FAILED:
      return {
        ...state,
        workorder: [],
        isDelete: false,
      };
    case actions.GET_WORKORDER_REDUCER: {
      return {
        ...state,
        workorders: action.workorders,
        isDelete: false,
      };
    }
    case actions.GET_WORKORDER_CALENDAR_REDUCER: {
      return {
        ...state,
        events: action.data,
      };
    }
    case actions.GET_CHARTER_DATAS_REDUCER: {
      return {
        ...state,
        charters: action.data,
      };
    }

    case actions.GET_BY_ID_REDUCER: {
      return {
        ...state,
        charterById: action.charter,
        isDelete: false,
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,
        workorders: [],
        isDelete: false,
      };
    case actions.DELETE_FAILED:
      return {
        ...state,
        isDelete: false,
      };
    case actions.DELETE_SUCCESS:
      return {
        ...state,
        // assets:[],
        isDelete: true,
      };
    default:
      return state;
  }
}

const actions = {
  GET_WORKORDERS: 'GET_WORKORDERS',
  GET_CHARTER_DATAS: 'GET_CHARTER_DATAS',
  GET_WORKORDER_CALENDAR_REDUCER: 'GET_WORKORDER_CALENDAR_REDUCER',
  GET_CHARTER_DATAS_REDUCER: 'GET_CHARTER_DATAS_REDUCER',
  ADD_CHARTER: 'ADD_CHARTER',
  ADD_WORKORDER_FROM_TASK: 'ADD_WORKORDER_FROM_TASK',
  ADD_CHARTER_SUCCESS: 'ADD_CHARTER_SUCCESS',
  ADD_FAILED: 'ADD_FAILED',
  GET_WORKORDER_REDUCER: 'GET_WORKORDER_REDUCER',
  GET_CHARTER_BY_ID: 'GET_CHARTER_BY_ID',
  GET_BY_ID_REDUCER: 'GET_BY_ID_REDUCER',
  UPDATE_CHARTER: 'UPDATE_CHARTER',
  UPDATE_WORKORDER_CALENDAR: 'UPDATE_WORKORDER_CALENDAR',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  DELETE_CHARTER: 'DELETE_CHARTER',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_FAILED: 'DELETE_FAILED',

  initData: () => ({ type: actions.GET_WORKORDERS }),
  initOrderData: () => ({ type: actions.GET_WORKORDERS }),
  getChartersData: () => ({ type: actions.GET_CHARTER_DATAS }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_CHARTER, payload: { sendData: sendData } });
    };
  },
  addWorkOrder: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_WORKORDER_FROM_TASK,
        payload: { sendData: sendData },
      });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_CHARTER_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_CHARTER,
        payload: { id: selected },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_CHARTER,
        payload: { sendData: sendData, id: id },
      });
    };
  },
  updateCalendarData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_WORKORDER_CALENDAR,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

const actions = {
  GET_SCHEDULED_TASKS: "GET_SCHEDULED_TASKS",
  ADD_SCHEDULED_TASK: "ADD_SCHEDULED_TASK",
  GET_SCHEDULED_TASKS_REDUCER: "GET_SCHEDULED_TASKS_REDUCER",
  GET_SCHEDULED_TASK_BY_ID: "GET_SCHEDULED_TASK_BY_ID",
  GET_SCHEDULED_TASK_BY_ID_REDUCER: "GET_SCHEDULED_TASK_BY_ID_REDUCER",
  UPDATE_SCHEDULED_TASK: "UPDATE_SCHEDULED_TASK",
  DELETE_SCHEDULED_TASK:'DELETE_SCHEDULED_TASK',
  DELETE_SCHEDULED_TASK_SUCCESS:'DELETE_SCHEDULED_TASK_SUCCESS',


  // initData: () => ({ type: actions.GET_WORKORDER_TASKS }),
  getDatas: (smId) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.GET_SCHEDULED_TASKS, payload: { smId: smId } });
    };
  },
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_SCHEDULED_TASK, payload: { sendData: sendData } });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_SCHEDULED_TASK_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_SCHEDULED_TASK,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_SCHEDULED_TASK,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

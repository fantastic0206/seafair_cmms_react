const actions = {
  GET_WORKORDER_TASKS: "GET_WORKORDER_TASKS",
  ADD_WORKORDER_TASK: "ADD_WORKORDER_TASK",
  // ADD_SUCCESS: "ADD_SUCCESS",
  // ADD_FAILED: "ADD_FAILED",
  GET_WORKORDER_TASKS_REDUCER: "GET_WORKORDER_TASKS_REDUCER",
  GET_WORKORDER_TASK_BY_ID: "GET_WORKORDER_TASK_BY_ID",
  GET_WORKORDER_TASK_BY_ID_REDUCER: "GET_WORKORDER_TASK_BY_ID_REDUCER",
  UPDATE_WORKORDER_TASK: "UPDATE_WORKORDER_TASK",
  // UPDATE_SUCCESS:'UPDATE_SUCCESS',
  DELETE_WORKORDER_TASK:'DELETE_WORKORDER_TASK',
  DELETE_WORKORDER_TASK_SUCCESS:'DELETE_WORKORDER_TASK_SUCCESS',
  // DELETE_FAILED:'DELETE_FAILED',

  // initData: () => ({ type: actions.GET_WORKORDER_TASKS }),
  getDatas: (workOrderId) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.GET_WORKORDER_TASKS, payload: { workOrderId: workOrderId } });
    };
  },
  addWorkOrderTask: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_WORKORDER_TASK, payload: { sendData: sendData } });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_WORKORDER_TASK_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_WORKORDER_TASK,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_WORKORDER_TASK,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

const actions = {
  GET_SCHEDULED_DRILLS: "GET_SCHEDULED_DRILLS",
  ADD_SCHEDULED_DRILL: "ADD_SCHEDULED_DRILL",
  ADD_SCHEDULED_DRILL_SUCCESS: "ADD_SCHEDULED_DRILL_SUCCESS",
  ADD_FAILED: "ADD_FAILED",
  GET_SCHEDULED_DRILL_REDUCER: "GET_SCHEDULED_DRILL_REDUCER",
  GET_SCHEDULED_DRILL_BY_ID: "GET_SCHEDULED_DRILL_BY_ID",
  GET_SCHEDULED_DRILL_BY_ID_REDUCER: "GET_SCHEDULED_DRILL_BY_ID_REDUCER",
  UPDATE_SCHEDULED_DRILL: "UPDATE_SCHEDULED_DRILL",
  UPDATE_SUCCESS:'UPDATE_SUCCESS',
  DELETE_SCHEDULED_DRILL:'DELETE_SCHEDULED_DRILL',
  DELETE_SUCCESS:'DELETE_SUCCESS',
  DELETE_FAILED:'DELETE_FAILED',

  initData: () => ({ type: actions.GET_SCHEDULED_DRILLS }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_SCHEDULED_DRILL, payload: { sendData: sendData } });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_SCHEDULED_DRILL_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_SCHEDULED_DRILL,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_SCHEDULED_DRILL,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

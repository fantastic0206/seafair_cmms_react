const actions = {
  GET_DRILLS: "GET_DRILLS",
  ADD_DRILL: "ADD_DRILL",
  ADD_DRILL_SUCCESS: "ADD_DRILL_SUCCESS",
  ADD_FAILED: "ADD_FAILED",
  GET_DRILL_REDUCER: "GET_DRILL_REDUCER",
  GET_DRILL_BY_ID: "GET_DRILL_BY_ID",
  GET_DRILL_BY_ID_REDUCER: "GET_DRILL_BY_ID_REDUCER",
  UPDATE_DRILL: "UPDATE_DRILL",
  UPDATE_SUCCESS:'UPDATE_SUCCESS',
  DELETE_DRILL:'DELETE_DRILL',
  DELETE_SUCCESS:'DELETE_SUCCESS',
  DELETE_FAILED:'DELETE_FAILED',

  initData: () => ({ type: actions.GET_DRILLS }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_DRILL, payload: { sendData: sendData } });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_DRILL_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_DRILL,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_DRILL,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

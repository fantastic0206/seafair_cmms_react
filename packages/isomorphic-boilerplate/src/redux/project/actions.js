const actions = {
  GET_PROJECTS: "GET_PROJECTS",
  ADD_PROJECT: "ADD_PROJECT",
  ADD_SUCCESS: "ADD_SUCCESS",
  ADD_FAILED: "ADD_FAILED",
  GET_PROJECT_REDUCER: "GET_PROJECT_REDUCER",
  GET_PROJECT_BY_ID: "GET_PROJECT_BY_ID",
  GET_PROJECT_BY_ID_REDUCER: "GET_PROJECT_BY_ID_REDUCER",
  UPDATE_PROJECT: "UPDATE_PROJECT",
  UPDATE_SUCCESS:'UPDATE_SUCCESS',
  DELETE_PROJECT:'DELETE_PROJECT',
  DELETE_SUCCESS:'DELETE_SUCCESS',
  DELETE_FAILED:'DELETE_FAILED',

  initData: () => ({ type: actions.GET_PROJECTS }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_PROJECT, payload: { sendData: sendData } });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_PROJECT_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_PROJECT,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_PROJECT,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

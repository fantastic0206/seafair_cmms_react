const actions = {
  GET_EVENT_TYPE: "GET_EVENT_TYPE",
  ADD_EVENT_TYPE: "ADD_EVENT_TYPE",
  ADD_SUCCESS: "ADD_SUCCESS",
  ADD_FAILED: "ADD_FAILED",
  GET_EVENT_TYPE_REDUCER: "GET_EVENT_TYPE_REDUCER",
  GET_BY_ID: "GET_BY_ID",
  GET_BY_ID_REDUCER: "GET_BY_ID_REDUCER",
  UPDATE_ASSET_CATEGORY: "UPDATE_ASSET_CATEGORY",
  UPDATE_SUCCESS:'UPDATE_SUCCESS',
  DELETE_ASSET_CATEGORY:'DELETE_ASSET_CATEGORY',
  DELETE_SUCCESS:'DELETE_SUCCESS',
  DELETE_FAILED:'DELETE_FAILED',

  initData: () => ({ type: actions.GET_EVENT_TYPE }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_EVENT_TYPE, payload: { sendData: sendData } });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_ASSET_CATEGORY,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_ASSET_CATEGORY,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

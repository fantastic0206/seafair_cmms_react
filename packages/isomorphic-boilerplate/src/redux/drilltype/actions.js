const actions = {
  GET_DRILL_TYPES: "GET_DRILL_TYPES",
  ADD_DRILL_TYPE: "ADD_DRILL_TYPE",
  ADD_DRILL_TYPE_SUCCESS: "ADD_DRILL_TYPE_SUCCESS",
  GET_DRILL_TYPES_REDUCER: "GET_DRILL_TYPES_REDUCER",
  // GET_BY_ID: "GET_BY_ID",
  // GET_BY_ID_REDUCER: "GET_BY_ID_REDUCER",
  UPDATE_DRILL_TYPE: "UPDATE_DRILL_TYPE",  
  DELETE_DRILL_TYPE:'DELETE_DRILL_TYPE', 

  initData: () => ({ type: actions.GET_DRILL_TYPES }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_DRILL_TYPE, payload: { sendData: sendData } });
    };
  },
  // getById: (id) => {
  //   return (dispatch) => {
  //     dispatch({ type: actions.GET_BY_ID, payload: { id: id } });
  //   };
  // },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_DRILL_TYPE,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_DRILL_TYPE,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

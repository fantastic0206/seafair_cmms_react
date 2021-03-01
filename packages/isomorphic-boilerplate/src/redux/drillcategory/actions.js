const actions = {
  GET_DRILL_CATEGORIES: "GET_DRILL_CATEGORIES",
  ADD_DRILL_CATEGORY: "ADD_DRILL_CATEGORY",
  ADD_DRILL_CATEGORY_SUCCESS: "ADD_DRILL_CATEGORY_SUCCESS",
  GET_DRILL_CATEGORIES_REDUCER: "GET_DRILL_CATEGORIES_REDUCER",
  // GET_BY_ID: "GET_BY_ID",
  // GET_BY_ID_REDUCER: "GET_BY_ID_REDUCER",
  UPDATE_DRILL_CATEGORY: "UPDATE_DRILL_CATEGORY",  
  DELETE_DRILL_CATEGORY:'DELETE_DRILL_CATEGORY', 

  initData: () => ({ type: actions.GET_DRILL_CATEGORIES }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_DRILL_CATEGORY, payload: { sendData: sendData } });
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
        type: actions.DELETE_DRILL_CATEGORY,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_DRILL_CATEGORY,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

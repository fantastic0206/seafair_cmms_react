const actions = {
  // GET_ENTRIES_LIST_REDUCER: "GET_ENTRIES_LIST_REDUCER",
  GET_NEW_DRILL_LIST:"GET_NEW_DRILL_LIST",
  UPDATE_EDIT_DRILL:"UPDATE_EDIT_DRILL",
  ADD_DRILL_LIST: "ADD_DRILL_LIST",
  ADD_DRILL_LIST_SUCCESS: "ADD_DRILL_LIST_SUCCESS",
  GET_ENTRIES_DRILL_LIST:"GET_ENTRIES_DRILL_LIST",
  GET_ENTRIES_DRILL_LIST_REDUCER:"GET_ENTRIES_DRILL_LIST_REDUCER",
  GET_DRILL_LIST_BY_ID:"GET_DRILL_LIST_BY_ID",
  GET_DRILL_LIST_ID_REDUCER: "GET_DRILL_LIST_ID_REDUCER",
  UPDATE_DRILL_LIST: "UPDATE_DRILL_LIST",
  DELETE_DRILL_ENTRIES:'DELETE_DRILL_ENTRIES',
  DELETE_SUCCESS:'DELETE_SUCCESS',
  
  // initData: () => ({ type: actions.GET_ENTRIES_CREW }),
  getEntriesData: () => ({ type: actions.GET_ENTRIES_DRILL_LIST }),
  initNewData:()=>({type:actions.GET_NEW_DRILL_LIST}),
  editCrewData: drillData => ({ type: actions.UPDATE_EDIT_DRILL, drillData }),
  saveData: (sendData) => {
    return (dispatch) => {
      dispatch({
        type: actions.ADD_DRILL_LIST,
        payload: { sendData: sendData},
      });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_DRILL_LIST_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_DRILL_ENTRIES,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_DRILL_LIST,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

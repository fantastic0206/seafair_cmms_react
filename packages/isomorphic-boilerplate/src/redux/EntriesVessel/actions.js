const actions = {
  GET_NEW_VESSEL_LIST:"GET_NEW_VESSEL_LIST",
  UPDATE_EDIT_CREW_COMPLIMENT:"UPDATE_EDIT_CREW_COMPLIMENT",
  UPDATE_LOG_ENTRY:"UPDATE_LOG_ENTRY",
  ADD_VESSEL_LIST: "ADD_VESSEL_LIST",
  ADD_VESSEL_LIST_SUCCESS: "ADD_VESSEL_LIST_SUCCESS",
  GET_ENTRIES_VESSEL_LIST:"GET_ENTRIES_VESSEL_LIST",
  GET_ENTRIES_VESSEL_LIST_REDUCER: "GET_ENTRIES_VESSEL_LIST_REDUCER",
  GET_VESSEL_LIST_BY_ID:"GET_VESSEL_LIST_BY_ID",
  GET_VESSEL_LIST_ID_REDUCER: "GET_VESSEL_LIST_ID_REDUCER",
  UPDATE_VESSEL_LIST: "UPDATE_VESSEL_LIST",
  DELETE_VESSEL_ENTRIES:'DELETE_VESSEL_ENTRIES',
  DELETE_SUCCESS:'DELETE_SUCCESS',
  initNewData:()=>({type:actions.GET_NEW_VESSEL_LIST}),
  editCrewData: crewData => ({ type: actions.UPDATE_EDIT_CREW_COMPLIMENT, crewData }),
  editLogData: logData => ({ type: actions.UPDATE_LOG_ENTRY, logData }),
    // initData: () => ({ type: actions.GET_ENTRIES_CREW }),
  getEntriesData: () => ({ type: actions.GET_ENTRIES_VESSEL_LIST }),
  saveData: (sendData) => {
    return (dispatch) => {
      dispatch({
        type: actions.ADD_VESSEL_LIST,
        payload: { sendData: sendData},
      });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_VESSEL_LIST_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_VESSEL_ENTRIES,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_VESSEL_LIST,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

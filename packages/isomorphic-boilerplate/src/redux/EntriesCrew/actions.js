const actions = {
  GET_ENTRIES_LIST_REDUCER: "GET_ENTRIES_LIST_REDUCER",
  GET_NEW_CREW_LIST:"GET_NEW_CREW_LIST",
  UPDATE_EDIT_CREW:"UPDATE_EDIT_CREW",
  ADD_CREW_LIST: "ADD_CREW_LIST",
  ADD_CREW_LIST_SUCCESS: "ADD_CREW_LIST_SUCCESS",
  GET_ENTRIES_LIST:"GET_ENTRIES_LIST",
  GET_CREW_LIST_BY_ID:"GET_CREW_LIST_BY_ID",
  GET_CREW_LIST_ID_REDUCER: "GET_CREW_LIST_ID_REDUCER",
  UPDATE_CREW_LIST: "UPDATE_CREW_LIST",
  DELETE_CREW_ENTRIES:'DELETE_CREW_ENTRIES',
  DELETE_SUCCESS:'DELETE_SUCCESS',
  
  // initData: () => ({ type: actions.GET_ENTRIES_CREW }),
  getEntriesData: () => ({ type: actions.GET_ENTRIES_LIST }),
  initNewData:()=>({type:actions.GET_NEW_CREW_LIST}),
  editCrewData: crewData => ({ type: actions.UPDATE_EDIT_CREW, crewData }),
  saveData: (sendData) => {
    return (dispatch) => {
      dispatch({
        type: actions.ADD_CREW_LIST,
        payload: { sendData: sendData},
      });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_CREW_LIST_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_CREW_ENTRIES,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_CREW_LIST,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

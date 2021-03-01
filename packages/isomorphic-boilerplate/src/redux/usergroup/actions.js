const actions = {
  GET_USERGROUPS: "GET_USERGROUPS",
  ADD_USERGROUP: "ADD_USERGROUP",
  ADD_USERGROUP_SUCCESS: "ADD_USERGROUP_SUCCESS",
  DELETE_USER_GROUP: "DELETE_USER_GROUP",
  GET_USERGROUP_REDUCER: "GET_USERGROUP_REDUCER",
  GET_USER_GROUP_BY_ID: "GET_USER_GROUP_BY_ID",
  GET_GROUP_BY_ID_REDUCER: "GET_GROUP_BY_ID_REDUCER",
  UPDATE_USER_GROUP: "UPDATE_USER_GROUP",
  // UPDATE_SUCCESS:'UPDATE_SUCCESS',
  DELETE_USER_GROUP_SUCCESS:'DELETE_USER_GROUP_SUCCESS',
  // DELETE_SUCCESS:'DELETE_SUCCESS',
  // DELETE_FAILED:'DELETE_FAILED',

  initData: () => ({ type: actions.GET_USERGROUPS }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_USERGROUP, payload: { sendData: sendData } });
    };
  },
  getUserGroupById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_USER_GROUP_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_USER_GROUP,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_USER_GROUP,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

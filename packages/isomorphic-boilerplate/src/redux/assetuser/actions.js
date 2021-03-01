const actions = {
   GET_ASSET_USERS: "GET_ASSET_USERS",
  ADD_ASSET_USER: "ADD_ASSET_USER",
  GET_ASSET_USERS_BY_GROUP_ID: "GET_ASSET_USERS_BY_GROUP_ID",
  // ADD_FAILED: "ADD_FAILED",
  GET_ASSET_USERS_REDUCER: "GET_ASSET_USERS_REDUCER",
  // GET_ASSET_USER_BY_ID: "GET_ASSET_USER_BY_ID",
  // GET_BY_ID_REDUCER: "GET_BY_ID_REDUCER",
  UPDATE_ASSET_USER: "UPDATE_ASSET_USER",
  // UPDATE_SUCCESS:'UPDATE_SUCCESS',
  DELETE_ASSET_USER:'DELETE_ASSET_USER',
  // DELETE_SUCCESS:'DELETE_SUCCESS',
  // DELETE_FAILED:'DELETE_FAILED',

  getAssetUsers: (assetId) => ({ type: actions.GET_ASSET_USERS, payload: assetId}),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_ASSET_USER, payload: { sendData: sendData } });
    };
  },
  getAssetUsersByGroupId: (groupId) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_ASSET_USERS_BY_GROUP_ID, payload: { id: groupId } });
    };
  },
  deleteData: (selected,intAssetID) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_ASSET_USER,
        payload: {id:selected,intAssetID:intAssetID}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_ASSET_USER,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

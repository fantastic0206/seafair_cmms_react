const actions = {
  GET_BUSINESS_USERS: "GET_BUSINESS_USERS",
  ADD_BUSINESS_USER: "ADD_BUSINESS_USER",
  GET_ASSET_USERS_BY_GROUP_ID: "GET_ASSET_USERS_BY_GROUP_ID",
  GET_ASSET_USERS_REDUCER: "GET_ASSET_USERS_REDUCER",  
  UPDATE_BUSINESS_USER: "UPDATE_BUSINESS_USER",
  DELETE_BUSINESS_USER:'DELETE_BUSINESS_USER',
  

  getBusinessUsers: (businessId) => ({ type: actions.GET_BUSINESS_USERS, payload: businessId}),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_BUSINESS_USER, payload: { sendData: sendData } });
    };
  },
  getAssetUsersByGroupId: (groupId) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_ASSET_USERS_BY_GROUP_ID, payload: { id: groupId } });
    };
  },
  deleteData: (selected,intBusinessID) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_BUSINESS_USER,
        payload: {id:selected,intBusinessID:intBusinessID}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_BUSINESS_USER,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

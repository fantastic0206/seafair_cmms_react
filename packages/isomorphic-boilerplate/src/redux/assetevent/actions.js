const actions = {
  GET_ASSET_EVENTS: "GET_ASSET_EVENTS",
  ADD_ASSET_EVENT: "ADD_ASSET_EVENT",
  DELETE_ASSET_EVENT: "DELETE_ASSET_EVENT",
  // ADD_FAILED: "ADD_FAILED",
  GET_ASSET_EVENT_REDUCER: "GET_ASSET_EVENT_REDUCER",
  // GET_BY_ID: "GET_BY_ID",
  // GET_BY_ID_REDUCER: "GET_BY_ID_REDUCER",
  // UPDATE_ASSET_CATEGORY: "UPDATE_ASSET_CATEGORY",
  // UPDATE_SUCCESS:'UPDATE_SUCCESS',
  // DELETE_ASSET_CATEGORY:'DELETE_ASSET_CATEGORY',
  // DELETE_SUCCESS:'DELETE_SUCCESS',
  // DELETE_FAILED:'DELETE_FAILED',

  getAssetEvents: (assetId) => ({ type: actions.GET_ASSET_EVENTS ,payload: {id: assetId }}),
  add: (sendData) => {
    console.log(sendData,'sendata');
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_ASSET_EVENT, payload: { sendData: sendData } });
    };
  },
  // getById: (id) => {
  //   return (dispatch) => {
  //     dispatch({ type: actions.GET_BY_ID, payload: { id: id } });
  //   };
  // },
  deleteData: (selected,assetId) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_ASSET_EVENT,
        payload: {id:selected,assetId:assetId}
      });
    };
  },
  // updateData: (sendData, id) => {
  //   return (dispatch) => {
  //     dispatch({
  //       type: actions.UPDATE_ASSET_CATEGORY,
  //       payload: { sendData: sendData, id: id },
  //     });
  //   };
  // },
};
export default actions;

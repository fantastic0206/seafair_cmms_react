const actions = {
  GET_ASSET_BUSINESS: "GET_ASSET_BUSINESS",
  ADD_ASSET_BUSINESS: "ADD_ASSET_BUSINESS",
  UPDATE_ASSET_BUSINESS: "UPDATE_ASSET_BUSINESS",
  DELETE_ASSET_BUSINESS: "DELETE_ASSET_BUSINESS",
  GET_ASSET_BUSINESS_REDUCER: "GET_ASSET_BUSINESS_REDUCER",    
  UPDATE_BUSINESS: "UPDATE_BUSINESS", 
  DELETED_SUCCESS:"DELETED_SUCCESS",
  getData: (businessId) => ({ type: actions.GET_ASSET_BUSINESS ,payload:{businessId:businessId}}),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_ASSET_BUSINESS, payload: { sendData: sendData } });
    };
  },
  getById: (sendData,id) => {
    return (dispatch) => {
      dispatch({ type: actions.UPDATE_BUSINESS, payload: {sendData:sendData, id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_ASSET_BUSINESS,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_ASSET_BUSINESS,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

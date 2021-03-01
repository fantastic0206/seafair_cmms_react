const actions = {
  GET_ASSET: "GET_ASSET",
  ADD_ASSET: "ADD_ASSET",
  ADD_SUCCESS: "ADD_SUCCESS",
  ADD_FAILED: "ADD_FAILED",
  GET_ASSET_REDUCER: "GET_ASSET_REDUCER",
  GET_ASSET_BYID: "GET_ASSET_BYID",
  GET_ASSET_BYID_REDUCER: "GET_ASSET_BYID_REDUCER",
  UPDATE_DATA: "UPDATE_DATA",
  UPDATE_SUCCESS:'UPDATE_SUCCESS',
  DELETE_DATA:'DELETE_DATA',
  DELETE_SUCCESS:'DELETE_SUCCESS',
  DELETE_FAILED:'DELETE_FAILED',
  CREATE_NUMBER:'CREATE_NUMBER',
  CREATE_NUMBER_SUCCESS:'CREATE_NUMBER_SUCCESS',
  GET_ASSET_BY_FILTER:"GET_ASSET_BY_FILTER",
  initData: () => ({ type: actions.GET_ASSET }),
  addAsset: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_ASSET, payload: { sendData: sendData } });
    };
  },
  getAssetById: (assetId) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_ASSET_BYID, payload: { assetId: assetId } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_DATA,
        payload: {id:selected}
      });
    };
  },
  getAssetByFilter: (filterIds) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_ASSET_BY_FILTER, payload: { filterIds: filterIds } });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_DATA,
        payload: { sendData: sendData, id: id },
      });
    };
  },
  createNumber: () => {
    return (dispatch, getState) => {    
      dispatch({ type: actions.CREATE_NUMBER, payload: { userId: localStorage.getItem('user_id') } });
    };
  },
};
export default actions;

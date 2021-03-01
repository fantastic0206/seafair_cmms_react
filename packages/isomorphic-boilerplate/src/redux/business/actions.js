const actions = {
  GET_BUSINESS: "GET_BUSINESS",
  ADD_BUSINESS: "ADD_BUSINESS",
  // ADD_SUCCESS: "ADD_SUCCESS",
  // ADD_FAILED: "ADD_FAILED",
  GET_BUSINESS_REDUCER: "GET_BUSINESS_REDUCER",
  // GET_BY_ID: "GET_BY_ID",
  // GET_BY_ID_REDUCER: "GET_BY_ID_REDUCER",
  UPDATE_BUSINESS: "UPDATE_BUSINESS",
  // UPDATE_SUCCESS:'UPDATE_SUCCESS',
  // DELETE_ASSET_CATEGORY:'DELETE_ASSET_CATEGORY',
  // DELETE_SUCCESS:'DELETE_SUCCESS',
  // DELETE_FAILED:'DELETE_FAILED',
  getData: () => ({ type: actions.GET_BUSINESS }),
  // add: (sendData) => {
  //   return (dispatch, getState) => {
  //     dispatch({ type: actions.ADD_BUSINESS, payload: { sendData: sendData } });
  //   };
  // },
  getById: (sendData,id) => {
    return (dispatch) => {
      dispatch({ type: actions.UPDATE_BUSINESS, payload: {sendData:sendData, id: id } });
    };
  },
  // deleteData: (selected) => {
  //   return (dispatch) => {
  //     dispatch({
  //       type: actions.DELETE_ASSET_CATEGORY,
  //       payload: {id:selected}
  //     });
  //   };
  // },
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

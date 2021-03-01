const actions = {
  GET__METER_READING_UNITS: "GET__METER_READING_UNITS",
  ADD_METER_READING_UNIT: "ADD_METER_READING_UNIT",
  GET_METERINGS:"GET_METERINGS",
  ADD_METER_READING: "ADD_METER_READING",
  GET_METER_READING_REDUCER:"GET_METER_READING_REDUCER",
  ADD_SUCCESS: "ADD_SUCCESS",
  ADD_FAILED: "ADD_FAILED",
  GET_METER_READING_UNITS_REDUCER: "GET_METER_READING_UNITS_REDUCER",
  GET_PROJECT_BY_ID: "GET_PROJECT_BY_ID",
  GET_PROJECT_BY_ID_REDUCER: "GET_PROJECT_BY_ID_REDUCER",
  UPDATE_METERING: "UPDATE_METERING",
  UPDATE_SUCCESS:'UPDATE_SUCCESS',
  DELETE_METER_READING:'DELETE_METER_READING',
  DELETE_SUCCESS:'DELETE_SUCCESS',
  DELETE_FAILED:'DELETE_FAILED',

  initData: () => ({ type: actions.GET__METER_READING_UNITS }),
  getMeterings: (assetId,userId) => ({ type: actions.GET_METERINGS, payload: { assetId: assetId} }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_METER_READING_UNIT, payload: { sendData: sendData } });
    };
  },
  addMetering: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_METER_READING, payload: { sendData: sendData } });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_PROJECT_BY_ID, payload: { id: id } });
    };
  },
  deleteMeterReadingData: (selected,assetId) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_METER_READING,
        payload: {id:selected,assetId:assetId}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_METERING,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

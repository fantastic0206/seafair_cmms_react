const actions = {
  GET_SM_TRIGGERS: 'GET_SM_TRIGGERS',
  ADD_SM_TRIGGER: 'ADD_SM_TRIGGER',
  // ADD_SM_SUCCESS: "ADD_SM_SUCCESS",
  DELETE_SM_TRIGGER_DATA: 'DELETE_SM_TRIGGER_DATA',
  GET_SM_TRIGGER_REDUCER: 'GET_SM_TRIGGER_REDUCER',
  GET_SM_TRIGGER_BYID: 'GET_SM_TRIGGER_BYID',
  GET_SM_TRIGGER_BYID_REDUCER: 'GET_SM_TRIGGER_BYID_REDUCER',
  UPDATE_SM_TRIGGER_DATA: 'UPDATE_SM_TRIGGER_DATA',
  DELETE_SM_TRIGGER_SUCCESS: 'DELETE_SM_TRIGGER_SUCCESS',

  getSelectedSchedulShowList: (Id) => ({
    type: actions.GET_SM_TRIGGERS,
    payload: { Id: Id },
  }),
  addSMTrigger: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_SM_TRIGGER,
        payload: { sendData: sendData },
      });
    };
  },
  getSMTriggerById: (Id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_SM_TRIGGER_BYID, payload: { Id: Id } });
    };
  },
  deleteData: (selected, smId) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_SM_TRIGGER_DATA,
        payload: { id: selected, smId: smId },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_SM_TRIGGER_DATA,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

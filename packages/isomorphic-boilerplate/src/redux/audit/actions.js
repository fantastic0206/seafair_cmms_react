const actions = {
    GET_AUDITS: "GET_AUDITS",
    ADD_AUDIT: "ADD_AUDIT",
    ADD_ADUIT_SUCCESS: "ADD_ADUIT_SUCCESS",
    ADD_FAILED: "ADD_FAILED",
    GET_AUDIT_REDUCER: "GET_AUDIT_REDUCER",
    GET_AUDIT_BY_ID: "GET_AUDIT_BY_ID",
    GET_AUDIT_BY_ID_REDUCER: "GET_AUDIT_BY_ID_REDUCER",
    UPDATE_AUDIT: "UPDATE_AUDIT",
    UPDATE_SUCCESS:'UPDATE_SUCCESS',
    DELETE_AUDIT:'DELETE_AUDIT',
    DELETE_SUCCESS:'DELETE_SUCCESS',
    DELETE_FAILED:'DELETE_FAILED',
  
    initData: () => ({ type: actions.GET_AUDITS }),
    add: (sendData) => {
      return (dispatch, getState) => {
        dispatch({ type: actions.ADD_AUDIT, payload: { sendData: sendData } });
      };
    },
    getById: (id) => {
      return (dispatch) => {
        dispatch({ type: actions.GET_AUDIT_BY_ID, payload: { id: id } });
      };
    },
    deleteData: (selected) => {
      return (dispatch) => {
        dispatch({
          type: actions.DELETE_AUDIT,
          payload: {id:selected}
        });
      };
    },
    updateData: (sendData, id) => {
      return (dispatch) => {
        dispatch({
          type: actions.UPDATE_AUDIT,
          payload: { sendData: sendData, id: id },
        });
      };
    },
  };
  export default actions;
  
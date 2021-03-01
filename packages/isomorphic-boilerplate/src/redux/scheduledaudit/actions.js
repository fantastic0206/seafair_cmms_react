const actions = {
    GET_SCHEDULED_AUDITS: "GET_SCHEDULED_AUDITS",
    ADD_SCHEDULED_AUDIT: "ADD_SCHEDULED_AUDIT",
    ADD_SCHEDULED_AUDIT_SUCCESS: "ADD_SCHEDULED_AUDIT_SUCCESS",
    ADD_FAILED: "ADD_FAILED",
    GET_SCHEDULED_AUDIT_REDUCER: "GET_SCHEDULED_AUDIT_REDUCER",
    GET_SCHEDULED_AUDIT_BY_ID: "GET_SCHEDULED_AUDIT_BY_ID",
    GET_SCHEDULED_AUDIT_BY_ID_REDUCER: "GET_SCHEDULED_AUDIT_BY_ID_REDUCER",
    UPDATE_SCHEDULED_AUDIT: "UPDATE_SCHEDULED_AUDIT",
    UPDATE_SUCCESS:'UPDATE_SUCCESS',
    DELETE_SCHEDULED_AUDIT:'DELETE_SCHEDULED_AUDIT',
    DELETE_SUCCESS:'DELETE_SUCCESS',
    DELETE_FAILED:'DELETE_FAILED',
  
    initData: () => ({ type: actions.GET_SCHEDULED_AUDITS }),
    add: (sendData) => {
      return (dispatch, getState) => {
        dispatch({ type: actions.ADD_SCHEDULED_AUDIT, payload: { sendData: sendData } });
      };
    },
    getById: (id) => {
      return (dispatch) => {
        dispatch({ type: actions.GET_SCHEDULED_AUDIT_BY_ID, payload: { id: id } });
      };
    },
    deleteData: (selected) => {
      return (dispatch) => {
        dispatch({
          type: actions.DELETE_SCHEDULED_AUDIT,
          payload: {id:selected}
        });
      };
    },
    updateData: (sendData, id) => {
      return (dispatch) => {
        dispatch({
          type: actions.UPDATE_SCHEDULED_AUDIT,
          payload: { sendData: sendData, id: id },
        });
      };
    },
  };
  export default actions;
  
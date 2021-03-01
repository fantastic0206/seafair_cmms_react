const actions = {
  GET_CALENDAR_DATAS: "GET_CALENDAR_DATAS",
  UPDATE_CHARTER_CALENDAR:"UPDATE_CHARTER_CALENDAR",
  GET_WORKORDER_CALENDAR_REDUCER: "GET_WORKORDER_CALENDAR_REDUCER",
  UPDATE_WORKORDER_CALENDAR: "UPDATE_WORKORDER_CALENDAR",
  getCalendarData: () => ({ type: actions.GET_CALENDAR_DATAS }),
  updateCalendarWorkOrderData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_WORKORDER_CALENDAR,
        payload: { sendData: sendData, id: id },
      });
    };
  },
  updateCalendarCharterData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_CHARTER_CALENDAR,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;

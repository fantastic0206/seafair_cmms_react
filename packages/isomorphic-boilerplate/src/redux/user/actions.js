const actions = {
  GET_USER: 'GET_USER',
  ADD_USER:'ADD_USER',
  ADD_USER_SUCCESS:'ADD_USER_SUCCESS',
  ADD_FAILED:'ADD_FAILED',
  GET_USER_REDUCER:'GET_USER_REDUCER',
  GET_USER_BYID:'GET_USER_BYID',
  GET_All_USER:'GET_All_USER',
  GET_USER_BYID_REDUCER:'GET_USER_BYID_REDUCER',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_SUCCESS:'UPDATE_SUCCESS',
  UPDATE_FAILED:'UPDATE_FAILED',
  DELETE_USER:'DELETE_USER',
  DELETE_SUCCESS:'DELETE_SUCCESS',
  DELETE_FAILED:'DELETE_FAILED',

  initUserData: () => ({ type: actions.GET_USER }),
  getAllUserData: () => ({ type: actions.GET_All_USER }),
  addUser:  (sendData)  => {
    return (dispatch, getState) => {    
      dispatch({ type: actions.ADD_USER, payload: {sendData:sendData} })
    };
  },
  getUserById:  (userId)  => {
    return (dispatch) => {    
      dispatch({ type: actions.GET_USER_BYID, payload: {userId:userId} })
    };
  },
  deleteUser: (selected) => {
    return (dispatch) => {     
      dispatch({
        type: actions.DELETE_USER,
        payload: {userId:selected}
      });
    };
  },
  updateUser: (sendData,userId) => {
    return (dispatch) => {    
      dispatch({ type: actions.UPDATE_USER, payload: {sendData:sendData,userId:userId} })
    };
  }, 
 
};
export default actions;

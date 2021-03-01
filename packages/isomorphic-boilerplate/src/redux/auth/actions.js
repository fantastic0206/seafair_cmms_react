const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  SIGNUP_REQUEST:'SIGNUP_REQUEST',
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }), 
  login: (email,password) => {      
    return dispatch => {    
      dispatch({ type: actions.LOGIN_REQUEST, payload: {token:false,email:email,password:password} })
   
    }
  },
  signup: (sendData) => {
  return dispatch => {    
    dispatch({ type: actions.SIGNUP_REQUEST, payload: {sendData} })
 
  }
},
  logout: () => ({
    type: actions.LOGOUT,
  }),
};
export default actions;

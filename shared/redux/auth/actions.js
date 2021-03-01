const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }), 
  login: (email,password) => {

    return dispatch => {    
      dispatch({ type: actions.LOGIN_REQUEST, payload: {token:false,email:email,password:password} })
   
    }
  },
  logout: () => ({
    type: actions.LOGOUT,
  }),
};
export default actions;

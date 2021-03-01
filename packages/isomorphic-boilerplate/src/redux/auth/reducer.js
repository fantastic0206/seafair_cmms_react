import actions from "./actions";

const initState = { idToken: null,errorMsg:null };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        idToken: action.token,
      };
    case actions.LOGIN_ERROR:     
      return {
        errorMsg: action.msg,
      };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}

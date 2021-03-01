// import clone from 'clone';
import actions from "./actions";
const initState = {
  users: [],
  user: {},
  initialUsers: false,
  add_errorMsg: null,
  add_successMsg: null,
  up_errorMsg: null,
  up_successMsg: null,
  isNewUser: false,
  isUpdateUser: false,
  isDeleteUser: false,
  isSaved: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_USER_SUCCESS:
      return {
        ...state,
        users: [],
        isDeleteUser: false,
        isSaved: true,
      };
    case actions.ADD_FAILED:
      return {
        ...state,
        users: [],
        isDeleteUser: false,
        isSaved: false,
      };
    case actions.GET_USER_REDUCER: {
      return {
        ...state,
        users: action.users,
        initialUsers: true,
        isUpdateUser: false,
        isDeleteUser: false,
        isSaved: false,
      };
    }
    case actions.GET_USER_BYID_REDUCER: {
      return {
        ...state,
        user: action.user,
        isDeleteUser: false,
        isSaved: false,
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,
        users: [],
        isUpdateUser: true,
        isDeleteUser: false,
        isSaved: false,
      };
    case actions.UPDATE_FAILED:
      return {
        ...state,
        // users: [],
        isUpdateUser: true,
      };
    case actions.DELETE_FAILED:
      return {
        ...state,
        isDeleteUser: false,
      };
    case actions.DELETE_SUCCESS:
      return {
        ...state,
        // users:[],
        isDeleteUser: true,
      };
    default:
      return state;
  }
}

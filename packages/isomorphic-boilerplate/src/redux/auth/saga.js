import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { createBrowserHistory } from "history";
import axios from "axios";
import { getToken, clearToken } from "@iso/lib/helpers/utility";
import siteConfig from "@iso/config/site.config";
import actions from "./actions";
import notification from "@iso/components/Notification";
const history = createBrowserHistory();
// const fakeApiCall = true; // auth0 or express JWT
axios.defaults.headers.get["Content-Type"] = "application/json";
const onCallReqeust = async (sendData, URI) =>
  await axios
    .post(URI, sendData)
    .then((res) => res)
    .catch((error) => error);
export function* loginRequest() {
  yield takeEvery("LOGIN_REQUEST", function* ({ payload }) {
    const { token, email, password } = payload;
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: token,
        profile: "Profile",
      });
    } else {
      const URI = `${siteConfig.apiUrl}/auth/login`;
      var sendData = {
        email: email,
        password: password,
      };
      try {
        const callResult = yield call(onCallReqeust, sendData, URI);

        if (callResult.response != undefined) {
          notification("error", callResult.response.data.msg);
          yield put({
            type: actions.LOGIN_ERROR,
            msg: callResult.response.data.msg,
          });
        } else {
          console.log(callResult.data,'call request data');
          localStorage.setItem("user_name",callResult.data.data.user.strFullName);
          localStorage.setItem("user_id",callResult.data.data.user.id);

          yield put({
            type: actions.LOGIN_SUCCESS,
            token: callResult.data.data.token,
            user: callResult.data.data.user,
            profile: "Profile",
          });
        }
      } catch (error) {
        console.log(error);
        notification("error", "Server Internal error!");
      }
    }
  });
}
export function* signupRequest() {
  yield takeEvery("SIGNUP_REQUEST", function* ({ payload }) {
    var sendData = payload.sendData;
    const URI = `${siteConfig.apiUrl}/auth/register`;
    try {
      const callResult = yield call(onCallReqeust, sendData, URI);

      if (callResult.response != undefined) {
        notification("error", callResult.response.data.msg);
      } else {
        notification("success", "Successfully registered!!. please Login!");
      }
    } catch (error) {
      notification("error", "Server Internal error!");
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {       
    yield localStorage.setItem("id_token", payload.token);
    
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    yield clearToken();
    history.push("/");
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken().get("idToken");    
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: "Profile",
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
    fork(signupRequest),
    // yield takeEvery(actions.SIGNUP_REQUEST, signupRequest),
  ]);
}

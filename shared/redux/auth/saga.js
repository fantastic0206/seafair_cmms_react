import { all, takeEvery, put, fork,call } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';
import axios from 'axios'
import { getToken, clearToken } from '@iso/lib/helpers/utility';
import siteConfig from '@iso/config/site.config';
import actions from './actions';

const history = createBrowserHistory();
const fakeApiCall = true; // auth0 or express JWT
axios.defaults.headers.get['Content-Type'] = 'application/json';

const URI = `${siteConfig.apiUrl}/users/login`
const onCallReqeust = async (sendData) =>
  await axios
  .post(URI, sendData)  
    .then(res => res)
    .catch(error => error);


export  function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
    const { token,email,password } = payload;
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: token,
        profile: 'Profile',
      });
    } else {
      // if (fakeApiCall) {
      
        var sendData = {
          'email': email,
          'password': password
        }
        try {
          const callResult = yield call(
            onCallReqeust,
            sendData           
          );
         
          if(callResult.data.status=="success"){          
            console.log(callResult.data,'success request') ;
            yield put({
                  type: actions.LOGIN_SUCCESS,
                  token: callResult.data.data.token,
                  user:callResult.data.data.user,
                  profile: 'Profile',
                });
          }
          else{           
            yield put({ type: actions.LOGIN_ERROR,msg: callResult.data.msg});
          }
        }
        catch (error) {        
          yield put({ type: actions.LOGIN_ERROR ,msg: "Server Internal error!"});
        }        
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('id_token', payload.token);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    yield clearToken();
    history.push('/');
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const token = getToken().get('idToken');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile',
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
  ]);
}

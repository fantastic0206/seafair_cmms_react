import { all, takeEvery, put,call } from 'redux-saga/effects';
import axios from 'axios'
// import { getToken } from '@iso/lib/helpers/utility';
import siteConfig from '@iso/config/site.config';
import notification from '@iso/components/Notification';
import actions from './actions';


const onCallReqeust = async (URI) =>
  await axios
  .get(URI)  
    .then(res => res)
    .catch(error => error);
const onPostCallReqeust = async (sendData,URI) =>
  await axios
  .post(URI,sendData)  
    .then(res => res)
    .catch(error => error);
const onPutCallReqeust = async (sendData,URI) =>
    await axios
    .put(URI,sendData)  
      .then(res => res)
      .catch(error => error);    
 const onDeleteCallReqeust = async (URI) =>
      await axios
      .delete(URI)  
        .then(res => res)
        .catch(error => error);  
export function* getUser() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/users/userlist`             
    );
  
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg);
      yield put({
        type: actions.GET_USER_REDUCER,
        users: [],
      });
    }
    else{
      var temp=[];
     callResult.data.data.map((value, index) => {          
          value.key=parseInt(index)+1;
          temp.push(value);
      });     
      yield put({
        type: actions.GET_USER_REDUCER,
        users:temp,//createDemoData(),
      });
    }    
  }
  catch (error) {
    notification('error',"Internal server error!")
    yield put({
      type: actions.GET_USER_REDUCER,
      users: [],
    });
    // yield put({ type: actions.LOGIN_ERROR ,msg: "Server Internal error!"});
  }  
}
export function* getAllUser() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/users/getall`             
    );
  
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg);
      yield put({
        type: actions.GET_USER_REDUCER,
        users: [],
      });
    }
    else{
      var temp=[];
     callResult.data.data.map((value, index) => {          
          value.key=parseInt(index)+1;
          temp.push(value);
      });     
      yield put({
        type: actions.GET_USER_REDUCER,
        users:temp,//createDemoData(),
      });
    }    
  }
  catch (error) {
    notification('error',"Internal server error!")
    yield put({
      type: actions.GET_USER_REDUCER,
      users: [],
    });
    // yield put({ type: actions.LOGIN_ERROR ,msg: "Server Internal error!"});
  }  
}
export function* getUserById({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/users/${payload.userId}`             
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)    
         yield put({
        type: actions.GET_USER_BYID_REDUCER,
        user:{},
        msg:callResult.data.data.msg
      });
    }
    else{       
    
        yield put({
        type: actions.GET_USER_BYID_REDUCER,
        user:callResult.data.data.user,
        msg:null
      });
    }    
  }
  catch (error) {    
    notification('error',"Internal server error!")
    yield put({
      type: actions.GET_USER_BYID_REDUCER,
      user: {},
      msg:'Internal server error!'
    });
    // yield put({ type: actions.LOGIN_ERROR ,msg: "Server Internal error!"});
  }  
}
//yield takeEvery('LOGIN_REQUEST', function*({ payload }) {  
export function* addUser({payload}) { 
  axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/users/register`          
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)  
    }
    else{
         notification('success',callResult.data.msg)
         yield put({
          type: actions.ADD_USER_SUCCESS,
          data: callResult.data.data,
        });
    }
    
  }
  catch (error) {  
    console.log(error,'this is saga user error');   
    yield put({ type: actions.ADD_FAILED ,msg: "Server Internal error!"});
  }  
}
export function* updateUser({payload}) { 
  axios.defaults.headers.put['Authorization'] =  localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/users/${payload.userId}`          
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)    
         yield put({
        type: actions.UPDATE_FAILED,
        msg:callResult.data.msg,
      });  
    }
   else{
        notification('success',callResult.data.msg)
        yield put({
          type: actions.UPDATE_SUCCESS,
          msg:callResult.data.msg,
        });
    }     
  
  }
  catch (error) {  
    notification('success',"Server Internal error!")   
  }  
}

export function* deleteUser({payload}) { 
  axios.defaults.headers.delete['Authorization'] =localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onDeleteCallReqeust,     
      `${siteConfig.apiUrl}/users/${payload.userId}`          
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
      notification('success',callResult.data.msg)
        yield put({
        type: actions.DELETE_SUCCESS,
        msg:callResult.data.msg,
      });
    }     
    
  }
  catch (error) {     
    notification('error',"Server Internal error!")      
  }  
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_USER, getUser),
    yield takeEvery(actions.GET_All_USER, getAllUser),
    yield takeEvery(actions.ADD_USER, addUser),
    yield takeEvery(actions.GET_USER_BYID, getUserById),
    yield takeEvery(actions.UPDATE_USER, updateUser),
    yield takeEvery(actions.DELETE_USER, deleteUser), 
    
  ]);
}

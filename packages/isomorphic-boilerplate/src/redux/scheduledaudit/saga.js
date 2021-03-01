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
export function* getScheduledAudits() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/scheduledaudit`             
    );
     
    if(callResult.re1sponse!=undefined){
      notification('error',callResult.response.data.msg);
    }
    else{
      var temp=[];    
      callResult.data.data.map((value, index) => {          
           value.key=parseInt(index)+1;
           temp.push(value);
      });     
    
      yield put({
        type: actions.GET_SCHEDULED_AUDIT_REDUCER,
        scheduledaudits:temp,//createDemoData(),
      });
    }  
   
  }
  catch (error) {
    notification('error',"Internal server error!")
  }  
}
export function* getScheduledAuditById({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/scheduledaudit/${payload.id}`             
    );   
 
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{      
     
        yield put({
        type: actions.GET_SCHEDULED_AUDIT_BY_ID_REDUCER,
        scheduledaudit:callResult.data.data,
        msg:null
      });
    }    
  }
  catch (error) {    
    notification('error',"Internal server error!")
  }  
}
export function* addScheduledAudit({payload}) { 
  axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/scheduledaudit`          
    );

    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
        notification('success',callResult.data.msg)
        yield put({
          type: actions.ADD_SCHEDULED_AUDIT_SUCCESS,
          msg:callResult.data.msg,
        });
    }
  }
  catch (error) {  
 
    yield put({ type: actions.ADD_FAILED ,msg: "Server Internal error!"});
  }  
}
export function* updateScheduledAuditData({payload}) { 
  axios.defaults.headers.put['Authorization'] =  localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/scheduledaudit/${payload.id}`          
    );
  
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
     notification('success',callResult.data.msg)
      yield put({
        type: actions.UPDATE_SUCCESS      
      });
    }  
  }
  catch (error) {  
    notification('success',"Server Internal error!")   
  }  
}

export function* deleteScheduledAudit({payload}) { 
  axios.defaults.headers.delete['Authorization'] =localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onDeleteCallReqeust,     
      `${siteConfig.apiUrl}/scheduledaudit/${payload.id}`          
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
      notification('success',callResult.data.msg)
      yield put({
        type: actions.GET_SCHEDULED_AUDITS,       
      });
    }     

  }
  catch (error) {     
    notification('error',"Server Internal error!")      
  }  
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_SCHEDULED_AUDITS,   getScheduledAudits),
    yield takeEvery(actions.ADD_SCHEDULED_AUDIT, addScheduledAudit),
    yield takeEvery(actions.GET_SCHEDULED_AUDIT_BY_ID, getScheduledAuditById),
    yield takeEvery(actions.UPDATE_SCHEDULED_AUDIT, updateScheduledAuditData),
    yield takeEvery(actions.DELETE_SCHEDULED_AUDIT, deleteScheduledAudit), 
    
  ]);
}

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
export function* getSMTriggers({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/scheduletrigger/smid/${payload.Id}`      //by schedul maintain Id       
    );
     
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg);
    }
    else{
      var temp=[]; 
      
      // callResult.data.data.map((value, index) => {          
      //     value.key=value._id;   
      //     temp.push(value);
      //  });
       yield put({
         type: actions.GET_SM_TRIGGER_REDUCER,
         data:callResult.data.data,
        
       });
    }  
   
  }
  catch (error) {
    notification('error',"Internal server error!")
  }  
}
export function* getSMTriggerById({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/scheduletrigger/${payload.Id}`             
    );
   
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{       
        yield put({
        type: actions.GET_SM_TRIGGER_BYID_REDUCER,
        data:callResult.data.data,       
      });
    }    
  }
  catch (error) {    
    notification('error',"Internal server error!")
  }  
}
export function* addSMTrigger({payload}) { 
  axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/scheduletrigger`          
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{     
        notification('success',callResult.data.msg)
        yield put({
          type: actions.GET_SM_TRIGGERS,
          payload:{Id:payload.sendData.intScheduledMaintenanceID}       
        });
    }
  }
  catch (error) {  
    yield put({ type: actions.ADD_FAILED ,msg: "Server Internal error!"});
  }  
}
export function* updateSMTriggerData({payload}) { 
  axios.defaults.headers.put['Authorization'] =  localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/scheduletrigger/${payload.id}`          
    );
   
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
     notification('success',callResult.data.msg)
      yield put({
        type: actions.GET_SM_TRIGGERS,
        payload:{Id:payload.sendData.intScheduledMaintenanceID}       
        });
    }  
  }
  catch (error) {  
    notification('success',"Server Internal error!")   
  }  
}

export function* deleteSMTriggerData({payload}) { 
  axios.defaults.headers.delete['Authorization'] =localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onDeleteCallReqeust,     
      `${siteConfig.apiUrl}/scheduletrigger/${payload.id}`          
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
      notification('success',callResult.data.msg);
      yield put({
        type: actions.GET_SM_TRIGGERS,
        payload:{Id:payload.smId}
       });
    }     
   
  }
  catch (error) {     
    notification('error',"Server Internal error!")      
  }  
}


export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_SM_TRIGGERS, getSMTriggers),
    yield takeEvery(actions.ADD_SM_TRIGGER, addSMTrigger),
    yield takeEvery(actions.GET_SM_TRIGGER_BYID, getSMTriggerById),
    yield takeEvery(actions.UPDATE_SM_TRIGGER_DATA, updateSMTriggerData),
    yield takeEvery(actions.DELETE_SM_TRIGGER_DATA, deleteSMTriggerData), 
  ]);
}

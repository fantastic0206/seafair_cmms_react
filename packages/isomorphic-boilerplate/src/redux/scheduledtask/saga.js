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
export function* getScheduledTasks({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/scheduledtask/scheduledmaintenace/${payload.smId}`                
    );
     
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg);
    }
    else{
      var temp=[];    
      callResult.data.data.map((value, index) => {          
        value.key=value._id;
        value.title=value.strDescription;
        value.parentid=value.intParentScheduledTaskID;  
        temp.push(value);
       });     
      
       yield put({
         type: actions.GET_SCHEDULED_TASKS_REDUCER,
         data:temp,//createDemoData(),
       });
    }  
   
  }
  catch (error) {
    notification('error',"Internal server error!")
  }  
}
export function* getScheduledTaskById({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/scheduledtask/${payload.id}`             
    );
   
 
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{       
        yield put({
        type: actions.GET_SCHEDULED_TASK_BY_ID_REDUCER,
        data:callResult.data.data,
        msg:null
      });
    }    
  }
  catch (error) {    
    notification('error',"Internal server error!")
  }  
}
export function* addScheduledTask({payload}) { 

  axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/scheduledtask`          
    );

    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
       notification('success',callResult.data.msg)
       yield put({
        type: actions.GET_SCHEDULED_TASKS,    
        payload: { smId: payload.sendData.intScheduledMaintenanceID}
      });
    }
  }
  catch (error) {  
 
    yield put({ type: actions.ADD_FAILED ,msg: "Server Internal error!"});
  }  
}
export function* updateScheduledTask({payload}) { 
  axios.defaults.headers.put['Authorization'] =  localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/scheduledtask/${payload.id}`          
    );
  
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
     notification('success',callResult.data.msg);    
      yield put({
        type: actions.GET_SCHEDULED_TASKS,    
        payload: { smId: payload.sendData.intScheduledMaintenanceID}
      });
    }  
  }
  catch (error) {  
    notification('success',"Server Internal error!")   
  }  
}

export function* deleteScheduledTask({payload}) { 
  axios.defaults.headers.delete['Authorization'] =localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onDeleteCallReqeust,     
      `${siteConfig.apiUrl}/scheduledtask/${payload.id}`          
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
      notification('success',callResult.data.msg)
      yield put({
        type: actions.DELETE_SCHEDULED_TASK_SUCCESS      
      });
    }     

  }
  catch (error) {     
    notification('error',"Server Internal error!")      
  }  
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_SCHEDULED_TASKS,   getScheduledTasks),
    yield takeEvery(actions.ADD_SCHEDULED_TASK, addScheduledTask),
    yield takeEvery(actions.GET_SCHEDULED_TASK_BY_ID, getScheduledTaskById),
    yield takeEvery(actions.UPDATE_SCHEDULED_TASK, updateScheduledTask),
    yield takeEvery(actions.DELETE_SCHEDULED_TASK, deleteScheduledTask), 
    
  ]);
}

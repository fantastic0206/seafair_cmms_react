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
export function* getScheduledDrills() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/scheduleddrill`             
    );
     
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg);
    }
    else{
      var temp=[];    
      callResult.data.data.map((value, index) => {          
           value.key=parseInt(index)+1;
           temp.push(value);
      });
      yield put({
        type: actions.GET_SCHEDULED_DRILL_REDUCER,
        scheduleddrills:temp,//createDemoData(),
      });
    }  
   
  }
  catch (error) {
    notification('error',"Internal server error!")
  }  
}
export function* getScheduledDrillById({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/scheduleddrill/${payload.id}`             
    );   
 
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{      
     
        yield put({
        type: actions.GET_SCHEDULED_DRILL_BY_ID_REDUCER,
        scheduleddrill:callResult.data.data,
        msg:null
      });
    }    
  }
  catch (error) {    
    notification('error',"Internal server error!")
  }  
}
export function* addScheduledDrill({payload}) {
  axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/scheduleddrill`          
    );

    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
        notification('success',callResult.data.msg)
        yield put({
          type: actions.ADD_SCHEDULED_DRILL_SUCCESS,
          msg:callResult.data.msg,
        });
    }
  }
  catch (error) {  
 
    yield put({ type: actions.ADD_FAILED ,msg: "Server Internal error!"});
  }  
}
export function* updateScheduledDrillData({payload}) { 
  axios.defaults.headers.put['Authorization'] =  localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/scheduleddrill/${payload.id}`          
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

export function* deleteScheduledDrill({payload}) { 
  axios.defaults.headers.delete['Authorization'] =localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onDeleteCallReqeust,     
      `${siteConfig.apiUrl}/scheduleddrill/${payload.id}`          
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
      notification('success',callResult.data.msg)
      yield put({
        type: actions.GET_SCHEDULED_DRILLS,       
      });
    }     

  }
  catch (error) {     
    notification('error',"Server Internal error!")      
  }  
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_SCHEDULED_DRILLS,   getScheduledDrills),
    yield takeEvery(actions.ADD_SCHEDULED_DRILL, addScheduledDrill),
    yield takeEvery(actions.GET_SCHEDULED_DRILL_BY_ID, getScheduledDrillById),
    yield takeEvery(actions.UPDATE_SCHEDULED_DRILL, updateScheduledDrillData),
    yield takeEvery(actions.DELETE_SCHEDULED_DRILL, deleteScheduledDrill), 
    
  ]);
}

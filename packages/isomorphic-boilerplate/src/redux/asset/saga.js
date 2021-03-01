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
export function* getAsset() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/assets`             
    );
     
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg);
    }
    else{
      var temp=[];   
     
      temp=callResult.data.data;
      callResult.data.data.map((value, index) => {          
          value.key=value._id;
          value.title=value.strName;
          value.parentid=value.intAssetParentID;          
       });
   
       yield put({
         type: actions.GET_ASSET_REDUCER,
         assets:callResult.data.data,//createDemoData(),
         assets1:temp
       });
    }  
   
  }
  catch (error) {
    notification('error',"Internal server error!")
  }  
}
export function* getAsetById({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/assets/${payload.assetId}`             
    );
   
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{       
        yield put({
        type: actions.GET_ASSET_BYID_REDUCER,
        asset:callResult.data.data,
        msg:null
      });
    }    
  }
  catch (error) {    
    notification('error',"Internal server error!")
  }  
}


export function* getAssetByFilter({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/assets/filter/${payload.filterIds}`             
    );
   
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{       
      var temp=[];   
     
      temp=callResult.data.data;
      callResult.data.data.map((value, index) => {          
          value.key=value._id;
          value.title=value.strName;
          value.parentid=value.intAssetParentID;          
       });
   
       yield put({
         type: actions.GET_ASSET_REDUCER,
         assets:temp,//createDemoData(),
         assets1:temp
       });
    }    
  }
  catch (error) {    
    notification('error',"Internal server error!")
  }  
}

export function* addAsset({payload}) { 
  axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/assets`          
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
      console.log(callResult.data.data,'add asset');
       // notification('success',callResult.data.msg)
        yield put({
          type: actions.ADD_SUCCESS,
          asset:callResult.data.data,      
        });
    }
  }
  catch (error) {  
    console.log(error,'this is saga user error');   
    yield put({ type: actions.ADD_FAILED ,msg: "Server Internal error!"});
  }  
}
export function* updateData({payload}) { 
  axios.defaults.headers.put['Authorization'] =  localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/assets/${payload.id}`          
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

export function* deleteData({payload}) { 
  axios.defaults.headers.delete['Authorization'] =localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onDeleteCallReqeust,     
      `${siteConfig.apiUrl}/assets/${payload.id}`          
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
    console.log(callResult,'this is call Request');
  }
  catch (error) {     
    notification('error',"Server Internal error!")      
  }  
}

export function* createNumber({payload}) { 
  console.log(payload,'this is payload');
  axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload,
      `${siteConfig.apiUrl}/assets/numberId`
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
        // notification('success',callResult.data.msg)        
        yield put({
          type: actions.CREATE_NUMBER_SUCCESS,
          assetNumber:callResult.data.data,
        });
    }
  }
  catch (error) {  
    console.log(error,'this is saga user error');   
    yield put({ type: actions.ADD_FAILED ,msg: "Server Internal error!"});
  }  
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_ASSET, getAsset),
    yield takeEvery(actions.ADD_ASSET, addAsset),
    yield takeEvery(actions.GET_ASSET_BY_FILTER, getAssetByFilter),
    yield takeEvery(actions.GET_ASSET_BYID, getAsetById),
    yield takeEvery(actions.UPDATE_DATA, updateData),
    yield takeEvery(actions.DELETE_DATA, deleteData), 
    yield takeEvery(actions.CREATE_NUMBER, createNumber), 
  ]);
}

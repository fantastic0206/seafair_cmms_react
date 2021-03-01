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
export function* getAssetEvent({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/assetevent/${payload.id}`
    );
     
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg);
    }
    else{
      var temp=[];    
      callResult.data.data.map((value, index) => {          
           value.key=value._id;          
           temp.push(value);
       });     
      
       yield put({
         type: actions.GET_ASSET_EVENT_REDUCER,
         data:temp,//createDemoData(),
       });
    }  
   
  }
  catch (error) {
    notification('error',"Internal server error!")
  }  
}
// export function* getById({payload}) {
//   axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
//   try {
//     const callResult = yield call(
//       onCallReqeust,
//       `${siteConfig.apiUrl}/account/${payload.id}`             
//     );
   
 
//     if(callResult.response!=undefined){
//       notification('error',callResult.response.data.msg)     
//     }
//     else{       
//         yield put({
//         type: actions.GET_BY_ID_REDUCER,
//         workorder:callResult.data.data,
//         msg:null
//       });
//     }    
//   }
//   catch (error) {    
//     notification('error',"Internal server error!")
//   }  
// }
export function* addAssetEvent({payload}) { 
  axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/assetevent`          
    );

    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
      // notification('success',callResult.data.msg)
        yield put({
          type: actions.GET_ASSET_EVENTS,
          payload: {id: payload.sendData.intAssetID}    
        });
    }
  }
  catch (error) {  
    notification('error',"Server Internal error!")     
    //yield put({ type: actions.ADD_FAILED ,msg: "Server Internal error!"});
  }  
}
// export function* updateAssetCategory({payload}) { 
//   axios.defaults.headers.put['Authorization'] =  localStorage.getItem('id_token');
//   try {
//     const callResult = yield call(
//       onPutCallReqeust,
//       payload.sendData,
//       `${siteConfig.apiUrl}/account/${payload.id}`          
//     );
  
//     if(callResult.response!=undefined){
//       notification('error',callResult.response.data.msg)     
//     }
//     else{
//      notification('success',callResult.data.msg)
//       yield put({
//         type: actions.GET_ASSET_CATEGORIES,    
//       });
//     }  
//   }
//   catch (error) {  
//     notification('success',"Server Internal error!")   
//   }  
// }

export function* deleteAssetEvent({payload}) { 
  axios.defaults.headers.delete['Authorization'] =localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onDeleteCallReqeust,     
      `${siteConfig.apiUrl}/assetevent/${payload.id}`          
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
      notification('success',callResult.data.msg)
      yield put({
        type: actions.GET_ASSET_EVENTS, 
        payload: {id: payload.assetId}          
      });
    }     

  }
  catch (error) {     
    notification('error',"Server Internal error!")      
  }  
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_ASSET_EVENTS,   getAssetEvent),
    yield takeEvery(actions.ADD_ASSET_EVENT, addAssetEvent),
    yield takeEvery(actions.DELETE_ASSET_EVENT, deleteAssetEvent),
    // yield takeEvery(actions.UPDATE_ASSET_CATEGORY, updateAssetCategory),
    // yield takeEvery(actions.DELETE_ASSET_CATEGORY, deleteAssetCategory), 
    
  ]);
}

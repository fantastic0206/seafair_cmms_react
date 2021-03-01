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
export function* getAssetBusiness({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/assetbusiness/${payload.businessId}`   
    );
     
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg);
    }
    else{        
     
       yield put({
         type: actions.GET_ASSET_BUSINESS_REDUCER,
         data:callResult.data.data,//createDemoData(),
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
export function* addAssetBusiness({payload}) { 
  axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/assetbusiness`          
    );

    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
       // notification('success',callResult.data.msg)
        yield put({
          type: actions.GET_ASSET_BUSINESS,   
          payload:{businessId:payload.sendData.intBusinessID}       
        });
    }
  }
  catch (error) {  
 
    yield put({ type: actions.ADD_FAILED ,msg: "Server Internal error!"});
  }  
}
export function* updateAssetBusiness({payload}) { 
  axios.defaults.headers.put['Authorization'] =  localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/assetbusiness/${payload.id}`          
    );
  
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
      yield put({
        type: actions.GET_ASSET_BUSINESS,   
        payload:{businessId:payload.sendData.intBusinessID}
      });
    }  
  }
  catch (error) {  
    notification('success',"Server Internal error!")   
  }  
}

export function* deleteAssetBusiness({payload}) { 
  axios.defaults.headers.delete['Authorization'] =localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onDeleteCallReqeust,     
      `${siteConfig.apiUrl}/assetbusiness/${payload.id}`          
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
      notification('success',callResult.data.msg)
      yield put({
        type: actions.DELETED_SUCCESS,           
      });    
    }     

  }
  catch (error) {     
    notification('error',"Server Internal error!")      
  }  
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_ASSET_BUSINESS,   getAssetBusiness),
    yield takeEvery(actions.ADD_ASSET_BUSINESS, addAssetBusiness),
    yield takeEvery(actions.UPDATE_ASSET_BUSINESS, updateAssetBusiness),
    yield takeEvery(actions.DELETE_ASSET_BUSINESS, deleteAssetBusiness), 
    
  ]);
}

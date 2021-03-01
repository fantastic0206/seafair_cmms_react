import { all, takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
// import { getToken } from '@iso/lib/helpers/utility';
import siteConfig from '@iso/config/site.config';
import notification from '@iso/components/Notification';
import moment from 'moment';
import actions from './actions';
const priority = {
  1: 'Hightest',
  2: 'High',
  3: 'Medium',
  4: 'Low',
  5: 'Lowest',
};
const workorderStatus_array = {
  2: 'Requested',
  3: 'Assigned',
  4: 'Open',
  5: 'Work In Progress',
  6: 'On Hold',
  7: 'Closed, Completed',
  8: 'Draft',
  9: 'Closed, Incomplete',
  10: 'Other',
};
const maintanceType_array = {
  1: 'Preventive',
  2: 'Damage',
  3: 'Corrective',
  4: 'Safety',
  5: 'Upgrade',
  6: 'Electrical',
  7: 'Project',
  8: 'Inspection',
  9: 'Meter_Reading',
  10: 'Other',
};
const onCallReqeust = async (URI) =>
  await axios
    .get(URI)
    .then((res) => res)
    .catch((error) => error);
const onPostCallReqeust = async (sendData, URI) =>
  await axios
    .post(URI, sendData)
    .then((res) => res)
    .catch((error) => error);
const onPutCallReqeust = async (sendData, URI) =>
  await axios
    .put(URI, sendData)
    .then((res) => res)
    .catch((error) => error);
const onDeleteCallReqeust = async (URI) =>
  await axios
    .delete(URI)
    .then((res) => res)
    .catch((error) => error);
export function* get() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/workorder`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      var temp = [];
      callResult.data.data.map((value, index) => {
        value.key = parseInt(index) + 1;
        value.priorityName =
          value.intPriorityID != null ? priority[value.intPriorityID] : '';
        value.workOrderStatus =
          value.intWorkOrderStatusID != null
            ? workorderStatus_array[value.intWorkOrderStatusID]
            : '';
        value.maintenanceTypeName =
          value.intMaintenanceTypeID != null
            ? maintanceType_array[value.intMaintenanceTypeID]
            : '';
        value.assetName =
          value.strAssetIds != null ? value.strAssetIds.strName : '';
        value.assignedUser =
          value.intAssignedUserId != null
            ? value.intAssignedUserId.strFullName
            : '';
        value.completedByUser =
          value.intCompletedByUserID != null
            ? value.intCompletedByUserID.strFullName
            : '';
        temp.push(value);
      });

      yield put({
        type: actions.GET_WORKORDER_REDUCER,
        workorders: temp, //createDemoData(),
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}

// export function* getChartersData() {
//   axios.defaults.headers.get["Authorization"] = localStorage.getItem(
//     "id_token"
//   );
//   try {
//     const callResult = yield call(
//       onCallReqeust,
//       `${siteConfig.apiUrl}/charter`
//     );

//     if (callResult.response != undefined) {
//       notification("error", callResult.response.data.msg);
//     } else {
//       var temp = [];

//       callResult.data.data.map((value, index) => {
//         //  value.key=parseInt(index)+1;
//         // var event={};
//         value.id = value._id;
//         var description =value.strDescription.length>10?value.strDescription.substring(0,10)+"...":value.strDescription;
//         value.title = value.strCode +"-"+description+"-"+value.strAssignedUsers+"-"+value.strAssets;
//         value.assignedUser = value.strAssignedUsers; // name assigned to user.
//         // value.start= new moment(value.dtmSuggestedCompletionDate).toDate();
//         if(value.dtmEstimatedStartTime=="" || value.dtmEstimatedStartTime==undefined){
//           let start_tmp= new moment(value.dtmEstimatedStartDate).toDate();
//           start_tmp.setHours(8);
//           value.start=start_tmp;

//           let tmp =new moment(value.dtmEstimatedStartDate).toDate();
//           tmp.setHours( start_tmp.getHours() + value.intEstimatedHour );
//           value.end = tmp;
//           // value.end=new moment(value.dtmSuggestedCompletionDate).toDate();

//         }else{
//           let start_tmp= new moment(value.dtmEstimatedStartDate).toDate();
//           let temp_time=value.dtmEstimatedStartTime.split(":");
//           start_tmp.setHours(parseInt(temp_time[0]));
//           start_tmp.setMinutes(parseInt(temp_time[1]));
//           start_tmp.setSeconds(parseInt(temp_time[2]));
//           value.start =start_tmp;

//           let tmp =new moment(value.dtmEstimatedStartDate).toDate();
//           tmp.setHours( start_tmp.getHours() + value.intEstimatedHour );
//           value.end = tmp;
//           // value.end=new moment(value.dtmSuggestedCompletionDate).toDate();
//         }
//         // let tmp =new moment(value.dtmEstimatedStartDate).toDate();
//         // tmp.setHours( tmp.getHours() + value.intEstimatedHour );
//         // value.end = tmp;

//         value.desc = value.strDescription;
//         value.allDay = false;
//         temp.push(value);
//       });

//       yield put({
//         type: actions.GET_WORKORDER_CALENDAR_REDUCER,
//         data: temp, //createDemoData(),
//       });
//     }
//   } catch (error) {
//     notification("error", "Internal server error!");
//   }
// }
export function* getChartersData() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/charter`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      var temp = [];
      callResult.data.data.map((value, index) => {
        value.key = parseInt(index) + 1;
        temp.push(value);
      });

      yield put({
        type: actions.GET_CHARTER_DATAS_REDUCER,
        data: temp, //createDemoData(),
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}
export function* getCharterById({ payload }) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/charter/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      yield put({
        type: actions.GET_BY_ID_REDUCER,
        charter: callResult.data.data,
        msg: null,
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}
export function* add({ payload }) {
  axios.defaults.headers.post['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/charter`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.ADD_CHARTER_SUCCESS,
        data: callResult.data.data,
      });
    }
  } catch (error) {
    yield put({ type: actions.ADD_FAILED, msg: 'Server Internal error!' });
  }
}

export function* addWorkOrder({ payload }) {
  axios.defaults.headers.post['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/workorder`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.ADD_CHARTER_SUCCESS,
        data: callResult.data.data,
      });
    }
  } catch (error) {
    yield put({ type: actions.ADD_FAILED, msg: 'Server Internal error!' });
  }
}
export function* updateCharter({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/charter/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export function* updateWorkOrderCalendar({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/workorder/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      //notification('success',callResult.data.msg)
      yield put({
        type: actions.GET_CHARTER_DATAS,
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export function* deleteData({ payload }) {
  axios.defaults.headers.delete['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onDeleteCallReqeust,
      `${siteConfig.apiUrl}/charter/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.DELETE_SUCCESS,
        msg: callResult.data.msg,
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export default function* rootSaga() {
  yield all([
    // yield takeEvery(actions.GET_WORKORDERS, get),
    yield takeEvery(actions.GET_CHARTER_DATAS, getChartersData),
    yield takeEvery(actions.ADD_CHARTER, add),
    // yield takeEvery(actions.ADD_WORKORDER_FROM_TASK, addWorkOrder),
    yield takeEvery(actions.GET_CHARTER_BY_ID, getCharterById),
    yield takeEvery(actions.UPDATE_CHARTER, updateCharter),
    // yield takeEvery(actions.UPDATE_WORKORDER_CALENDAR, updateWorkOrderCalendar),
    yield takeEvery(actions.DELETE_CHARTER, deleteData),
  ]);
}

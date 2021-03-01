import { all, takeEvery, put, call } from "redux-saga/effects";
import axios from "axios";
// import { getToken } from '@iso/lib/helpers/utility';
import siteConfig from "@iso/config/site.config";
import notification from "@iso/components/Notification";
import moment from "moment";
import actions from "./actions";

const priority = {
  1: "Hightest",
  2: "High",
  3: "Medium",
  4: "Low",
  5: "Lowest",
};
const workorderStatus_array = {
  2: "Requested",
  3: "Assigned",
  4: "Open",
  5: "Work In Progress",
  6: "On Hold",
  7: "Closed, Completed",
  8: "Draft",
  9: "Closed, Incomplete",
  10: "Other",
};
const maintanceType_array = {
  1: "Preventive",
  2: "Damage",
  3: "Corrective",
  4: "Safety",
  5: "Upgrade",
  6: "Electrical",
  7: "Project",
  8: "Inspection",
  9: "Meter_Reading",
  10: "Other",
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
  axios.defaults.headers.get["Authorization"] = localStorage.getItem(
    "id_token"
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/workorder`
    );

    if (callResult.response != undefined) {
      notification("error", callResult.response.data.msg);
    } else {
      var temp = [];
      callResult.data.data.map((value, index) => {
        value.key = parseInt(index) + 1;
        value.priorityName =
          value.intPriorityID != null ? priority[value.intPriorityID] : "";
        value.workOrderStatus =
          value.intWorkOrderStatusID != null
            ? workorderStatus_array[value.intWorkOrderStatusID]
            : "";
        value.maintenanceTypeName =
          value.intMaintenanceTypeID != null
            ? maintanceType_array[value.intMaintenanceTypeID]
            : "";
        value.assetName =
          value.strAssetIds != null ? value.strAssetIds.strName : "";
        value.assignedUser =
          value.intAssignedUserId != null
            ? value.intAssignedUserId.strFullName
            : "";
        value.completedByUser =
          value.intCompletedByUserID != null
            ? value.intCompletedByUserID.strFullName
            : "";
        temp.push(value);
      });

      yield put({
        type: actions.GET_WORKORDER_REDUCER,
        workorders: temp, //createDemoData(),
      });
    }
  } catch (error) {
    notification("error", "Internal server error!");
  }
}

export function* getWorkOrderById({ payload }) {
  axios.defaults.headers.get["Authorization"] = localStorage.getItem(
    "id_token"
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/workorder/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification("error", callResult.response.data.msg);
    } else {
      yield put({
        type: actions.GET_BY_ID_REDUCER,
        workorder: callResult.data.data,
        msg: null,
      });
    }
  } catch (error) {
    notification("error", "Internal server error!");
  }
}
export function* add({ payload }) {
  axios.defaults.headers.post["Authorization"] = localStorage.getItem(
    "id_token"
  );
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/workorder`
    );

    if (callResult.response != undefined) {
      notification("error", callResult.response.data.msg);
    } else {
       notification('success',callResult.data.msg)
      yield put({
        type: actions.ADD_WORKORDER_SUCCESS,
        data: callResult.data.data,
      });
    

    }
  } catch (error) {
    yield put({ type: actions.ADD_FAILED, msg: "Server Internal error!" });
  }
}

export function* addWorkOrder({ payload }) {
  axios.defaults.headers.post["Authorization"] = localStorage.getItem(
    "id_token"
  );
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/workorder`
    );

    if (callResult.response != undefined) {
      notification("error", callResult.response.data.msg);
    } else {
      notification("success", callResult.data.msg);
      yield put({
        type: actions.ADD_WORKORDER_SUCCESS,
        data: callResult.data.data,
      });
    }
  } catch (error) {
    yield put({ type: actions.ADD_FAILED, msg: "Server Internal error!" });
  }
}
export function* updateWorkOrder({ payload }) {
  axios.defaults.headers.put["Authorization"] = localStorage.getItem(
    "id_token"
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/workorder/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification("error", callResult.response.data.msg);
    } else {
      notification("success", callResult.data.msg);
    }
  } catch (error) {
    notification("error", "Server Internal error!");
  }
}


export function* deleteData({ payload }) {
  axios.defaults.headers.delete["Authorization"] = localStorage.getItem(
    "id_token"
  );
  try {
    const callResult = yield call(
      onDeleteCallReqeust,
      `${siteConfig.apiUrl}/workorder/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification("error", callResult.response.data.msg);
    } else {
      notification("success", callResult.data.msg);
      yield put({
        type: actions.DELETE_SUCCESS,
        msg: callResult.data.msg,
      });
    }
  } catch (error) {
    notification("error", "Server Internal error!");
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_WORKORDERS, get),
    // yield takeEvery(actions.GET_CALENDAR_DATAS, getCalendarDatas),
    yield takeEvery(actions.ADD_WORKORDER, add),
    yield takeEvery(actions.ADD_WORKORDER_FROM_TASK, addWorkOrder),
    yield takeEvery(actions.GET_WORK_ORDER_BY_ID, getWorkOrderById),
    yield takeEvery(actions.UPDATE_WORKORDER, updateWorkOrder),
    // yield takeEvery(actions.UPDATE_WORKORDER_CALENDAR, updateWorkOrderCalendar),
    yield takeEvery(actions.DELETE_WORKORDER, deleteData),
  ]);
}

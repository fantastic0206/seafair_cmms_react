import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Input, { InputSearch } from "@iso/components/uielements/input";
import { Col, Row } from "antd";
// import ModalEvents from './ModalEvents';
import notification from "@iso/components/Notification";
import calendarActions from "@iso/redux/calendar/actions";
import { useHistory } from "react-router-dom";
import WorkOrderFilterModal from "../../../component/WorkOrderFilterModal";
import WorkOrderStatusFilterModal from "../../../component/WorkOrderStatusFilterModal";
import WorkOrderActions from "../../../redux/workorder/actions";
import userAction from "../../../redux/user/actions";
import { CalendarStyleWrapper } from "./Calendar.styles";
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'

const Localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);
const { changeView, changeEvents } = calendarActions;
const { initData, getCalendarData, updateCalendarData } = WorkOrderActions;
const { getAllUserData } = userAction;

const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  // marginTop:"-20px",
  // background: "#e0e7ed",
  //height: "38px",
  // marginLeft:"2px",
  paddingBottom: "10px",
  // borderBottom: "1px solid rgb(174,193,208)"
};
const checkInvalid = (val) => {
  let res = "";
  if (val != null && val != undefined) res = val;
  return res;
};
const title = (user, hour, date) => {
  let res = "";
  if (user != "") res += user + ", ";
  if (hour != "") res += hour + ", ";
  if (date != "") res += date;
  return res;
};
const mapToRBCFormat = (e) =>
  Object.assign({}, e, {
    // title: title(checkInvalid(e.assignedUser), checkInvalid(e.intEstimatedHour), checkInvalid(e.dtmSuggestedCompletionDate)),
    start: new Date(e.start),
    end: new Date(e.end),
  });
const getIndex = (events, selectedEvent) =>
  events.findIndex((event) => event.id == selectedEvent.id);

export default function DndCalendar() {
  let history = useHistory();
  const { events, view, workorders } = useSelector((state) => state.Workorders);
  const { users } = useSelector((state) => state.Users);
  const [
    workOrderFilterModalActive,
    setWorkOrderFilterModalActive,
  ] = React.useState(false);
  const [statusFilterModalActive, setStatusFilterModalActive] = React.useState(
    false
  );
  const [filterTxt, setFilterTxt] = React.useState(
    "(Built in Filter) All Work Orders"
  );
  const [filterTxt2, setFilterTxt2] = React.useState(
    "(Built in Filter) All Open Work Orders"
  );
  const [filterVal, setFilterVal] = React.useState({});
  const [filterVal2, setFilterVal2] = React.useState({});
  const [filtered, setFiltered] = React.useState([]);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    view: view,
    modalVisible: false,
    selectedData: undefined,
  });

  React.useEffect(() => {   
    dispatch(getCalendarData());
    dispatch(initData());
    dispatch(getAllUserData());
  }, []);

  React.useEffect(() => {
    let tmp = [];
    events.forEach((item) => {
      if (item.intWorkOrderStatusID != 7 && item.intWorkOrderStatusID != 9) {
        // 7=closed completed, 9=closed incompleted
        tmp.push(item);
      }
    });
    setFiltered(tmp);
    setFilterTxt2("(Built in Filter) All Open Work Orders");
    console.log("no parameter");
  }, [events]);

  const onSelectEvent = (selectedData) => {
    history.push(`/dashboard/workorder/${selectedData.id}`);
    //setState({ ...state, modalVisible: 'update', selectedData });
  };
  const onSelectSlot = (selectedData) => {
    console.log("selectSlot", selectedData);
    // setState({ ...state, modalVisible: 'new', selectedData });
  };

  const onView = (view) => {
    console.log(view);
    view = "123";
    //dispatch(changeView("view"));
  };
  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    let allDay = event.allDay;
    // console.log( new moment(start).format('YYYY-MM-DD HH:mm:ss'));
    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    // const updatedEvent = { ...event, start, end, allDay };
    // const idx = getIndex(events, updatedEvent);
    // const nextEvents = [...events];
    // nextEvents.splice(idx, 1, updatedEvent);

    // dispatch(changeEvents(nextEvents));
    // let prevStartDate = new Date(start);
    //   let prevStartDate = new moment(events[getIndex(events, event)].start).toDate();
    //   let startDate = new moment(start).toDate();
    //   var diff =(startDate.getTime() - prevStartDate.getTime()) / 1000;
    //   diff /= (60 * 60);
    //   let diffHour = Math.round(diff);
    //   let estimatedHour = events[getIndex(events, event)].intEstimatedHour + diffHour;
    var sendData = {};
    sendData.dtmEstimatedStartDate = start; //moment(start,'YYYY-MM-DD HH:mm:ss');//new moment(start).toDate(); //, new Date(start);
    sendData.dtmEstimatedStartTime = new moment(start).format("HH:mm:ss");
    sendData.dtmSuggestedCompletionDate = new Date(end);
    sendData.estimatedCompletionTime = new moment(end).format("HH:mm:ss");
    dispatch(updateCalendarData(sendData, event._id));

    notification(
      "success",
      "Move event successfully",
      `${event.title} was dropped onto ${event.start}`
    );
  };

  const resizeEvent = ({ event, start, end }) => {
    console.log("this is resize Event");
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    var sendData = {};
    sendData.dtmEstimatedStartDate = new Date(start);
    sendData.dtmSuggestedCompletionDate = new Date(end);
    //dispatch(updateCalendarData(sendData, event._id));

    // dispatch(updateCalendarData(nextEvents));

    // notification(
    //   'success',
    //   'Resize event successfully',
    //   `${event.title} was resized to ${start}-${end}`
    // );
  };

  const handleCancel = () => {
    setWorkOrderFilterModalActive(false);
    setStatusFilterModalActive(false);
  };
  const selectedFilter = (row) => { // filter by user and group
    var temp = [];
    let full_name = "";

    var temp = [];
    if (filterVal2.intSysCode == "open" && Object.keys(row).length == 0) {
      events.forEach((item) => {
        if (item.intWorkOrderStatusID != 7 && item.intWorkOrderStatusID != 9) {
          temp.push(item);
        }
      });
      setFiltered(temp);
      setFilterVal(row);
      setFilterTxt("(Built in Filter) All Work Orders");
      return;
    } else if (
      filterVal2.intSysCode == "closed" && Object.keys(row).length == 0 ) {
      events.forEach((item) => {
        if (item.intWorkOrderStatusID == 7 || item.intWorkOrderStatusID == 9) {
          temp.push(item);
        }
      });
      setFiltered(temp);
      setFilterVal(row);
      setFilterTxt("(Built in Filter) All Work Orders");
      return;
    } else if (
      (filterVal2.intSysCode != "closed" && Object.keys(row).length == 0) || (filterVal2.intSysCode != "open" && Object.keys(row).length == 0)) {
      events.forEach((item) => {
          console.log(filterVal2.intSysCode,item.intWorkOrderStatusID);
        if (filterVal2.intSysCode == item.intWorkOrderStatusID) {
          temp.push(item);
        }
      });
      console.log('all work order');
      full_name = "All Work Orders";
    }
    if (Object.keys(row).length != 0) {
      if (row._id == localStorage.getItem("user_id")) {
        full_name = "My Work Order";
        events.forEach((item) => {
          var rowId =
            item.intAssignedUserId != null ? item.intAssignedUserId._id : "";
          if (
            filterVal2.intSysCode == "open" ||
            filterVal2.intSysCode == undefined
          ) {
            if (
              rowId == row._id &&
              item.intWorkOrderStatusID != 7 &&
              item.intWorkOrderStatusID != 9
            ) {
              temp.push(item);
            }
          } else if (filterVal2.intSysCode == "closed") {
            if (
              (rowId == row._id && item.intWorkOrderStatusID == 7) ||
              (rowId == row._id && item.intWorkOrderStatusID == 9)
            ) {
              temp.push(item);
            }
          } else {
            if (
              rowId == row._id &&
              filterVal2.intSysCode == item.intWorkOrderStatusID
            ) {
              temp.push(item);
            }
          }
        });
      } else if (row.bolGroup) {
        let groupId = row._id;
        var temp_array = [];
        for (var i = 0; i < users.length; i++) {
          if (users[i].strGroupIds != undefined) {
            var temp_a = users[i].strGroupIds;
            temp_a = temp_a.split(",");
            if (temp_a.indexOf(groupId) !== -1) {
              temp_array.push(users[i]._id);
            }
          }
        }
        temp_array.push(row._id);
        events.forEach((item) => {
          if (
            filterVal2.intSysCode == "open" ||
            filterVal2.intSysCode == undefined
          ) {
            if (
              temp_array.indexOf(
                item.intAssignedUserId != null ? item.intAssignedUserId._id : ""
              ) != -1 &&
              item.intWorkOrderStatusID != 7 &&
              item.intWorkOrderStatusID != 9
            ) {
              temp.push(item);
            }
          } else if (filterVal2.intSysCode == "closed") {
            if (
              (temp_array.indexOf(
                item.intAssignedUserId != null ? item.intAssignedUserId._id : ""
              ) != -1 &&
                item.intWorkOrderStatusID == 7) ||
              (temp_array.indexOf(
                item.intAssignedUserId != null ? item.intAssignedUserId._id : ""
              ) != -1 &&
                item.intWorkOrderStatusID == 9)
            ) {
              temp.push(item);
            }
          } else {
            if (
              temp_array.indexOf(
                item.intAssignedUserId != null ? item.intAssignedUserId._id : ""
              ) != -1 &&
              filterVal2.intSysCode == item.intWorkOrderStatusID
            ) {
              temp.push(item);
            }
          }
        });
        setFiltered(temp);
        full_name = "Group: " + row.strFullName;
      } else {
        full_name = "User: " + row.strFullName;
        events.forEach((item) => {
          var rowId =
            item.intAssignedUserId != null ? item.intAssignedUserId._id : "";
          if (
            filterVal2.intSysCode == "open" ||
            filterVal2.intSysCode == undefined
          ) {
            if (
              rowId == row._id &&
              item.intWorkOrderStatusID != 7 &&
              item.intWorkOrderStatusID != 9
            ) {
              temp.push(item);
            }
          } else if (filterVal2.intSysCode == "closed") {
            if (
              (rowId == row._id && item.intWorkOrderStatusID == 7) ||
              (rowId == filterVal._id && item.intWorkOrderStatusID == 9)
            ) {
              temp.push(item);
            }
          } else {
            if (
              rowId == row._id &&
              filterVal2.intSysCode == item.intWorkOrderStatusID
            ) {
              temp.push(item);
            }
          }
        });
      }
    }

    setFiltered(temp);
    setFilterVal(row);
    setFilterTxt("(Built in Filter) " + full_name);
  };

  const selectStatusFilter = (row) => { // filter by work order status
    var temp = [];
    if (row.intSysCode == "open" && Object.keys(filterVal).length == 0) {
      events.forEach((item) => {
        if (item.intWorkOrderStatusID != 7 && item.intWorkOrderStatusID != 9) {
          console.log(item.intWorkOrderStatusID, "item.intSysCode");
          temp.push(item);
        }
      });
      setFiltered(temp);
      setFilterVal2(row);
      setFilterTxt2("(Built in Filter) All Open Work Orders");
      return;
    } else if (
      row.intSysCode == "closed" &&
      Object.keys(filterVal).length == 0
    ) {
      events.forEach((item) => {
        if (item.intWorkOrderStatusID == 7 || item.intWorkOrderStatusID == 9) {
          temp.push(item);
        }
      });
      setFiltered(temp);
      setFilterVal2(row);
      setFilterTxt2("(Built in Filter) All Closed");
      return;
    } else if (
      (row.intSysCode != "closed" && Object.keys(filterVal).length == 0) ||
      (row.intSysCode != "open" && Object.keys(filterVal).length == 0)
    ) {
      events.forEach((item) => {
        if (row.intSysCode == item.intWorkOrderStatusID) {
          temp.push(item);
        }
      });
    }
    if (Object.keys(filterVal).length != 0) {
      if (filterVal._id == localStorage.getItem("user_id")) {
        events.forEach((item) => {
          var rowId =
            item.intAssignedUserId != null ? item.intAssignedUserId._id : "";
          if (row.intSysCode == "open") {
            if (
              rowId == filterVal._id &&
              item.intWorkOrderStatusID != 7 &&
              item.intWorkOrderStatusID != 9
            ) {
              temp.push(item);
            }
          } else if (row.intSysCode == "closed") {
            if (
              (rowId == filterVal._id && item.intWorkOrderStatusID == 7) ||
              (rowId == filterVal._id && item.intWorkOrderStatusID == 9)
            ) {
              temp.push(item);
            }
          } else {
            if (
              rowId == filterVal._id &&
              row.intSysCode == item.intWorkOrderStatusID
            ) {
              temp.push(item);
            }
          }
        });
      } else if (filterVal.bolGroup) {
        let groupId = filterVal._id;
        var temp_array = [];
        for (var i = 0; i < users.length; i++) {
          if (users[i].strGroupIds != undefined) {
            var temp_a = users[i].strGroupIds;
            temp_a = temp_a.split(",");
            if (temp_a.indexOf(groupId) !== -1) {
              temp_array.push(users[i]._id);
            }
          }
        }
        temp_array.push(filterVal._id);
        events.forEach((item) => {
          //console.log(item.intAssignedUserId._id,'item.intAssignedUserId')

          if (row.intSysCode == "open") {
            if (
              temp_array.indexOf(
                item.intAssignedUserId != null ? item.intAssignedUserId._id : ""
              ) != -1 &&
              item.intWorkOrderStatusID != 7 &&
              item.intWorkOrderStatusID != 9
            ) {
              temp.push(item);
            }
          } else if (row.intSysCode == "closed") {
            if (
              (temp_array.indexOf(
                item.intAssignedUserId != null ? item.intAssignedUserId._id : ""
              ) != -1 &&
                item.intWorkOrderStatusID == 7) ||
              (temp_array.indexOf(
                item.intAssignedUserId != null ? item.intAssignedUserId._id : ""
              ) != -1 &&
                item.intWorkOrderStatusID == 9)
            ) {
              temp.push(item);
            }
          } else {
            if (
              temp_array.indexOf(
                item.intAssignedUserId != null ? item.intAssignedUserId._id : ""
              ) != -1 &&
              row.intSysCode == item.intWorkOrderStatusID
            ) {
              temp.push(item);
            }
          }
        });
        setFiltered(temp);
      } else {
        events.forEach((item) => {
          var rowId =
            item.intAssignedUserId != null ? item.intAssignedUserId._id : "";
          if (row.intSysCode == "open") {
            if (
              rowId == filterVal._id &&
              item.intWorkOrderStatusID != 7 &&
              item.intWorkOrderStatusID != 9
            ) {
              temp.push(item);
            }
          } else if (row.intSysCode == "closed") {
            if (
              (rowId == filterVal._id && item.intWorkOrderStatusID == 7) ||
              (rowId == filterVal._id && item.intWorkOrderStatusID == 9)
            ) {
              temp.push(item);
            }
          } else {
            if (
              rowId == filterVal._id &&
              row.intSysCode == item.intWorkOrderStatusID
            ) {
              temp.push(item);
            }
          }
        });
      }
    }

    setFiltered(temp);
    setFilterVal2(row);
    setFilterTxt2("(Built in Filter) " + row.strName);
  };
  const dragFromOutsideItem = () => {
    //customize
    return events;
  };
  const onDropFromOutside = ({ start, end, allDay }) => {
    console.log(start, end);
  };
  const handleDragStart = (event) => {
    console.log(event, "this is event");
  };
  return (
    <CalendarStyleWrapper className="isomorphicCalendarWrapper">
      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={7} sm={7} xs={12}>
          <div style={{ position: "relative" }}>
            <Input
              value={filterTxt}
              placeholder=""
              style={{ width: "300px" }}
              onChange={() => setWorkOrderFilterModalActive(true)}
            />
            <i
              className="ionicons ion-arrow-down-b"
              onClick={() => {
                setWorkOrderFilterModalActive(true);
              }}
              style={{
                fontSize: "25px",
                cursor: "pointer",
                position: "absolute",
                marginLeft: "5px",
                marginTop: "4px",
              }}
            ></i>
          </div>
        </Col>
        <Col md={8} sm={8} xs={12}>
          <div style={{ position: "relative" }}>
            <Input
              value={filterTxt2}
              placeholder=""
              style={{ width: "300px" }}
              onChange={() => setStatusFilterModalActive(true)}
            />
            <i
              className="ionicons ion-arrow-down-b"
              onClick={() => {
                setStatusFilterModalActive(true);
              }}
              style={{
                fontSize: "25px",
                cursor: "pointer",
                position: "absolute",
                marginLeft: "5px",
                marginTop: "4px",
              }}
            ></i>
          </div>
        </Col>
      </Row>
      {/* <ModalEvents
        modalVisible={state.modalVisible}
        selectedData={state.selectedData}
        setModalData={setModalData}
      /> */}
      <DragAndDropCalendar
        className="isomorphicCalendar"
        selectable
        localizer={Localizer}
        events={filtered.map(mapToRBCFormat)}
        onEventDrop={moveEvent}
        views={["month", "week", "day"]}
        resizable
        onEventResize={resizeEvent}
        onSelectEvent={onSelectEvent}
        // onSelectSlot={onSelectSlot}
        onDragStart={console.log}
        onView={onView}
        defaultView="month"
        defaultDate={new Date()}
        step={60}
        //  dragFromOutsideItem={
        //   displayDragItemInCell?dragFromOutsideItem:null
        // }
        // onDropFromOutside={onDropFromOutside}
        // handleDragStart={handleDragStart}
      />

      <WorkOrderFilterModal
        visible={workOrderFilterModalActive}
        title="WORK ORDER FILTER"
        selectUser={selectedFilter}
        onCancel={handleCancel}
      ></WorkOrderFilterModal>

      <WorkOrderStatusFilterModal
        visible={statusFilterModalActive}
        selectStatus={selectStatusFilter}
        title="WORK ORDER STATUS FILTER"
        onCancel={handleCancel}
      ></WorkOrderStatusFilterModal>
    </CalendarStyleWrapper>
  );
}

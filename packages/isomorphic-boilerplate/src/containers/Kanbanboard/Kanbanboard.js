import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageHeader from "@iso/components/utility/pageHeader";
import IntlMessages from "@iso/components/utility/intlMessages";
import CardWrapper, {
  Box,
  StatusTag,
  Column,
  ColContainer,
  ColHeader,
  ColBody,
  ColRow,
} from "./Asset.styles";
import WorkOrderStatusAction from "../../redux/workorderstatus/actions";
import Actions from "../../redux/workorder/actions";
// import ClockIcon from '@iso/assets/images/icon/17.svg';
import fakeData from "../Workorder/data";
import Input, { InputSearch } from "@iso/components/uielements/input";
import { Col, Row } from "antd";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import Button from "@iso/components/uielements/button";

import WorkOrderFilterModal from "../../component/WorkOrderFilterModal";
import notification from "@iso/components/Notification";
import WorkOrderStatusFilterModal from "../../component/WorkOrderStatusFilterModal";

import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const dataList = new fakeData(10);

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

const status = [
  {
    _id: "5f859ab46cbf0dbf0b84ab60",
    intControlID: 100,
    intSysCode: 2,
    intUpdated: "2020-10-13T12:16:52.732Z",
    key: "5f859ab46cbf0dbf0b84ab60",
    strName: "Requested"
  },
  {
    _id: "5f859ac06cbf0dbf0b84ab61",
    intControlID: 100,
    intSysCode: 6,
    intUpdated: "2020-10-13T12:17:04.378Z",
    key: "5f859ac06cbf0dbf0b84ab61",
    strName: "On Hold"
  },
  {
    _id: "5f859af26cbf0dbf0b84ab63",
    intControlID: 101,
    intSysCode: 3,
    intUpdated: "2020-10-13T12:17:54.737Z",
    key: "5f859af26cbf0dbf0b84ab63",
    strName: "Assigned"
  },
  {
    _id: "5f859afc6cbf0dbf0b84ab64",
    intControlID: 101,
    intSysCode: 4,
    intUpdated: "2020-10-13T12:18:04.230Z",
    key: "5f859afc6cbf0dbf0b84ab64",
    strName: "Open"
  },
  {
    _id: "5f859b086cbf0dbf0b84ab65",
    intControlID: 101,
    intSysCode: 5,
    intUpdated: "2020-10-13T12:18:16.848Z",
    key: "5f859b086cbf0dbf0b84ab65",
    strName: "Work In Progress"
  },
  {
    _id: "5f859b176cbf0dbf0b84ab66",
    intControlID: 102,
    intSysCode: 7,
    intUpdated: "2020-10-13T12:18:31.951Z",
    key: "5f859b176cbf0dbf0b84ab66",
    strName: "Closed, Completed"
  },
];

export default function Board() {
  let history = useHistory();
  const { add, initData } = WorkOrderStatusAction;

  const { initOrderData } = Actions;
  const { updateData } = Actions;

  const [filtered, setFiltered] = React.useState([]);
  // const { status } = useSelector((state) => state.WorkOrderStatus);
  const { workorders } = useSelector((state) => state.Workorders);
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

  const dispatch = useDispatch();
  const match = useRouteMatch();

  React.useEffect(() => {
    let tmp = [];
    workorders.forEach((item) => {
      if (item.intWorkOrderStatusID != 7 && item.intWorkOrderStatusID != 9) {
        tmp.push(item);
      }
    });
    setFiltered(tmp);
  }, [workorders]);

  React.useEffect(() => {
    dispatch(initData());
    dispatch(initOrderData());
  }, []);

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const dragStart = (e, colId) => {
    e.dataTransfer.setData("text/plain", colId);
    console.log("colId", colId);
  };

  const dropIt = (e, currentId) => {
    e.preventDefault();
    console.log(currentId);
    let sourceId = e.dataTransfer.getData("text/plain");
    let sourceIdEl = document.getElementById(sourceId);
    let sourceIdParentEl = sourceIdEl.parentElement;
    let targetEl = document.getElementById(currentId);
    let targetParentEl = targetEl.parentElement;
    if (targetParentEl.id !== sourceIdParentEl.id) {
      if (targetEl.className === sourceIdEl.className) {
        targetParentEl.appendChild(sourceIdEl);
      } else {
        targetEl.appendChild(sourceIdEl);
      }
    } else {
      let holder = targetEl;
      let holderText = holder.textContent;
      targetEl.textContent = sourceIdEl.textContent;
      sourceIdEl.textContent = holderText;
      holderText = "";
    }
    // let intStatusId = targetParentEl.id ? targetParentEl.id : e.target.id;
    let intStatusId = targetParentEl.id ? targetParentEl.id : e.target.id;
    
    moveEvent(sourceId, currentId);
  };

  const moveEvent = (sourceId, intStatusId) => {
    var sendData = {};
    sendData.intWorkOrderStatusID = intStatusId;
    dispatch(updateData(sendData, sourceId));

    notification("success", "Move event successfully");
  };

  const selectedFilter = (row) => {
    var temp = [];
    let full_name = "";

    var temp = [];
    if (filterVal2.intSysCode == "open" && Object.keys(row).length == 0) {
      workorders.forEach((item) => {
        if (item.intWorkOrderStatusID != 7 && item.intWorkOrderStatusID != 9) {
          temp.push(item);
        }
      });
      setFiltered(temp);
      setFilterVal(row);
      setFilterTxt("(Built in Filter) All Work Orders");
      return;
    } else if (
      filterVal2.intSysCode == "closed" &&
      Object.keys(row).length == 0
    ) {
      workorders.forEach((item) => {
        if (item.intWorkOrderStatusID == 7 || item.intWorkOrderStatusID == 9) {
          temp.push(item);
        }
      });
      setFiltered(temp);
      setFilterVal(row);
      setFilterTxt("(Built in Filter) All Work Orders");
      return;
    } else if (
      (filterVal2.intSysCode != "closed" && Object.keys(row).length == 0) ||
      (filterVal2.intSysCode != "open" && Object.keys(row).length == 0)
    ) {
      workorders.forEach((item) => {
        if (filterVal2.intSysCode == item.intWorkOrderStatusID) {
          temp.push(item);
        }
      });
      full_name = "(Built in Filter) All Work Orders";
    }
    if (Object.keys(row).length != 0) {
      if (row._id == localStorage.getItem("user_id")) {
        full_name = "My Work Order";
        workorders.forEach((item) => {
          var rowId =
            item.intAssignedUserId != null ? item.intAssignedUserId._id : "";
          if (filterVal2.intSysCode == "open") {
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
        workorders.forEach((item) => {
          if (filterVal2.intSysCode == "open") {
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
        workorders.forEach((item) => {
          var rowId =
            item.intAssignedUserId != null ? item.intAssignedUserId._id : "";
          if (filterVal2.intSysCode == "open") {
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
  const handleCancel = () => {
    setWorkOrderFilterModalActive(false);
    setStatusFilterModalActive(false);
  };

  const onChange = (pagination, filters, sorter) => {
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === "ascend") {
        dataList.getSortAsc(sorter.columnKey, filtered);
      } else {
        dataList.getSortDesc(sorter.columnKey, filtered);
      }
      setFiltered(filtered);
    }
  };

  const selectStatusFilter = (row) => {
    var temp = [];
    if (row.intSysCode == "open" && Object.keys(filterVal).length == 0) {
      workorders.forEach((item) => {
        if (item.intWorkOrderStatusID != 7 && item.intWorkOrderStatusID != 9) {
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
      workorders.forEach((item) => {
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
      workorders.forEach((item) => {
        if (row.intSysCode == item.intWorkOrderStatusID) {
          temp.push(item);
        }
      });
    }
    if (Object.keys(filterVal).length != 0) {
      if (filterVal._id == localStorage.getItem("user_id")) {
        workorders.forEach((item) => {
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
        workorders.forEach((item) => {

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
        workorders.forEach((item) => {
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

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */

  const getList = id => filtered[id];

  const onDragEnd = (result) => {
    console.log("hhhhhhhhhhh",result);
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
          return;
      }

      if (source.droppableId === destination.droppableId) {
          setFiltered(filtered);
      } else {
        let intSysId = 0;
        if(source.droppableId === "On Hold") intSysId = 6;
        if(source.droppableId === "Requested") intSysId = 2;
        if(source.droppableId === "Assigned") intSysId = 3;
        if(source.droppableId === "Open") intSysId = 4;
        if(source.droppableId === "Work In Progress") intSysId = 5;
        if(source.droppableId === "Closed, Completed") intSysId = 7;

        let intDestinationId = 0;
        if(destination.droppableId === "On Hold") intDestinationId = 6;
        if(destination.droppableId === "Requested") intDestinationId = 2;
        if(destination.droppableId === "Assigned") intDestinationId = 3;
        if(destination.droppableId === "Open") intDestinationId = 4;
        if(destination.droppableId === "Work In Progress") intDestinationId = 5;
        if(destination.droppableId === "Closed, Completed") intDestinationId = 7;

        filtered.map((item, index) => {
          if(item.intWorkOrderStatusID === intSysId && item.strCode === result.draggableId) item.intWorkOrderStatusID = intDestinationId;
        });

        setFiltered(filtered);
        moveEvent(source.index, intDestinationId);
      }
  };

  const goWorkOrder = (workOrderId) => {
    history.push(`/dashboard/workorder/${workOrderId}`);
  }

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.kanban" />
      </PageHeader>
      <Box>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={12}>
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
          <Col md={12} sm={12} xs={12}>
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
        <DragDropContext onDragEnd={onDragEnd}>
          {status.map((row, index) => (
            <Droppable key={index} droppableId={row.strName}>
                {(provided, snapshot) => (
                  <ColContainer key={index}>
                    <Column
                        ref={provided.innerRef}>
                          <ColHeader>
                            <h4 style={{ fontSize: "20px" }}>{row.strName}</h4>
                          </ColHeader>
                        {filtered.length > 0 &&
                            filtered.map((item, index) =>
                              row.intSysCode === item.intWorkOrderStatusID && (
                                <Draggable
                                    key={item._id}
                                    draggableId={item.strCode}
                                    index={item._id}>
                                    {(provided, snapshot) => (
                                        <ColBody
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}>
                                          <h3 className="col-title" onClick={() => goWorkOrder(item._id)}>{item.strCode}</h3>
                                          <p className="col-item">Description: {item.strDescription}</p>
                                          <p className="col-item">Assigned User: {item.assignedUser}</p>
                                          <p className="col-item">Assets: {item.strAssets}</p>
                                        </ColBody>
                                    )}
                                </Draggable>
                            ))}
                        {provided.placeholder}
                    </Column>
                  </ColContainer>
                )}
            </Droppable>
          ))}
        </DragDropContext>
        {/* {status.map((row, index) => (
          <ColContainer key={index}>
            <Column id={row.intSysCode} onDrop={(e)=>{
              console.log(e.target.id)
              dropIt(e,row.intSysCode)}} onDragOver={allowDrop}>
              <ColHeader>
                <h4 style={{ fontSize: "20px" }}>{row.strName}</h4>
              </ColHeader>
              {filtered.map(
                (col, index1) =>
                  row.intSysCode === col.intWorkOrderStatusID && (
                    <ColBody
                      id={col._id}
                      key={index1}
                      draggable
                      onDragStart={(e) => dragStart(e, col._id)}
                    >
                      <h3>Code: {col.strCode}</h3>
                      <h4>Description: {col.strDescription}</h4>
                      <h4>Assigned User: {col.assignedUser}</h4>
                      <h4>Assets: {col.strAssets}</h4>
                    </ColBody>
                  )
              )}
            </Column>
          </ColContainer>
        ))} */}
      </Box>
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
    </LayoutWrapper>
  );
}

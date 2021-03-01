import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@iso/components/Feedback/Modal";
import Actions from "../redux/drillcategory/actions";
import "./table.css";
const {initData } = Actions;
export default function (props) {
  const { visible, title } = props;
  const { drillCategories } = useSelector((state) => state.DrillCategory);
  const dispatch = useDispatch();
  // const categoryList = [
  //   "Security",
  //   "ISM",
  //   "Statutory",
  //   "Other",
  //   "Survey",
  //   "Crew",
  //   "SOLAS",
  //   "Abandon Ship",
  //   "Collision",
  //   "Fire",
  //   "Fire & Safety Gear",
  //   "Medical",
  //   "Quarterly Table Top First Aid",
  //   "Quarterly Table Top Contingency Plan Exercises",
  // ]; 
  React.useEffect(() => {
    dispatch(initData())
  }, []);
  const onRowClick = (id, str) => {
    props.selectedDrillCategory(id, str);
    props.onCancel();
  };
  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        //  okText="New"
        title={title}
        footer={null}
        onCancel={props.onCancel}
      >
        <div>
         
        </div>
        <div style={{ marginTop: "3px", height: "270px", overflow: "auto" }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: "70%" }}>
                  <span className="listHeaderLabel35">Name</span>
                </th>
                <th style={{ width: "*" }}>
                  <span className="listHeaderLabel35"></span>
                </th>
              </tr>
            </thead>

            <tbody>
              {drillCategories.map((row) => {
                return (
                  <tr
                    className="listRow"
                    key={row._id}
                    onClick={() => {
                      onRowClick(row._id, row.strDrillCategoryName);
                    }}
                  >
                    <td className="column">
                      <p className="context">{row.strDrillCategoryName}</p>
                    </td>
                    <td className="column">
                      <p className="context"></p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal>     
    </div>
  );
}

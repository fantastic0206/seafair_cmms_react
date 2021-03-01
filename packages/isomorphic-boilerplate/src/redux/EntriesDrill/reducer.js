import clone from "clone";
import actions from "./actions";
const initState = {
  drillLists: [],
  drillList: {},
  isNewDrill: true,
  isDelete: false,
  entriesLists: [],
  isSaved:false
};
const newDrill = [
  {
    key: 1,
    strDate: new Date(),
    strTime: null,
    strLocation: "",
    strDescription: "",
  },
];
export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_DRILL_LIST_SUCCESS:
      return {
        ...state,
        isSaved:true,
        isNewDrill: false,
        isDelete: false,
      };
    case actions.GET_NEW_DRILL_LIST:
      return {
        ...state,
        drillLists: newDrill,
        isNewDrill: false,
        isDelete: false,
        isSaved:false
      };
    case actions.UPDATE_EDIT_DRILL:
      return {
        ...state,
        drillLists: clone(action.drillData),
        isSaved:false
      };
    case actions.GET_ENTRIES_DRILL_LIST_REDUCER: {
      return {
        ...state,
        entriesLists: action.entries,
        isNewDrill: true,
        isDelete: false,
        isSaved:false
      };
    }
    case actions.GET_DRILL_LIST_ID_REDUCER: {
      return {
        ...state,
        drillList: action.drillList,
        drillLists: JSON.parse(action.drillList.entryDrills),
        isSaved:false
      };
    }
    case actions.DELETE_SUCCESS:
      return {
        ...state,
        isDelete: true,
        isSaved:false
      };
    default:
      return state;
  }
}

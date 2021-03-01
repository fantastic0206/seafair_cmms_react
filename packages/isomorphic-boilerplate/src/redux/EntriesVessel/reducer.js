import clone from "clone";
import actions from "./actions";
const initState = {
  crewComplimentLists: [],
  logEntryLists: [],
  vesselList: {},
  isNewCrew: true,
  isDelete: false,
  entriesLists: [],
  isSaved:false
};
const newCrewComplimen = [
  {
    key: 1,
    strCrewPosition: "",
    strName: "",
    strHoursOnDuty: "",
    strHoursTotal: "",
  },
];

const newLogEntry = [
  {
    key: 1,
    strTime: "",
    strCode: "",
    strItem: "",
    strExplanation: "",
  },
];

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_NEW_VESSEL_LIST:
      return {
        ...state,
        crewComplimentLists: newCrewComplimen,
        logEntryLists: newLogEntry,
        isNewCrew: false,
        isDelete: false,     
        isSaved:false  

      };
    case actions.ADD_VESSEL_LIST_SUCCESS:
      return {
        ...state,       
        isNewCrew: false,
        isDelete: false,
        isSaved:true
      };
    case actions.UPDATE_EDIT_CREW_COMPLIMENT:
      return {
        ...state,
        crewComplimentLists: clone(action.crewData),
        isSaved:false
      };
    case actions.UPDATE_LOG_ENTRY:
      return {
        ...state,
        logEntryLists: clone(action.logData),
        isSaved:false
      };
    case actions.GET_ENTRIES_VESSEL_LIST_REDUCER: {
      return {
        ...state,
        entriesLists: action.entries,
        isNewCrew: true,
        isSaved:false
      };
    }
    case actions.GET_VESSEL_LIST_ID_REDUCER: {
      return {
        ...state,
        vesselList: action.vesselList,
        crewComplimentLists: JSON.parse(action.vesselList.crewComplement),
        logEntryLists: JSON.parse(action.vesselList.logEntries),
        isSaved:false
      };
    }
    case actions.DELETE_SUCCESS: {
      return {
        ...state,
        isDelete: true,
        isSaved:false
      };
    }
    default:
      return state;
  }
}

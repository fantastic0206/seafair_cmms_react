import clone from 'clone';
import actions from './actions';
const initState = {  
  crewLists:[],
  crewList:{},
  isNewCrew: true,
  isDelete:false,
  entriesLists:[],
  isSaved:false
  
};
const newCrew=[{
  key: 1,
  strNameSeaman: '',
  strLicensed: '',
  strMMD: '',
  strCapacityEngaged: '',
  strConduct: '',
  strAbility: '',
}];
export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {   
    case actions.ADD_CREW_LIST_SUCCESS:    
      return {
        ...state, 
        isNewCrew:false   ,
        isDelete:false,
        isSaved:true
      };
    case actions.GET_NEW_CREW_LIST:    
      return {
        ...state,             
        crewLists: newCrew,     
        isNewCrew:false   ,
        isDelete:false,
        isSaved:false
      };
    case actions.UPDATE_EDIT_CREW:
      return {
        ...state,
         crewLists: clone(action.crewData),
         isSaved:false
      };
      case actions.GET_ENTRIES_LIST_REDUCER: {
      return {
        ...state,
        entriesLists: action.entries,      
        isNewCrew: true,
        isDelete:false,
        isSaved:false
      };
    }
    case actions.GET_CREW_LIST_ID_REDUCER: {
      return {
        ...state,
        crewList: action.crewList,       
        crewLists:JSON.parse(action.crewList.crewList) ,
        isSaved:false
      };
    }
    case actions.DELETE_SUCCESS:
          return {
            ...state,                
            isDelete:true,
            isSaved:false
          };  
    default:
      return state;
  }
}

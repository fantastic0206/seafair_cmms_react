// import clone from 'clone';
import actions from './actions';
const initState = {  
  drillCategories:[],
  drillCategory:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    // case actions.ADD_SUCCESS:
    //   return {
    //     ...state,             
    //     assetcategories: [],        
    //   };    
    case actions.GET_DRILL_CATEGORIES_REDUCER: {
      return {
        ...state,
        drillCategories: action.data,      
        isDelete:false
      };
    }    
    default:
      return state;
  }
}

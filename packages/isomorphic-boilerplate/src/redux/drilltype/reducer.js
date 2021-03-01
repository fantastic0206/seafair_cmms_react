// import clone from 'clone';
import actions from './actions';
const initState = {  
  drillTypes:[],
  drillType:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    // case actions.ADD_SUCCESS:
    //   return {
    //     ...state,             
    //     assetcategories: [],        
    //   };    
    case actions.GET_DRILL_TYPES_REDUCER: {
      return {
        ...state,
        drillTypes: action.data,      
        isDelete:false
      };
    }    
    default:
      return state;
  }
}

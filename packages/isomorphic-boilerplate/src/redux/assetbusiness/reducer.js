// import clone from 'clone';
import actions from './actions';
const initState = {  
  assetBusiness:{},
  assetBusinesses:[],
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
   
    case actions.GET_ASSET_BUSINESS_REDUCER: {
      return {
        ...state,
        assetBusinesses: action.data,      
        isDelete:false
      };
    }
    case actions.DELETED_SUCCESS: {
      return {
        ...state,
        isDelete:true      
      };
    }   
    default:
      return state;
  }
}

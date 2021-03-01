// import clone from 'clone';
import actions from "./actions";
const initState = {
  assets: [],
  rawAssets:[],
  asset: {},
  isDelete: false,
  assetNumber: null,
  assetName:"",
  assetId:null,
  isSaved:false
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_SUCCESS:
      return {
        ...state,
        // assets: [],
        assetName:action.asset.strName,
        assetId:action.asset.id,
        isSaved:false
        // rawAssets:[],
      };
    case actions.ADD_FAILED:
      return {
        ...state,
        assets: [],
        rawAssets:[],
        isSaved:true
      };
    case actions.GET_ASSET_REDUCER: {
    
      return {
        ...state,
        assets: action.assets,
        rawAssets:action.assets1,
        isDelete: false,
        assetName:"",
        isSaved:false
      };
    }
    case actions.GET_ASSET_BYID_REDUCER: {
      return {
        ...state,
        asset: action.asset,
        isDelete: false,
        isSaved:false
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,
        // assets: [],
        // rawAssets:[],
        isDelete: false,
        isSaved:true
      };
    case actions.DELETE_FAILED:
      return {
        ...state,
        isDelete: false,
      };
    case actions.DELETE_SUCCESS:
      return {
        ...state,
        // assets:[],
        isDelete: true,
        isSaved:false
      };
      case actions.CREATE_NUMBER_SUCCESS:
      return {
        ...state,
        assetNumber: action.assetNumber,
      };
    default:
      return state;
  }
}

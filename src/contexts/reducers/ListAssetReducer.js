import { ACTIONS } from "../actions/ListAssetAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_CHECK:
      state = { ...state, check: payload };
      break;
    case ACTIONS.SET_CHECK2:
      state = { ...state, check2: payload };
      break;
    case ACTIONS.SET_CHECK_ID:
      state = { ...state, checkId: payload };
      break;
    case ACTIONS.SET_SEARCH:
      state = { ...state, search: payload };
      break;
    case ACTIONS.SET_ASSET_DETAIL:
      state = { ...state, assetDetails: payload };
      break;
    case ACTIONS.SET_OPEN:
      state = { ...state, open: payload };
      break;
    case ACTIONS.SET_ASSET_STATE:
      state = { ...state, assetState: payload };
      break;
    case ACTIONS.SET_LIST_ASSETS:
      state = { ...state, listAssets: payload };
      break;
    case ACTIONS.SET_ASSET_CATE:
      state = { ...state, assetCategory: payload };
      break;
    case ACTIONS.default:
      break;
  }

  return { ...state };
};

export default reducer;

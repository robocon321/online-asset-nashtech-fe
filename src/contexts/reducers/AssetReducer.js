import { ACTIONS } from "../actions/AssetAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_ASSET:
      const category = state.categories.find(
        (item) => item.id == payload.category.id
      );
      if (category) {
        state = { ...state, assets: [payload, ...state.assets] };
        break;
      } else {
        state = {
          ...state,
          assets: [payload, ...state.assets],
          categories: [payload.category, ...state.categories],
        };
        break;
      }
    case ACTIONS.EDIT_ASSET:
      const oldAsset = state.assets.find((item) => item.id == payload.id);
      if (oldAsset) {
        payload.category = oldAsset.category;
        state = {
          ...state,
          assets: [
            payload,
            ...state.assets.filter((item) => item.id != payload.id),
          ],
        };
      }
      break;
    case ACTIONS.LIST_ASSET:
      console.log(payload);
      state = { ...state, assets: payload };
      break;
    case ACTIONS.LIST_CATEGORY:
      state = { ...state, categories: payload };
      break;
    default:
      break;
  }

  return { ...state };
};

export default reducer;

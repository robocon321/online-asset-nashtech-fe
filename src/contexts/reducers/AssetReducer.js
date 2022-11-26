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
          categories: [
            payload.category,
            ...state.categories,
          ],
        };
        break;
      }
    default:
      break;
  }

  return { ...state };
};

export default reducer;

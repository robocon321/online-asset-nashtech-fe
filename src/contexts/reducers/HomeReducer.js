import { ACTIONS } from "../actions/HomeAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_TITLE:
      state = { ...state, title: payload };
      break;
    default:
      break;
  }
  return { ...state };
}

export default reducer;
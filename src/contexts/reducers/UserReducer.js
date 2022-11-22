import { ACTIONS } from "../actions/UserAction";
const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_USERS:
      console.log(payload);
      state = { ...state, users: payload };
      break;
    default:
      break;
  }

  return { ...state };
};

export default reducer;

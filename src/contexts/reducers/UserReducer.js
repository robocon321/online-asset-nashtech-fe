import { ACTIONS } from "../actions/UserAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_USERS:
      state = { ...state, users: payload };
      break;
    case ACTIONS.ADD_USER:
      state = { ...state, users: [payload, ...state.users] };
      break;
    default:
      break;
  }

  return { ...state };
};

export default reducer;

import { ACTIONS } from "../actions/UserAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_USERS:
      state = { ...state, users: payload };
      break;
    case ACTIONS.ADD_USER:
      state = { ...state, users: [payload, ...state.users] };
      break;
    case ACTIONS.EDIT_USER:
      state = {
        ...state,
        users: [
          payload,
          ...state.users.filter((item) => item.id != payload.id),
        ],
      };
      break;
    default:
      break;
  }

  return { ...state };
};

export default reducer;

import { ACTIONS } from "../actions/UserAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_USER_INPUT:
      state = { ...state, todoInput: payload };
      break;
    case ACTIONS.ADD_USER:
      state = { ...state, users: [...state.users, payload] };
      break;
    default:
      break;
  }

  return { ...state };
};

export default reducer;

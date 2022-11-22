import { ACTIONS } from "../actions/UserAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_USERS:
      console.log(payload);
      state = { ...state, users: payload };
      break;
    case ACTIONS.SET_USER_INPUT:
      state = { ...state, todoInput: payload };
      break;
    case ACTIONS.ADD_USER:
      state = { ...state, users: [...state.users, payload] };
    default:
      break;
  }

  return { ...state };
};

export default reducer;

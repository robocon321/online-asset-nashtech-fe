import { ACTIONS } from "../actions/ListUserAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_CHECK:
      state = { ...state, check: payload };
      break;
    case ACTIONS.SET_CHECK2:
      state = { ...state, check2: payload };
      break;
    case ACTIONS.SET_USER_ROLE:
      state = { ...state, userRole: payload };
      break;
    case ACTIONS.SET_OPEN:
      state = { ...state, open: payload };
      break;
    case ACTIONS.SET_CHECK_ID:
      state = { ...state, checkId: payload };
      break;
    case ACTIONS.SET_LIST_USERS:
      state = { ...state, listUser: payload };
      break;
    case ACTIONS.SET_USER_DETAIL:
      state = { ...state, userDetail: payload };
      break;
    case ACTIONS.SET_SEARCH:
      state = { ...state, search: payload };
      break;
    default:
      break;
  }

  return { ...state };
};

export default reducer;

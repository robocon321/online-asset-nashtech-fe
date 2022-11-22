import { ACTIONS } from "../actions/AppAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_USER:
      state = { ...state, user: payload };
      break;
    case ACTIONS.SET_LOADING:
      state = {
        ...state,
        status: {
          ...state.status,
          isLoading: payload,
        },
      };
      break;
    case ACTIONS.SET_STATUS:
      state = {...state, status: payload};
      break;
    case ACTIONS.SET_FIELD_MODAL_LOGIN_FIRST_TIME:
      state = {
        ...state,
        modalLoginFirstTime: {
          ...state.modalLoginFirstTime,
          [payload.name]: payload.value,
        },
      };
      break;
    default:
      break;
  }

  return { ...state };
};

export default reducer;

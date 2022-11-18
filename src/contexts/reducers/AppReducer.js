import { ACTIONS } from "../actions/AppAction";

const reducer = (state, { type, payload }) {
  switch(type) {
    case ACTIONS.SET_USER:
      state = { ...state, user: payload };
      break;
    case ACTIONS.SET_LOADING:
      state = { ...state, status: {
        ...state.status,
        isLoading: payload       
      }};
      break;
    default:
      break;
  } 

  return {...state}
}

export default reducer;
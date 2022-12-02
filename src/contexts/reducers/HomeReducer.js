import { ACTIONS } from "../actions/HomeAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_LIST_ASSIGNMENT:
      state = { ...state, listAssignment: payload };
      break;

    case ACTIONS.SET_ACCEPT_ASSIGNMENT:
      state = { ...state, acceptAssets: payload };
      break;

    case ACTIONS.SET_DECLINE_ASSIGNMENT:
      state = { ...state, declineAssets: payload };
      break;

    case ACTIONS.SET_RETURN_REQUEST_ASSIGNMENT:
      state = { ...state, returnRequestAssets: payload };
      break;

    case ACTIONS.SET_ASSIGNMENT_DETAIL:
      state = { ...state, modalDetail: payload };
      break;

    case ACTIONS.SET_FIELD_MODAL:
      
      state = {
        ...state,
        modalDetail: {
          ...state.modalDetail,
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

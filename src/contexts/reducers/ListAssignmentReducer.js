import { ACTIONS } from "../actions/ListAssignmentAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_FIELD_CONDITION:
      state = {
        ...state, conditions: {
          ...state.conditions,
          [payload.name]: payload.value
        }
      }
      break;
    case ACTIONS.SET_FIELD_MODAL:
      state = {
        ...state, modalDetail: {
          ...state.modalDetail,
          [payload.name]: payload.value
        }
      }
      break;
    case ACTIONS.SET_FIELD_MODAL_DELETE:
      state = {
        ...state, modalDelete: {
          ...state.modalDelete,
          [payload.name]: payload.value
        }
      }
      break;
    case ACTIONS.SET_LOADING:
      state = { ...state, status: { ...state.status, isLoading: payload } };
      break;
    case ACTIONS.SET_STATUS:
      state = { ...state, status: payload };
      break;
    default:
      break;
  }
  return { ...state };
}

export default reducer;
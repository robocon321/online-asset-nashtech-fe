import { ACTIONS } from "../actions/ListAssignmentAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_FIELD_CONDITION:
      state = {...state, conditions: {
        ...state.conditions,
        [payload.name]: payload.value
      }}
      break;
    case ACTIONS.SET_FIELD_MODAL:
      state = {...state, modalDetail: {
        ...state.modalDetail,
        [payload.name]: payload.value
      }}
      break;
    default:
      break;
  }
  return { ...state };
}

export default reducer;
import { ACTIONS } from "../actions/AssignmentAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_ASSIGNMENT:
      state = { ...state, assignments: [payload, ...state.assignments] };
      break;
    case ACTIONS.EDIT_ASSIGNMENT:
      state = { ...state, assignments: [payload, ...state.assignments.filter(item => item.id != payload.id)] };
      break;
    case ACTIONS.DELETE_ASSIGNMENT:
      state = { ...state, assignments: state.assignments.filter(item => item.id != payload) };
      break;
    case ACTIONS.SET_LIST_ASSIGNMENT:
      state = { ...state, assignments: payload };
      break;
    case ACTIONS.SET_LOADING:
      state = { ...state, status: { ...state.status, isLoading: payload } };
      break;
    case ACTIONS.SET_MESSAGE:
      state = { ...state, status: { ...state.status, message: payload } };
      break;
    case ACTIONS.SET_SUCCESS:
      state = { ...state, status: { ...state.status, success: payload } };
      break;
    case ACTIONS.SET_STATUS:
      state = { ...state, status: payload };
      break;
    default:
      break;
  }

  return { ...state };
};

export default reducer;

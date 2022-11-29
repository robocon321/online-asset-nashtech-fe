import { ACTIONS } from "../actions/AssignmentAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_ASSIGNMENT:
      state = {...state, assignments: [payload, ...state.assignments]};
      break;
    case ACTIONS.EDIT_ASSIGNMENT:
      state = {...state, payload, ...state.assignments.filter(item => item.id != payload.id)};
      break;
    default:
      break;
  }

  return { ...state };
};

export default reducer;

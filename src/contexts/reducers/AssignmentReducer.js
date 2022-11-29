import { ACTIONS } from "../actions/AssignmentAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_ASSIGNMENT:
      state = {...state, assignments: [payload, ...state.assignments]};
      break;
    default:
      break;
  }

  return { ...state };
};

export default reducer;

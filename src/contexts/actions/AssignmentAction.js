export const ACTIONS = {
  ADD_ASSIGNMENT: 'ADD_ASSIGNMENT'
}

export const addNewAssignmentAction = (assignment) => dispatch => {
  dispatch({
    type: ACTIONS.ADD_ASSIGNMENT,
    payload: assignment
  });
}
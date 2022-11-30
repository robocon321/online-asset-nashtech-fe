export const ACTIONS = {
  ADD_ASSIGNMENT: 'ADD_ASSIGNMENT',
  EDIT_ASSIGNMENT: 'EDIT_ASSIGNMENT'
}

export const addNewAssignmentAction = (assignment) => dispatch => {
  dispatch({
    type: ACTIONS.ADD_ASSIGNMENT,
    payload: assignment
  });
}

export const editAssignmentAction = (assignment) => dispatch => {
  dispatch({
    type: ACTIONS.EDIT_ASSIGNMENT,
    payload: assignment
  })
}
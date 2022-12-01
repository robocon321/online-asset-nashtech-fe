export const ACTIONS = {
  ADD_ASSIGNMENT: 'ADD_ASSIGNMENT',
  EDIT_ASSIGNMENT: 'EDIT_ASSIGNMENT',
  SET_LIST_ASSIGNMENT: 'SET_LIST_ASSIGNMENT',

  SET_LOADING: 'SET_LOADING',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_STATUS: 'SET_STATUS'
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

export const loadAssignmentAction = () => async dispatch => {
  const rows = [];
  const states = ["All", "Accepted", "Waiting for acceptance"];

  await setTimeout(() => {
    for (var i = 0; i < 30; i++) {
      rows.push({
        id: i,
        assetCode: "Asset code " + i,
        assetName: "Asset Name " + i,
        assignedTo: "Assigned To " + i,
        assignedBy: "Assigned By " + i,
        assignedDate: `${Math.floor(Math.random() * 30 + 1)}/${Math.floor(
          Math.random() * 11 + 1
        )}/${Math.floor(Math.random() * 2 + 2020)}`,
        state: `${states[Math.floor(Math.random() * 2 + 1)]}`,
      });
    }

    dispatch({
      type: ACTIONS.SET_LIST_ASSIGNMENT,
      payload: rows
    })  
  }, 1000);

}

export const setStatusAction = (status) => dispatch => {
  dispatch({
    type: ACTIONS.SET_STATUS,
    payload: status
  })
}

export const setMessageAction = (message) => dispatch => {
  dispatch({
    type: ACTIONS.SET_MESSAGE,
    payload: message
  })
}

export const setSuccesAction = (success) => dispatch => {
  dispatch({
    type: ACTIONS.SET_SUCCESS,
    payload: success
  })
}

export const setLoadingAction = (isLoading) => dispatch => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: isLoading
  })
}

export const ACTIONS = {
  SET_ENABLE_SUBMIT: 'SET_ENABLE_SUBMIT',
  ADD_FIELD_ERROR: 'ADD_FIELD_ERROR',
  REMOVE_FIELD_ERROR: 'REMOVE_FIELD_ERROR',
  SET_FIELD: 'SET_FIELD'
}

export const setEnableSubmitAction = (enable) => dispatch => {
  dispatch({
    type: ACTIONS.SET_ENABLE_SUBMIT,
    payload: enable
  })
}

export const addErrorFieldAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.ADD_FIELD_ERROR,
    payload: {name, value}
  })
}

export const removeErrorFieldAction = (name) => dispatch => {
  dispatch({
    type: ACTIONS.REMOVE_FIELD_ERROR,
    payload: name
  })
}

export const setFieldAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.SET_FIELD,
    payload: {name, value}
  })
}
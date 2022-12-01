export const ACTIONS = {
  SET_FIELD_CONDITION: 'SET_FIELD_CONDITION',
  SET_FIELD_MODAL: 'SET_FIELD_MODAL'
}

export const setFieldConditionAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.SET_FIELD_CONDITION,
    payload: {name, value}
  })
}

export const setFieldModalAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.SET_FIELD_MODAL,
    payload: {name, value}
  })
}
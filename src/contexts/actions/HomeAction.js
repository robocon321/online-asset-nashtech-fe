export const ACTIONS = {
  SET_TITLE: 'SET_TITLE'
}

export const setTitleAction = (name) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_TITLE,
    payload: name
  })
}
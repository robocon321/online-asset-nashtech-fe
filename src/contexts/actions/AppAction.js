export const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_FIELD_MODAL_LOGIN_FIRST_TIME: 'SET_FIELD_MODAL_LOGIN_FIRST_TIME'
}

export const loadUserAction = () => (dispatch) => {
  if(localStorage['username'] == undefined) return;
  dispatch({
    type: ACTIONS.SET_USER,
    payload: {
      username: localStorage['username'],
      fullName: localStorage['fullName'],
      enabled: localStorage['enabled'] === 'true',
      role: localStorage['role'],
      location: localStorage['location']
    }
  });
}

export const setLoadingAction = (isLoading) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: isLoading
  })
}

export const setFieldModalLoginFirstTimeAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.SET_FIELD_MODAL_LOGIN_FIRST_TIME,
    payload: {name, value}
  })
}
export const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_SUCCESS: 'SET_SUCCESS'
}

export const loadUserAction = () => async (dispatch) => {
  setLoadingAction(true);

  await setTimeout(() => {
    dispatch({
      type: ACTIONS.SET_USER,
      payload: {
        firstName: 'Long',
        lastName: 'Tran Hoang',
        username: 'robocon321',
        role: 'ADMIN'
      }
    });
  }, 1000);

  setLoadingAction(false);
}

export const setLoadingAction = (isLoading) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: isLoading
  })
}
import axios from 'axios';

export const ACTIONS = {
  SET_FIELD: 'SET_FIELD',
  SET_ENABLE_SUBMIT: 'SET_ENABLE_SUBMIT',
  SET_ERROR: 'SET_ERROR',
  SET_LOADING: 'SET_LOADING'
}

export const setFieldAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD,
    payload: {name, value}
  })
}

export const setEnableSubmitAction = (enable) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_ENABLE_SUBMIT,
    payload: enable
  });
}

export const setErrorAction = (error) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_ERROR,
    payload: error
  })
}

export const setLoadingAction = (isLoading) => dispatch => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: isLoading
  })
}

export const submitAction = (form, navigate) => async (dispatch) => {
 setLoadingAction(false)(dispatch);
 
 setTimeout(() => {
  console.log(form);
  navigate('/users');
 }, 1000);

 setLoadingAction(true)(dispatch);
}
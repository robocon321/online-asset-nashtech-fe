import axios from 'axios';


export const ACTIONS = {
  SET_FIELD: 'SET_FIELD',
  SET_ENABLE_SUBMIT: 'SET_ENABLE_SUBMIT',
  REMOVE_FIELD_ERROR: 'REMOVE_FIELD_ERROR',
  ADD_FIELD_ERROR: 'ADD_FIELD_ERROR',

  SET_LOADING: 'SET_LOADING',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_STATUS: 'SET_STATUS',

  SET_FIELD_POPUP_ASSET: 'SET_FIELD_POPUP_ASSET',
  SET_FIELD_POPUP_USER: 'SET_FIELD_POPUP_USER'
}
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const loadAssetAction = () => async dispatch => {
  await setTimeout(() => {
    const assets = [];
    for(var i = 0; i < 20; i ++) {
      assets.push({
        id: i,
        name: 'Name ' + i,
        code: 'Code ' + i,
        categoryName: 'Category ' + i
      })
    }
    setFieldPopupAssetAction('assets', assets)(dispatch);
  }, 1000)
}

export const loadUserAction = () => async dispatch => {
  await setTimeout(() => {
    const users = [];
    for(var i = 0; i < 20; i ++) {
      users.push({
        id: i,
        name: 'Name ' + i,
        code: 'Code ' + i,
        type: i % 2 ? 'STAFF' : 'ADMIN'
      })
    }
    setFieldPopupUserAction('users', users)(dispatch);
  }, 1000)
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

export const setLoadingAction = (isLoading) => dispatch => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: isLoading
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

export const submitAction = (form, navigate, addAssetFunc) => async (dispatch) => {
  setLoadingAction(true)(dispatch);

  setTimeout(() => {
    addAssetFunc(form);   
    navigate("/assignments");
  }, 1000);

  setLoadingAction(false)(dispatch);
}

export const setFieldPopupAssetAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.SET_FIELD_POPUP_ASSET,
    payload: {name, value}
  })
}

export const setFieldPopupUserAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.SET_FIELD_POPUP_USER,
    payload: {name, value}
  })
}

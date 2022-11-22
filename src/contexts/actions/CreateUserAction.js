import axios from 'axios';
import { convertDateByFormat } from '../../utils/DateUtils';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const ACTIONS = {
  SET_FIELD: 'SET_FIELD',
  SET_ENABLE_SUBMIT: 'SET_ENABLE_SUBMIT',
  REMOVE_FIELD_ERROR: 'REMOVE_FIELD_ERROR',
  ADD_FIELD_ERROR: 'ADD_FIELD_ERROR',
  SET_LOADING: 'SET_LOADING',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_STATUS: 'SET_STATUS',
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

export const submitAction = (form, navigate, addUserFunc) => async (dispatch) => {
  
  setLoadingAction(true)(dispatch);
 
  form.dob = convertDateByFormat(form.dob, 'dd/MM/yyyy');
  form.joinedDate = convertDateByFormat(form.joinedDate, 'dd/MM/yyyy');

  const token = localStorage['TOKEN'];
  const config = {
    headers: {"Authorization" : `Bearer ${token}`}
  }

  await axios.post(`${API_ENDPOINT}/v1/users/create`, form, config).then(response => {
    setStatusAction({
      isLoading: false,
      message: 'Successful!',
      success: true
    })(dispatch);
    addUserFunc(response.data);
    navigate('/users');
  }).catch(error => {
    if(error.response == undefined) {
      setStatusAction({
        isLoading: false,
        message: error.message,
        success: false
      })(dispatch)
    } else {
      setStatusAction({
        isLoading: false,
        message: error.response.data,
        success: false
      })(dispatch)
    }
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
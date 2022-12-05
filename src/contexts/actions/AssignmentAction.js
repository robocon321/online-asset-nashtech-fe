import axios from "axios";
import { setFieldModalAction } from "./ListAssignmentAction";

export const ACTIONS = {
  ADD_ASSIGNMENT: 'ADD_ASSIGNMENT',
  EDIT_ASSIGNMENT: 'EDIT_ASSIGNMENT',
  DELETE_ASSIGNMENT: 'DELETE_ASSIGNMENT',
  SET_LIST_ASSIGNMENT: 'SET_LIST_ASSIGNMENT',

  SET_LOADING: 'SET_LOADING',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_STATUS: 'SET_STATUS'
}

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export const deleteAssignmentAction = (assignment) => dispatch => {
  dispatch({
    type: ACTIONS.DELETE_ASSIGNMENT,
    payload: assignment
  });
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
  await axios.get(`${API_ENDPOINT}/v1/assignments/admin`)
    .then((res) => {
      dispatch({
        type: ACTIONS.SET_LIST_ASSIGNMENT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.data));
}

export const loadDetailAssignmentAction = (id) => async dispatch => {
  await axios.get(`${API_ENDPOINT}/v1/assignments/${id}`)
    .then((res) => {
      setFieldModalAction('data', res.data)(dispatch);
      setFieldModalAction('open', true)(dispatch);
    })
    .catch((err) => console.log(err.data));
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

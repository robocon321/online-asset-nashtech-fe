import axios from 'axios';
export const ACTIONS = {
  SET_FIELD_CONDITION: 'SET_FIELD_CONDITION',
  SET_FIELD_MODAL: 'SET_FIELD_MODAL',
  SET_FIELD_MODAL_DELETE: 'SET_FIELD_MODAL_DELETE',

  SET_LOADING: 'SET_LOADING',
  SET_STATUS: 'SET_STATUS',
}
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const setFieldConditionAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.SET_FIELD_CONDITION,
    payload: { name, value }
  })
}

export const setFieldModalAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.SET_FIELD_MODAL,
    payload: { name, value }
  })
}

export const setFieldModalDelete = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.SET_FIELD_MODAL_DELETE,
    payload: { name, value }
  })
}

export const setLoadingAction = (isLoading) => dispatch => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: isLoading
  })
}

export const setStatusAction = (status) => dispatch => {
  dispatch({
    type: ACTIONS.SET_STATUS,
    payload: status
  })
}

export const loadDetailAssignmentAction = (id) => async dispatch => {
  await axios.get(`${API_ENDPOINT}/v1/assignments/${id}`)
    .then((res) => {
      setFieldModalAction('data', res.data)(dispatch);
      setFieldModalAction('open', true)(dispatch);
    })
    .catch((err) => console.log(err.data));
}

export const submitAction = (form, navigate, deleteAssignmentFunc) => async (dispatch) => {
  setLoadingAction(true)(dispatch);
  await axios.delete(`${API_ENDPOINT}/v1/assignments`, { params: { id: form.id } }).then(response => {
    setStatusAction({
      isLoading: false,
      message: 'Successful!',
      success: true
    })(dispatch);
    deleteAssignmentFunc(form.id);
    navigate('/assignments');
  }).catch(error => {
    if (error.response == undefined) {
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
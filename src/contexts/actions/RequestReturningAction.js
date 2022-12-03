import axios from "axios"
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const ACTIONS = {
  SET_FIELD_CONDITION: 'SET_FIELD_CONDITION',
  SET_FIELD_MODAL: 'SET_FIELD_MODAL',
  SET_LIST_RETURNING: 'SET_LIST_RETURNING',

  SET_LOADING: 'SET_LOADING',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_STATUS: 'SET_STATUS'
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

export const loadReturningAction = () => async dispatch => {
  await axios.get(`${API_ENDPOINT}/v1/return-requests`)
    .then((res) => {
      dispatch({
        type: ACTIONS.SET_LIST_RETURNING,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.data));


  // const rows = [];
  // const states = ["All", "Accepted", "Waiting for acceptance"];

  // await setTimeout(() => {
  //   for (var i = 0; i < 30; i++) {
  //     rows.push({
  //       id: i,
  //       assetCode: "Asset code " + i,
  //       assetName: "Asset Name " + i,
  //       requestedBy: "username" + i,
  //       assignedBy: "Assigned By " + i,
  //       assignedDate: `${Math.floor(Math.random() * 30 + 1)}/${Math.floor(
  //         Math.random() * 11 + 1
  //       )}/${Math.floor(Math.random() * 2 + 2020)}`,
  //       acceptedBy: "username" + Math.floor(Math.random()*100),
  //       returnedDate: `${Math.floor(Math.random() * 30 + 1)}/${Math.floor(
  //         Math.random() * 11 + 1
  //       )}/${Math.floor(Math.random() * 2 + 2020)}`,
  //       state: `${states[Math.floor(Math.random() * 2 + 1)]}`,
  //     });
  //   }

  //   dispatch({
  //     type: ACTIONS.SET_LIST_RETURNING,
  //     payload: rows
  //   })  
  // }, 1000);

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

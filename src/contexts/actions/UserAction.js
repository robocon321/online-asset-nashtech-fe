import axios from "axios";

export const ACTIONS = {
  SET_USERS: "SET_USERS",
  ADD_USER: 'ADD_USER'
};

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const GET_ALL_USER = "/v1/users/";
const token = localStorage["TOKEN"];
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const setUsersAction = () => async (dispatch) => {
  await axios.get(`${API_ENDPOINT}/v1/users/`, config).then((res) => {
    dispatch({
      type: ACTIONS.SET_USERS,
      payload: res.data,
    });
  });
};

export const addUserAction = (user) => dispatch => {
  dispatch({
    type: ACTIONS.ADD_USER,
    payload: user
  })
}
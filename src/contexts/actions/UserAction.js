import axios from "axios";

export const ACTIONS = {
  SET_USER_INPUT: "set_todo_input",
  ADD_USER: "add_todo",
  SET_USERS: "SET_USERS",
};

export const setUserInput = (payload) => ({
  type: ACTIONS.SET_USER_INPUT,
  payload,
});

export const addUser = (payload) => ({ type: ACTIONS.ADD_USER, payload });
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const GET_ALL_USER = "/v1/users/";
const token = localStorage["TOKEN"];
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const setUsersAction = () => async (dispatch) => {
  const token = localStorage["TOKEN"];
  await request
    .get(`${API_ENDPOINT}/v1/users/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ACTIONS.SET_USERS,
        payload: res.data,
      });
    });
};

import axios from "axios";
import request from "../../utils/api/request";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const GET_ALL_USER = "/v1/users/";
export const ACTIONS = {
  SET_USERS: "SET_USERS",
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

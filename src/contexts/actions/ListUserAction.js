import axios from "axios";
// import * as dotenv from 'dotenv'
const GET_USER_DETAIL = "/v1/users/id";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const GET_ALL_USER = "/v1/users/";
const token = localStorage["TOKEN"];
const config = {
  headers: { Authorization: `Bearer ${token}` },
};
export const ACTIONS = {
  SET_CHECK: "SET_CHECK",
  SET_CHECK2: "SET_CHECK2",
  SET_USER_ROLE: "SET_USER_ROLE",
  SET_OPEN: "SET_OPEN",
  SET_CHECK_ID: "SET_CHECK_ID",
  SET_LIST_USERS: "SET_LIST_USERS",
  SET_USER_DETAIL: "SET_USER_DETAIL",
  SET_SEARCH: "SET_SEARCH",
  SET_LIST_USER: "SET_LIST_USER",
};

export const setCheck1Action = (check) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_CHECK,
    payload: check,
  });
};
export const setCheck2Action = (check2) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_CHECK2,
    payload: check2,
  });
};
export const setUserRoleAction = (userRole) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_USER_ROLE,
    payload: userRole,
  });
};
export const setOpenAction = (open) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_OPEN,
    payload: open,
  });
};
export const setSearchAction = (search) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_SEARCH,
    payload: search,
  });
};
export const setCheckIdAction = (checkId) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_CHECK_ID,
    payload: checkId,
  });
};

export const setListUserAction = () => async (dispatch) => {
  await axios.get(`${API_ENDPOINT}${GET_ALL_USER}`, config).then((res) => {
    dispatch({
      type: ACTIONS.SET_LIST_USERS,
      payload: res.data,
    });
  });
};
export const setUserDetailAction = (id) => async (dispatch) => {
  const token = localStorage["TOKEN"];
  await axios
    .get(`${API_ENDPOINT}/v1/users/id?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ACTIONS.SET_USER_DETAIL,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

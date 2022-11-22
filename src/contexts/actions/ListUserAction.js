import request from "../../utils/api/request";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const GET_ALL_USER = "/api/v1/users/";
const GET_USER_DETAIL = "/api/v1/users/id";
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
  await request.get(`${API_ENDPOINT}/v1/users/`, config).then((res) => {
    dispatch({
      type: ACTIONS.SET_LIST_USERS,
      payload: res.data,
    });
  });
};
export const setUserDetailAction = (id) => async (dispatch) => {
  await request
    .get(`${API_ENDPOINT}/v1/users/id`, { params: { id } })
    .then((res) => {
      dispatch({
        type: ACTIONS.SET_USER_DETAIL,
        payload: res.data,
      });
    });
};

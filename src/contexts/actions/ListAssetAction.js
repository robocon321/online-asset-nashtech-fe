import axios from "axios";
// import * as dotenv from 'dotenv'
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const ACTIONS = {
  SET_CHECK: "SET_CHECK",
  SET_CHECK2: "SET_CHECK2",
  SET_ASSET_STATE: "SET_ASSET_STATE",
  SET_OPEN: "SET_OPEN",
  SET_CHECK_ID: "SET_CHECK_ID",
  SET_LIST_ASSETS: "SET_LIST_ASSETS",
  SET_ASSET_DETAIL: "SET_ASSET_DETAIL",
  SET_SEARCH: "SET_SEARCH",
  SET_ASSET_CATE: "SET_ASSET_CATE",
  SET_LIST_CATE: "SET_LIST_CATE",
  SET_LIST_ASSET_HISTORY: "SET_LIST_ASSET_HISTORY",
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
export const setAssetStateAction = (assetState) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_ASSET_STATE,
    payload: assetState,
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

export const setAssetDetailAction = (id) => async (dispatch) => {
  await axios
    .get(`${API_ENDPOINT}/v1/asset/id?id=${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ACTIONS.SET_ASSET_DETAIL,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

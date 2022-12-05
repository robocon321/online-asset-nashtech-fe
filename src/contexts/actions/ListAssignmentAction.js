import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const ACTIONS = {
  SET_FIELD_CONDITION: "SET_FIELD_CONDITION",
  SET_FIELD_MODAL: "SET_FIELD_MODAL",
  SET_RETURN_ASSIGNMENT: "SET_RETURN_ASSIGNMENT",
  SET_ASSIGMENT_ID: "SET_ASSIGNMENT_ID",
  SET_FIELD_DIALOG_RETURN: "SET_FIELD_DIALOG_RETURN",
};

export const setFieldConditionAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_CONDITION,
    payload: { name, value },
  });
};

export const setFieldModalAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_MODAL,
    payload: { name, value },
  });
};
export const setFieldDialogReturnAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_DIALOG_RETURN,
    payload: { name, value },
  });
};
export const setAssigmentIdAction = (id) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_ASSIGMENT_ID,
    payload: id,
  });
};

export const returnRequestAssignmentAction =
  (id, returnRequestFunc) => async (dispatch) => {
    await axios
      .post(`${API_ENDPOINT}/v1/return-requests/${id}`)
      .then((res) => {
        dispatch({
          type: ACTIONS.SET_RETURN_ASSIGNMENT,
          payload: {
            data: res.data,
            open: false,
          },
        });
        returnRequestFunc(id, true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

import axios from "axios";

export const ACTIONS = {
  SET_CHECK: "SET_CHECK",
  SET_CHECK2: "SET_CHECK2",
  SET_USER_ROLE: "SET_USER_ROLE",
  SET_OPEN: "SET_OPEN",
  SET_CHECK_ID: "SET_CHECK_ID",

  //   SET_LIST_USER: "SET_LIST_USER"
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
export const setCheckIdAction = (checkId) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_CHECK_ID,
    payload: checkId,
  });
};

// export const getUserListAction = () => async (dispatch) => {
//     await axios.get().then(response => {
//         dispatch({
//             type: ACTIONS.SET_LIST_USER,
//             payload: response.data
//         })
//     })
// }
// const [open, setOpen] = useState(false);
//   const [checkId, setCheckId] = useState("");
//   const [sortStaffCode, setSortStaffCode] = useState(0);
//   const [sortFullName, setSortFullName] = useState(0);
//   const [sortJoinedDate, setSortJoinedDate] = useState(0);
//   const [sortType, setSortType] = useState(0);

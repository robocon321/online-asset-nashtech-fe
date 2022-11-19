import { createContext, useReducer } from "react";
import { useEffect } from "react";
// import { setTitleAction } from '../actions/HomeAction';
import {
  setCheck1Action,
  setCheck2Action,
  setUserRoleAction,
  setOpenAction,
  setCheckIdAction,
} from "../actions/ListUserAction";
import ListUserReducer from "../reducers/ListUserReducer";

export const ListUserContext = createContext();

const initState = {
  check: false,
  check2: false,
  userRole: [],
  open: false,
  checkId: "",
  listUser: "",
};

const ListUserProvider = (props) => {
  const [listUserState, dispatch] = useReducer(ListUserReducer, initState);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setUserRoleAction(typeof value === "string" ? value.split(",") : value)(
      dispatch
    );
    setCheck1Action(!listUserState.check)(dispatch);
  };

  useEffect(() => {
    console.log(listUserState.userRole);
  }, [listUserState]);

  useEffect(() => {
    if (listUserState.userRole[listUserState.userRole.length - 1] === "All") {
      setUserRoleAction(["All"])(dispatch);
    } else if (listUserState.userRole[0] === "All") {
      listUserState.userRole.splice(0, 1);
      setUserRoleAction(listUserState.userRole)(dispatch);
      setCheck2Action(!listUserState.check2)(dispatch);
    }
    // console.log(userRole);
  }, [listUserState.check]);
  useEffect(() => {}, [listUserState.check2]);

  const handleOnCellClick = (params) => {
    setCheckIdAction(params.id)(dispatch);
    setOpenAction(true)(dispatch);
  };
  const handleClose = () => {
    setOpenAction(false)(dispatch);
  };

  const value = {
    listUserState,
    handleChange,
    handleOnCellClick,
    handleClose,
  };

  return (
    <ListUserContext.Provider value={value}>
      {props.children}
    </ListUserContext.Provider>
  );
};

export default ListUserProvider;

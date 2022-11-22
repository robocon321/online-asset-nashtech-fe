import { createContext, useReducer } from "react";
import { useEffect } from "react";
import {
  setCheck1Action,
  setCheck2Action,
  setUserRoleAction,
  setOpenAction,
  setCheckIdAction,
  setListUserAction,
  setUserDetailAction,
  setSearchAction,
} from "../actions/ListUserAction";
import ListUserReducer from "../reducers/ListUserReducer";

export const ListUserContext = createContext();

const initState = {
  check: false,
  check2: false,
  userRole: [],
  open: false,
  checkId: "",
  listUser: [],
  userDetail: [],
  search: "",
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
    setListUserAction()(dispatch);
  }, []);

  useEffect(() => {
    console.log(listUserState);
  }, [listUserState]);

  useEffect(() => {
    if (listUserState.userRole[listUserState.userRole.length - 1] === "ALL") {
      setUserRoleAction(["ALL"])(dispatch);
    } else if (listUserState.userRole[0] === "ALL") {
      listUserState.userRole.splice(0, 1);
      setUserRoleAction(listUserState.userRole)(dispatch);
      setCheck2Action(!listUserState.check2)(dispatch);
    }
  }, [listUserState.check]);

  useEffect(() => {}, [listUserState.check2]);

  useEffect(() => {
    setUserDetailAction(listUserState.checkId)(dispatch);
  }, [listUserState.checkId]);

  const handleOnCellClick = (params) => {
    setCheckIdAction(params.id)(dispatch);
    setOpenAction(true)(dispatch);
  };
  const handleOnCellClickEdit = (params) => {
    setCheckIdAction(params.id)(dispatch);
    console.log(listUserState.checkId);
  };
  const handleSearch = (e) => {
    setSearchAction(e.target.value.toUpperCase())(dispatch);
  };

  const handleClose = () => {
    setOpenAction(false)(dispatch);
  };

  // useEffect(() =>{
  //   setSearchAction(listUserState.search)(dispatch);
  // },[listUserState.search])

  const value = {
    listUserState,
    handleChange,
    handleOnCellClick,
    handleClose,
    handleSearch,
    handleOnCellClickEdit,
  };

  return (
    <ListUserContext.Provider value={value}>
      {props.children}
    </ListUserContext.Provider>
  );
};

export default ListUserProvider;

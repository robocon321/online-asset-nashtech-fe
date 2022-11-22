import { createContext, useReducer, useEffect, useContext } from "react";

import UserReducer from "../reducers/UserReducer";
import { setUsersAction } from "../actions/UserAction";
import { AppContext } from "./AppProvider";

export const UserContext = createContext();

const initState = {
  users: [],
  userInput: "",
};

const UserProvider = (props) => {
  const [userState, dispatch] = useReducer(UserReducer, initState);
  const { appState } = useContext(AppContext);
  useEffect(() => {
    setUsersAction()(dispatch);
  }, [appState.user]);

  useEffect(() => {
    // setUsersAction()(dispatch);
    console.log(userState);
  }, [userState]);

  const value = {
    userState,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;

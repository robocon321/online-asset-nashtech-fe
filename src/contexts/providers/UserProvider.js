import { createContext, useReducer } from "react";

import UserReducer from "../reducers/UserReducer";

export const UserContext = createContext();

const initState = {
  users: [],
  userInput: "",
};

const UserProvider = (props) => {
  const [userState, dispatch] = useReducer(UserReducer, initState);

  const value = {
    userState,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;

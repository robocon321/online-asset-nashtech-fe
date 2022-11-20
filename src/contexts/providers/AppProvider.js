import { createContext, useReducer } from "react";

import { setFieldModalLoginFirstTime } from "../actions/AppAction";
import AppReducer from '../reducers/AppReducer';

const initState = {
  modalLoginFirstTime: {
    open: true,
    password: "",
    showPassword: false,
  },
  status: {
    isLoading: false,
    success: true,
    message: "",
  },
};

export const AppContext = createContext();

const AppProvider = (props) => {
  const [appState, dispatch] = useReducer(AppReducer, initState);

  const handleChange_ModalLoginFirstTime = (e) => {
    setFieldModalLoginFirstTime('password', e.target.value)(dispatch);
  };

  const toggleShowPassword_ModalLoginFirstTime = (showPassword) => {
    setFieldModalLoginFirstTime('showPassword', showPassword)(dispatch);
  };

  const toggleOpen_ModalLoginFirstTime = (open) => {
    setFieldModalLoginFirstTime('open', open)(dispatch);
  }

  const value = {
    appState,
    handleChange_ModalLoginFirstTime,
    toggleShowPassword_ModalLoginFirstTime,
    toggleOpen_ModalLoginFirstTime
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;

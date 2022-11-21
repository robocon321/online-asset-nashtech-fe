import { createContext, useEffect, useReducer } from "react";
import { validatePassword } from "../../utils/Validate";

import { loadUserAction, setFieldModalLoginFirstTimeAction } from "../actions/AppAction";
import AppReducer from '../reducers/AppReducer';

const initState = {
  modalLoginFirstTime: {
    open: true,
    password: null,
    showPassword: false,
    error: null
  },
  status: {
    isLoading: false,
    success: true,
    message: "",
  },
  user: null
};

export const AppContext = createContext();

const AppProvider = (props) => {
  const [appState, dispatch] = useReducer(AppReducer, initState);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if(!validatePassword(appState.modalLoginFirstTime.password) && appState.modalLoginFirstTime.password != null) {
      setFieldModalLoginFirstTimeAction('error', "Minimum eight characters, at least one letter, one number and one special character")(dispatch);
    } else {
      setFieldModalLoginFirstTimeAction('error', null)(dispatch);
    }
  }, [appState.modalLoginFirstTime.password]);

  useEffect(() => {
    console.log(appState);
  }, [appState]);

  const loadUser = () => {
    loadUserAction()(dispatch);
  }

  const handleChange_ModalLoginFirstTime = (e) => {
    setFieldModalLoginFirstTimeAction('password', e.target.value)(dispatch);
  };

  const setShowPassword_ModalLoginFirstTime = (showPassword) => {
    setFieldModalLoginFirstTimeAction('showPassword', showPassword)(dispatch);
  };

  const setOpen_ModalLoginFirstTime = (open) => {
    setFieldModalLoginFirstTimeAction('open', open)(dispatch);
  }

  const value = {
    appState,
    handleChange_ModalLoginFirstTime,
    setShowPassword_ModalLoginFirstTime,
    setOpen_ModalLoginFirstTime,
    loadUser
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;

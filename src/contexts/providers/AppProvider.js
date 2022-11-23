import { createContext, useEffect, useReducer } from "react";
import { validatePassword } from "../../utils/Validate";

import {
  loadUserAction,
  setFieldModalLoginFirstTimeAction,
  submit_ModalLoginFirstTimeAction,
  setFieldModalChangePasswordAction,
  submit_ModalChangePasswordAction,
  cancel_ModalChangePasswordAction,
} from "../actions/AppAction";
import AppReducer from "../reducers/AppReducer";

const initState = {
  modalChangePassword: {
    password: null,
    newPassword: null,
    error: null,
    errorNew: null,
  },
  modalLoginFirstTime: {
    password: null,
    showPassword: false,
    error: null,
  },
  status: {
    isLoading: true,
    success: true,
    message: "",
  },
  user: null,
};

export const AppContext = createContext();

const AppProvider = (props) => {
  const [appState, dispatch] = useReducer(AppReducer, initState);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (
      !validatePassword(appState.modalLoginFirstTime.password) &&
      appState.modalLoginFirstTime.password != null
    ) {
      setFieldModalLoginFirstTimeAction(
        "error",
        "Minimum eight characters, at least one letter, one number, one special character and less 50 letters"
      )(dispatch);
    } else {
      setFieldModalLoginFirstTimeAction("error", null)(dispatch);
    }
  }, [appState.modalLoginFirstTime.password]);

  // useEffect(() => {
  //   if (
  //     !validatePassword(appState.modalChangePassword.password) &&
  //     appState.modalChangePassword.password != null
  //   ) {
  //     setFieldModalChangePasswordAction(
  //       "error",
  //       "Minimum eight characters, at least one letter, one number, one special character and less 50 letters"
  //     )(dispatch);
  //   } else {
  //     setFieldModalChangePasswordAction("error", null)(dispatch);
  //   }
  // }, [appState.modalChangePassword.password]);

  useEffect(() => {
    if (
      !validatePassword(appState.modalChangePassword.newPassword) &&
      appState.modalChangePassword.newPassword != null
    ) {
      setFieldModalChangePasswordAction(
        "errorNew",
        "Minimum eight characters, at least one letter, one number, one special character and less 50 letters"
      )(dispatch);
    } else {
      setFieldModalChangePasswordAction("errorNew", null)(dispatch);
    }
  }, [appState.modalChangePassword.newPassword]);

  useEffect(() => {
    console.log(appState);
  }, [appState]);

  const loadUser = () => {
    loadUserAction()(dispatch);
  };

  const handleChange_ModalLoginFirstTime = (e) => {
    setFieldModalLoginFirstTimeAction("password", e.target.value)(dispatch);
  };

  const handleChange_ModalChangePassword = (e) => {
    setFieldModalChangePasswordAction("password", e.target.value)(dispatch);
  };

  const handleChange_ModalChangePassword1 = (e) => {
    setFieldModalChangePasswordAction("newPassword", e.target.value)(dispatch);
  };

  const setShowPassword_ModalLoginFirstTime = (showPassword) => {
    setFieldModalLoginFirstTimeAction("showPassword", showPassword)(dispatch);
  };

  const submit_ModalLoginFirstTime = () => {
    submit_ModalLoginFirstTimeAction(
      appState.modalLoginFirstTime.password,
      appState.modalLoginFirstTime.newPassword
    )(dispatch);
  };

  const submit_ModalChangePassword = () => {
    submit_ModalChangePasswordAction(
      appState.modalChangePassword.password,
      appState.modalChangePassword.newPassword
    )(dispatch);
  };

  const cancle_ModalChangePassword = () => {
    cancel_ModalChangePasswordAction()(dispatch);
  };

  const value = {
    appState,
    handleChange_ModalLoginFirstTime,
    setShowPassword_ModalLoginFirstTime,
    submit_ModalLoginFirstTime,
    handleChange_ModalChangePassword,
    submit_ModalChangePassword,
    handleChange_ModalChangePassword1,
    loadUser,
    cancle_ModalChangePassword,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppProvider;

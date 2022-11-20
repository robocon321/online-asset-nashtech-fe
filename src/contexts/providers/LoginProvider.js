import { createContext, useEffect, useReducer } from "react"
import { setFieldAction } from "../actions/CreateUserAction";
import { addErrorFieldAction, removeErrorFieldAction, setEnableSubmitAction } from "../actions/LoginAction";

import LoginReducer from '../reducers/LoginReducer';

const initState = {
  form: {
    username: '',
    password: ''
  },
  error:{},
  enableSubmit: false,
  status: {
    isLoading: false,
    success: false,
    message: ''
  }
}

export const LoginContext = createContext();

const LoginProvider = props => {
  const [loginState, dispatch] = useReducer(LoginReducer, initState);

  useEffect(() => {
    console.log(loginState);
  }, [loginState]);

  useEffect(() => {
    console.log(Object.keys(loginState.error).length > 0, isBlankField());
    if(Object.keys(loginState.error).length > 0 || isBlankField()) {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [loginState.error]);


  const changeField = (e) => {
    const {name, value} = e.target;
    setFieldAction(name, value)(dispatch);
    if(name == 'username') validateUsername(value);
    else if(name == 'password') validatePassword(value);
  }

  const validateUsername = (value) => {
    if(value == null || value.trim() == '') {
      addErrorFieldAction('username', 'Username field not blank')(dispatch);
    } else {
      removeErrorFieldAction('username')(dispatch);
    }
  }

  const validatePassword = (value) => {
    if(value == null || value.trim() == '') {
      addErrorFieldAction('password', 'Password field not blank')(dispatch);
    } else {
      removeErrorFieldAction('password')(dispatch);
    }
  }

  const isBlankField = () => {
    if(loginState.form.username == null || loginState.form.username.trim() == '') return true;
    if(loginState.form.password == null || loginState.form.password.trim() == '') return true;
    return false;
  }

  const value = {
    loginState,
    changeField
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginProvider;
import { createContext, useEffect, useReducer } from "react";
import { validateDate } from "../../utils/Validate";
import { loadReturningAction, setFieldConditionAction, setFieldModalAction, setLoadingAction } from "../actions/RequestReturningAction";

import RequestReturningReducer from "../reducers/RequestReturningReducer";

export const RequestReturningContext = createContext();

const initState = {
  conditions: {
    states: ["All"],
    assignedDate: null,
    search: ''
  },
  returnings: []
};

const RequestReturningProvider = (props) => {
  const [requestReturningState, dispatch] = useReducer(RequestReturningReducer, initState);

  useEffect(() => {
    console.log(requestReturningState);
  }, [requestReturningState]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoadingAction(true)(dispatch);
    await loadReturningAction()(dispatch);
    setLoadingAction(false)(dispatch);
  }

  const changeTypeCondition = (value) => {
    const stateElements = document.getElementsByName("state");
    let states = [];
    for(var i = 0 ; i < stateElements.length; i ++) {
      if(stateElements[i].checked) {
        states.push(stateElements[i].value);
      }
    }
    if(value == "All") states = ["All"];
    else states = states.filter(item => item != "All");
    setFieldConditionAction('states', states)(dispatch);
  }

  const changeDateCondition = (value) => {
    const assignedTime = new Date(value);
    if(value == '' || validateDate(assignedTime)) {
      setFieldConditionAction('assignedDate', value)(dispatch);      
    }
  }

  const changeSearchCondition = (value) => {
    setFieldConditionAction('search', value)(dispatch);
  }

  const value = {
    requestReturningState,
    changeTypeCondition,
    changeDateCondition,
    changeSearchCondition,
  };

  return (
    <RequestReturningContext.Provider value={value}>{props.children}</RequestReturningContext.Provider>
  );
};

export default RequestReturningProvider;

import { createContext, useEffect, useReducer } from "react";
import { validateDate } from "../../utils/Validate";
import { loadReturningAction, setFieldConditionAction, setLoadingAction } from "../actions/RequestReturningAction";

import RequestReturningReducer from "../reducers/RequestReturningReducer";

export const RequestReturningContext = createContext();

const initState = {
  conditions: {
    states: ["All"],
    returnedDate: null,
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
    let states = [];
    if(value.length == 0 || (value.includes("All") && !requestReturningState.conditions.states.includes("All"))) states = ['All'];
    else states = value.filter(item => item != "All");
    setFieldConditionAction('states', states)(dispatch);
  }


  const changeDateCondition = (value) => {
    const returnedDate = new Date(value);
    if(value == '' || validateDate(returnedDate)) {
      setFieldConditionAction('returnedDate', value)(dispatch);      
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

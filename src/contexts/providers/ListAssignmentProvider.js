import { createContext, useContext, useEffect, useReducer } from "react";
import { validateDate } from "../../utils/Validate";
import { loadAssignmentAction } from "../actions/AssignmentAction";
import { setLoadingAction } from "../actions/CreateAssignmentAction";
import { setFieldConditionAction, setFieldModalAction } from "../actions/ListAssignmentAction";

import ListAssignmentReducer from "../reducers/ListAssignmentReducer";
import { AssignmentContext } from "./AssignmentProvider";

export const ListAssignmentContext = createContext();

const initState = {
  conditions: {
    states: ["All"],
    assignedDate: null,
    search: ''
  },
  modalDetail: {
    open: false,
    data: null
  }
};

const ListAssignmentProvider = (props) => {
  const [listAssignmentState, dispatch] = useReducer(ListAssignmentReducer, initState);
  const { assignmentState } = useContext(AssignmentContext);

  useEffect(() => {
    console.log(listAssignmentState);
  }, [listAssignmentState]);

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

  const changeOpenModalStatus = (value) => {
    setFieldModalAction('open', value)(dispatch);
  }

  const changeDataModal = (id) => {
    setFieldModalAction('data', value)(dispatch);
  }

  const value = {
    listAssignmentState,
    assignmentState,
    changeTypeCondition,
    changeDateCondition,
    changeSearchCondition,
    changeOpenModalStatus,
    changeDataModal
  };

  return (
    <ListAssignmentContext.Provider value={value}>{props.children}</ListAssignmentContext.Provider>
  );
};

export default ListAssignmentProvider;

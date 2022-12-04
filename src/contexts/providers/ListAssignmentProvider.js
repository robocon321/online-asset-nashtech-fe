import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { validateDate } from "../../utils/Validate";
import {
  loadDetailAssignmentAction,
  setLoadingAction,
} from "../actions/AssignmentAction";
import {
  setFieldConditionAction,
  setFieldModalAction,
} from "../actions/ListAssignmentAction";

import ListAssignmentReducer from "../reducers/ListAssignmentReducer";
import { AssignmentContext } from "./AssignmentProvider";

export const ListAssignmentContext = createContext();

const initState = {
  conditions: {
    states: ["All"],
    assignedDate: null,
    search: "",
  },
  modalDetail: {
    open: false,
    data: {},
  },
};

const ListAssignmentProvider = (props) => {
  const [listAssignmentState, dispatch] = useReducer(
    ListAssignmentReducer,
    initState
  );
  const { assignmentState } = useContext(AssignmentContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(listAssignmentState);
  }, [listAssignmentState]);

  const changeTypeCondition = (value) => {
    let states = [];
    if (
      value.length == 0 ||
      (value.includes("All") &&
        !listAssignmentState.conditions.states.includes("All"))
    )
      states = ["All"];
    else states = value.filter((item) => item != "All");
    setFieldConditionAction("states", states)(dispatch);
  };

  const changeDateCondition = (value) => {
    const assignedTime = new Date(value);
    if (value == "" || validateDate(assignedTime)) {
      setFieldConditionAction("assignedDate", value)(dispatch);
    }
  };

  const changeSearchCondition = (value) => {
    setFieldConditionAction("search", value)(dispatch);
  };

  const changeOpenModalStatus = (value) => {
    setFieldModalAction("open", value)(dispatch);
  };

  const showDetailAssignment = async (id) => {
    setLoadingAction(true)(dispatch);
    await loadDetailAssignmentAction(id)(dispatch);
    setLoadingAction(false)(dispatch);
  };

  const value = {
    listAssignmentState,
    assignmentState,
    changeTypeCondition,
    changeDateCondition,
    changeSearchCondition,
    changeOpenModalStatus,
    showDetailAssignment,
    navigate,
  };

  return (
    <ListAssignmentContext.Provider value={value}>
      {props.children}
    </ListAssignmentContext.Provider>
  );
};

export default ListAssignmentProvider;

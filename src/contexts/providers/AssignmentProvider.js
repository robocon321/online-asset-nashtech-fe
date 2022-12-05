import { createContext, useEffect, useReducer } from "react";
import {
  addNewAssignmentAction,
  editAssignmentAction,
  loadAssignmentAction,
  setLoadingAction,
  setFieldDialogReturnAction,
  setAssigmentIdAction,
  returnRequestAssignmentAction,
  setStateAssignmentAction,
} from "../actions/AssignmentAction";
import AssignmentReducer from "../reducers/AssignmentReducer";

const initState = {
  assignments: [],
  status: {
    isLoading: false,
    success: true,
    message: "",
  },
  dialogReturn: {
    data: {},
    open: false,
  },
};

export const AssignmentContext = createContext();

const AssignmentProvider = (props) => {
  const [assignmentState, dispatch] = useReducer(AssignmentReducer, initState);

  useEffect(() => {
    console.log(assignmentState);
  }, [assignmentState]);

  useEffect(() => {
    loadData();
  }, []);
  const changeStateAssignment = (id, stateReturnRequest) => {
    setStateAssignmentAction(id, stateReturnRequest)(dispatch);
  };
  const loadData = async () => {
    setLoadingAction(true)(dispatch);
    await loadAssignmentAction()(dispatch);
    setLoadingAction(false)(dispatch);
  };

  const addNewAssignment = (assignment) => {
    addNewAssignmentAction(assignment)(dispatch);
  };

  const editAssignment = (assignment) => {
    editAssignmentAction(assignment)(dispatch);
  };
  const changeOpenDialogReturnStatus = (value) => {
    setFieldDialogReturnAction("open", value)(dispatch);
  };
  // const returnAssignment = (id) => {
  //   setAssigmentIdAction(id)(dispatch);
  //   changeOpenDialogReturnStatus(true);
  // };
  // const clickReturnAssignment = (id) => {
  //   returnRequestAssignmentAction(id)(dispatch);
  // };
  const value = {
    assignmentState,
    addNewAssignment,
    editAssignment,
    // returnAssignment,
    changeOpenDialogReturnStatus,
    // clickReturnAssignment,
    changeStateAssignment,
  };
  return (
    <AssignmentContext.Provider value={value}>
      {props.children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentProvider;

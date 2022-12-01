import { createContext, useEffect, useReducer } from "react";
import { addNewAssignmentAction, editAssignmentAction, loadAssignmentAction, setLoadingAction } from "../actions/AssignmentAction";
import AssignmentReducer from '../reducers/AssignmentReducer';

const initState = {
  assignments: [],
  status: {
    isLoading: false,
    success: true,
    message: ''
  }
}

export const AssignmentContext = createContext();

const AssignmentProvider = props => {
  const [ assignmentState, dispatch] = useReducer(AssignmentReducer, initState);

  useEffect(() => {
    console.log(assignmentState);
  }, [assignmentState]);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoadingAction(true)(dispatch);
    await loadAssignmentAction()(dispatch);
    setLoadingAction(false)(dispatch);
  }

  const addNewAssignment = (assignment) => {
    addNewAssignmentAction(assignment)(dispatch);
  }

  const editAssignment = (assignment) => {
    editAssignmentAction(assignment)(dispatch);
  }

  const value = {
    assignmentState,
    addNewAssignment,
    editAssignment
  }
  return (
    <AssignmentContext.Provider value={value}>
      {props.children}
    </AssignmentContext.Provider>
  )
}

export default AssignmentProvider;
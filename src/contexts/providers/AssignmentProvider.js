import { createContext, useEffect, useReducer } from "react";
import { addNewAssignmentAction, editAssignmentAction } from "../actions/AssignmentAction";
import AssignmentReducer from '../reducers/AssignmentReducer';

const initState = {
  assignments: []
}

export const AssignmentContext = createContext();

const AssignmentProvider = props => {
  const [ assignmentState, dispatch] = useReducer(AssignmentReducer, initState);

  useEffect(() => {
    console.log(assignmentState);
  }, [assignmentState]);

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
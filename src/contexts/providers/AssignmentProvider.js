import { createContext, useEffect, useReducer } from "react";
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


  const value = {
    assignmentState,
  }
  return (
    <AssignmentContext.Provider value={value}>
      {props.children}
    </AssignmentContext.Provider>
  )
}

export default AssignmentProvider;
import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { validateDate } from "../../utils/Validate";
import { loadDetailAssignmentAction } from "../actions/AssignmentAction";
import { setLoadingAction } from "../actions/ListAssignmentAction";
import { setFieldConditionAction, setFieldModalAction, setFieldModalDelete, submitAction, } from "../actions/ListAssignmentAction";

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
  modalDelete: {
    open: false,
    id: null,
  }
};



const ListAssignmentProvider = (props) => {
  const [listAssignmentState, dispatch] = useReducer(ListAssignmentReducer, initState);
  const { assignmentState, deleteAssignment } = useContext(AssignmentContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(listAssignmentState);
  }, [listAssignmentState]);

  const changeDeleteId = (value) => {
    setFieldModalDelete('id', value)(dispatch);
  }

  const changeOpenDelete = (value) => {
    setFieldModalDelete('open', value)(dispatch);
  }

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

  const deleteSubmit = () => {
    submitAction({ ...listAssignmentState.modalDelete }, navigate, deleteAssignment)(dispatch);
    changeOpenDelete(false);
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
    changeOpenDelete,
    changeDeleteId,
    deleteSubmit
  };

  return (
    <ListAssignmentContext.Provider value={value}>
      {props.children}
    </ListAssignmentContext.Provider>
  );
};

export default ListAssignmentProvider;

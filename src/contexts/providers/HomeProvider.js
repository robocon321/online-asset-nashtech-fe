import { createContext, useEffect, useReducer } from "react";
import {
  loadHomeAction,
  acceptAssignmentAction,
  declineAssignmentAction,
  returnRequestAssignmentAction,
  setFieldModalAction,
  detailAssignmentAction,
  setFieldDialogAcceptAction,
  setFieldDialogDeclineAction,
  setFieldDialogReturnAction,
} from "../actions/HomeAction";

import HomeReducer from "../reducers/HomeReducer";

export const HomeContext = createContext();

const initState = {
  listAssignment: [],

  modalDetail: {
    data: {},
    open: false,
  },

  dialogAccept: {
    data: {},
    open: false,
  },

  dialogDecline: {
    data: {},
    open: false,
  },

  dialogReturn: {
    data: {},
    open: false,
  },
};

const HomeAssignmentProvider = (props) => {
  const [homeState, dispatch] = useReducer(HomeReducer, initState);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    loadHomeAction()(dispatch);
  };

  const changeOpenModalStatus = (value) => {
    setFieldModalAction("open", value)(dispatch);
  };

  const changeOpenDialogAcceptStatus = (value) => {
    setFieldDialogAcceptAction("open", value)(dispatch);
  };

  const changeOpenDialogDeclineStatus = (value) => {
    setFieldDialogDeclineAction("open", value)(dispatch);
  };

  const changeOpenDialogReturnStatus = (value) => {
    setFieldDialogReturnAction("open", value)(dispatch);
  };

  const showDetailAssignment = (id) => {
    detailAssignmentAction(id)(dispatch);
    changeOpenModalStatus(true);
  };

  const acceptAssignment = (id) => {
    acceptAssignmentAction(id)(dispatch);
    changeOpenDialogAcceptStatus(true);
  };

  const declineAssignment = (id) => {
    declineAssignmentAction(id)(dispatch);
    changeOpenDialogDeclineStatus(true);
  };

  const returnAssignment = (id) => {
    returnRequestAssignmentAction(id)(dispatch);
    changeOpenDialogReturnStatus(true);
  };

  const value = {
    homeState,
    acceptAssignment,
    declineAssignment,
    returnAssignment,
    showDetailAssignment,
    changeOpenModalStatus,
    changeOpenDialogAcceptStatus,
    changeOpenDialogDeclineStatus,
    changeOpenDialogReturnStatus,
  };

  return (
    <HomeContext.Provider value={value}>
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeAssignmentProvider;

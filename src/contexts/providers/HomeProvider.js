import { createContext, useEffect, useReducer } from "react";
import {
  loadHomeAction,
  acceptAssignmentAction,
  declineAssignmentAction,
  returnRequestAssignmentAction,
  setFieldModalAction,
  detailAssignmentAction,
} from "../actions/HomeAction";

import HomeReducer from "../reducers/HomeReducer";

export const HomeContext = createContext();

const initState = {
  listAssignment: [],
  modalDetail: {
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

  const showDetailAssignment = (id) => {
    detailAssignmentAction(id)(dispatch);
    changeOpenModalStatus(true);
  };

  const acceptAssignment = (id) => {
    acceptAssignmentAction(id)(dispatch);
  };

  const declineAssignment = (id) => {
    declineAssignmentAction(id)(dispatch);
  };

  const returnRequestAssignment = (id) => {
    returnRequestAssignmentAction(id)(dispatch);
  };

  const value = {
    homeState,
    acceptAssignment,
    declineAssignment,
    returnRequestAssignment,
    changeOpenModalStatus,
    showDetailAssignment,
  };

  return (
    <HomeContext.Provider value={value}>
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeAssignmentProvider;

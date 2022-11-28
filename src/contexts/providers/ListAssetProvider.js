import { createContext, useReducer } from "react";
import { useEffect } from "react";

import {
  setAssetStateAction,
  setCheck1Action,
  setCheck2Action,
  setAssetDetailAction,
  setAssetCategories,
  setSearchAction,
  setOpenAction,
  setCheckIdAction,
} from "../actions/ListAssetAction";

import ListAssetReducer from "../reducers/ListAssetReducer";

export const ListAssetContext = createContext();

const initState = {
  check: false,
  check2: false,
  assetState: [],
  open: false,
  checkId: "",
  listAssets: [],
  assetDetails: {},
  search: "",
  listCategory: [],
  assetCategory: [],
  listAssetHistory: [],
};

const ListAssetProvider = (props) => {
  const [listAssetState, dispatch] = useReducer(ListAssetReducer, initState);

  useEffect(() => {
    console.log(1, listAssetState);
  }, [listAssetState]);

  const handleClose = () => {
    setOpenAction(false)(dispatch);
  };

  const handleOnCellClick = (params) => {
    setCheckIdAction(params.id)(dispatch);
    setOpenAction(true)(dispatch);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);

    setAssetCategories(typeof value === "string" ? value.split(",") : value)(
      dispatch
    );
    setCheck1Action(!listAssetState.check)(dispatch);
  };
  const changeState = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);

    setAssetStateAction(typeof value === "string" ? value.split(",") : value)(
      dispatch
    );
    setCheck1Action(!listAssetState.check)(dispatch);
  };

  useEffect(() => {
    setAssetStateAction(["Assigned", "Available", "Not available"])(dispatch);
  }, []);

  useEffect(() => {
    if (
      listAssetState.assetState[listAssetState.assetState.length - 1] === "All"
    ) {
      setAssetStateAction(["All"])(dispatch);
    } else if (listAssetState.assetState[0] === "All") {
      listAssetState.assetState.splice(0, 1);
      setAssetStateAction(listAssetState.assetState)(dispatch);
      setCheck2Action(!listAssetState.check2)(dispatch);
    }
  }, [listAssetState.check]);

  useEffect(() => {
    if (
      listAssetState.assetCategory[listAssetState.assetCategory.length - 1] ===
      "All"
    ) {
      setAssetCategories(["All"])(dispatch);
    } else if (listAssetState.assetCategory[0] === "All") {
      listAssetState.assetCategory.splice(0, 1);
      setAssetCategories(listAssetState.assetCategory)(dispatch);
      setCheck2Action(!listAssetState.check2)(dispatch);
    }
  }, [listAssetState.check]);

  const handleSearch = (e) => {
    setSearchAction(e.target.value.toUpperCase())(dispatch);
  };

  useEffect(() => {
    setAssetDetailAction(listAssetState.checkId)(dispatch);
  }, [listAssetState.checkId]);

  const value = {
    listAssetState,
    handleChange,
    changeState,
    handleSearch,
    handleOnCellClick,
    handleClose,
  };

  return (
    <ListAssetContext.Provider value={value}>
      {props.children}
    </ListAssetContext.Provider>
  );
};

export default ListAssetProvider;

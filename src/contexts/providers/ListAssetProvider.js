import { createContext, useReducer } from "react";
import { useEffect } from "react";

import {
  setAssetStateAction,
  setCheck1Action,
  setCheck2Action,
  setAssetDetailAction,
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
  assetDetails: [],
  search: "",
  listCategory: [],
  assetCategory: [],
  listAssetHistory: [],
};

const ListAssetProvider = (props) => {
  const [listAssetState, dispatch] = useReducer(ListAssetReducer, initState);

  const handleChangeState = (event) => {
    const {
      target: { value },
    } = event;

    setAssetStateAction(typeof value === "string" ? value.split(",") : value)(
      dispatch
    );
    setCheck1Action(!listAssetState.check)(dispatch);
  };
  useEffect(() => {
    if (
      listAssetState.assetState[listAssetState.assetState.length - 1] === "ALL"
    ) {
      setAssetStateAction(["ALL"])(dispatch);
    } else if (listAssetState.userRole[0] === "ALL") {
      listAssetState.assetState.splice(0, 1);
      setAssetStateAction(listAssetState.assetState)(dispatch);
      setCheck2Action(!listAssetState.check2)(dispatch);
    }
  }, [listAssetState.check]);
  useEffect(() => {
    setAssetDetailAction(listAssetState.checkId)(dispatch);
  }, [listAssetState.checkId]);
  const value = {
    listAssetState,
  };

  return (
    <ListAssetContext.Provider value={value}>
      {props.children}
    </ListAssetContext.Provider>
  );
};

export default ListAssetProvider;

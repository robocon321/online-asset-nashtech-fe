import { createContext, useReducer } from "react";
import { useEffect } from "react";

import ListAssetReducer from "../reducers/ListAssetReducer";

export const ListAssetContext = createContext();

const initState = {};

const ListAssetProvider = (props) => {
  const [listAssetState, dispatch] = useReducer(ListAssetReducer, initState);

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

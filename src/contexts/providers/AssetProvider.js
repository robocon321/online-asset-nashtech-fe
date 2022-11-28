import { createContext, useEffect, useReducer } from "react";
import {
  addAssetAction,
  editAssetAction,
  assetListAction,
  categoriesListAction,
  removeAssetAction
} from "../actions/AssetAction";
import AssetReducer from "../reducers/AssetReducer";

const initState = {
  assets: [],
  categories: [],
};

export const AssetContext = createContext();

const AssetProvider = (props) => {
  const [assetState, dispatch] = useReducer(AssetReducer, initState);

  useEffect(() => {
    console.log(assetState);
  }, [assetState]);
  useEffect(() => {
    assetListAction()(dispatch);
    categoriesListAction()(dispatch);
  }, []);

  const addAsset = (asset) => {
    addAssetAction(asset)(dispatch);
  };

  const editAsset = (asset) => {
    editAssetAction(asset)(dispatch);
  };
  // const assetList = ()

  // const removeAsset = (e) => {
  //   removeAssetAction("id", e.target.value)(dispatch);
  //   console.log("Provider id: " + e.target.value);
  // }

  const value = {
    assetState,
    addAsset,
    editAsset,
    // removeAsset
  };
  return (
    <AssetContext.Provider value={value}>
      {props.children}
    </AssetContext.Provider>
  );
};

export default AssetProvider;

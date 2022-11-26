import { createContext, useEffect, useReducer } from "react";
import { addAssetAction, editAssetAction } from "../actions/AssetAction";
import AssetReducer from '../reducers/AssetReducer';

const initState = {
  assets: [],
  categories: []
}

export const AssetContext = createContext();

const AssetProvider = props => {
  const [ assetState, dispatch] = useReducer(AssetReducer, initState);

  useEffect(() => {
    console.log(assetState);
  }, [assetState]);

  const addAsset = (asset) => {
    addAssetAction(asset)(dispatch);
  };

  const editAsset = (asset) => {
    editAssetAction(asset)(dispatch);
  }

  const value = {
    assetState,
    addAsset,
    editAsset
  }
  return (
    <AssetContext.Provider value={value}>
      {props.children}
    </AssetContext.Provider>
  )
}

export default AssetProvider;
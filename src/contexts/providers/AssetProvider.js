import { createContext, useReducer } from "react"
import AssetReducer from '../reducers/AssetReducer';

const initState = {
  assets: []
}

const AssetContext = createContext();

const AssetProvider = props => {
  const [ assetState, dispatch] = useReducer(AssetReducer, initState);
  const value = {
    assetState
  }
  return (
    <AssetContext.Provider value={value}>
      {props.children}
    </AssetContext.Provider>
  )
}

export default AssetProvider;
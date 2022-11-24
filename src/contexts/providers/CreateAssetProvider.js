import { createContext, useReducer } from "react";
import CreateAssetReducer from '../reducers/CreateAssetReducer';

export const CreateUserContext = createContext();

const initState = {
};

const CreateAssetProvider = (props) => {
  const [ createAssetState, dispatch ] = useReducer(CreateAssetReducer, initState);

  const value = {
    createAssetState
  };

  return (
    <CreateUserContext.Provider value={value}>
      {props.children}
    </CreateUserContext.Provider>
  );
};

export default CreateAssetProvider;

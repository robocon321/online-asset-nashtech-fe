import { createContext, useReducer } from "react";
import CreateAssetReducer from '../reducers/CreateAssetReducer';

export const CreateUserContext = createContext();

const initState = {
  form: {
    name: null,
    specification: null,
    installedDate: null,
    state: 'AVAILABLE',
    category: null
  },
  newCategory: {
    name: null,
    code: null
  },
  categories: []
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

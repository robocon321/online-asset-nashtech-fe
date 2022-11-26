import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addErrorFieldAction,
  loadAssetAction,
  removeErrorFieldAction,
  setEnableSubmitAction,
  setFieldAction,
  setLoadingAction,
  submitAction,
} from "../actions/EditAssetAction";
import EditAssetReducer from "../reducers/EditAssetReducer";
import { AssetContext } from "./AssetProvider";

export const EditAssetContext = createContext();

const initState = {
  form: {
    name: null,
    specification: null,
    installedDate: null,
    state: "Available",
    categoryName: null,
  },
  enableSubmit: false,
  error: {},
};

const EditAssetProvider = (props) => {
  const [editAssetState, dispatch] = useReducer(
    EditAssetReducer,
    initState
  );
  const { addAsset } = useContext(AssetContext);

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (Object.keys(editAssetState.error).length > 0 || isBlankField() || editAssetState.form.state == 'Assigned') {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [editAssetState.error]);


  useEffect(() => {
    console.log(editAssetState);
  }, [editAssetState]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoadingAction(true)(dispatch);
    loadAssetAction(id)(dispatch);
    setLoadingAction(false)(dispatch);
  }

  const changeField = (e) => {
    const { name, value } = e.target;
    if(name == 'state' && editAssetState.form.state == 'Assigned') return ;
    setFieldAction(name, value)(dispatch);
    validateField(name, value);
  };

  const validateField = (name, value) => {
    if (value == null || value.trim() == "") addErrorFieldAction(name, `Field ${name} is not blank`)(dispatch);
    else removeErrorFieldAction(name)(dispatch);
  };


  const isBlankField = () => {
    if (
      editAssetState.form.name == null ||
      editAssetState.form.name.trim() == ""
    )
      return true;

    if (
      editAssetState.form.specification == null ||
      editAssetState.form.specification.trim() == ""
    )
      return true;

    if (
      editAssetState.form.installedDate == null ||
      editAssetState.form.installedDate.trim() == ""
    )
      return true;
  
    if (editAssetState.form.state == null) return true;

    return false;
  };


  const submit = () => {
    submitAction({...editAssetState.form}, navigate, addAsset)(dispatch);
  }

  const value = {
    editAssetState,
    changeField,
    submit,
    navigate
  };

  return (
    <EditAssetContext.Provider value={value}>
      {props.children}
    </EditAssetContext.Provider>
  );
};

export default EditAssetProvider;

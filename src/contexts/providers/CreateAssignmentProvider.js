import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { addErrorFieldAction, loadAssetAction, loadUserAction, removeErrorFieldAction, setEnableSubmitAction, setFieldAction, setFieldPopupAssetAction, setFieldPopupUserAction, setLoadingAction } from "../actions/CreateAssignmentAction";
import CreateAssignmentReducer from '../reducers/CreateAssignmentReducer';

export const CreateAssignmentContext = createContext();

const initState = {
  popupAsset: {
    assets: [],
    search: '',
    selected: null
  },
  popupUser: {
    users: [],
    search: '',
    selected: null
  },
  form: {
    userId: null,
    assetId: null,
    assignedDate: null,
    note: null
  },
  error: {},
  enableSubmit: false
}

const CreateAssignmentProvider = (props) => {
  const [createAssignmentState, dispatch] = useReducer(CreateAssignmentReducer, initState);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log(createAssignmentState);
  }, [createAssignmentState]);

  useEffect(() => {
    if(Object.keys(createAssignmentState.error).length > 0 || isBlankField()) {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [createAssignmentState.error]);

  const loadData = async () => {
    setLoadingAction(true)(dispatch);
    await loadUserAction()(dispatch);
    await loadAssetAction()(dispatch);
    setLoadingAction(false)(dispatch);
  }

  const changeSelectUser = (user) => {
    setFieldPopupUserAction('selected', user)(dispatch);
  }

  const changeSearchUser = (searchStr) => {
    setFieldPopupUserAction('search', searchStr)(dispatch);
  }

  const changeSelectAsset = (asset) => {
    setFieldPopupAssetAction('selected', asset)(dispatch);
  }

  const changeSearchAsset = (searchStr) => {
    setFieldPopupAssetAction('search', searchStr)(dispatch);
  }

  const saveAssetId = () => {
    setFieldAction('assetId', createAssignmentState.popupAsset.selected)(dispatch);
  }

  const saveUserId = () => {
    setFieldAction('userId', createAssignmentState.popupUser.selected)(dispatch);
  }

  const changeField = (e) => {
    const {name, value} = e.target;
    setFieldAction(name, value)(dispatch);
    if(name == 'assignedDate') validateDate(value);
  }

  const validateDate = (value) => {
    const assignedDate = new Date(value);
    const currentDate = new Date();
    if(assignedDate < currentDate) {
      addErrorFieldAction('assignedDate', 'Select only current or future date for Assigned Date')(dispatch);
    } else {
      removeErrorFieldAction('assignedDate')(dispatch);
    }
  }

  const isBlankField = () => {
    if(createAssignmentState.form.assetId == null) return true;
    if(createAssignmentState.form.userId == null) return true;
    if(createAssignmentState.form.assignedDate == null || createAssignmentState.form.assignedDate.trim() == '') return true;
    return false;
  }

  const submit = () => {
    if(createAssignmentState.enableSubmit) {
      console.log("Submit");
    }
  }

  const value = {
    createAssignmentState,
    changeSelectUser,
    changeSearchUser,
    changeSelectAsset,
    changeSearchAsset,
    changeField,
    saveAssetId,
    saveUserId,
    submit,
    navigate
  };

  return (
    <CreateAssignmentContext.Provider value={value}>
      {props.children}
    </CreateAssignmentContext.Provider>
  );
};

export default CreateAssignmentProvider;

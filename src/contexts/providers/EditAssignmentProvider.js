import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addErrorFieldAction,
  loadAssetAction,
  loadAssignmentAction,
  loadUserAction,
  removeErrorFieldAction,
  setEnableSubmitAction,
  setFieldAction,
  setFieldPopupAssetAction,
  setFieldPopupUserAction,
  setLoadingAction,
  submitAction,
} from "../actions/EditAssignmentAction";
import EditAssignmentReducer from "../reducers/EditAssignmentReducer";
import { AssignmentContext } from "./AssignmentProvider";

export const EditAssignmentContext = createContext();
const now = new Date();
const initState = {
  popupAsset: {
    assets: [],
    search: "",
    selected: null,
  },
  popupUser: {
    users: [],
    search: "",
    selected: null,
  },
  form: {
    id: 1,
    userId: null,
    assetId: null,
    assignedDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    note: null,
  },
  error: {},
  enableSubmit: false,
};

const EditAssignmentProvider = (props) => {
  const { editAssignment } = useContext(AssignmentContext);
  const [editAssignmentState, dispatch] = useReducer(
    EditAssignmentReducer,
    initState
  );
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log(editAssignmentState);
  }, [editAssignmentState]);

  useEffect(() => {
    if (Object.keys(editAssignmentState.error).length > 0 || isBlankField()) {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [editAssignmentState.error]);

  const loadData = async () => {
    setLoadingAction(true)(dispatch);
    await loadUserAction()(dispatch);
    await loadAssetAction()(dispatch);
    await loadAssignmentAction(params.id)(dispatch);
    setLoadingAction(false)(dispatch);
  };

  const changeSelectUser = (userId) => {
    setFieldPopupUserAction("selected", userId)(dispatch);
  };

  const changeSearchUser = (searchStr) => {
    setFieldPopupUserAction("search", searchStr)(dispatch);
  };

  const changeSelectAsset = (assetId) => {
    setFieldPopupAssetAction("selected", assetId)(dispatch);
  };

  const changeSearchAsset = (searchStr) => {
    setFieldPopupAssetAction("search", searchStr)(dispatch);
  };

  const saveAssetId = () => {
    setFieldAction(
      "assetId",
      editAssignmentState.popupAsset.selected
    )(dispatch);
    validate("assetId", editAssignmentState.popupAsset.selected);
  };

  const saveUserId = () => {
    setFieldAction(
      "userId",
      editAssignmentState.popupUser.selected
    )(dispatch);
    validate("userId", editAssignmentState.popupUser.selected);
  };

  const changeField = (e) => {
    const { name, value } = e.target;
    setFieldAction(name, value)(dispatch);
    validate(name, value);
  };

  const validate = (name, value) => {
    if (name == "assignedDate") validateDate(value);
    else {
      if (name != "note") {
        validateDefault(name, value);
      } else {
        removeErrorFieldAction(name)(dispatch);
      }
    }
  };

  const validateDefault = (name, value) => {
    if (value == null)
      addErrorFieldAction(name, `Field ${name} is not null`)(dispatch);
    else removeErrorFieldAction(name)(dispatch);
  };

  const validateDate = (value) => {
    const currentTime = new Date();
    const assignedTime = new Date(value);
    const oneDay=1000*60*60*24
    const diff = Math.round((currentTime.getTime()-assignedTime.getTime())/oneDay)
    if (diff > 1) {
      addErrorFieldAction(
        "assignedDate",
        "Select only current or future date for Assigned Date"
      )(dispatch);
    } else {
      removeErrorFieldAction("assignedDate")(dispatch);
    }
  };

  const isBlankField = () => {
    if (editAssignmentState.form.assetId == null) return true;
    if (editAssignmentState.form.userId == null) return true;
    if (
      editAssignmentState.form.assignedDate == null ||
      editAssignmentState.form.assignedDate.trim() == ""
    )
      return true;
    return false;
  };

  const submit = () => {
    if (editAssignmentState.enableSubmit) {
      submitAction(editAssignmentState.form, navigate, editAssignment)(dispatch);
    }
  };

  const value = {
    editAssignmentState,
    changeSelectUser,
    changeSearchUser,
    changeSelectAsset,
    changeSearchAsset,
    changeField,
    saveAssetId,
    saveUserId,
    submit,
    navigate,
  };

  return (
    <EditAssignmentContext.Provider value={value}>
      {props.children}
    </EditAssignmentContext.Provider>
  );
};

export default EditAssignmentProvider;
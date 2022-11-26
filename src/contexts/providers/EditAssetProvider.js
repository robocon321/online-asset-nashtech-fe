import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  addErrorFieldAction,
  addNewCategoryAction,
  addNewCategoryErrorFieldAction,
  loadCategoriesAction,
  removeErrorFieldAction,
  removeNewCategoryErrorFieldAction,
  resetNewCategoryAction,
  setEnableSubmitAction,
  setFieldAction,
  setFieldCategoryAction,
  setLoadingAction,
  setNewCategoryFieldAction,
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
    state: "AVAILABLE",
    categoryName: null,
    categoryCode: null,
  },
  newCategory: {
    name: null,
    code: null,

    isShowInput: false,
    enableSubmit: false,
    error: {},
  },
  enableSubmit: false,
  error: {},
  categories: [],
};

const EditAssetProvider = (props) => {
  const [editAssetState, dispatch] = useReducer(
    EditAssetReducer,
    initState
  );
  const { addAsset } = useContext(AssetContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(editAssetState.error).length > 0 || isBlankField()) {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [editAssetState.error]);

  useEffect(() => {
    if (
      Object.keys(editAssetState.newCategory.error).length > 0 ||
      isBlankFieldNewCategory()
    ) {
      setNewCategoryFieldAction("enableSubmit", false)(dispatch);
    } else {
      setNewCategoryFieldAction("enableSubmit", true)(dispatch);
    }
  }, [editAssetState.newCategory.error]);

  useEffect(() => {
    console.log(editAssetState);
  }, [editAssetState]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoadingAction(true)(dispatch);
    await loadCategoriesAction()(dispatch);
    setLoadingAction(false)(dispatch);
  }

  const changeField = (e) => {
    const { name, value } = e.target;
    setFieldAction(name, value)(dispatch);
    validateField(name, value);
  };

  const validateField = (name, value) => {
    if (value == null || value.trim() == "") addErrorFieldAction(name, `Field ${name} is not blank`)(dispatch);
    else removeErrorFieldAction(name)(dispatch);
  };

  const changeCategoryField = (code) => {
    if (code == null || code.trim() == "") addErrorFieldAction('code', `Field category is not blank`)(dispatch);
    else removeErrorFieldAction('code')(dispatch);
    setFieldCategoryAction(code)(dispatch);    
    closeNewCategoryField();
  };

  const changeNewCategoryField = (e) => {
    const { name, value } = e.target;
    setNewCategoryFieldAction(name, value)(dispatch);
    validateFieldNewCategory(name, value);
  };

  const openNewCategoryField = () => {
    setNewCategoryFieldAction("isShowInput", true)(dispatch);
  };

  const closeNewCategoryField = () => {
    resetNewCategoryAction()(dispatch);
  };

  const addNewCategory = () => {
    addNewCategoryAction(
      editAssetState.newCategory.name,
      editAssetState.newCategory.code
    )(dispatch);
    closeNewCategoryField();
  };

  const validateFieldNewCategory = (name, value) => {
    switch (name) {
      case "name":
        validateNewCategoryName(value);
        break;
      case "code":
        validateNewCategoryCode(value);
        break;
      default:
        break;
    }
  };

  const validateNewCategoryName = (value) => {
    const category = editAssetState.categories.find(
      (item) => item.name == value
    );
    if (category) {
      addNewCategoryErrorFieldAction(
        "name",
        "Category is already existed. Please enter a different category"
      )(dispatch);
    } else {
      removeNewCategoryErrorFieldAction("name")(dispatch);
    }
  };

  const validateNewCategoryCode = (value) => {
    const category = editAssetState.categories.find(
      (item) => item.code == value
    );
    if (category) {
      addNewCategoryErrorFieldAction(
        "code",
        "Prefix is already existed. Please enter a different prefix"
      )(dispatch);
    } else {
      removeNewCategoryErrorFieldAction("code")(dispatch);
    }
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

    if (
      editAssetState.form.categoryName == null ||
      editAssetState.form.categoryName.trim() == ""
    )
      return true;
  
    if (
      editAssetState.form.categoryCode == null ||
      editAssetState.form.categoryCode.trim() == ""
    )
      return true;

    if (editAssetState.form.state == null) return true;

    return false;
  };

  const isBlankFieldNewCategory = () => {
    if (
      editAssetState.newCategory.name == null ||
      editAssetState.newCategory.name.trim() == ""
    )
      return true;

    if (
      editAssetState.newCategory.code == null ||
      editAssetState.newCategory.code.trim() == ""
    )
      return true;

    return false;
  };

  const submit = () => {
    submitAction({...editAssetState.form}, navigate, addAsset)(dispatch);
  }

  const value = {
    editAssetState,
    changeField,
    changeNewCategoryField,
    openNewCategoryField,
    closeNewCategoryField,
    addNewCategory,
    changeCategoryField,
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

import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { getAge, isDay, isGreater } from "../../utils/DateUtils";
import { setEnableSubmitAction, setErrorAction, setFieldAction, submitAction } from "../actions/CreateUserAction";
import CreateUserReducer from '../reducers/CreateUserReducer';

export const CreateUserContext = createContext();
const initState = {
  form: {
    firstName: '',
    lastName: '',
    dob: '',
    gender: true,
    joinedDate: '',
    type: 'ADMIN'
  },
  status: {
    isLoading: false,
    success: true,
    message: ''
  },
  error: {},
  enableSubmit: false
}

const CreateUserProvider = props => {
  const navigate = useNavigate();
  const [createUserState, dispatch] = useReducer(CreateUserReducer, initState);

  useEffect(() => {
    console.log(createUserState);
  }, [createUserState]);

  useEffect(() => {
    validateWhenChange();
  }, [createUserState.form]);

  const validateWhenChange = async () => {
    const isBlank = isBlankField();
    setEnableSubmitAction(isBlank)(dispatch);
  }

  const changeField = e => {
    e.preventDefault();
    setFieldAction(e.target.name, e.target.value)(dispatch);
  }

  const isBlankField = () => {
    if(createUserState.form.firstName == null || createUserState.form.firstName.trim() == '') return false;
    if(createUserState.form.lastName == null || createUserState.form.lastName.trim() == '') return false;
    if(createUserState.form.dob == null || createUserState.form.dob.trim() == '') return false;
    if(createUserState.form.joinedDate == null || createUserState.form.joinedDate.trim() == '') return false;
    if(createUserState.form.type == null) return false;
    if(createUserState.form.gender == null) return false;
    return true;
  }

  const submit = () => {
    if(validate()) {
      setErrorAction({})(dispatch);
      submitAction(createUserState.form, navigate)(dispatch);
    }
  }

  const validate = () => {
    const error = {};
    const { dob, joinedDate } =  createUserState.form;

    if(getAge(dob) < 18) {
      error.dob = 'User is under 18. Please select a different date';
    }
    if(isGreater(dob, joinedDate)) {
      error.joinedDate = 'Joined date is not later than Date of Birth. Please select a different date';
    }
    if(isDay(joinedDate, 0) || isDay(joinedDate, 6)) {
      if(error.joinedDate == null) {
        error.joinedDate = 'Joined date is Saturday or Sunday. Please select a different date';
      } else {
        error.joinedDate += '. Joined date is Saturday or Sunday. Please select a different date';
      }
    }

    setErrorAction(error)(dispatch);

    if(Object.keys(error).length > 0) {
      return false;
    } else {
      return true;
    }
  }

  const value = {
    createUserState,
    changeField,
    submit,
    navigate
  }

  return (
    <CreateUserContext.Provider value={value}>
      {props.children}
    </CreateUserContext.Provider>
  )
}

export default CreateUserProvider;
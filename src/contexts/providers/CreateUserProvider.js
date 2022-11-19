import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { changeToSlug } from "../../utils/ConvertString";
import { getAge, isDay, isGreater } from "../../utils/DateUtils";
import { validateFirstName, validateLastname } from "../../utils/Validate";
import { setEnableSubmitAction, setErrorAction, setErrorFieldAction, setFieldAction, submitAction } from "../actions/CreateUserAction";
import CreateUserReducer from '../reducers/CreateUserReducer';

export const CreateUserContext = createContext();
const initState = {
  form: {
    firstName: '',
    lastName: '',
    dob: null,
    gender: true,
    joinedDate: null,
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
    validateDate();
  }, [createUserState.form.dob, createUserState.form.joinedDate]);

  useEffect(() => {
    if(Object.keys(createUserState.error).length > 0 || isBlankField()) {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [createUserState.error]);

  const changeField = e => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setFieldAction(name, value)(dispatch);
    validateField(name, value);
  }

  const validateField = (name, value) => {   
    value = value.trim(); 

    if(name == 'firstName') {
      const slug = changeToSlug(value);
      console.log(value, slug);
      if(!validateFirstName(slug)) {
        if(value.length > 50) {
          setErrorFieldAction(name, "First name is incorrect format. Max length is 50")(dispatch);
        } else {
          setErrorFieldAction(name, "First name is incorrect format")(dispatch);
        }
      } else {
        if(value.length > 50) {
          setErrorFieldAction(name, "Max length is 50")(dispatch);
        } else {
          setErrorFieldAction(name, null)(dispatch);     
        }   
      }
    } else if(name == 'lastName') {
      const slug = changeToSlug(value);

      if(!validateLastname(slug)) {
        if(value.length > 50) {
          setErrorFieldAction(name, "Last name is incorrect format. Max length is 50")(dispatch);
        } else {
          setErrorFieldAction(name, "Last name is incorrect format")(dispatch);
        }
      } else {
        if(value.length > 50) {
          setErrorFieldAction(name, "Max length is 50")(dispatch);
        } else {
          setErrorFieldAction(name, null)(dispatch);     
        }
      }
    }
  }
 
  const validateDate = () => {
    const error = {};
    const { dob, joinedDate } =  createUserState.form;

    if(dob && getAge(dob) < 18) {
      error.dob = 'User is under 18. Please select a different date';
    }
    if(dob && joinedDate && isGreater(dob, joinedDate)) {
      error.joinedDate = 'Joined date is not later than Date of Birth. Please select a different date';
    }
    if(joinedDate && (isDay(joinedDate, 0) || isDay(joinedDate, 6))) {
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

  const isBlankField = () => {
    if(createUserState.form.firstName == null || createUserState.form.firstName.trim() == '') return true;
    if(createUserState.form.lastName == null || createUserState.form.lastName.trim() == '') return true;
    if(createUserState.form.dob == null || createUserState.form.dob.trim() == '') return true;
    if(createUserState.form.joinedDate == null || createUserState.form.joinedDate.trim() == '') return true;
    if(createUserState.form.type == null) return true;
    if(createUserState.form.gender == null) return true;
    return false;
  }

  const submit = () => {
    if(Object.keys(createUserState.error).length == 0) {
      submitAction(createUserState.form, navigate)(dispatch);
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
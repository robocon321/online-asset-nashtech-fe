import { ACTIONS } from "../actions/CreateUserAction";

const reducer = (state, {type,payload}) => {
  switch(type) {
    case ACTIONS.SET_FIELD:
      state = {...state, form: {...state.form, [payload.name] : payload.value}}
      break;
    case ACTIONS.SET_ENABLE_SUBMIT:
      state = {...state, enableSubmit: payload};
      break;
    case ACTIONS.SET_ERROR:
      state = {...state, error: payload};
      break;    
    default: 
      break;
  }

  return {...state};
}

export default reducer;
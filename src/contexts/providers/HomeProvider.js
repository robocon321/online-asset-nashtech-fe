import { createContext, useReducer } from 'react';
import { setTitleAction } from '../actions/HomeAction';

import HomeReducer from '../reducers/HomeReducer';

export const HomeContext = createContext();

const initState = {
  title: 'Home page'
}

const HomeProvider = props => {
  const [ homeState, dispatch ] = useReducer(HomeReducer, initState);
  
  const changeTitle = () => {
    setTitleAction('Change title')(dispatch);
  }

  const value = {
    homeState,
    changeTitle
  }

  return (
    <HomeContext.Provider value={value}>
      {props.children}
    </HomeContext.Provider>
  )
}

export default HomeProvider;
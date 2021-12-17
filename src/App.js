import { HashRouter } from 'react-router-dom';
import { Router } from './route/Router';
import AppContext from './contexts/AppContext';
import { useReducer } from 'react';
import reducer from './reducers';

export const App = () => {

  const initialState = {
    user: [],
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <AppContext.Provider value={{state, dispatch}}>
      <HashRouter basename='/shift_mobile/'>
        <Router />
      </HashRouter>
    </AppContext.Provider>
  );
}
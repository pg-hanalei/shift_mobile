import { useHotToast }  from "./hooks/useHotToast";
import { HashRouter } from 'react-router-dom';
import { Router } from './route/Router';
import AppContext from './contexts/AppContext';
import { useReducer } from 'react';
import reducer from './reducers';

export const App = () => {

  const { Toaster, successToast } = useHotToast();

  const logoutToast = (text) => successToast(text);

  const initialState = {
    user: [],
    shift: [],
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <AppContext.Provider value={{state, dispatch, logoutToast}}>
      <HashRouter basename='/shift_mobile/'>
        <Router />
      </HashRouter>
      <Toaster />
    </AppContext.Provider>
  );
}
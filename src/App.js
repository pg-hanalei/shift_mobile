import { useHotToast }  from "./hooks/useHotToast";
import { HashRouter } from 'react-router-dom';
import { Router } from './route/Router';
import AppContext from './contexts/AppContext';
import { useReducer } from 'react';
import reducer from './reducers';

export const App = () => {

  // トースト用API
  const { Toaster, successToast, errorToast } = useHotToast();

  // 成功メッセージ用
  const showSuccessToast = (text) => successToast(text);
  // 失敗メッセージ用
  const showErrorToast = (text) => errorToast(text);

  // グローバル ユーザー情報・シフト情報 初期化
  const initialState = {
    user: [],
    shift: [],
  }

  // 状態管理用API 状態(state)と変更(dispatch)
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <AppContext.Provider value={{state, dispatch, showSuccessToast, showErrorToast}}>
      <HashRouter basename='/shift_mobile/'>
        <Router />
      </HashRouter>
      <Toaster />
    </AppContext.Provider>
  );
}
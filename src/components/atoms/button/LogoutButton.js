import axios from 'axios';
import AppContext from '../../../contexts/AppContext';
import {memo, useContext} from 'react';
import { useHistory } from "react-router-dom";

export const LogoutButton = memo(({className="", logoutToast}) => {

    const history = useHistory();

    // グローバル変数を扱うAPI
  const {state, dispatch} = useContext(AppContext);


    const onClickLogout = () =>{

        const data = {
            empid: state.user.empid,
          }

        // axiosでAPIを叩き、DBのtokenを変更
        axios.post(`${process.env.REACT_APP_DOMAIN}/shift_mobile/logout.php`, data , {
            withCredentials: true,
          }).then( (res) => {
            
            // storeも削除する必要がある

            console.log(res);

    
          }).catch((err)=>{
            console.log(err);
          })

        // ブラウザ側へのcookieの返却はなし
        
        // ログイン完了のtoastを出力
        logoutToast();

        // ログイン画面に戻す
        history.push('/');
    }

    return(
        <button className={`btn btn-lg btn-info btn-block p-btn-logout ${className}`} onClick={onClickLogout}>申請 終了</button>
    )
});
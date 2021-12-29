import axios from "axios";
import AppContext from "../../../contexts/AppContext";
import { memo, useContext } from "react";
import { useHistory } from "react-router-dom";
import { DELETE_SHIFT, DELETE_USER } from "../../../actions";

export const LogoutButton = memo(({ className = "", logoutToast }) => {
  const history = useHistory();

  // グローバル変数を扱うAPI
  const { state, dispatch } = useContext(AppContext);

  const onClickLogout = () => {
    const data = {
      empid: state.user.empid,
    };

    // axiosでAPIを叩き、DBのtokenを変更
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/shift_mobile/logout.php`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);

        // storeも削除する必要がある
        dispatch({
          type: DELETE_USER,
        });

        dispatch({
          type: DELETE_SHIFT,
        });

        // ブラウザ側へのcookieの返却はなし

        // ログイン完了のtoastを出力
        logoutToast("ログアウトしました");

        // ログイン画面に戻す
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      className={`btn btn-lg btn-info btn-block p-btn-logout ${className}`}
      onClick={onClickLogout}
    >
      申請 終了
    </button>
  );
});

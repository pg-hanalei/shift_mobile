import axios from "axios";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Login = () => {

    const history = useHistory();

    const onClickLogin = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        const data = {
            empid: '000801',
            password: '123456',
        }

        //TODO::ルートアドレスをenvファイルでとれるようにする？
        axios.post('http://localhost:80/shift_request_api/login.php', data)
        .then((res)=>{
            console.log(res.data.user.token);

            //res.data.tokenを取得してcookieにhttponly属性で保持 ageは秒数 本番ではSecure も追加する（https対応）
            const cookieString = `TOKEN=${res.data.user.token};Max-Age=300;Domain=localhost:80;`;
            console.log(cookieString)
            document.cookie = cookieString;

            //最終問題無ければカレンダーページへ遷移
            // history.push({
            //     pathname: '/calendar',
            //     state: { name: res.data.name }
            // })
        })
        .catch((err)=>{
            console.log(err);
        })
        
    },[]);

    const form = {
        width: "100%",
        maxWidth: "420px",
        padding: "15px",
        margin: "auto",
    }
    return(
        <div className="container">
            <form style={form}>
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">シフト　希望申請</h1>
                </div>

                <div className="form-label-group">
                    <label htmlFor="inputName">ユーザー名</label>
                    <input type="text" id="inputName" className="form-control" placeholder="ユーザー名を入力" required autoFocus />
                    
                </div>

                <div className="form-label-group" style={{marginTop: "20px"}}>
                    <label htmlFor="inputPassword">パスワード</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="パスワードを入力" required />
                    
                </div>

                <div className="form-label-group" style={{marginTop:"28px"}}>
                    <PrimaryButton onClick={onClickLogin}>ログイン</PrimaryButton>
                </div>
                <span style={{display:"block", marginTop:"12px"}}>希望の申請であり、シフトを確定するものではありません</span>
            </form>
            
        </div>
    );
}
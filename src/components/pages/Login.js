import React from "react";
import { useHistory } from "react-router-dom";

export const Login = () => {

    const history = useHistory();

    const form = {
        width: "100%",
        maxWidth: "420px",
        padding: "15px",
        margin: "auto",
    }
    return(
        <>
            <form className="form-signin" style={form}>
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">シフト　希望申請</h1>
                </div>

                <div className="form-label-group">
                    <label htmlFor="inputName">ユーザー名</label>
                    <input type="text" id="inputName" className="form-control" placeholder="ユーザー名を入力" required autoFocus />
                    
                </div>

                <div className="form-label-group">
                    <label htmlFor="inputPassword">パスワード</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="パスワードを入力" required />
                    
                </div>

                <div className="form-label-group" style={{marginTop:"20px"}}>
                     <button className="btn btn-lg btn-primary btn-block" onClick={()=>history.push('/calendar')}>Sign in</button>
                </div>
                
            </form>
        </>
    );
}
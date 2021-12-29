import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { FETCH_USER } from "../../actions";
import AppContext from "../../contexts/AppContext";
import { InputText } from "../atoms/input/InputText";

export const Login = () => {

    const { dispatch } = useContext(AppContext);

    const history = useHistory();

    const [ empid, setEmpid ] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmpid = (e)=>setEmpid(e.target.value);
    const onChangePassword = (e)=>setPassword(e.target.value);

    //ログインボタン
    const onClickLogin = useCallback((e) => {
        //ボタンイベント無効
        e.preventDefault();
        e.stopPropagation();

        const data = {
            empid,
            password,
        }

        axios.post(`${process.env.REACT_APP_DOMAIN}/shift_mobile/login.php`, data,{
            withCredentials: true,
          })
        .then((res)=>{
            // console.log(res.data.user);

            const {empid, emp_name, stoid, sto_name } = res.data.user;

            dispatch({
                type: FETCH_USER,
                empid: empid,
                empname: emp_name,
                stoid,
                stoname: sto_name
            })

            //カレンダーページへ遷移
            history.push('/calendar');
        })
        .catch((err)=>{
            console.log(err);
        })
        
    },[dispatch, history, empid, password]);

    
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
                    <InputText id="inputName" placeholder="ユーザー名を入力" value={empid} onChange={onChangeEmpid}>社員番号</InputText>
                </div>

                <div className="form-label-group" style={{marginTop: "20px"}}>
                    <InputText id="inputPassword" type="password" placeholder="パスワードを入力" value={password} onChange={onChangePassword}>パスワード</InputText>
                </div>

                <div className="form-label-group" style={{marginTop:"28px"}}>
                    <PrimaryButton onClick={onClickLogin}>ログイン</PrimaryButton>
                </div>
                <span style={{display:"block", marginTop:"12px"}}>希望の申請であり、シフトを確定するものではありません</span>
            </form>
            
        </div>
    );
}
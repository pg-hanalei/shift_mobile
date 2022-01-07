import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../../contexts/AppContext";
import { InputText } from "../atoms/input/InputText";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Signup = () => {
  const { showSuccessToast, showErrorToast } = useContext(AppContext);

  const [empid, setEmpid] = useState("");
  const [empname, setEmpname] = useState("");
  const [stoid, setStoid] = useState("");
  const [storeList, setStoreList] = useState([]);
  const [password, setPassword] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const [btnMessage, setBtnMessage] = useState("すべて入力してください");
  const [disabled, setDisabled] = useState(true);

  const onChangeEmpid = (e) => {
    const target = e.target.value;

    if (target.match(/^[0-9]*$/)) {
    } else {
      showErrorToast("半角数字で入力");
      setEmpid((prev) => prev);
    }

    if (target.length > 6) {
      showErrorToast("6桁で入力");
      setEmpid((prev) => prev);
    } else if (target.length === 6) {
      const data = {
        empid: target,
      };

      // 未登録の社員番号か確認する
      axios
        .post(
          `${process.env.REACT_APP_DOMAIN}/shift_mobile/empid_dup.php`,
          data
        )
        .then((res) => {
          if (res.data.error) {
            showErrorToast("登録済みの社員番号です");
          } else {
            setEmpid(target);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setEmpid(target);
    }
  };

  const onChangeEmpname = (e) => {
    const target = e.target.value;
    if (target.length > 40) {
      showErrorToast("40文字以内です");
      setEmpname((prev) => prev);
    } else {
      setEmpname(target);
    }
  };

  const onChangeStore = (e) => {
    const target = e.target.value;
    if (target !== "") {
      document.getElementById("selectStore").style.color = "#495057";
      setStoid(target);
    } else {
      document.getElementById("selectStore").style.color = "#6c757d";
      setStoid("");
    }
  };

  const onChangePassword = (e) => {
    const target = e.target.value;
    if (target.length > 40) {
      showErrorToast("40文字以内です");
      setPassword((prev) => prev);
    } else {
      setPassword(e.target.value);
    }
  };

  const onChangeAuthPassword = (e) => setAuthPassword(e.target.value);

  // 店舗情報取得
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN}/shift_mobile/select_store_info.php`)
      .then((res) => {
        console.log("店舗情報取得");
        setStoreList(res.data.store);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // フォーム入力状態を確認
  useEffect(() => {
    if (
      empid === "" ||
      empid.length !== 6 ||
      empname === "" ||
      stoid === "" ||
      password === "" ||
      authPassword === ""
    ) {
      setDisabled(true);
      setBtnMessage("すべて入力してください");
    } else {
      setDisabled(false);
      setBtnMessage("新規登録");
    }
  }, [empid, empname, stoid, password, authPassword]);

  //ログインボタン
  const onClickSignup = useCallback(
    (e) => {
      //ボタンイベント無効
      e.preventDefault();
      e.stopPropagation();

      const data = {
        empid,
        emp_name: empname,
        stoid: stoid,
        password: password,
        auth_signup_password: authPassword,
      };

      console.log(data);

      axios
        .post(`${process.env.REACT_APP_DOMAIN}/shift_mobile/signup.php`, data, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.error) {
            showErrorToast(res.data.message);
          } else {
            showSuccessToast("登録に成功しました");

            setEmpid("");
            setEmpname("");
            setStoid("");
            document.getElementById("selectStore").options[0].selected = true;

            setPassword("");
            setAuthPassword("");
            setBtnMessage("すべて入力してください");
            setDisabled(true);
          }
        })
        .catch((err) => {
          console.log(err);
          showErrorToast("登録に失敗しました");
        });
    },
    [
      empid,
      empname,
      stoid,
      password,
      authPassword,
      showSuccessToast,
      showErrorToast,
    ]
  );

  const form = {
    width: "100%",
    maxWidth: "420px",
    padding: "15px",
    margin: "auto",
  };
  return (
    <div className="container">
      <form style={form}>
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 font-weight-normal">ユーザー新規登録</h1>
        </div>

        <div className="form-label-group">
          <InputText
            id="inputEmpid"
            placeholder="社員番号6桁を入力"
            value={empid}
            onChange={onChangeEmpid}
          >
            社員番号（半角数字6桁）
          </InputText>
        </div>

        <div className="form-label-group" style={{ marginTop: "16px" }}>
          <InputText
            id="inputEmpName"
            placeholder="ユーザー名を入力"
            value={empname}
            onChange={onChangeEmpname}
          >
            名前（表示名）
          </InputText>
        </div>

        <div className="form-group" style={{ marginTop: "16px" }}>
          <label htmlFor="selectStore">所属店舗</label>
          {/* 選択されたら文字色を戻す　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　・・・・・・・・・・・ */}
          <select
            className="form-control"
            id="selectStore"
            style={{ color: "#6c757d" }}
            onChange={onChangeStore}
          >
            <option value="">店舗を選択して下さい</option>
            {storeList.map((store) => {
              return (
                <option key={store.stoid} value={store.stoid}>
                  {store.sto_name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-label-group" style={{ marginTop: "20px" }}>
          <InputText
            id="inputPassword"
            type="password"
            placeholder="パスワードを入力"
            value={password}
            onChange={onChangePassword}
          >
            パスワード（40文字以内）
          </InputText>
        </div>

        <div className="form-label-group" style={{ marginTop: "20px" }}>
          <InputText
            id="inputAuthPassword"
            type="password"
            placeholder="登録者パスワードを入力"
            value={authPassword}
            onChange={onChangeAuthPassword}
          >
            登録者確認パスワード
          </InputText>
        </div>

        <div className="form-label-group" style={{ marginTop: "28px" }}>
          <PrimaryButton onClick={onClickSignup} disabled={disabled}>
            {btnMessage}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

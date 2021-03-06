import React, { useCallback, useEffect, useState, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { useModal } from "react-hooks-use-modal";
import { useHistory } from "react-router-dom";
import { ModalRegistry } from "../molecules/ModalRegistry";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { SelectBoxYearMonth } from "../atoms/select/SelectBoxYearMonth";
import { ShiftListTr } from "../atoms/table/ShiftListTr";
import { FetchLoginUserByToken, FetchShiftData } from "../../utility/MyFunc";
import { LogoutButton } from "../atoms/button/LogoutButton";
import { Spinner } from "../atoms/spinner/Spinner";

export const ShiftList = () => {
  
  // スピナーの表示状態
  const [isLoading, setIsLoading] = useState(false);

  // グローバル変数を扱うAPI
  const { state, dispatch, showSuccessToast, showErrorToast } =
    useContext(AppContext);

  // モーダル表示用
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  // シフト一覧表示用
  const [shiftData, setShiftData] = useState([]);

  // ページ遷移用API
  const history = useHistory();

  // モーダル表示API
  const [Modal, open, close] = useModal("root", {
    preventScroll: false,
    closeOnOverlayClick: false,
  });

  // 検索ボタンを押したら、テーブルを出すと共に、年月を格納する
  const onClickShiftSearch = useCallback((e) => {
    e.preventDefault();

    // セレクトボックスで選択した年と月を取得
    const targetYear = document.getElementById("shiftListYear").value;
    const targetMonth = document.getElementById("shiftListMonth").value;

    console.log(targetYear);
    console.log(targetMonth);

    setYear(targetYear);
    setMonth(targetMonth);
  }, []);

  useEffect(() => {
    // ページリロード対応
    FetchLoginUserByToken(state, dispatch);
  }, []);

  //　シフトデータ取得
  useEffect(() => {
    setIsLoading(true);
    FetchShiftData(state, dispatch, year, month);
  }, [year, month, dispatch, state.user.empid]);

  useEffect(() => {
    if (state.shift !== undefined) {
      setTimeout(() => setIsLoading(false), 800);
    }
  }, [state]);

  //　レンダリング時にstoreにある自分のシフトをテーブルに表示
  useEffect(() => {
    if (state.user.length < 1) {
      return;
    }

    setShiftData(
      state.shift.map((shiftData) => {
        // {date: "12/1", time: "8:00-12:00"}
        console.log(shiftData);
        return {
          date: `${new String(shiftData.date).split("-")[1]}/${
            new String(shiftData.date).split("-")[2]
          }`,
          time: `${new String(shiftData.start_time).substring(
            0,
            5
          )}-${new String(shiftData.end_time).substring(0, 5)}`,
        };
      })
    );
  }, [state]);

  return (
    <>
      <div className="container">
        <h3 id="user_info">{state.user.empname}</h3>
        <h5 id="" style={{marginBottom: "28px"}}>{state.user.stoname}</h5>
        <h5>申請内容一覧</h5>
        <div className="u-mt-40">
          <form>
            <div className="form-group">
              <label htmlFor="shiftListYear"></label>
              <SelectBoxYearMonth id="shiftListYear" tani="年" value={year}>
                <option value={new Date().getFullYear() - 1}>
                  {new Date().getFullYear() - 1}
                </option>
                <option value={new Date().getFullYear()}>
                  {new Date().getFullYear()}
                </option>
                <option value={new Date().getFullYear() + 1}>
                  {new Date().getFullYear() + 1}
                </option>
              </SelectBoxYearMonth>
            </div>
            <div className="form-group">
              <label htmlFor="shiftListMonth"></label>
              <SelectBoxYearMonth id="shiftListMonth" tani="月" value={month}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </SelectBoxYearMonth>
            </div>
            <div
              style={{
                textAlign: "center",
                margin: "40px auto 0px",
              }}
            >
              <PrimaryButton onClick={onClickShiftSearch}>検索</PrimaryButton>
            </div>
          </form>
        </div>
        {isLoading && <Spinner />}
        {isLoading || (
          <div>
            <table
              className="table table-striped u-mt-40"
              style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
            >
              <thead>
                <tr>
                  <th scope="col" style={{ width: "10%", minWidth: "80px" }}>
                    日付
                  </th>
                  <th scope="col">時間</th>
                  <th scope="col" style={{ width: "30%" }}></th>
                </tr>
              </thead>
              <tbody className="table-striped">
                {shiftData.length > 0 &&
                  shiftData.map((data) => (
                    <ShiftListTr
                      key={data.date}
                      day={data.date}
                      time={data.time}
                      setDay={setDay}
                      setTime={setTime}
                      open={open}
                    />
                  ))}
                {shiftData.length <= 0 && (
                  <tr>
                    <td colSpan={3}>登録データはありません</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div style={{ textAlign: "center", margin: "40px auto 0px" }}>
              <PrimaryButton
                onClick={() =>
                  history.push({
                    pathname: "/calendar",
                    state: { year, month },
                  })
                }
              >
                カレンダー
              </PrimaryButton>
            </div>
            <div
              style={{
                width: "80%",
                textAlign: "center",
                margin: "100px auto 80px",
              }}
            >
              <LogoutButton />
            </div>
          </div>
        )}
      </div>

      <Modal>
        <ModalRegistry
          year={year}
          month={month}
          day={day}
          time={time}
          close={close}
        />
      </Modal>
    </>
  );
};

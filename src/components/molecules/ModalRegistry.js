import { memo, useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import axios from "axios";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { FetchShiftData } from "../../utility/MyFunc";

export const ModalRegistry = memo((props) => {
  
  const { year, month, day, time, close } = props;

  // グローバル変数を扱うAPI
  const { state, dispatch, showSuccessToast, showErrorToast } = useContext(AppContext);


  // 開始時間(時)
  const [startTimeHour, setStartTimeHour] = useState(time.split(":")[0]);

  // 開始時間(分)
  const [startTimeMinute, setStartTimeMinute] = useState(
    time.split("-")[0].split(":")[1]
  );

  // 終了時間(時)
  const [endTimeHour, setEndTimeHour] = useState(
    time.split("-")[1].split(":")[0]
  );

  // 終了時間(分)
  const [endTimeMinute, setEndTimeMinute] = useState(
    time.split("-")[1].split(":")[1]
  );

  const onClickRegister = (e) => {
    e.preventDefault();

    // 新規かアップデートか 1:新規 2:更新
    let register_kind = 0;

    // 開いたモーダルの日付 ex: 2021-12-26 1桁はバグになるので0埋め
    const targetDate = `${year}-${new String(month).padStart(
      2,
      "0"
    )}-${new String(day).padStart(2, "0")}`;
    console.log(targetDate);
    console.log(state.shift);

    // 開始時間
    const start_time = `${startTimeHour}:${startTimeMinute}:00`;

    // 終了時間
    const end_time = `${endTimeHour}:${endTimeMinute}:00`;

    // 入力チェック
    if (start_time >= end_time) {
      showErrorToast("時間を確認してください");
      return;
    }

    if (state.shift !== undefined) {
      //state内に対象の日付が存在しなければ新規、あれば更新
      const result = state.shift.filter((data) => {
        return data.date === targetDate;
      });

      // result {date: '2021-12-18', start_time: '10:00:00', end_time: '18:00:00'}
      if (result.length <= 0) {
        // 新規
        register_kind = 1;
      } else {
        // 更新
        register_kind = 2;
      }

      const data = {
        empid: state.user.empid,
        stoid: state.user.stoid,
        date: targetDate,
        start_time,
        end_time,
        register_kind,
      };

      console.log(data);

      // shift_registerのAPIに送信する
      axios
        .post(
          `${process.env.REACT_APP_DOMAIN}/shift_mobile/shift_register.php`,
          data,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data.message);

          if (res.data.message === "本期間は締め切りました") {
            showErrorToast(res.data.message);
          } else {
            FetchShiftData(state, dispatch, year, month);

            showSuccessToast("登録が完了しました");
          }

          close();
        })
        .catch((err) => {
          //console.log(err);
          showErrorToast(err.data);
        });
    }
  };

  const onClickDelete = (e) => {
    e.preventDefault();

    // 新規かアップデートか 3:削除
    let register_kind = 3;

    // 開いたモーダルの日付 ex: 2021-12-26
    const targetDate = `${year}-${month}-${day}`;

    const data = {
      empid: state.user.empid,
      stoid: state.user.stoid,
      date: targetDate,
      register_kind,
    };

    // shift_registerのAPIに送信する
    axios
      .post(
        `${process.env.REACT_APP_DOMAIN}/shift_mobile/shift_register.php`,
        data,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);

        if (res.data.message === "本期間は締め切りました") {
          showErrorToast(res.data.message);
        } else {
          FetchShiftData(state, dispatch, year, month);
          showSuccessToast("申請を取り下げました");
        }

        close();
      })
      .catch((err) => {
        console.log(err);
        showErrorToast("申請の取り下げに失敗しました(02)");
      });
  };

  const modalStyle = {
    backgroundColor: "#fff",
    padding: "20px 40px",
    borderRadius: "10px",
    width: "300px",
  };

  const selectStyle = {
    width: "60px",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "700",
    padding: "4px",
  };

  const taniStyle = {
    fontSize: "20px",
    paddingLeft: "8px",
    verticalAlign: "bottom",
  };

  return (
    <div style={modalStyle}>
      <h5>{`${year}年${month}月${day}日`}</h5>

      <form>
        <h6>開始</h6>
        <div className="d-flex">
          <div className="form-group">
            <label htmlFor="registryStartHour"></label>
            <select
              className="form-control form-control-lg"
              style={selectStyle}
              id="registryStartHour"
              defaultValue={startTimeHour}
              onChange={(e) => setStartTimeHour(e.target.value)}
            >
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
            </select>
            <span style={taniStyle}>時</span>
          </div>

          <div className="form-group u-ml--8">
            <label htmlFor="registryStartMinute"></label>
            <select
              className="form-control form-control-lg"
              style={selectStyle}
              id="registryStartMinute"
              defaultValue={startTimeMinute}
              onChange={(e) => setStartTimeMinute(e.target.value)}
            >
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <span style={taniStyle}>分</span>
          </div>
        </div>

        <h6>終了</h6>
        <div className="d-flex">
          <div className="form-group">
            <label htmlFor="registryEndHour"></label>
            <select
              className="form-control form-control-lg"
              style={selectStyle}
              id="registryEndHour"
              defaultValue={endTimeHour}
              onChange={(e) => setEndTimeHour(e.target.value)}
            >
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
            </select>
            <span style={taniStyle}>時</span>
          </div>

          <div className="form-group u-ml--8">
            <label htmlFor="registryEndMinute"></label>
            <select
              className="form-control form-control-lg"
              style={selectStyle}
              id="registryEndMinute"
              defaultValue={endTimeMinute}
              onChange={(e) => setEndTimeMinute(e.target.value)}
            >
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <span style={taniStyle}>分</span>
          </div>
        </div>

        <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          <PrimaryButton onClick={onClickRegister}>申請する</PrimaryButton>
          <br />
          <PrimaryButton onClick={onClickDelete} className={"btn-danger"}>
            取り下げる
          </PrimaryButton>
          <br />
          <PrimaryButton onClick={close} className={"btn-secondary"}>
            閉じる
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
});

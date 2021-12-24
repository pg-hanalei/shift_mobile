import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { useModal } from "react-hooks-use-modal";
import { useHistory } from "react-router-dom";
import { ModalRegistry } from "../molecules/ModalRegistry";
import { Calendar } from "../molecules/Calendar";
import { NextPrevButton } from "../atoms/button/NextPrevButton";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import AppContext from '../../contexts/AppContext'
import { FetchLoginUserByToken } from "../../utility/MyFunc";

export const CalendarPage = () => {
  
  const { state, dispatch } = useContext(AppContext)

  // Fri Dec 10 2021 11:22:12 GMT+0900
  const today = useMemo(() => new Date(), []);

  // ヘッダー表示用
  const [yearMonth, setYearMonth] = useState("");

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const [showDate, setShowDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  // モーダル表示用 カレンダーから選択した日付を取得する
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  // モーダル表示API
  const [Modal, open, close] = useModal("root", {
    preventScroll: false,
    closeOnOverlayClick: false,
  });

  // ページ遷移などのAPI
  const history = useHistory();

  // ページリロード対応
  useEffect(()=>{
    console.log("fetchUser")
    FetchLoginUserByToken(state,dispatch);
  },[state])


  // 初期表示
  useEffect(() => {

    // 月末だとずれる可能性があるため、1日固定で取得  Wed Dec 01 2021 00:00:00 GMT+0900
    setShowDate(new Date(today.getFullYear(), today.getMonth(), 1));
  }, [today]);

  // 年月表示
  useEffect(() => {
    const year = showDate.getFullYear();
    const month = showDate.getMonth();

    // ヘッダー部分に年月を表示させる
    setYearMonth(`${year}年${month + 1}月`);

    setYear(year);
    setMonth(month);
  }, [showDate]);

  // 前月ボタン
  const onClickPrev = useCallback(() => {
    setShowDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  // 翌月ボタン
  const onClickNext = useCallback(() => {
    setShowDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  return (
    <div className="container">
      <h3 id="">{state.user.empname}</h3>
      <h5 id="">{state.user.stoname}</h5>
      <h1
        id="header"
        style={{
          textAlign: "center",
          fontSize: "24px",
          width: "100%",
          margin: "1rem 0 0",
        }}
      >
        {`${year} 年 ${month + 1} 月`}
      </h1>

      <div id="next-prev-button" style={{ position: "relative" }}>
        <NextPrevButton onClick={onClickPrev} className={"u-float--left"}>
          &lt;
        </NextPrevButton>
        <NextPrevButton onClick={onClickNext} className={"u-float--right"}>
          &gt;
        </NextPrevButton>
      </div>

      <Calendar
        year={year}
        month={month + 1}
        today={today}
        state={state}
        setDay={setDay}
        setTime={setTime}
        open={open}
      />

      <div
        style={{ width: "80%", textAlign: "center", margin: "40px auto 0px" }}
      >
        <PrimaryButton onClick={() => history.push({pathname:"/shift_list", state: {year, month} })}>申請内容　一覧</PrimaryButton>
      </div>

      <Modal>
        <ModalRegistry year={year} month={month + 1} day={day} time={time} close={close} />
      </Modal>
    </div>
  );
};

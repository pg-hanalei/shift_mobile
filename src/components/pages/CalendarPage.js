import { useCallback, useEffect, useMemo, useState } from "react";
import { useModal } from "react-hooks-use-modal";
import { useHistory, useLocation } from "react-router-dom";
import { ModalRegistry } from "../molecules/ModalRegistry";
import { Calendar } from "../molecules/Calendar";
import { NextPrevButton } from "../atoms/button/NextPrevButton";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const CalendarPage = () => {

  // Fri Dec 10 2021 11:22:12 GMT+0900
  const today = useMemo(() => new Date(), []);

  // ユーザー名
  const location = useLocation();
  
  const [userName, setUserName] = useState(location.state.name);

  // ヘッダー表示用
  const [yearMonth, setYearMonth] = useState("");

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const [showDate, setShowDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  // モーダル表示用 カレンダーから選択した日付を取得する
  const [day, setDay] = useState("");

  // モーダル表示API
  const [Modal, open, close] = useModal("root", {
    preventScroll: false,
    closeOnOverlayClick: false,
  });

  // ページ遷移などのAPI
  const history = useHistory();

  // 初期表示
  useEffect(() => {
    // setUserName("テストさん");

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
      <h3 id="user_info">{userName}</h3>
      <h1
        id="header"
        style={{
          textAlign: "center",
          fontSize: "24px",
          width: "100%",
          margin: "1rem 0 0",
        }}
      >
        {yearMonth}
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
        setDay={setDay}
        open={open}
      />

      <div
        style={{ width: "80%", textAlign: "center", margin: "40px auto 0px" }}
      >
        <PrimaryButton onClick={() => history.push("/shift_list")}>申請内容　一覧</PrimaryButton>
      </div>

      <Modal>
        <ModalRegistry year={year} month={month + 1} day={day} time={"9:30-14:00"} close={close} />
      </Modal>
    </div>
  );
};

import { useCallback, useEffect, useMemo, useState } from "react";
import { useModal } from "react-hooks-use-modal";
import { ModalRegistry } from "../molecules/ModalRegistry";
import { Calendar } from "../molecules/Calendar";
import { useHistory } from "react-router-dom";

export const CalendarPage = () => {
  // Fri Dec 10 2021 11:22:12 GMT+0900
  const today = useMemo(() => new Date(), []);

  // ユーザー名
  const [userName, setUserName] = useState("");

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
    setUserName("テストさん");

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

      <h1 id="header">{yearMonth}</h1>

      <div id="next-prev-button">
        <button
          id="prev"
          className="btn btn-primary btn-sm"
          onClick={onClickPrev}
        >
          &lt;
        </button>
        <button id="next" className="btn btn-primary" onClick={onClickNext}>
          &gt;
        </button>
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
        <button
          className="btn btn-primary btn-block"
          style={{ minWidth: "120px", maxWidth: "100%", padding: "12px" }}
          onClick={() => history.push("/shift_list")}
        >
          申請内容　一覧
        </button>
      </div>

      <Modal>
        <ModalRegistry 
          year={year} month={month} day={day} close={close}
        />
      </Modal>
    </div>
  );
};

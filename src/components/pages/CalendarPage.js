import { useCallback, useEffect, useMemo, useState } from "react";
import { useModal } from "react-hooks-use-modal";
import { Calendar } from "../molecules/Calendar";
import { useHistory } from "react-router-dom";

export const CalendarPage = () => {
  //Fri Dec 10 2021 11:22:12 GMT+0900
  const today = useMemo(() => new Date(), []);

  const [userName, setUserName] = useState("");

  //ヘッダー表示用
  const [yearMonth, setYearMonth] = useState("");

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const [showDate, setShowDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const [day, setDay] = useState("");

  const [Modal, open, close] = useModal("root", {
    preventScroll: false,
    closeOnOverlayClick: false,
  });

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

  const onClickPrev = useCallback(() => {
    setShowDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const onClickNext = useCallback(() => {
    setShowDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const modalStyle = {
    backgroundColor: "#fff",
    padding: "20px 40px",
    borderRadius: "10px",
    width: "300px",
  };

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
        <div style={modalStyle}>
          <h5>{`${year}年${month + 1}月${day}日`}</h5>

          <form>
            <h6>開始</h6>
            <div className="d-flex">
              <div className="form-group">
                
                <label htmlFor="registryStartHour"></label>
                <select
                  className="form-control form-control-lg"
                  style={{
                    width: "60px",
                    display: "inline-block",
                    fontSize: "16px",
                    fontWeight: "700",
                    padding: "8px"
                  }}
                  id="registryStartHour"
                >
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                  <option>22</option>
                </select>
                <span style={{ fontSize: "20px", paddingLeft: "8px", verticalAlign: "bottom" }}>時</span>
              </div>

              <div className="form-group">
                
                <label htmlFor="registryStartMinute"></label>
                <select
                  className="form-control form-control-lg"
                  style={{
                    width: "60px",
                    display: "inline-block",
                    fontSize: "16px",
                    fontWeight: "700",
                    padding: "8px"
                  }}
                  id="registryStartMinute"
                >
                  <option>00</option>
                  <option>30</option>

                </select>
                <span style={{ fontSize: "20px", paddingLeft: "8px", verticalAlign: "bottom" }}>分</span>
              </div>
            </div>


            <h6>終了</h6>
            <div className="d-flex">
              <div className="form-group">
                
                <label htmlFor="registryEndHour"></label>
                <select
                  className="form-control form-control-lg"
                  style={{
                    width: "60px",
                    display: "inline-block",
                    fontSize: "16px",
                    fontWeight: "700",
                    padding: "8px"
                  }}
                  id="shiftListYear"
                >
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                  <option>22</option>
                </select>
                <span style={{ fontSize: "20px", paddingLeft: "8px", verticalAlign: "bottom" }}>時</span>
              </div>

              <div className="form-group">
                
                <label htmlFor="registryEndMinute"></label>
                <select
                  className="form-control form-control-lg"
                  style={{
                    width: "60px",
                    display: "inline-block",
                    fontSize: "16px",
                    fontWeight: "700",
                    padding: "8px"
                  }}
                  id="registryEndMinute"
                >
                  <option>00</option>
                  <option>30</option>

                </select>
                <span style={{ fontSize: "20px", paddingLeft: "8px", verticalAlign: "bottom" }}>分</span>
              </div>
            </div>
            


            

            <div
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              <button
                className="btn btn-primary btn-lg btn-block"
                style={{ marginTop: "8px" }}
                onClick={close}
              >
                申請する
              </button>
              <br />
              <button
                className="btn btn-danger btn-lg btn-block"
                style={{ marginTop: "8px" }}
                onClick={close}
              >
                取り下げる
              </button>
              <br />
              <button
                className="btn btn-secondary btn-block"
                style={{ marginTop: "8px" }}
                onClick={close}
              >
                CLOSE
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

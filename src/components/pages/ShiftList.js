import React, {useState} from "react";
import { useModal } from "react-hooks-use-modal";
import { useHistory } from "react-router-dom";
import { ModalRegistry } from "../molecules/ModalRegistry";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { SelectBoxYearMonth } from "../atoms/select/SelectBoxYearMonth";
import { ShiftListTr } from "../atoms/table/ShiftListTr";

export const ShiftList = () => {

  // モーダル表示用
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  // ページ遷移用API
  const history = useHistory();

  // モーダル表示API
  const [Modal, open, close] = useModal("root", {
    preventScroll: false,
    closeOnOverlayClick: false,
  });

  // 検索ボタンを押したら、テーブルを出すと共に、年月を格納する
  const onClickShiftSearch = () => {
    setYear(document.getElementById("shiftListYear").value);
    setMonth(document.getElementById("shiftListMonth").value);
  }

  return (
    <>
      <div className="container">
        <h3 id="user_info">テストさん</h3>
        <h5>申請内容一覧</h5>
        <div className="u-mt-40">
          <form>
            <div className="form-group">
              <label htmlFor="shiftListYear"></label>
              <SelectBoxYearMonth
                id="shiftListYear"
                tani="年"
                value={new Date().getFullYear()}
              >
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
              <SelectBoxYearMonth 
              id="shiftListMonth" 
              tani="月"
              value={new Date().getMonth() + 1}
              >
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
              <PrimaryButton onClick={onClickShiftSearch}>
                検索
              </PrimaryButton>
            </div>
          </form>
        </div>
        <table className="table table-striped u-mt-40" style={{backgroundColor:"#fff", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
          <thead>
            <tr>
              <th scope="col" style={{ width: "10%" }}>
                日付
              </th>
              <th scope="col">時間</th>
              <th scope="col" style={{ width: "30%" }}></th>
            </tr>
          </thead>
          <tbody>
            <ShiftListTr day="12/1" time="8:00-12:00" setDay={setDay} setTime={setTime} open={open}/>
          </tbody>
        </table>
        <div
          style={{ textAlign: "center", margin: "40px auto 0px" }}
        >
          <PrimaryButton onClick={() => history.push("/calendar")}>
            カレンダー
          </PrimaryButton>
        </div>
      </div>
      <Modal>
        <ModalRegistry year={year} month={month} day={day} time={time} close={close} />
      </Modal>
    </>
  );
};

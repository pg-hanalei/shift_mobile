import React from "react";
import { useHistory } from "react-router-dom";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { SelectBoxYearMonth } from "../atoms/select/SelectBoxYearMonth";

export const ShiftList = () => {
  const history = useHistory();

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
              <SelectBoxYearMonth id="shiftListMonth" tani="月">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </SelectBoxYearMonth>
            </div>
            <div
              style={{
                textAlign: "center",
                margin: "40px auto 0px",
              }}
            >
              <PrimaryButton onClick={() => alert("下の表に出るようにする")}>
                検索
              </PrimaryButton>
            </div>
          </form>
        </div>
        <table className="table table-striped u-mt-40">
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
            <tr>
              <th scope="row">12/1</th>
              <td style={{ verticalAlign: "inherit", fontSize: "20px" }}>
                8:00-12:00
              </td>
              <td>
                <button className="btn btn-danger">編集</button>
              </td>
            </tr>
            <tr>
              <th scope="row">12/1</th>
              <td style={{ verticalAlign: "inherit", fontSize: "20px" }}>
                8:00-12:00
              </td>
              <td>
                <button className="btn btn-danger">編集</button>
              </td>
            </tr>
            <tr>
              <th scope="row">12/1</th>
              <td style={{ verticalAlign: "inherit", fontSize: "20px" }}>
                8:00-12:00
              </td>
              <td>
                <button className="btn btn-danger">編集</button>
              </td>
            </tr>
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
    </>
  );
};

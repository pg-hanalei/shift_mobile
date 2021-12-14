import React from "react";
import { useHistory } from "react-router-dom";

export const ShiftList = () => {
  const history = useHistory();

  const marginTopBase = {
    marginTop: "40px",
  };

  return (
    <>
      <div className="container">
        <h3 id="user_info">テストさん</h3>
        <h5>申請内容一覧</h5>
        <div style={marginTopBase}>
          <form>
            <div className="form-group">
              <label htmlFor="shiftListYear"></label>
              <select
                className="form-control form-control-lg"
                style={{
                  width: "160px",
                  display: "inline-block",
                  fontSize: "24px",
                }}
                id="shiftListYear"
              >
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
              </select>
              <span style={{ fontSize: "20px", paddingLeft: "8px" }}>年</span>
            </div>
            <div className="form-group">
              <label htmlFor="shiftListMonth"></label>
              <select
                className="form-control form-control-lg"
                style={{
                  width: "160px",
                  display: "inline-block",
                  fontSize: "24px",
                }}
                id="shiftListMonth"
              >
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
              </select>
              <span style={{ fontSize: "20px", paddingLeft: "8px" }}>月</span>
            </div>
            <div style={{ width: "80%", textAlign: "center", margin: "40px auto 0px" }}>
              <button
                className="btn btn-primary btn-block"
                style={{ minWidth: "120px", maxWidth:"100%", padding: "12px" }}
                onClick={() => history.push("/calendar")}
              >
            検索
          </button>
        </div>
          </form>
        </div>
        <table className="table table-striped" style={marginTopBase}>
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
        <div style={{ width: "80%", textAlign: "center", margin: "40px auto 0px" }}>
          <button
            className="btn btn-primary btn-block"
            style={{ minWidth: "120px", maxWidth:"100%", padding: "12px" }}
            onClick={() => history.push("/calendar")}
          >
           カレンダー
          </button>
        </div>
      </div>
    </>
  );
};

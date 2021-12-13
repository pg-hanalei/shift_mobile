import React from "react";
import { useHistory } from "react-router-dom";

export const ShiftList = () => {
  const history = useHistory();

  return (
    <>
      <div>
        シフトリストページです
        <div style={{ marginTop: "40px" }}>
          <input type="number" />年<input type="number" />月
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "10px" }}
          >
            <button
              className="btn btn-primary"
              style={{minWidth: "120px"}}
              onClick={() => history.push("/calendar")}
            >
              検索
            </button>
          </div>
        </div>
        <table class="table table-striped" style={{ marginTop: "40px" }}>
          <thead>
            <tr>
              <th scope="col" style={{ width: "10%" }}>
                日付
              </th>
              <th scope="col">時間</th>
              <th scope="col" style={{ width: "30%" }}>
                Handle
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">12/1</th>
              <td>8:00-12:00</td>
              <td>
                <button className="btn btn-danger">編集</button>
              </td>
            </tr>
            <tr>
              <th scope="row">12/1</th>
              <td>8:00-12:00</td>
              <td>
                <button className="btn btn-danger">編集</button>
              </td>
            </tr>
            <tr>
              <th scope="row">12/1</th>
              <td>8:00-12:00</td>
              <td>
                <button className="btn btn-danger">編集</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ width: "100%", textAlign: "center", marginTop: "40px" }}>
        <button
          className="btn btn-primary"
          onClick={() => history.push("/calendar")}
        >
          カレンダーへ
        </button>
      </div>
    </>
  );
};

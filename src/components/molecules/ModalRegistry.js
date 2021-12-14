import { memo } from "react";

export const ModalRegistry = memo((props) => {
  
    const {year, month, day, close} = props;
  
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
    }

    const taniStyle = {
        fontSize: "20px",
        paddingLeft: "8px",
        verticalAlign: "bottom",
    }

  return (
    <div style={modalStyle}>
      <h5>{`${year}年${month + 1}月${day}日`}</h5>

      <form>
        <h6>開始</h6>
        <div className="d-flex">
          <div className="form-group">
            <label htmlFor="registryStartHour"></label>
            <select
              className="form-control form-control-lg"
              style={selectStyle}
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
            <span style={taniStyle}>時</span>
          </div>

          <div className="form-group">
            <label htmlFor="registryStartMinute"></label>
            <select
              className="form-control form-control-lg"
              style={selectStyle}
              id="registryStartMinute"
            >
              <option>00</option>
              <option>30</option>
            </select>
            <span style={taniStyle}>時</span>
          </div>
        </div>

        <h6>終了</h6>
        <div className="d-flex">
          <div className="form-group">
            <label htmlFor="registryEndHour"></label>
            <select
              className="form-control form-control-lg"
              style={selectStyle}
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
            <span style={taniStyle}>時</span>
          </div>

          <div className="form-group">
            <label htmlFor="registryEndMinute"></label>
            <select
              className="form-control form-control-lg"
              style={selectStyle}
              id="registryEndMinute"
            >
              <option>00</option>
              <option>30</option>
            </select>
            <span style={taniStyle}>時</span>
          </div>
        </div>

        <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
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
  );
});

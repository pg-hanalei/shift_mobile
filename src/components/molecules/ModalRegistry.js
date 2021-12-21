import { memo } from "react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const ModalRegistry = memo((props) => {
  
    const {year, month, day, time, close} = props;
  
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
              defaultValue={Number(time.split(':')[0])}
            >
              <option value="8">8</option>
              <option value="9">9</option>
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
              defaultValue={Number(time.split('-')[0].split(':')[1])}
            >
              <option value="0">00</option>
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
              id="shiftListYear"
              defaultValue={time.split('-')[1].split(':')[0]}
            >
              <option value="8">8</option>
              <option value="9">9</option>
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
              defaultValue={Number(time.split('-')[1].split(':')[1])}
            >
              <option value="0">00</option>
              <option value="30">30</option>
            </select>
            <span style={taniStyle}>分</span>
          </div>
        </div>

        <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          <PrimaryButton onClick={close}>申請する</PrimaryButton>
          <br />
          <PrimaryButton onClick={close} className={"btn-danger"}>取り下げる</PrimaryButton>
          <br />
          <PrimaryButton onClick={close} className={"btn-secondary"}>閉じる</PrimaryButton>
        </div>
      </form>
    </div>
  );
});

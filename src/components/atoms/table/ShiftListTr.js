import React, { memo } from "react";

export const ShiftListTr = memo((props) => {
  const {day, time, setDay, setTime, open} = props;

  const tdTimeStyle = {
    verticalAlign: "inherit",
     fontSize: "20px"
  }

  const onClickTimeEdit = (e) =>{
    e.preventDefault();
    const day = e.currentTarget.getAttribute("data-day");
    const time = e.currentTarget.getAttribute("data-time");

    setDay(day);
    setTime(time)
    open();
  }

  return (
    <tr>
      <td style={tdTimeStyle}>{day}</td>
      <td style={tdTimeStyle}>{time}</td>
      <td>
        <button className="btn btn-danger" data-day={day.split('/')[1]} data-time={time} onClick={onClickTimeEdit}>編集</button>
      </td>
    </tr>
  );
});

import { useMemo, memo, useEffect, useContext } from "react";
import axios from "axios";
import { FETCH_SHIFT } from "../../actions";
import AppContext from "../../contexts/AppContext";

export const Calendar = memo((props) => {
  const { year, month, setDay, today, open } = props;

  const week = useMemo(() => {
    return ["日", "月", "火", "水", "木", "金", "土"];
  }, []);

  let count = 0;
  // getDay()で曜日を数値で返す
  const startDayOfWeek = new Date(year, month - 1, 1).getDay();

  // 当月最終日を取得
  const endDate = new Date(year, month + 1, 0).getDate();
  // 先月の最終日
  const lastMonthEndDate = new Date(year, month - 1, 0).getDate();
  // 水曜から始まるとして3（水）＋31（日間） /7 で当月が何週あるか確認
  // const row = Math.ceil((startDayOfWeek + endDate) / week.length);
  const row = [1, 2, 3, 4, 5];

  const onClickRegistryModal = (e) => {
    const day = e.currentTarget.getAttribute("data-day");
    setDay(day);
    open();
  };

  const {state, dispatch} = useContext(AppContext);

  useEffect(()=>{

    //ここでシフトデータ取得？
    const data = {
      empid: state.user.empid,
      year,
      month,
  }

  //TODO::ルートアドレスをenvファイルでとれるようにする？
  axios.post('http://localhost:80/shift_mobile/shift.php', data,{
      withCredentials: true,
    })
  .then((res)=>{
      console.log(res.data.shift);

      dispatch({
          type: FETCH_SHIFT,
          data: res.data.shift
      })
  })
  .catch((err)=>{
      console.log(err);
  })
  },[year, month, dispatch, state.user.empid])

  return (
    <>
      <div id="calendar">
        <table className="table" style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
          <thead>
            <tr className="dayOfWeek">
              <th>日</th>
              <th>月</th>
              <th>火</th>
              <th>水</th>
              <th>木</th>
              <th>金</th>
              <th>土</th>
            </tr>
          </thead>
          <tbody className="">
            {row.map((row, i) => {
              return (
                <tr key={i}>
                  {week.map((week, j) => {
                    if (i === 0 && j < startDayOfWeek) {
                      // 1行目で1日まで先月の日付を設定
                      return (
                        <td key={j} className="disabled">
                          {lastMonthEndDate - startDayOfWeek + j + 1}
                        </td>
                      );
                    } else if (count >= endDate) {
                      // 最終行で最終日以降、翌月の日付を設定
                      count++;
                      return (
                        <td key={j} className="disabled">
                          {count - endDate}
                        </td>
                      );
                    } else {
                      // 当月の日付を曜日に照らし合わせて設定
                      count++;

                      const rst = state.shift.filter((data) => {
                        return count == data.date.split("-")[2];
                      })
                      let mark = (rst != 0);

                      if (
                        year === today.getFullYear() &&
                        month === today.getMonth() + 1 &&
                        count === today.getDate()
                      ) {
                        return (
                          <td
                            key={j}
                            data-day={count}
                            className={`today ${mark && "marked"}`}
                            onClick={onClickRegistryModal}
                          >
                            {count}
                          </td>
                        );
                      } else {

                        return (
                          <td
                            key={j}
                            data-day={count}
                            className={mark && "marked"}
                            onClick={onClickRegistryModal}
                          >
                            {count}
                          </td>
                        );
                      }
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
});

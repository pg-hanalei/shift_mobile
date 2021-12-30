import { useMemo, memo, useContext } from "react";
import AppContext from "../../contexts/AppContext";

export const Calendar = memo((props) => {
  const { year, month, setDay, setTime, today, open } = props;
  console.log(month);
  const week = useMemo(() => {
    return ["日", "月", "火", "水", "木", "金", "土"];
  }, []);

  let count = 0;
  // getDay()で曜日を数値で返す
  const startDayOfWeek = new Date(year, month - 1, 1).getDay();

  // 当月最終日を取得
  const endDate = new Date(year, month, 0).getDate();

  // 先月の最終日
  const lastMonthEndDate = new Date(year, month - 1, 0).getDate();
  
  // 水曜から始まるとして3（水）＋31（日間） /7 で当月が何週あるか確認
  const rowWeek = Math.ceil((startDayOfWeek + endDate) / week.length);
  const row = [...Array(rowWeek)].map((_, i) => i);

  const onClickRegistryModal = (e) => {
    const day = e.currentTarget.getAttribute("data-day");
    const time = e.currentTarget.getAttribute("data-time");
    setDay(day);
    setTime(time)
    open();
  };

  const {state} = useContext(AppContext);

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

                      let mark = "";
                      let time = "08:00-08:00";

                      if(state.shift !== undefined && state.shift.length > 0){
                        const rst = state.shift.filter((data) => {
                          return count == data.date.split("-")[2];
                        })
  
                        if(rst != 0) {
                          time = new String(`${new String(rst[0].start_time).substring(0, 5)}-${new String(rst[0].end_time).substring(0, 5)}`);
                          mark = "marked";
                        }
                      }
                    
                      if (
                        year === today.getFullYear() &&
                        month === today.getMonth() + 1 &&
                        count === today.getDate()
                      ) {
                        return (
                          <td
                            key={j}
                            data-day={count}
                            data-time={time}
                            className={`today ${mark}`}
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
                            data-time={time}
                            className={mark}
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

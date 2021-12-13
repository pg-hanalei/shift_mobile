import { useMemo, memo } from "react";

export const Calender = memo((props) => {
  const { year, month, today } = props;

  const week = useMemo(()=>{return (["日", "月", "火", "水", "木", "金", "土"])},[]);
  
    let count = 0;
    // getDay()で曜日を数値で返す
    const startDayOfWeek = new Date(year, month + 1, 1).getDay();

    // 当月最終日を取得
    const endDate = new Date(year, month + 1, 0).getDate();
    // 先月の最終日
    const lastMonthEndDate = new Date(year, month, 0).getDate();
    // 水曜から始まるとして3（水）＋31（日間） /7 で当月が何週あるか確認 
    // const row = Math.ceil((startDayOfWeek + endDate) / week.length);
    const row = [1,2,3,4,5];

  return (
    <>
      <div id="calendar">
        <table>
          <tbody>
            <tr className="dayOfWeek">
              <th>日</th>
              <th>月</th>
              <th>火</th>
              <th>水</th>
              <th>木</th>
              <th>金</th>
              <th>土</th>
            </tr>
            {/* ここから一周ずつ回すには？ */}
            {row.map((row, i) =>{
                return(
                    <tr>
                        {
                            week.map((week, j)=>{
                                if (i === 0 && j < startDayOfWeek) {
                                    // 1行目で1日まで先月の日付を設定
                                    return(
                                        <td class='disabled mark'>{lastMonthEndDate - startDayOfWeek + j + 1}</td>
                                    )
                                } else if (count >= endDate) {
                                    // 最終行で最終日以降、翌月の日付を設定
                                    count++;
                                    return(
                                        <td class='disable'>{count - endDate}</td>
                                    );
                                } else {
                                    // 当月の日付を曜日に照らし合わせて設定
                                    count++;
                                    if(year === today.getFullYear()
                                      && month === (today.getMonth())
                                      && count === today.getDate()){
                                          return(
                                            <td class='today'>{count}</td>
                                          );
                                        
                                    } else {
                                        return(
                                            <td>{count}</td>
                                        )

                                    }
                                }
                            })
                        }
                    </tr>
                )
                
            })}
 
          </tbody>
        </table>
      </div>
    </>
  );
});

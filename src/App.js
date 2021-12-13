import { useCallback, useEffect, useMemo, useState } from 'react';
import { useModal } from 'react-hooks-use-modal';
import { Calender } from './components/molecules/Calender';



function App() {

  // Fri Dec 10 2021 11:22:12 GMT+0900
  const today = useMemo( ()=> new Date(),[]);

  // ユーザー名
  const [userName, setUserName] = useState("");

  // ヘッダー表示用　2021年12月
  const [yearMonth, setYearMonth] = useState("")

  // 今日の年
  const [year, setYear] = useState(new Date().getFullYear());

  // 今日の月
  const [month, setMonth] = useState(new Date().getMonth());

  // 今日の月の1日 // Fri Dec 1 2021 00:00:00 GMT+0900
  const [showDate, setShowDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

  // 入力用モーダル
  const [Modal, open, close] = useModal('root', {
    preventScroll: false, 
  });

  // 初期表示
  useEffect(()=>{
    
    setUserName("テストさん");

    // 月末だとずれる可能性があるため、1日固定で取得  Wed Dec 01 2021 00:00:00 GMT+0900
    setShowDate(new Date(today.getFullYear(), today.getMonth(), 1));

  },[today])


  // 年月表示
  useEffect(()=>{

    const year = showDate.getFullYear()
    const month = showDate.getMonth();

    // ヘッダー部分に年月を表示させる new Dateのmonthは1月=0 の為　+1の調整が必要
    setYearMonth(`${year}年${month +1}月`);

    setYear(year);
    setMonth(month);

  },[showDate])

  // 月 マイナス1
  const onClickPrev = useCallback(() => {
    setShowDate((prev) => new Date(prev.getFullYear(), prev.getMonth()-1, 1));
  },[]);

  // 月 プラス1
  const onClickNext = useCallback(() => {
    setShowDate((prev) => new Date(prev.getFullYear(), prev.getMonth()+1, 1));
  },[]);

  const modalStyle = {
    backgroundColor: '#fff',
    padding: '20px 80px',
    borderRadius: '10px',
  };

  return (
    <div className="wrapper">

      <h3 id="user_info">{userName}</h3>

      <h1 id="header">{yearMonth}</h1>

      <div id="next-prev-button">
          <button id="prev" onClick={onClickPrev}>&lt;</button>
          <button id="next" onClick={onClickNext}>&gt;</button>
      </div>

      <Calender year={year} month={month +1} today={today} />


      <div className="" style={{textAlign: "center", marginTop: "40px"}}>
        <button onClick={open}>申請内容一覧</button>
      </div>

      <Modal>
        <div style={modalStyle}>
          <h2>シフト申請</h2>
          <h2>12/24</h2>
          <div>
            <input type="number" maxLength="2" max="23" min="8"/>
            <span>:</span>
            <select>
              <option>0</option>
              <option>30</option>
            </select>
            <span>~</span>
            <input type="number" maxLength="2" max="23" min="8"/>
            <span>:</span>
            <select>
              <option>0</option>
              <option>30</option>
            </select>
          </div>
          <button onClick={close}>申請する</button>
          <br />
          <button onClick={close}>CLOSE</button>
        </div>
    </Modal>
    </div>
  );
}

export default App;

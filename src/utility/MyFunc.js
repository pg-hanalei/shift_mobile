import axios from "axios";
import { FETCH_SHIFT, FETCH_USER } from "../actions";

export const FetchLoginUserByToken = (state,dispatch ) => {

    if(state.user.length <= 0){
      
      const data = {
        token: "token",
      }
      //ここでuser情報を取得する cookieにあるtokenでDBを検索
      axios.post(`${process.env.REACT_APP_DOMAIN}/shift_mobile/login.php`, data,{
      withCredentials: true,
    }).then((res)=>{
        console.log(res);

        const {empid, emp_name, stoid, sto_name } = res.data.user;

            dispatch({
                type: FETCH_USER,
                empid: empid,
                empname: emp_name,
                stoid,
                stoname: sto_name
            })

    }).catch((err)=>{
      alert("ログインユーザー情報再取得に失敗しました");
    })

  }
}


export const FetchShiftData = (state, dispatch, year, month) => {
  if(state.user.length < 1 || state.shift.length > 1){
    return;
  }

  console.log("FetchShiftData");

  //ここでシフトデータ取得
  const data = {
    empid: state.user.empid,
    year,
    month,
  }

//TODO::ルートアドレスをenvファイルでとれるようにする？
axios.post(`${process.env.REACT_APP_DOMAIN}/shift_mobile/shift.php`, data,{
    withCredentials: true,
  })
.then((res)=>{
    dispatch({
        type: FETCH_SHIFT,
        data: res.data.shift
    })
})
.catch((err)=>{
    console.log(err);
})
}
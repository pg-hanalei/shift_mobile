import { FETCH_SHIFT } from "../actions";

const shift = (state = [], action) => {
  switch (action.type) {
    case FETCH_SHIFT:
      state = action.data;
      return state;
    
      // 内容削除
    
    
    default:
      return state;
  }
};

export default shift;

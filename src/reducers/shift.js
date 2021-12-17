import { FETCH_SHIFT } from "../actions";

const shift = (state = [], action) => {
  switch (action.type) {
    case FETCH_SHIFT:
      state = action.data;
      return state;
    default:
      return state;
  }
};

export default shift;

import { FETCH_USER } from "../actions";

const user = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      state = {
        empid: action.empid,
        empname: action.empname,
        stoid: action.stoid,
        stoname: action.stoname,
      };
      return state;
    default:
        return state;
  }
};

export default user;

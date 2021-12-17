import { combineReducers } from 'redux'
import user from './user';
import shift from './shift';

export default combineReducers({
    user,
    shift,
});
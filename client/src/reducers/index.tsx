import { combineReducers } from 'redux';
import bugReducer from './bugReducer';

const reducers = combineReducers({
  bugs: bugReducer
});

export default reducers;

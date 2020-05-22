import { combineReducers } from 'redux';
import bugReducer from './bugReducer';
import dragReducer from './dragReducer';
import alertReducer from './alertReducer';

const reducers = combineReducers({
  bugs: bugReducer,
  dragElement: dragReducer,
  alert: alertReducer,
});

export default reducers;

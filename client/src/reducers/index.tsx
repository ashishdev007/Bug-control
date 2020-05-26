import { combineReducers } from 'redux';
import bugReducer from './bugReducer';
import dragReducer from './dragReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  bugs: bugReducer,
  dragElement: dragReducer,
  alert: alertReducer,
  auth: authReducer,
});

export default reducers;

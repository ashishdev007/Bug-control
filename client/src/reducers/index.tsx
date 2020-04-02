import { combineReducers } from 'redux';
import bugReducer from './bugReducer';
import dragReducer from './dragReducer';

const reducers = combineReducers({
  bugs: bugReducer,
  dragElement: dragReducer
});

export default reducers;

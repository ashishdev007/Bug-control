export enum ActionTypes {
  OPEN_BUG_FORM = 'OPEN_BUG_FORM',
  ADD_BUG_TO_CATEGORY = 'ADD_BUG_TO_CATEGORY',
  ADD_DRAGGED_BUG = 'ADD_DRAGGED_BUG',
  LOADING_BUGS = 'LOADING_BUGS',
  FETCH_BUGS = 'FETCH_BUGS',
  DELETE_BUG = 'DELETE_BUG',
  SHOW_BUG_DETAIL = 'SHOW_BUG_DETAIL',
  CHANGE_BUG_DETAIL = 'CHANGE_BUG_DETAIL',
  ADD_NEW_NOTE = 'ADD_NEW_NOTE',
  SEE_ALL_NOTES = 'SEE_ALL_NOTES',
  SHOW_ALERT = 'SHOW_ALERT',
  HIDE_ALERT = 'HIDE_ALERT',
}

export enum AuthActionTypes {
  USER_LOADED = 'USER_LOADED',
  USER_LOADING = 'USER_LOADING',
  AUTH_ERROR = 'AUTH_ERROR',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAIL',
}

export interface BaseAction {
  type: ActionTypes | AuthActionTypes;
  payload: any;
}

export interface bug {
  userid?: number;
  id: number;
  category: string;
  title: string;
  description: string;
  reproducible?: string;
  severity?: string;
  notes?: any;
}

export enum updatableBugDetails {
  description = 'description',
  category = 'category',
}

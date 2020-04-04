export enum ActionTypes {
  OPEN_BUG_FORM = 'OPEN_BUG_FORM',
  ADD_BUG_TO_CATEGORY = 'ADD_BUG_TO_CATEGORY',
  ADD_DRAGGED_BUG = 'ADD_DRAGGED_BUG',
  LOADING_BUGS = 'LOADING_BUGS',
  FETCH_BUGS = 'FETCH_BUGS',
  DELETE_BUG = 'DELETE_BUG'
}

export interface BaseAction {
  type: ActionTypes;
  payload: any;
}

export interface bug {
  userid?: number;
  id?: number;
  category: string;
  title: string;
  description: string;
}

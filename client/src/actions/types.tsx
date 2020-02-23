export enum ActionTypes {
  ADD_BUG = 'ADD_BUG'
}

export interface BaseAction {
  type: ActionTypes;
  payload: any;
}

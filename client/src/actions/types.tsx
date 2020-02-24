export enum ActionTypes {
  OPEN_BUG_FORM = 'OPEN_BUG_FORM',
  ADD_BUG_TO_CATEGORY = 'ADD_BUG_TO_CATEGORY'
}

export interface BaseAction {
  type: ActionTypes;
  payload: any;
}

export interface bug {
  user?: string;
  id?: number;
  category: string;
  title: string;
  description: string;
}

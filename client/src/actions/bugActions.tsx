import { ActionTypes, BaseAction } from './types';

export interface AddBugType extends BaseAction {
  type: ActionTypes.ADD_BUG;
  payload: boolean;
}

export const BugAdd = (open: boolean): AddBugType => {
  return {
    type: ActionTypes.ADD_BUG,
    payload: open
  };
};

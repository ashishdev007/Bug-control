import { ActionTypes, BaseAction } from './types';

export interface AddBugType extends BaseAction {
  type: ActionTypes.ADD_BUG;
}

export const AddBug = (): AddBugType => {
  return {
    type: ActionTypes.ADD_BUG
  };
};

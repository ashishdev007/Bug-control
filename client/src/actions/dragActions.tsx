import { ActionTypes, BaseAction, bug } from './types';

export interface AddDraggedBugReturnType extends BaseAction {
  type: ActionTypes.ADD_DRAGGED_BUG;
  payload: bug;
}

export const AddDraggedBug = (bug: bug): AddDraggedBugReturnType => {
  const { category, title, description } = bug;
  return {
    type: ActionTypes.ADD_DRAGGED_BUG,
    payload: { category, title, description }
  };
};

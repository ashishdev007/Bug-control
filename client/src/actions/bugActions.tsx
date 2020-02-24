import { ActionTypes, BaseAction } from './types';

export interface OpenBugFormReturnType extends BaseAction {
  type: ActionTypes.OPEN_BUG_FORM;
  payload: {
    state: boolean;
    requestedBy: string;
  };
}

export interface AddBugToCategoryReturnType extends BaseAction {
  type: ActionTypes.ADD_BUG_TO_CATEGORY;
  payload: {
    category: string;
    title: string;
    description: string;
  };
}

export const OpenBugForm = (
  open: boolean,
  requestedBy: string
): OpenBugFormReturnType => {
  return {
    type: ActionTypes.OPEN_BUG_FORM,
    payload: {
      state: open,
      requestedBy: requestedBy
    }
  };
};

export const AddBugToCategory = (bug: {
  category: string;
  title: string;
  description: string;
}): AddBugToCategoryReturnType => {
  const { category, title, description } = bug;
  return {
    type: ActionTypes.ADD_BUG_TO_CATEGORY,
    payload: { category, title, description }
  };
};

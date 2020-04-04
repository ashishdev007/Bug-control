import { ActionTypes, BaseAction, bug } from './types';

export interface OpenBugFormReturnType extends BaseAction {
  type: ActionTypes.OPEN_BUG_FORM;
  payload: {
    state: boolean;
    requestedBy: string;
  };
}

export interface AddBugToCategoryReturnType extends BaseAction {
  type: ActionTypes.ADD_BUG_TO_CATEGORY;
  payload: Array<bug>;
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

export const AddBugToCategory = (bug: bug) => async (dispatch: any) => {
  fetch('http://localhost:1500/bugs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bug)
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      bug.id = data.insertId;
      dispatch({
        type: ActionTypes.ADD_BUG_TO_CATEGORY,
        payload: [bug]
      });
    });
};

export const DeleteBug = (bug: bug) => async (dispatch: any) => {
  const query = 'http://localhost:1500/bugs/' + bug.id;

  fetch(query, { method: 'DELETE' }).then(res => {
    dispatch({
      type: ActionTypes.DELETE_BUG,
      payload: bug
    });
  });
};

export const FetchBugs = () => async (dispatch: any) => {
  dispatch({ type: ActionTypes.LOADING_BUGS, payload: null });

  fetch('http://localhost:1500/bugs')
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch({ type: ActionTypes.FETCH_BUGS, payload: data });
    });
};

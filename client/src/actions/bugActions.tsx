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
      requestedBy: requestedBy,
    },
  };
};

export const AddBugToCategory = (bug: bug) => async (dispatch: any) => {
  fetch('http://localhost:1500/bugs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bug),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      bug.id = data.insertId;
      dispatch({
        type: ActionTypes.ADD_BUG_TO_CATEGORY,
        payload: [bug],
      });
    });
};

export const ChangeCategory = (bug: bug, newCategory: string) => async (
  dispatch: any
) => {
  const query = 'http://localhost:1500/bugs/' + bug.id;

  fetch(query, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newCategory }),
  }).then((res) => {
    dispatch({
      type: ActionTypes.DELETE_BUG,
      payload: bug,
    });

    bug.category = newCategory;

    dispatch({
      type: ActionTypes.ADD_BUG_TO_CATEGORY,
      payload: [bug],
    });
  });
};

export const DeleteBug = (bug: bug) => async (dispatch: any) => {
  const query = 'http://localhost:1500/bugs/' + bug.id;

  fetch(query, { method: 'DELETE' }).then((res) => {
    dispatch({
      type: ActionTypes.DELETE_BUG,
      payload: bug,
    });
  });
};

export const FetchBugs = () => async (dispatch: any) => {
  dispatch({ type: ActionTypes.LOADING_BUGS, payload: null });

  fetch('http://localhost:1500/bugs')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch({ type: ActionTypes.FETCH_BUGS, payload: data });
    });
};

export const ShowBugDetails = (id: number, show: boolean) => async (
  dispatch: any
) => {
  if (show) {
    fetch('http://localhost:1500/bugs/' + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch({
          type: ActionTypes.SHOW_BUG_DETAIL,
          payload: { show: true, bug: data },
        });
      });
  } else {
    dispatch({
      type: ActionTypes.SHOW_BUG_DETAIL,
      payload: { show: false, bug: {} },
    });
  }
};

export const AddNewNote = (bugId: number, content: string) => async (
  dispatch: any,
  getState: any
) => {
  var data: any = { bugId, content };

  fetch('http://localhost:1500/bugs/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then(() => {
      var date = new Date();
      data.dateTime = date.toISOString();

      dispatch({
        type: ActionTypes.ADD_NEW_NOTE,
        payload: data,
      });
    });
};

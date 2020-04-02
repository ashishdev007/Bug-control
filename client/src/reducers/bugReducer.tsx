import { ActionTypes, bug, BaseAction } from '../actions/types';
import {
  OpenBugFormReturnType,
  AddBugToCategoryReturnType
} from '../actions/bugActions';

interface stateType {
  bugs: {
    [key: string]: Array<bug>;
  };
  addbug: {
    state: boolean;
    requestedBy: string;
  };
}

const INITIAL_STATE: stateType = {
  bugs: {
    OPEN: [
      {
        category: 'OPEN',
        title: 'string',
        description: 'string'
      }
    ],
    IN_PROGRESS: [],
    TEST_PENDING: [],
    RE_OPENED: [],
    CLOSED: []
  },
  addbug: {
    state: false,
    requestedBy: ''
  }
};

const bugReducer = (
  state: stateType = INITIAL_STATE,
  action: OpenBugFormReturnType | AddBugToCategoryReturnType | BaseAction
) => {
  switch (action.type) {
    case ActionTypes.OPEN_BUG_FORM:
      return { ...state, addbug: action.payload };

    case ActionTypes.ADD_BUG_TO_CATEGORY:
      var bugs: {
        [key: string]: Array<bug>;
      } = {};
      bugs[action.payload.category] = state.bugs[
        action.payload.category
      ].slice();
      bugs[action.payload.category].push(action.payload);

      return {
        ...state,
        bugs: {
          ...state.bugs,
          ...bugs
        }
      };

    default:
      return state;
  }
};

export default bugReducer;

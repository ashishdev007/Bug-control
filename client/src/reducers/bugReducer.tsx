import { ActionTypes, BaseAction } from '../actions/types';
import {
  OpenBugFormReturnType,
  AddBugToCategoryReturnType
} from '../actions/bugActions';

interface bug {
  user?: string;
  id?: number;
  category: string;
  title: string;
  description: string;
}

interface stateType {
  bugs: {
    [key: string]: Array<bug>;
  };
  addbug: {
    state: boolean;
    requestedBy: string;
  };
}

// "OPEN": Array<bug>;
//   "IN_PROGRESS": Array<bug>;
//   "TEST_PENDING": Array<bug>;
//   "RE_OPENED": Array<bug>;
//   "CLOSED": Array<bug>;
const INITIAL_STATE: stateType = {
  bugs: {
    OPEN: [],
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
  action: OpenBugFormReturnType | AddBugToCategoryReturnType
) => {
  switch (action.type) {
    case ActionTypes.OPEN_BUG_FORM:
      return { ...state, addbug: action.payload };

    case ActionTypes.ADD_BUG_TO_CATEGORY:
      var newBugs = state.bugs;
      newBugs[action.payload.category].push(action.payload);
      return { ...state, bugs: newBugs };

    default:
      return state;
  }
};

export default bugReducer;

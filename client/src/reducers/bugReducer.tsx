import { ActionTypes, BaseAction } from '../actions/types';

interface bug {
  user: string;
  id: number;
  title: string;
  description: string;
}

interface stateType {
  OPEN: Array<bug>;
  IN_PROGRESS: Array<bug>;
  TEST_PENDING: Array<bug>;
  RE_OPENED: Array<bug>;
  CLOSED: Array<bug>;
  addbug: boolean;
}

const INITIAL_STATE: stateType = {
  OPEN: [],
  IN_PROGRESS: [],
  TEST_PENDING: [],
  RE_OPENED: [],
  CLOSED: [],
  addbug: false
};

const bugReducer = (state: stateType = INITIAL_STATE, action: BaseAction) => {
  switch (action.type) {
    case ActionTypes.ADD_BUG:
      return { ...state, addbug: true };

    default:
      return state;
  }
};

export default bugReducer;

import { ActionTypes, bug, BaseAction } from '../actions/types';
import {
  OpenBugFormReturnType,
  AddBugToCategoryReturnType,
} from '../actions/bugActions';
import { bugTypes } from '../bugTypes';
import mapkeys from 'lodash.mapkeys';
import omit from 'lodash.omit';

interface stateType {
  bugs: {
    [key: string]: {
      [key: number]: bug;
    };
  };
  addbug: {
    state: boolean;
    requestedBy: string;
  };
  bugDetail: {
    show: boolean;
    bug: bug | { notes?: any };
    seeAllNotes: { show: boolean; notes: Array<React.ElementType> };
  };
}

const INITIAL_STATE: stateType = {
  bugs: {
    OPEN: {},
    IN_PROGRESS: {},
    TEST_PENDING: {},
    RE_OPENED: {},
    CLOSED: {},
  },
  addbug: {
    state: false,
    requestedBy: '',
  },
  bugDetail: {
    show: false,
    bug: {},
    seeAllNotes: { show: false, notes: [] },
  },
};

const bugReducer = (
  state: stateType = INITIAL_STATE,
  action: OpenBugFormReturnType | AddBugToCategoryReturnType | BaseAction
) => {
  switch (action.type) {
    case ActionTypes.FETCH_BUGS:
      const OPEN = action.payload[bugTypes.OPEN];
      const IN_PROGRESS = action.payload[bugTypes.IN_PROGRESS];
      const TEST_PENDING = action.payload[bugTypes.TEST_PENDING];
      const RE_OPENED = action.payload[bugTypes.RE_OPENED];
      const CLOSED = action.payload[bugTypes.CLOSED];

      return {
        ...state,
        bugs: {
          ...state.bugs,
          OPEN: { ...state.bugs.OPEN, ...mapkeys(OPEN, 'id') },
          IN_PROGRESS: {
            ...state.bugs.IN_PROGRESS,
            ...mapkeys(IN_PROGRESS, 'id'),
          },
          TEST_PENDING: {
            ...state.bugs.TEST_PENDING,
            ...mapkeys(TEST_PENDING, 'id'),
          },
          RE_OPENED: { ...state.bugs.RE_OPENED, ...mapkeys(RE_OPENED, 'id') },
          CLOSED: { ...state.bugs.CLOSED, ...mapkeys(CLOSED, 'id') },
        },
      };

    case ActionTypes.OPEN_BUG_FORM:
      return { ...state, addbug: action.payload };

    case ActionTypes.SHOW_BUG_DETAIL:
      const { show, bug } = action.payload;
      return {
        ...state,
        bugDetail: { ...state.bugDetail, show: show, bug: bug },
      };

    case ActionTypes.ADD_BUG_TO_CATEGORY:
      const category = action.payload[0]['category'];

      if (category == bugTypes.OPEN)
        return {
          ...state,
          bugs: {
            ...state.bugs,
            OPEN: { ...state.bugs.OPEN, ...mapkeys(action.payload, 'id') },
          },
        };
      else if (category == bugTypes.IN_PROGRESS)
        return {
          ...state,
          bugs: {
            ...state.bugs,
            IN_PROGRESS: {
              ...state.bugs.IN_PROGRESS,
              ...mapkeys(action.payload, 'id'),
            },
          },
        };
      else if (category == bugTypes.TEST_PENDING)
        return {
          ...state,
          bugs: {
            ...state.bugs,
            TEST_PENDING: {
              ...state.bugs.TEST_PENDING,
              ...mapkeys(action.payload, 'id'),
            },
          },
        };
      else if (category == bugTypes.RE_OPENED)
        return {
          ...state,
          bugs: {
            ...state.bugs,
            RE_OPENED: {
              ...state.bugs.RE_OPENED,
              ...mapkeys(action.payload, 'id'),
            },
          },
        };
      else if (category == bugTypes.CLOSED)
        return {
          ...state,
          bugs: {
            ...state.bugs,
            CLOSED: { ...state.bugs.CLOSED, ...mapkeys(action.payload, 'id') },
          },
        };
      else return state;

    case ActionTypes.DELETE_BUG:
      const temp = state.bugs;
      temp[action.payload.category] = omit(
        temp[action.payload.category],
        action.payload.id
      );

      return { ...state, bugs: { ...state.bugs, ...temp } };

    case ActionTypes.ADD_NEW_NOTE:
      return {
        ...state,
        bugDetail: {
          ...state.bugDetail,
          bug: {
            ...state.bugDetail.bug,
            notes: [...state.bugDetail.bug.notes, action.payload],
          },
        },
      };

    case ActionTypes.SEE_ALL_NOTES:
      return {
        ...state,
        bugDetail: {
          ...state.bugDetail,
          seeAllNotes: {
            show: action.payload.seeAllNotes,
            notes: action.payload.notes,
          },
        },
      };

    default:
      return state;
  }
};

export default bugReducer;

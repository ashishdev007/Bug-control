import { ActionTypes, bug, BaseAction } from '../actions/types';
import {
  OpenBugFormReturnType,
  AddBugToCategoryReturnType,
} from '../actions/bugActions';
import { bugTypes } from '../bugTypes';
import { StageStates } from './stageStates';
import mapkeys from 'lodash.mapkeys';
import omit from 'lodash.omit';

export interface stateType {
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
  deadlines: {
    show: boolean;
    overdue: Array<any>;
    upcoming: Array<any>;
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
  deadlines: { show: false, overdue: [], upcoming: [] },
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

      return {
        ...state,
        bugs: {
          ...state.bugs,
          [category]: {
            ...state.bugs[category],
            ...mapkeys(action.payload, 'id'),
          },
        },
      };

    case ActionTypes.DELETE_BUG:
      const delId = `${action.payload.id}`;
      var delCat = '';

      for (let category in StageStates) {
        const keys = Object.keys(state.bugs[category]);

        if (keys.includes(delId)) {
          delCat = category;
        }
      }

      return {
        ...state,
        bugs: { ...state.bugs, [delCat]: omit(state.bugs[delCat], delId) },
      };

    case ActionTypes.CHANGE_BUG_DETAIL:
      const id = action.payload.id;
      for (let category in StageStates) {
        const keys = Object.keys(state.bugs[category]);

        if (keys.includes(`${id}`)) {
          return {
            ...state,
            bugs: {
              ...state.bugs,
              [category]: {
                ...state.bugs[category],
                [id]: {
                  ...state.bugs[category][id],
                  ...action.payload,
                },
              },
            },
          };
        }
      }

      return { ...state };

    case ActionTypes.ADD_NEW_NOTE:
      return {
        ...state,
        bugDetail: {
          ...state.bugDetail,
          bug: {
            ...state.bugDetail.bug,
            notes: [action.payload, ...state.bugDetail.bug.notes],
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

import { BaseAction, ActionTypes } from '../actions/types';

export interface stateType {
  show: boolean;
  title: string;
  description: string;
  dismiss: ((show: boolean) => void) | null;
}

const INITIAL_STATE: stateType = {
  show: false,
  title: '',
  description: '',
  dismiss: null,
};

const alertReducer = (state: stateType = INITIAL_STATE, action: BaseAction) => {
  switch (action.type) {
    case ActionTypes.SHOW_ALERT:
      return { ...state, show: true, ...action.payload };

    case ActionTypes.HIDE_ALERT:
      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};

export default alertReducer;

import { ActionTypes, bug, BaseAction } from '../actions/types';
import { AddDraggedBugReturnType, AddDraggedBug } from '../actions/dragActions';

interface stateType {
  draggedElement: bug | null;
}

const INITIAL_STATE: stateType = {
  draggedElement: null
};

const dragReducer = (
  state: stateType = INITIAL_STATE,
  action: BaseAction | AddDraggedBugReturnType
) => {
  switch (action.type) {
    case ActionTypes.ADD_DRAGGED_BUG:
      return { ...state, draggedElement: action.payload };

    default:
      return state;
  }
};

export default dragReducer;

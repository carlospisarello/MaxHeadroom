import { SET_BACKGROUND_COLOR, SET_MAX_COLOR } from './colors.types';

const INITIAL_STATE = {
  background: 'red',
  max: 'red',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BACKGROUND_COLOR:
      return {
        ...state,
        background: action.payload
      };
    case SET_MAX_COLOR:
      return {
        ...state,
        max: action.payload
      };
    default: return state;
  }
};

export default reducer;
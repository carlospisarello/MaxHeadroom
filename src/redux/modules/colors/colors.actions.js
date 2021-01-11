import { SET_BACKGROUND_COLOR, SET_MAX_COLOR } from './colors.types';

export const setBackgroundColor = (color) => {
  return {
    type: SET_BACKGROUND_COLOR,
    payload: color
  };
};

export const setMaxColor = (color) => {
  return {
    type: SET_MAX_COLOR,
    payload: color
  };
};
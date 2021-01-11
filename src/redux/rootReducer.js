import { combineReducers } from 'redux';
import colorsReducer from './modules/colors/colors.reducer';

const rootReducer = combineReducers({
  colors: colorsReducer,
});

export default rootReducer;
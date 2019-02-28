import { combineReducers } from 'redux';
import ObjectivesReducer from './reducer_objectives'
const rootReducer = combineReducers({
  objectives : ObjectivesReducer
});

export default rootReducer;

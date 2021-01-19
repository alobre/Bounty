// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import userDetailReducer from "./userDetailReducer"
import taskDetailReducer from "./taskDetailReducer"

// Redux: Root Reducer
const rootReducer = combineReducers({
  userDetailReducer: userDetailReducer,
  taskDetailReducer: taskDetailReducer

});

// Exports
export default rootReducer;
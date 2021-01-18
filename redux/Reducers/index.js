// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers

import taskDetailReducer from "./taskDetailReducer"

// Redux: Root Reducer
const rootReducer = combineReducers({
  
  taskDetailReducer: taskDetailReducer
});

// Exports
export default rootReducer;
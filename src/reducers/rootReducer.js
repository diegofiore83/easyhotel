import { combineReducers } from 'redux';

import filter from './filterReducer';
import filtered from './filteredReducer';
import results from './resultsReducer';

const rootReducer = combineReducers({
  filter: filter,
  filtered: filtered,
  results: results
});

export default rootReducer;
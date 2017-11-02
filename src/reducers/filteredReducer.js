import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function filteredReducer(state = initialState.filtered, action) {

  switch (action.type) {
    case types.RESULTS_LOADED:
      return action.results;
    case types.RESULTS_FILTERED:
      return action.filtered;
    default:
      return state;
  }
}
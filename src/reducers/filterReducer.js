import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function filterReducer(state = initialState.filter, action) {

  switch (action.type) {
    case types.CHANGE_SORT_BY:
      return Object.assign({}, state, { SortBy: action.sortBy });
    case types.CHANGE_NAME_FILTER:
      return Object.assign({}, state, { Name: action.name });
    case types.CHANGE_STARS_FILTER:
      return Object.assign({}, state, { Stars: action.stars });
    case types.CHANGE_BUDGET_FILTER:
      return Object.assign({}, state, { Budget: action.budget });
    default:
      return state;
  }
}
import * as types from './actionTypes';
import _ from 'lodash';

export function filterResults(results, filter) {
  let filtered = results;
  
  if (filter.Name.length > 0) {
    filtered = _.filter(filtered, function(o) { return o.Name.includes(filter.Name); });
  }

  if (filter.Stars > 0) {
    filtered = _.filter(filtered, function(o) { return o.Stars > filter.Stars; });
  }
  
  if (filter.Budget > 0) {
    filtered = _.filter(filtered, function(o) { return o.MinCost < filter.Budget; });
  }

  if (filter.SortBy !== '') {
    let sorting = 'asc';
    
    if (filter.SortBy === 'Stars' || filter.SortBy === 'UserRating') {
      sorting = 'desc';
    }

    filtered = _.orderBy(filtered, [filter.SortBy], [sorting]);
  }

  return {type: types.RESULTS_FILTERED, filtered};
}

export function changeSortBy(sortBY) {
  return {type: types.CHANGE_SORT_BY, sortBY};
}

export function changeNameFilter(name) {
  return {type: types.CHANGE_NAME_FILTER, name};
}

export function changeStarsFilter(stars) {
  return {type: types.CHANGE_STARS_FILTER, stars};
}

export function changeBudgetFilter(budget) {
  return {type: types.CHANGE_BUDGET_FILTER, budget};
}
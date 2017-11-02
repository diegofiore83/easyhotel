import * as types from './actionTypes';
import resultsApi from '../api/resultsApi';

export function loadResults() {
  return function(dispatch) {
    return resultsApi.getResults().then(results => {
        
      dispatch(loadResultSuccess(results.Establishments));

    }).catch(error => {
      throw(error);
    });
  };
}

export function loadResultSuccess(results) {
  return {type: types.RESULTS_LOADED, results};
}

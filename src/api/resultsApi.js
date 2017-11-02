import fetch from 'isomorphic-fetch';
import hotels from '../data/hotels.json';

class ResultsApi {
  static getResults() {

    return fetch('/data/hotel.json') // simulating API Call
      .then(response => hotels)
      .catch(error => {
        return error;
    });
  }
}

export default ResultsApi;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Results from './components/Results';

import * as resultActions from './actions/resultsActions';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.resultActions.loadResults();
  }

  render() {
    let { results } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EasyHotel</h1>
        </header>
        <Results results={results}/>
      </div>
    );
  }
}

App.propTypes = {
  resultActions: PropTypes.object,
  results: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    results: state.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resultActions: bindActionCreators(resultActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { app } from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={app} >
      </div>
    );
  }
}

export default connect()(App);

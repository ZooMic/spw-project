import React, { Component } from 'react';
import { connect } from 'react-redux';
import { app } from './App.module.scss';

import ProjectsTree from '../ProjectsTree/';

class App extends Component {
  render() {
    return (
      <div className={app} >
        <ProjectsTree />
      </div>
    );
  }
}

export default connect()(App);

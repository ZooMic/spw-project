import React, { Component } from 'react';
import { connect } from 'react-redux';
import { app, signIn } from './App.module.scss';

import ProjectsTree from '../ProjectsTree/';
import Panel3D from '../Panel3D/';

import SignInPanel from '../SignInPanel/';

class App extends Component {
  render() {
    return (
      // <div className={app} >
      //   <ProjectsTree />
      //   <Panel3D />
      // </div>
      <SignInPanel />
    );
  }
}

export default connect()(App);

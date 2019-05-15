import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { app, signIn } from './App.module.scss';

import ProjectsTree from '../ProjectsTree/';
import Panel3D from '../Panel3D/';

import SignInPanel from '../SignInPanel/';

import { checkStorage } from '../../actions/registrationActions';

function App ({ checkStorage, isSignIn }) {
  
  useEffect(() => {
    checkStorage();
  }, [])

  console.log('LOGGED', isSignIn);

  return (
    // <div className={app} >
    //   <ProjectsTree />
    //   <Panel3D />
    // </div>
    <SignInPanel />
    // setLogged={setLogged}
  );
}

const mapStateToProps = (state, ownProps) => ({
  isSignIn: state.registration.isSignIn,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  checkStorage: () => dispatch(checkStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

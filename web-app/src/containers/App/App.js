import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { app, mainPanel } from './App.module.scss';

import ProjectsTree from '../ProjectsTree/';
import Panel3D from '../Panel3D/';
import SignInPanel from '../SignInPanel/';
import MainNavigation from '../MainNavigation/';
import Specification from '../Specifiaction/';

import WindowPanel from '../../components/WindowPanel/';

import { checkStorage } from '../../actions/registrationActions';

function App ({ checkStorage, isSignIn }) {
  useEffect(() => {
    checkStorage();
  }, [])

  if (isSignIn) {
    return (
      <div className={app} >
        <MainNavigation />
        <ProjectsTree />
        <div className={mainPanel}>
          <div>
            <Panel3D />
            <Specification />
          </div>
        </div>
        <WindowPanel><span>HELLO WINDOW!</span></WindowPanel>
      </div>
    );
  } else {
    return <SignInPanel />
  }
}

App.propTypes = {
  isSignIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  isSignIn: state.registration.isSignIn,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  checkStorage: () => dispatch(checkStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

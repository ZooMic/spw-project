import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { app, mainPanel } from './App.module.scss';

import ProjectsTree from '../ProjectsTree/';
import Panel3D from '../Panel3D/';
import SignInPanel from '../SignInPanel/';
import MainNavigation from '../MainNavigation/';
import Specification from '../Specifiaction/';

import Windows from '../Windows/';

import { checkStorage } from '../../actions/registrationActions';

function App ({ checkStorage, isSignIn }) { 

  const [windowVisible, setWindowVisible] = useState(false);
  const [windowContent, setWindowContent] = useState(null);

  const closeWindow = () => {
    setWindowVisible(false);
  };

  const turnOnAndSetWindowContent = (windowContent) => {
    setWindowVisible(true);
    setWindowContent(windowContent);
  }

  useEffect(() => {
    checkStorage();
  }, [])

  if (isSignIn) {
    return (
      <div className={app} >
        <MainNavigation setWindowContent={turnOnAndSetWindowContent}/>
        <ProjectsTree />
        <div className={mainPanel}>
          <div>
            <Panel3D />
            <Specification />
          </div>
        </div>
        <Windows/>
        <WindowPanel isVisible={windowVisible} onClose={closeWindow}>{windowContent}</WindowPanel>
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

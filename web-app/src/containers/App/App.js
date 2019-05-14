import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { app, signIn } from './App.module.scss';

import ProjectsTree from '../ProjectsTree/';
import Panel3D from '../Panel3D/';

import SignInPanel from '../SignInPanel/';

function App () {
  const [logged, setLogged] = useState(false);
  
  useEffect(() => {
    
  }, [])

  return (
    // <div className={app} >
    //   <ProjectsTree />
    //   <Panel3D />
    // </div>
    <SignInPanel setLogged={setLogged}/>
  );
}

export default connect()(App);

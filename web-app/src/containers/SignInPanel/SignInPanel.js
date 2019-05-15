import React, { useState } from 'react';
import { connect } from 'react-redux';

import Login from './Login';
import Register from './Register';
import Pending from './Pending';

import { loginAction } from '../../actions/registrationActions';

import { main } from './SignInPanel.module.scss';


function SignInPanel ({ isPending, error, loginAction }) {
    const [isRegister, setRegister] = useState(false);

    const onLoginSubmit = (event) => {
        event.preventDefault();
        const target = event.target;
        const login = target.querySelector('#sign-in-login').value;
        const password = target.querySelector('#sign-in-password').value;
        const rememberMe = target.querySelector('#sign-in-remember-me').checked;
        loginAction(login, password, rememberMe);
    }

    const onRegisterSubmit = (event) => {
        event.preventDefault();
        // TODO - send new user data
    }

    const handleChangeRegister = () => {
        setRegister(!isRegister);
    }

    return (
        <div className={main}>
        {
            isPending ?
                <Pending /> :
                isRegister ?
                    <Register onLogin={handleChangeRegister} onSumbit={onRegisterSubmit} error={error}/> :
                    <Login onRegister={handleChangeRegister} onSubmit={onLoginSubmit} error={error}/>
        }
        </div>
    );
};

const mapStateToProps = (state) => ({
    isPending: state.registration.pending,
    error: state.registration.error,
});

const mapDispatchToProps = (dispatch) => ({
    loginAction: (login, password, rememberMe) => dispatch(loginAction(login, password, rememberMe)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPanel);
import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Login from './Login';
import Register from './Register';
import Pending from './Pending';

import { main, margin, register } from './SignInPanel.module.scss';


function SignInPanel ({ setLogged }) {
    const [isRegister, setRegister] = useState(false);
    const [isPending, setPending] = useState(false);

    const onLoginSubmit = (event) => {
        event.preventDefault();
        const target = event.target;
        const login = target.querySelector('#sign-in-login').value;
        const password = target.querySelector('#sign-in-password').value;
        const rememberMe = target.querySelector('#sign-in-remember-me').checked;
    }

    const onRegisterSubmit = (event) => {
        event.preventDefault();
        console.log(event.target);
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
                    <Register onLogin={handleChangeRegister} onSumbit={onRegisterSubmit}/> :
                    <Login onRegister={handleChangeRegister} onSubmit={onLoginSubmit}/>
        }
        </div>
    );
};

export default SignInPanel;
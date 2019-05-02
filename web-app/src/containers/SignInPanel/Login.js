import React, { Fragment } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { margin, bottom } from './SignInPanel.module.scss';

function Login ({ onRegister, onSubmit }) {
    return (
        <Fragment>
            <div className={margin}>
                <h2>Sign in</h2>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="sign-in-login">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" placeholder="Enter login" />
                    </Form.Group>
                    <Form.Group controlId="sign-in-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" />
                    </Form.Group>
                    <Form.Group controlId="sign-in-remember-me">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button className={'float-right'} variant="success" type="submit">
                        Sign in
                    </Button>
                </Form>
            </div>
            <div className={bottom}>
                <span>If you don't have account</span>
                <Button variant="primary" type="button" size="sm" onClick={onRegister}>
                    Register
                </Button>
            </div>
        </Fragment> 
    );
}

export default Login;
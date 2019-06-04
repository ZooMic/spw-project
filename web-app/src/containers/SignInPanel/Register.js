import React, { Fragment } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { margin, bottom } from './SignInPanel.module.scss';

function Register ({ onLogin, onSubmit }) {
    return (
        <Fragment>
            <div className={margin}>
                <h2>Register</h2>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="register-username">
                        <Form.Label>Username / Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter login" />
                    </Form.Group>
                    <Form.Group controlId="register-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" />
                    </Form.Group>
                    <Form.Group controlId="sign-in-repeat-password">
                        <Form.Control type="password" placeholder="Repeat password" />
                    </Form.Group>
                    <Button className={'float-right'} variant="success" type="submit">
                        Sign up
                    </Button>
                </Form>
            </div>
            <div className={bottom}>
                <span>If you already have an account, just</span>
                <Button variant="primary" type="button" size="sm" onClick={onLogin}>
                    Login
                </Button>
            </div>
        </Fragment> 
    );
}

export default Register;
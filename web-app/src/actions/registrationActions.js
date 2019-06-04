import axios from 'axios';

const apiUrl = 'https://localhost:44325/Auth' 
const jwt = require('jsonwebtoken');

export const loginAction = (username, password, rememberMe) => {
    return (dispatch) => {
        dispatch(loginFetchingStarted());
        axios.post(`${apiUrl}/login`, { username, password })
        .then(response => {
            const token = response.data;
            if (token) {
                localStorage.removeItem('token'); sessionStorage.removeItem('token'); 
                localStorage.removeItem('username'); sessionStorage.removeItem('username'); 
                localStorage.removeItem('userId'); sessionStorage.removeItem('userId');
                
                const storage = rememberMe ? localStorage : sessionStorage
                storage.setItem('token', token.accessToken.token);
                storage.setItem('username', username);
                storage.setItem('userId', jwt.decode(token.accessToken.token).id); 
                setTimeout(() => { //Debug purpose only!
                    dispatch(loginFetchingFinished(token));
                }, 2500);
            } else {
                dispatch(loginError(new Error('Invalid response from server.')));
            }
        })
        .catch(error => {
            if (error && error.response && error.response.data && error.response.data.message) {
                const msg = error.response.data.message;
                dispatch(loginError(msg));
            }
        });
    }
};

export const REGISTRATION_LOGIN_FETCHING_STARTED = 'REGISTRATION_LOGIN_FETCHING_STARTED';
const loginFetchingStarted = () => ({
    type: REGISTRATION_LOGIN_FETCHING_STARTED,
});

export const REGISTRATION_LOGIN_FETCHING_FINISHED = 'REGISTRATION_LOGIN_FETCHING_FINISHED';
const loginFetchingFinished = (token) => ({
    type: REGISTRATION_LOGIN_FETCHING_FINISHED,
    payload: { token },
});

export const REGISTRATION_LOGIN_ERROR = 'REGISTRATION_LOGIN_ERROR';
const loginError = (error) => ({
    type: REGISTRATION_LOGIN_ERROR,
    payload: error,
});


export const REGISTRATION_LOGOUT = 'REGISTRATION_LOGOUT';
export const logout = () => {
    return {
        type: REGISTRATION_LOGOUT,
    };
};

export const REGISTRATION_CHECK_STORAGE = 'REGISTRATION_CHECK_STORAGE';
export const checkStorage = () => {
    return (dispatch) => {
        let token = null;
        token = localStorage.getItem('token');
        if (!token) {
            token = sessionStorage.getItem('token');
        }
        if (token) {
            dispatch(loginFetchingFinished(token))
        }
    }
}
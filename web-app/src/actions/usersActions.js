import axios from 'axios';

const apiUrl = 'https://localhost:44325'

export const USERS_FETCH_STARTED = 'USERS_FETCH_STARTED';
const usersFetchStarted = () => ({
    type: USERS_FETCH_STARTED,
});

export const USERS_FETCH_FINISHED = 'USERS_FETCH_FINISHED';
const usersFetchFinished = (users) => ({
    type: USERS_FETCH_FINISHED,
    payload: users,
});

export const USERS_FETCH_ERROR = 'USERS_FETCH_ERROR';
const usersFetchError = (error) => ({
    type: USERS_FETCH_ERROR,
    payload: error,
});

export const fetchUsersAction = () => {
    
    return (dispatch) => { 
        let token;
        if (localStorage.getItem('token')) {
            token = localStorage.getItem('token');
          } else if (sessionStorage.getItem('token')) {
            token = sessionStorage.getItem('token');
          } 

        var config = {
            headers: {'Authorization': "bearer " + token}
        }; 
        dispatch(usersFetchStarted());
        axios.get(`${apiUrl}/Protected`, config)
        .then(response => {
            const users = response.data;
            console.log(users);
            if (users) { 
                dispatch(usersFetchFinished(users)); 
            } else {
                dispatch(usersFetchError(new Error('Invalid response from server.')));
            }
        })
        .catch(error => {
            if (error && error.response && error.response.data && error.response.data.message) {
                const msg = error.response.data.message;
                dispatch(usersFetchError(msg));
            }
        });
    }
};
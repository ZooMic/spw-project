import axios from 'axios';

const apiUrl = 'http://localhost:3006/messages'

export const MAIL_FETCH_RECEIVED_STARTED = 'MAIL_FETCH_RECEIVED_STARTED';
const mailFetchReceivedStarted = () => ({
    type: MAIL_FETCH_RECEIVED_STARTED, 
});

export const MAIL_FETCH_RECEIVED_FINISHED = 'MAIL_FETCH_RECEIVED_FINISHED';
const mailFetchReceivedFinished = (mails) => ({
    type: MAIL_FETCH_RECEIVED_FINISHED,
    payload: mails,
});

export const MAIL_FETCH_RECEIVED_ERROR = 'MAIL_FETCH_RECEIVED_ERROR';
const mailFetchReceivedError = (error) => ({
    type: MAIL_FETCH_RECEIVED_ERROR,
    payload: error,
}); 

export const MAIL_FETCH_SENT_STARTED = 'MAIL_FETCH_SENT_STARTED';
const mailFetchSentStarted = () => ({
    type: MAIL_FETCH_SENT_STARTED,
});

export const MAIL_FETCH_SENT_FINISHED = 'MAIL_FETCH_SENT_FINISHED';
const mailFetchSentFinished = (mails) => ({
    type: MAIL_FETCH_SENT_FINISHED,
    payload: mails,
}); 

export const MAIL_FETCH_SENT_ERROR = 'MAIL_FETCH_SENT_ERROR';
const mailFetchSentError = (error) => ({
    type: MAIL_FETCH_SENT_ERROR,
    payload: error,
}); 

export const MAIL_DELETE_STARTED = 'MAIL_DELETE_STARTED';
const deleteMailStarted = () => ({
    type: MAIL_DELETE_STARTED,
});

export const MAIL_DELETE_FINISHED = 'MAIL_DELETE_FINISHED';
const deleteMailFinished = (mailId) => ({
    type: MAIL_DELETE_FINISHED,
    payload: mailId,
});

export const MAIL_DELETE_ERROR = 'MAIL_DELETE_ERROR';
const deleteMailError = (error) => ({
    type: MAIL_DELETE_ERROR,
    payload: error,
}); 

export const MAIL_SEND_STARTED = 'MAIL_SEND_STARTED';
const mailSendStarted = () => ({
    type: MAIL_SEND_STARTED, 
});

export const MAIL_SEND_FINISHED = 'MAIL_SEND_FINISHED';
const mailSendFinished = (mail) => ({
    type: MAIL_SEND_FINISHED,
    payload: mail 
});


export const MAIL_SEND_ERROR = 'MAIL_SEND_ERROR';
const mailSendError = (error) => ({
    type: MAIL_SEND_ERROR,
    payload: error,
});  

export const fetchReceivedMailsAction = (userId) => { 
    return (dispatch) => {  
        console.log(userId);
        dispatch(mailFetchReceivedStarted());
        axios.get(`${apiUrl}/received`, {
            params: {
               userId: userId
            }
        })
        .then(response => {
            const mails = response.data; 
            console.log('Received mails'); 
            console.log(mails); 
            if (mails) { 
                dispatch(mailFetchReceivedFinished(mails)); 
            } else {
                dispatch(mailFetchReceivedError(new Error('Invalid response from server.')));
            }
        })
        .catch(error => {
            if (error && error.response && error.response.data && error.response.data.message) {
                const msg = error.response.data.message;
                dispatch(mailFetchReceivedError(msg));
            }
        });
    }
};

export const fetchSentMailsAction = (userId) => {
    console.log(userId); 
    return (dispatch) => {  
        dispatch(mailFetchSentStarted());
        axios.get(`${apiUrl}/sent`,  {
            params: {
               userId: userId
            }
        })
        .then(response => {
            const mails = response.data; 
            console.log('Sent mails'); 
            console.log(mails); 
            if (mails) { 
                dispatch(mailFetchSentFinished(mails)); 
            } else {
                dispatch(mailFetchSentError(new Error('Invalid response from server.')));
            }
        })
        .catch(error => {
            if (error && error.response && error.response.data && error.response.data.message) {
                const msg = error.response.data.message;
                dispatch(mailFetchSentError(msg));
            }
        });
    }
};

export const deleteMailAction = (mailId) => { 
    return (dispatch) => {  
        dispatch(deleteMailStarted());
        axios.delete(`${apiUrl}`, { data: { id: mailId } })
        .then(response => {  
            dispatch(deleteMailFinished(mailId));  
        })
        .catch(error => {
            if (error && error.response && error.response.data && error.response.data.message) {
                const msg = error.response.data.message;
                dispatch(deleteMailError(msg));
            }
        });
    }
};

export const sendMailAction = (mail) => { 
    return (dispatch) => {  
        dispatch(mailSendStarted());
        axios.post(`${apiUrl}`, mail)
        .then(response => {
            console.log(response);
            const mail = response.data; 
            if (mail) { 
                dispatch(mailSendFinished(mail)); 
            } else {
                dispatch(mailSendError(new Error('Invalid response from server.')));
            }
        })
        .catch(error => {
            if (error && error.response && error.response.data && error.response.data.message) {
                const msg = error.response.data.message;
                dispatch(mailSendError(msg));
            }
        });
    }
};
import { 
    MAIL_FETCH_RECEIVED_STARTED,
    MAIL_FETCH_RECEIVED_FINISHED,
    MAIL_FETCH_RECEIVED_ERROR,
    MAIL_FETCH_SENT_STARTED,
    MAIL_FETCH_SENT_FINISHED,
    MAIL_FETCH_SENT_ERROR,
    MAIL_DELETE_STARTED,
    MAIL_DELETE_FINISHED,
    MAIL_DELETE_ERROR,
    MAIL_SEND_STARTED,
    MAIL_SEND_FINISHED,
    MAIL_SEND_ERROR 
} from '../actions/mailActions';

const defaultState = {
   mailsReceived: null,
   receivedPending: false,  
   receivedError: null,
   mailsSent: null,
   sentPending: false,
   sentError: null,
   deletePending: false,
   deleteError: null,
   sendPending: false,
   sendError: null,
};

export default (state = defaultState, action) => {
   switch (action.type) {
       case MAIL_FETCH_RECEIVED_STARTED:
           return { ...state, receivedPending: true, receivedError: null };
       case MAIL_FETCH_RECEIVED_FINISHED:
            return { ...state, receivedPending: false, mailsReceived: action.payload, receivedError: null };  
       case MAIL_FETCH_RECEIVED_ERROR:
           return { ...state, receivedError: action.payload, receivedPending: false }; 
        case MAIL_FETCH_SENT_STARTED:
            return { ...state, sentPending: true, sentError: null };
        case MAIL_FETCH_SENT_FINISHED:
             return { ...state, sentPending: false, mailsSent: action.payload, sentError: null };  
        case MAIL_FETCH_SENT_ERROR:
            return { ...state, sentError: action.payload, sentPending: false }; 
        case MAIL_DELETE_STARTED:
            return { ...state, deletePending: false, deleteError: null }; 
        case MAIL_DELETE_FINISHED:
            return { 
                ...state, 
                deletePending: false, 
                deleteError: null, 
                mailsReceived: state.mailsReceived.filter(mail => mail.id !== action.payload),
                mailsSent: state.mailsSent.filter(mail => mail.id !== action.payload),
            }; 
        case MAIL_DELETE_ERROR:
            return { ...state, deleteError: action.payload, deletePending: false }; 
        case MAIL_SEND_STARTED:
            return { ...state, sendPending: true, sendError: null }; 
        case MAIL_SEND_FINISHED:
            const mailsSent = state.mailsSent;
            mailsSent.unshift(action.payload);
            return { ...state, sendPending: false, sendError: null, mailsSent: mailsSent }; 
        case MAIL_SEND_ERROR:
            return { ...state, sendError: action.payload, sendPending: false };  
       default:
           return state;
   }
}
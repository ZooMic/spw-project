import { 
     USERS_FETCH_STARTED,
     USERS_FETCH_FINISHED,
     USERS_FETCH_ERROR
} from '../actions/usersActions';

const defaultState = {
    users: null,
    pending: false, 
    error: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case USERS_FETCH_STARTED:
            return { ...state, pending: true, error: null };
        case USERS_FETCH_FINISHED:
            return { ...state,  users: action.payload, pending: false, error: null };
        case USERS_FETCH_ERROR:
            return { ...state, error: action.payload, pending: false }; 
        default:
            return state;
    }
}
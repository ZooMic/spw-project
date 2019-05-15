import { 
    REGISTRATION_LOGIN_FETCHING_STARTED,
    REGISTRATION_LOGIN_FETCHING_FINISHED,
    REGISTRATION_LOGIN_ERROR,
    REGISTRATION_LOGOUT,
    REGISTRATION_CHECK_STORAGE,
} from '../actions/registrationActions';

const defaultState = {
    token: null,
    pending: false,
    isSignIn: false,
    error: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case REGISTRATION_LOGIN_FETCHING_STARTED:
            return { ...state, pending: true, error: null };
        case REGISTRATION_LOGIN_FETCHING_FINISHED:
            return { ...state,  ...action.payload, pending: false, error: null, isSignIn: true };
        case REGISTRATION_LOGIN_ERROR:
            return { ...state, error: action.payload, pending: false };
        case REGISTRATION_LOGOUT:
            return { ...state, pending: false, error: null, token: null, isSignIn: false };
        case REGISTRATION_CHECK_STORAGE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
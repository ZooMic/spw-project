import { WINDOWS_OPEN_WINDOW, WINDOWS_CLOSE_WINDOW } from '../actions/windowsActions';

const defaultState = {
    chat: false,
    files: false,
    email: false,
    users: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case WINDOWS_OPEN_WINDOW:
            // action.payload ==> name of the window parameter ex. chat, files etc.
            return { ...defaultState, [action.payload]: true };
        case WINDOWS_CLOSE_WINDOW:
            return { ...defaultState };
        default:
            return state;
    }
}
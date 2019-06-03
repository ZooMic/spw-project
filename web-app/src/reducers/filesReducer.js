import { FILES_ADD_NEW_FILE, FILES_SET_SELECTION } from '../actions/filesActions';

const defaultState = {
    data: {},
    selected: '',
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case FILES_ADD_NEW_FILE:
            return { ...state, data: { ...state.data, ...action.payload } };
        case FILES_SET_SELECTION:
            return { ...state, selected: action.payload };
        default:
            return state;
    }
};
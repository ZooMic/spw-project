import { FILE_UPLOAD_SET_OPEN } from '../actions/fileUploadActions';

const defaultState = {
    isOpened: false,
    files: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case FILE_UPLOAD_SET_OPEN:
            return { ...state, isOpened: action.payload };
        default:
            return state;
    }
}
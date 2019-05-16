import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer';
import projectsReducer from './projectsReducer';

import fileUploadReducer from './fileUploadReducer';

export default combineReducers({
    projects: projectsReducer,
    registration: registrationReducer,
    fileUpload: fileUploadReducer,
});
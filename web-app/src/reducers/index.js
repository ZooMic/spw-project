import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer';
import projectsReducer from './projectsReducer';
import windowsReducer from './windowsReducer';
import filesReducer from './filesReducer';


export default combineReducers({
    projects: projectsReducer,
    registration: registrationReducer,
    windows: windowsReducer,
    files: filesReducer,
});
import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer';
import projectsReducer from './projectsReducer';
import windowsReducer from './windowsReducer';
import filesReducer from './filesReducer';
import usersReducer from './usersReducer';
import mailReducer from './mailReducer';


export default combineReducers({
    projects: projectsReducer,
    registration: registrationReducer,
    windows: windowsReducer,
    files: filesReducer,
    users: usersReducer,
    mails: mailReducer,
});
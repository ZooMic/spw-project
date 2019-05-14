import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer';
import projectsReducer from './projectsReducer';

export default combineReducers({
    projects: projectsReducer,
    registration: registrationReducer,
});
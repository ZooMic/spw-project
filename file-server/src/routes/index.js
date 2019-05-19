const authorizationRoute = require('./authorization_route');
const mockTokenRoute = require('./mock_token_route');
const filesUploadRoute = require('./files_route');


module.exports = (app) => {
    authorizationRoute(app);
    mockTokenRoute(app);
    filesUploadRoute(app);
}
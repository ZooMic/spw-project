const jwt = require('jsonwebtoken');

function authorizationRoute(app) {
    app.all('*', (req, res, next) => {
        const token = req.body && req.body.token || req.query && req.query.token;
        
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.token = decoded;
        }

        next();
    });
}

module.exports = authorizationRoute;
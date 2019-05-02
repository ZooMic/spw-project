const users = require('./users');
const jwt = require('jsonwebtoken');

const privateKey = 'SOOOOO_PRIVET_123_I_AM_SURE_IT_IS';

function tokenRoute(app) {
    app.all('*', (req, res, next) => {
        if (req.body) {
            const { token } = req.body;
            if (token) {
                const decoded = jwt.verify(token, privateKey);
                req.token = decoded;
            }
        }
        next();
    });

    app.post('/login', (req, res) => {
        if (req.body) {
            const { username, password } = req.body;
            const user = users.find(u => u.username === username);
            if (user) {
                const { type } = user;
                const token = jwt.sign({ username, type }, privateKey);
                res.json(token);
            } else {
                res.status(403).json({ errorCode: '205', message: 'Invalid username or password!'});
            }
        }
    });
}

module.exports = tokenRoute;
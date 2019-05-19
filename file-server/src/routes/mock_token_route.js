const jwt = require('jsonwebtoken');
const users = require('../mocks/users/index.json');

function mockTokenRoute(app) {
    app.post('/login', (req, res) => {
        if (req.body) {
            const { username, password } = req.body;
            const user = users.find(u => u.username === username);
            if (user && user.password === password) {
                const { type } = user;
                const token = jwt.sign({ username, type }, process.env.SECRET_KEY);
                res.json(token);
            } else {
                res.status(403).json({ errorCode: '205', message: 'Invalid username or password!'});
            }
        }
    });
}

module.exports = mockTokenRoute;
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY'); // Replace 'YOUR_SECRET_KEY' with the same secret key used during login
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = authenticate;

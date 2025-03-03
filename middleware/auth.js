const jwt = require('jsonwebtoken');

class Auth {
    constructor(req, res, next) {
        const token = req.header('Authorization');

        if (!token) {
            return res.redirect('/login');
        }

        console.log('Token:', token); // Print the token to the console

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = decoded.user;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    }
}

module.exports = (req, res, next) => new Auth(req, res, next);
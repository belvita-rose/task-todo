// backend/middlewares.js
const fs = require('fs');

function validateEmail(req, res, next) {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Invalid email format');
    }
    next();
}

function validatePassword(req, res, next) {
    const { password } = req.body;
    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters long');
    }
    next();
}

function authenticate(req, res, next) {
    const token = req.headers['authorization'];
    if (!token || token !== 'valid-token') {
        return res.status(403).send('Unauthorized');
    }
    next();
}

module.exports = { validateEmail, validatePassword, authenticate };

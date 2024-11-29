const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const USERNAME = process.env.AUTH_USERNAME
const PASSWORD = process.env.AUTH_PASSWORD

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === USERNAME && password === PASSWORD) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
        return res.status(200).json({ token });
    }

    return res.status(401).json({ message: 'Invalid username or password' });
});

module.exports = router;

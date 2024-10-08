const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.auth = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Access denied.');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(verified.userId);
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
    //check headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError("Authentication invalid");
    }
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        //attach the user to the job routes
        req.user = { userId: payload.userId, name: payload.name };

        //alternative instead of creating object we can look for user in db
        // const user = User.findById(payload.id).select('-password');
        // req.user = user;

        next();

    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }

};

module.exports = auth;
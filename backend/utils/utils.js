const jwt = require('jsonwebtoken');

const createTokenUser = (user) => {
    return { name: user.name, userId: user._id, role: user.role,email:user.email};
};

const attachCookiesToResponse = ({ res, user }) => {
    const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });

    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
};

module.exports = {
    createTokenUser,
    attachCookiesToResponse,
};

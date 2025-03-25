const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const authenticateUser = (req, res, next) => {
    const token = req.signedCookies.token || req.headers.authorization?.split(" ")[1];
       
    if (!token) {
        throw new CustomError.UnauthenticatedError("Authentication required");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError("Invalid token");
    }
};

module.exports = { authenticateUser };

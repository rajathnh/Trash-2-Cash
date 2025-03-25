const CustomError = require("../errors");

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthorizedError("Access denied");
        }
        next();
    };
};

module.exports = { authorizeRoles };

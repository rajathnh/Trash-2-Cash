const {StatusCodes} = require('http-status-codes')
const CustomAPIError = require('./custom-api')

class BadRequestError extends CustomAPIError {
    constructor(message){
        super(message);
        this.statusCOde = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError;
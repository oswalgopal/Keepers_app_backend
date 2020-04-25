const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token, 'oswalgopal_JWT_25052000');
        next();
    } catch(error) {
        return res.status(401).json({
            status: 401,
            message: 'Token is Invalid',
            response: null
        })
    }
} 
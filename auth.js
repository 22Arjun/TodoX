const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


const auth = async (req, res, next) => {
    const authentication = req.headers.authentication;

    const decodedId = jwt.verify(authentication, secret);

    if(decodedId.id) {
        req.userId = decodedId.id;
        next();
    }
    else {
        res.status(403).json({
            error: "Invalid Signature"
        })
    }
}

module.exports = {
    secret,
    auth
}
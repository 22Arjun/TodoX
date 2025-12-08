const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const auth = async (req, res, next) => {
    const authorization = req.headers.authorization;

    const decodedId = jwt.verify(authorization, JWT_SECRET);

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
    JWT_SECRET,
    auth
}
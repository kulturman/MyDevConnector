const jwt = require('jsonwebtoken');

module.exports = async (req , res , next) => {
    const token = req.header('X-auth-token');
    if(!token)
        return res.status(401).send('Access denied, no token provided');
    try {
        const payload = await jwt.verify(token , process.env.JWT_SECRET_KEY);
        req.payload = payload;
        return next();
    }

    catch(err) {
        return res.status(403).send('Access denied, invalid token');
    }
}
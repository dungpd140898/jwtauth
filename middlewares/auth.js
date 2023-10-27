const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "Snippet_SceretKey", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function gennerateAccessToken(user) {
    return jwt.sign({ data: user }, "Snippet_SceretKey", {
        expiresIn: "5m"
    });
}

module.exports = {
    authenticateToken,
    gennerateAccessToken
};

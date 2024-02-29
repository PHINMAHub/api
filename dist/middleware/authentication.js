"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null)
        return res.status(401).json({ message: 'Unauthorized' });
    (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(401).json({ message: 'Unauthorized' });
        req.user = user;
        next();
    });
}
exports.authenticateToken = authenticateToken;

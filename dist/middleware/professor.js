"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.professorOnly = void 0;
function professorOnly(req, res, next) {
    if (req.user && req.user.userType.toLowerCase() === 'professor') {
        next();
    }
    else {
        return res.status(403).json({ message: 'Access forbidden. Only professors are allowed.' });
    }
}
exports.professorOnly = professorOnly;

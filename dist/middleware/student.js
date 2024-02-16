"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentOnly = void 0;
function studentOnly(req, res, next) {
    if (req.user && req.user.userType.toLowerCase() === 'student') {
        next();
    }
    else {
        return res.status(403).json({ message: 'Access forbidden. Only professors are allowed.' });
    }
}
exports.studentOnly = studentOnly;

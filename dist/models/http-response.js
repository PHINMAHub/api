"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
class HttpResponse {
    constructor(message, errorCode) {
        this.message = message;
        this.code = errorCode;
    }
}
exports.HttpResponse = HttpResponse;
// module.exports = HttpResponse

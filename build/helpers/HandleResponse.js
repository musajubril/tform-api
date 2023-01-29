"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HandleResponse({ res, status, data, message }) {
    return res.status(status).json(Object.assign({ message }, data));
}
exports.default = HandleResponse;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.AplicationError = void 0;
class AplicationError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.AplicationError = AplicationError;
class AppError extends AplicationError {
    constructor(message) {
        super(message);
    }
}
exports.AppError = AppError;

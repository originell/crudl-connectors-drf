'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = crudlErrors;
function ValidationError() {
    var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.validationError = true;
    this.errors = errors;
}

function AuthorizationError() {
    this.authorizationError = true;
}

function PermissionError() {
    this.permissionError = true;
}

function DefaultError(message, status) {
    this.message = message;
    this.status = status;
}

// Change non_field_errors to _error
function transformErrors(errors) {
    if (errors !== null && (typeof errors === 'undefined' ? 'undefined' : _typeof(errors)) === 'object') {
        errors._error = errors.non_field_errors; // eslint-disable-line
        delete errors.non_field_errors; // eslint-disable-line
    }
    return errors;
}

function processError(response) {
    switch (response.status) {
        case 400:
            throw new ValidationError(transformErrors(response.data));
        case 401:
            throw new AuthorizationError();
        case 403:
            throw new PermissionError();
        default:
            throw new DefaultError(response.statusText, response.status);
    }
}

function crudlErrors(next) {
    return {
        create: function create(req) {
            return next.create(req).catch(processError);
        },
        read: function read(req) {
            return next.read(req).catch(processError);
        },
        update: function update(req) {
            return next.update(req).catch(processError);
        },
        delete: function _delete(req) {
            return next.delete(req).catch(processError);
        }
    };
}
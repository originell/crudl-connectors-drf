function ValidationError(errors = {}) {
  this.validationError = true
  this.errors = errors
}

function AuthorizationError() {
  this.authorizationError = true
}

function PermissionError() {
  this.permissionError = true
}

function DefaultError(message) {
  this.message = message
}

// Change non_field_errors to _error
function transformErrors(errors) {
  if (errors !== null && typeof errors === 'object') {
    errors._error = errors.non_field_errors; // eslint-disable-line
    delete errors.non_field_errors; // eslint-disable-line
  }
  return errors
}

function processError(response) {
  switch (response.status) {
    case 400:
      throw new ValidationError(transformErrors(response.data))
    case 401:
      throw new AuthorizationError()
    case 403:
      throw new PermissionError()
    default:
      throw new DefaultError(response.statusText)
  }
}

module.exports = function crudlErrors(next) {
  return {
    create: req => next.create(req).catch(processError),
    read: req => next.read(req).catch(processError),
    update: req => next.update(req).catch(processError),
    delete: req => next.delete(req).catch(processError),
  }
}

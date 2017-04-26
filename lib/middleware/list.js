const get = require('lodash/get');

function list(path = 'results') {
  return function listMiddleware(next) {
    return {
      read: req => next.read(req).then((res) => {
        const response = Object.assign({}, res);

        // Replace the data with the value of under 'path'
        response.data = get(response.data, path);

        // Include the pagination in the data
        if (res.pagination) {
          response.data.pagination = res.pagination;
        }

        return response;
      }),
    };
  };
}

module.exports = list;

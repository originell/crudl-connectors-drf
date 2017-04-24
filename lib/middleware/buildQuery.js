const url = require('url');

function buildQuery(options = { pageQueryParam: 'page' }) {
  // Builds a new url using the request's url, filters, and pagination
  function urlWithQuery(req) {
    if (typeof req.url !== 'string') {
      throw new Error(`Request URL must be a string. Found ${req.url}`);
    }

    const query = Object.assign(
      {},
      req.filters,
      req.page && { [options.pageQueryParam]: req.page },
    );

    const parsed = url.parse(req.url, true);
    parsed.search = undefined;
    parsed.query = Object.assign({}, parsed.query, query);

    return url.format(parsed);
  }

  return function buildQueryMiddleware(next) {
    return {
      create: (req) => { req.url = urlWithQuery(req); return next.create(req); },
      read: (req) => { req.url = urlWithQuery(req); return next.read(req); },
      update: (req) => { req.url = urlWithQuery(req); return next.update(req); },
      delete: (req) => { req.url = urlWithQuery(req); return next.delete(req); },
    };
  };
}

module.exports = buildQuery;

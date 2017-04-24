const { createFrontendConnector, createBackendConnector } = require('crudl-connectors-base');
const { crudToHttp, patternedURL } = require('crudl-connectors-base/lib/middleware');

const buildQuery = require('./middleware/buildQuery');
const defaults = require('./defaults');

function createDRFConnector(url, opts) {
  if (typeof url !== 'string') {
    throw new Error(`URL must be a string, found ${url}.`);
  }

  const options = Object.assign({}, defaults, opts);
  const axiosOptions = Object.assign({}, options.axios, { baseURL: options.baseURL });

  return createFrontendConnector(createBackendConnector(axiosOptions))
    .use(crudToHttp(options.crudToHttp))
    .use(buildQuery(options.query))
    .use(patternedURL(url));
}

module.exports = createDRFConnector;
